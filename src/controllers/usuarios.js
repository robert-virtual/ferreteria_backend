const { request, response } = require("express");
const { PrismaClient } = require("@prisma/client");
const { hash, verify } = require("argon2");
const { verify: verifyToken } = require("jsonwebtoken");
const { genAccessToken, genRefreshToken } = require("../helpers/tokens");
const prisma = new PrismaClient();

exports.me = async (req = request, res = response) => {
  const { correo } = req.user;
  const usuario = await prisma.usuario.findUnique({
    where: { correo },
  });

  res.json({ usuario });
};

exports.refresh = (req = request, res = response) => {
  const { refreshToken } = req.body;
  try {
    let payload = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    res.json({ msh: "REFRESH" });
  } catch (error) {
    res.json({ error: error.message });
  }
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
