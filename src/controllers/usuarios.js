const { request, response } = require("express");
const { PrismaClient } = require("@prisma/client");
const { hash, verify } = require("argon2");
const { genAccessToken, genRefreshToken } = require("../helpers/tokens");
const prisma = new PrismaClient();

exports.me = async (req = request, res = response) => {
  const { correo } = req.user;
  const usuario = await prisma.usuario.findUnique({
    where: { correo },
  });

  res.json({ usuario });
};

exports.login = async (req = request, res = response) => {
  const { correo, clave } = req.body;

  const usuario = await prisma.usuario.findUnique({
    where: { correo },
  });
  if (!usuario) {
    return res.json({ error: "Credenciales incorrectas" });
  }

  let valido = await verify(usuario.clave, clave);
  if (!valido) {
    return res.json({ error: "Credenciales incorrectas" });
  }
  let accessToken = genAccessToken(usuario);
  let refreshToken = genRefreshToken(usuario);

  res.json({
    accessToken, // expira
    refreshToken, // no expira
  });
};

exports.registrar = async (req = request, res = response) => {
  let { clave } = req.body;
  clave = await hash(clave);

  const usuario = await prisma.usuario.create({ data: { ...req.body, clave } });
  res.json({ usuario });
};

exports.logout = (req = request, res = response) => {
  res.json("logout");
};
