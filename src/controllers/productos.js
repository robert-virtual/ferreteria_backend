const { request, response } = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.listarProds = async (req = request, res = response) => {
  const productos = await prisma.producto.findMany();

  res.json(productos);
};

exports.crear = async (req = request, res = response) => {
  let newProducto = await prisma.producto.create({
    data: req.body,
  });
  res.json(newProducto);
};

exports.eliminarProd = (req = request, res = response) => {
  res.json({ msg: "producto eliminado" });
};

exports.updateProd = (req = request, res = response) => {
  prisma.producto.update({
    data:req.body,
    where:{
      id:req.params.id
    }
  })
  res.json({ msg: "producto actualizado" });
};

