const { request, response } = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.update = async (req = request, res = response) => {
  const { id } = req.user;
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
