const { PrismaClient } = require("@prisma/client");
const { mapImage } = require("./productos");
const prisma = new PrismaClient();
exports.listarVentas = async (req, res) => {
  const { inicio, cantidad } = req.query;

  const ventas = await prisma.venta.findMany({
    skip: inicio,
    take: cantidad,
  });
  res.json({ ventas });
};
exports.listarVentasUsuario = async (req, res) => {
  const { id } = req.user;

  let ventas = await prisma.venta.findMany({
    where: {
      clienteFk: id,
    },
    select: {
      detalles: {
        select: {
          precio: true,
          cantidad: true,
          producto: {
            select: {
              id: true,
              imagenes: true,
              nombre: true,
              precio: true,
            },
          },
        },
      },
    },
  });
  ventas = ventas.map((v) => {
    v.detalles = v.detalles.map((d) => {
      d.producto.imagenes = d.producto.imagenes.map(mapImage);
      return d;
    });
    return v;
  });
  res.json({ ventas });
};

exports.crearVenta = async (req, res) => {
  /**
   * @typedef { {productoFk:number,cantidad:number,precio:number} } Detalles
   */
  /**
   * @type Detalles[]
   */
  let productos;
  const { id } = req.user;
  // en este punto los productos recibidos
  // solo tienen productoFk y cantidad
  productos = req.body.productos;

  // selecionamos los productos
  // para verificar el precio
  const prods = await prisma.producto.findMany({
    where: {
      id: {
        in: productos.map((p) => p.productoFk),
      },
    },
    select: {
      id: true,
      precio: true,
    },
  });
  // agregamos la propioedad precio a los productos
  productos = productos.map((p) => ({
    ...p,
    precio: prods.find((pd) => pd.id == p.productoFk).precio,
  }));
  // crear la venta
  const venta = await prisma.venta.create({
    data: {
      clienteFk: id,
      detalles: {
        create: productos,
      },
    },
  });
  res.json({ venta });
};
