const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// obtener todas las ventas realizadas
exports.listarVentas = async (req, res) => {
  const { inicio, cantidad } = req.query;

  let ventas = await prisma.venta.findMany({
    skip: inicio,
    take: cantidad,
    select: {
      id: true,
      entregado: true,
      fechaEntrega: true,
      detalles: {
        select: {
          precio: true,
          cantidad: true,
          producto: {
            select: {
              nombre: true,
              imagenes: {
                select: {
                  imagenUrl: true,
                },
              },
            },
          },
        },
      },
      fecha: true,
      cliente: {
        select: {
          nombre: true,
          correo: true,
          direccion: true,
        },
      },
    },
  });

  res.json({ ventas });
};

// ventas un solo usuario
exports.listarVentasUsuario = async (req, res) => {
  const { id } = req.user;

  let ventas = await prisma.venta.findMany({
    where: {
      clienteFk: id,
    },
    select: {
      fecha: true,
      detalles: {
        select: {
          precio: true,
          cantidad: true,
          producto: {
            select: {
              id: true,
              imagenes: true,
              nombre: true,
            },
          },
        },
      },
    },
  });

  res.json({ ventas });
};

// crear venta
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

exports.ventaEntregada = async (req, res) => {
  const { id } = req.params;
  try {
    const venta = await prisma.venta.update({
      data: {
        entregado: true,
        fechaEntrega: new Date(),
      },
      where: {
        id: Number(id),
      },
    });
    res.json(venta);
  } catch (error) {
    console.warn(error);
    res.status(500).json({ error: error.message });
  }
};
