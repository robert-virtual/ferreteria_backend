const { request, response } = require("express");
const { PrismaClient } = require("@prisma/client");
const { consulta } = require("../helpers/consulta");
const prisma = new PrismaClient();
const select = {
  id: true,
  nombre: true,
  descripcion: true,
  precio: true,
  stock: true,
  categoria: true,
  imagenes: {
    select: {
      imagenUrl: true,
    },
  },
};

exports.listarProds = async (req = request, res = response) => {
  let { inicio, cantidad } = req.query;
  let where = consulta(req.query) || {};

  let productos = await prisma.producto.findMany({
    skip: inicio,
    take: cantidad,
    select,
    where: {
      ...where,
      estado: true,
    },
  });
  productos = productos.map(mapProd);
  res.json(productos);
};

exports.crear = async (req = request, res = response) => {
  let { imagenes } = req.body;
  req.body.imagenes = undefined;
  let newProducto = await prisma.producto.create({
    data: {
      ...req.body,
      imagenes: {
        create: imagenes,
      },
    },
  });
  res.json(newProducto);
};

exports.eliminarProd = async (req = request, res = response) => {
  await prisma.producto.update({
    data: {
      estado: false,
    },
    where: {
      id: req.params.id,
    },
  });
  res.json({ msg: "Producto eliminado" });
};

exports.updateProd = async (req = request, res = response) => {
  await prisma.producto.update({
    data: req.body,
    where: {
      id: req.params.id,
    },
  });
  res.json({ msg: "producto actualizado" });
};

function mapProd(p) {
  p.imagenes = p.imagenes.map(mapImage);
  return p;
}

const mapImage = (i) => ({
  url: `${process.env.APP_URL}/${i.imagenUrl}`,
});
