const { PrismaClient } = require("@prisma/client");
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

  const ventas = await prisma.venta.findMany({
    where: {
      clienteFk: id,
    },
    select: {
      detalles: {
        select: {
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
