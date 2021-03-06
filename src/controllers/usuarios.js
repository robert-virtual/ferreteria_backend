const { request, response } = require("express");
const { PrismaClient } = require("@prisma/client");
const { cleanObj } = require("../helpers/funciones");
const { s3, bucket } = require("../config/s3Upload");
const prisma = new PrismaClient();

exports.update = async (req = request, res = response) => {
  const { id } = req.user;
  if (req.files[0].filename) {
    let usuario = await prisma.usuario.findUnique({
      where: { id },
      select: {
        imagenUrl: true,
      },
    });
    if (usuario.imagenUrl) {
      // borra de s3
      s3.deleteObject(
        { Bucket: bucket, Key: usuario.imagenUrl },
        (err, data) => {
          if (err) {
            console.log(err);
          }
          console.log(data);
        }
      );
      //fs.unlinkSync(path.join(__dirname, `../../uploads/${usuario.imagenUrl}`));
    }
  }
  req.body = cleanObj(req.body);
  try {
    const usuario = await prisma.usuario.update({
      data: {
        ...req.body,
        imagenUrl: req.files[0].location,
      },
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

exports.obtenerClientes = async (req = request, res = response) => {
  const { inicio, cantidad, nombre } = req.query;
  // roberto castillo
  let usuarios = await prisma.usuario.findMany({
    skip: inicio,
    take: cantidad,
    where: {
      nombre: {
        contains: nombre,
      },
    },
    select: {
      id: true,
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
  });

  res.json({ usuarios: usuarios.reverse() });
};
