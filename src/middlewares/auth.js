const { verify } = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  // verificar token
  try {
    const token = req.header("Authentication");
    if (!token) {
      return res.json({ error: "No envio jwt" });
    }
    let payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    return res.json({ error: error.message });
  }
};

exports.adminAuth = (req, res, next) => {
  // verificar token
  try {
    const token = req.header("Authentication");
    if (!token) {
      return res.json({ error: "No envio jwt" });
    }
    let payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!payload.admin) {
      return res.json({ error: "No es un usuaro administrador" });
    }
    req.user = payload;
    next();
  } catch (error) {
    return res.json({ error: error.message });
  }
};
