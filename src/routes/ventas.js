const { query } = require("express-validator");
const {
  listarVentas,
  listarVentasUsuario,
  crearVenta,
} = require("../controllers/ventas");
const { auth } = require("../middlewares/auth");

const router = require("express").Router();

// crear
router.post("/", auth, crearVenta);

// obtener rango
router.get(
  "/listar",
  auth,
  query("inicio").isInt().default(0),
  query("cantidad").isInt().default(20),
  listarVentas
);

// obtener compras de usuario
router.get("/", auth, listarVentasUsuario);

module.exports = router;
