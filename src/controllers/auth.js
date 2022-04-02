const { request, response } = require("express");
const { PrismaClient } = require("@prisma/client");
const { hash, verify } = require("argon2");
const { verify: verifyToken } = require("jsonwebtoken");
const { genAccessToken, genRefreshToken } = require("../helpers/tokens");
const { transporter, getHtml, genPin } = require("../config/mailer");
const prisma = new PrismaClient();

exports.recuperar = async (req = request, res = response) => {
  const { correo } = req.body;
  try {
    const usuario = await prisma.usuario.findUnique({
      select: {
        correo: true,
      },
      where: { correo },
    });

    if (!usuario) {
      return res.json({ error: "Correo no encontrado" });
    }
    const pin = genPin();
    await transporter.sendMail({
      from: `"🔨Ferreteria" <${process.env.MAIL}>`,
      to: correo,
      subject: "Pin de recuperacion",
      html: getHtml(pin),
    });
    await prisma.usuario.update({
      data: {
        pin,
        pinExpire: Date.now() + 1000 * 60 * 5,
      },
      where: {
        correo,
      },
    });

    res.json({
      msg: `Se envio el pin de recuperacion a ${correo}, por favor revisa tu correo e ingresa el pin, en 5 minutos el pin se invalidara `,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.verificarPin = async (req = request, res = response) => {
  let { correo, pin } = req.body;
  const usuario = await prisma.usuario.findUnique({
    select: {
      correo: true,
      pin: true,
      pinExpire: true,
    },
    where: { correo },
  });

  if (!usuario) {
    return res.json({ error: "Correo no encontrado" });
  }
  if (usuario.pinExpire < Date.now()) {
    return res.json({ error: "Pin Expiro" });
  }

  if (pin != usuario.pin) {
    return res.json({ error: "Pin invalido" });
  }

  res.json({ msg: "pin ok" });
};

exports.cambiarClave = async (req = request, res = response) => {
  let { correo, pin, clave } = req.body;
  const usuario = await prisma.usuario.findUnique({
    select: {
      correo: true,
      pin: true,
      pinExpire: true,
    },
    where: { correo },
  });

  if (!usuario) {
    return res.json({ error: "Correo no encontrado" });
  }
  if (usuario.pinExpire < Date.now()) {
    return res.json({ error: "Pin Expiro" });
  }

  if (pin != usuario.pin) {
    return res.json({ error: "Pin invalido" });
  }

  clave = await hash(clave);
  await prisma.usuario.update({
    data: {
      clave,
    },
    where: {
      correo,
    },
  });

  res.json({
    msg: `Clave actualizada`,
  });
};

// nuevo token de acceso
exports.refresh = async (req = request, res = response) => {
  const { refreshToken } = req.body;
  try {
    let { id, correo } = verifyToken(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await prisma.usuario.findUnique({
      select: {
        refreshTokens: true,
      },
      where: {
        id,
      },
    });
    if (!user.refreshTokens.includes(refreshToken)) {
      return res.json({ error: "Token invalido" });
    }
    let accessToken = genAccessToken({ id, correo });
    res.json({ accessToken });
  } catch (error) {
    res.json({ error: "refresh token invalido", details: error.message });
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
  let refreshToken = genRefreshToken(usuario);
  let { id: rid } = await prisma.usuarioToken.create({
    data: {
      token: refreshToken,
      userId: usuario.id,
    },
  });
  let accessToken = genAccessToken({ ...usuario, rid });

  res.json({
    accessToken, // expira
    refreshToken, // no expira
  });
};

exports.registrar = async (req = request, res = response) => {
  let { clave } = req.body;
  try {
    clave = await hash(clave);

    const usuario = await prisma.usuario.create({
      data: { ...req.body, clave },
    });
    let refreshToken = genRefreshToken(usuario);
    let { id: rid } = await prisma.usuarioToken.create({
      data: {
        token: refreshToken,
        userId: usuario.id,
      },
    });

    let accessToken = genAccessToken({ ...usuario, rid });

    res.json({ usuario, accessToken, refreshToken });
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.logout = async (req = request, res = response) => {
  const { rid } = req.user;

  await prisma.usuarioToken.delete({ where: { id: rid } });

  res.json({ msg: "Session cerrada" });
};
