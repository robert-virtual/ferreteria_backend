const { response } = require("express");
const { validationResult } = require("express-validator");

exports.validate = (req, res = response, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(401).json({ errores });
  }
  next();
};
