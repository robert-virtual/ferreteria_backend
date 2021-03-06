const { request, response } = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { consulta } = require("../helpers/consulta");
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
  try {
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

    res.json(productos.reverse());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.crear = async (req = request, res = response) => {
  const { nombre, precio, stock, descripcion, categoriaFk } = req.body;
  let imagenes = [];
  req.files.forEach((f) => {
    imagenes.push({ imagenUrl: f.location });
  });
  let newProducto = await prisma.producto.create({
    data: {
      nombre,
      precio: Number(precio),
      stock: Number(stock),
      categoriaFk: Number(categoriaFk),
      descripcion,
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
  let { id, nombre, descripcion } = req.body;
  descripcion = descripcion || undefined;
  let precio = req.body.precio ? Number(req.body.precio) : undefined;
  let stock = req.body.stock ? Number(req.body.stock) : undefined;
  let categoriaFk = req.body.categoriaFk
    ? Number(req.body.categoriaFk)
    : undefined;
  id = Number(id);
  req.body = { nombre, descripcion, precio, stock, categoriaFk };
  let imagenes = [];
  if (req.files.length) {
    req.files.forEach((f) => {
      imagenes.push({ imagenUrl: f.location });
    });
    req.body.imagenes = {
      create: imagenes,
    };
  }
  console.log(req.body);
  await prisma.producto.update({
    data: req.body,
    where: {
      id: Number(id),
    },
  });
  res.json({ msg: "producto actualizado" });
};
