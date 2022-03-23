const { request, response } = require("express");
const { PrismaClient } = require("@prisma/client");
const { cleanObj } = require("../helpers/funciones");
const prisma = new PrismaClient();

exports.update = async (req = request, res = response) => {
  const { id } = req.user;
  req.body = cleanObj(req.body);
  try {
    const usuario = await prisma.usuario.update({
      data: req.body,
      where: {
        id,
      },
      select: {
        correo: true,
        id: true,
        imagenUrl: true,
        nombre: true,
      },
    });
    res.json({ usuario });
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.me = async (req = request, res = response) => {
  const { correo } = req.user;
  const usuario = await prisma.usuario.findUnique({
    select: {
      nombre: true,
      correo: true,
      imagenUrl: true,
      telefono: true,
      bloque: true,
      ciudad: true,
      colonia: true,
      direccion: true,
      latitude: true,
      longitude: true,
    },
    where: { correo },
  });

  res.json({ usuario });
};

exports.obtenerCliente = async (req = request, res = response) => {
  const usuario = await prisma.usuario.findMany({
    select: {
      nombre: true,
      correo: true,
      imagenUrl: true,
      telefono: true,
      bloque: true,
      ciudad: true,
      colonia: true,
      direccion: true,
      longitude: true,
      latitude: true,
    },
    where: { tipo:"cliente" },
  });

  res.json({ usuario });
};
