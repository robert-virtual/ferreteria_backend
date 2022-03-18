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
      d.producto = d.producto.imagenes.map(mapImage);
      return d;
    });
    return v;
  });
  res.json({ ventas });
};

exports.crearVenta = async (req, res) => {
  let productos = [{ productoFk: 0, cantidad: 0 }];
  const { id } = req.user;
  productos = req.body.productos;

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
