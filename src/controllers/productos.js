const { request, response } = require("express");

exports.listarProds = (req = request, res = response) => {
  res.json([]);
};
exports.eliminarProd = (req = request, res = response) => {
  res.json({ msg: "producto eliminado" });
};
