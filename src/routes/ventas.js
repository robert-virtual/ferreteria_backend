const { query } = require("express-validator");
const {
  listarVentas,
  listarVentasUsuario,
  crearVenta,
  ventaEntregada,
} = require("../controllers/ventas");
const { auth, adminAuth } = require("../middlewares/auth");

const router = require("express").Router();

// crear
router.post("/", auth, crearVenta);

// obtener rango
router.get(
  "/listar",
  adminAuth,
  query("inicio").isInt().default(0),
  query("cantidad").isInt().default(20),
  listarVentas
);

// obtener compras de usuario
router.get("/", auth, listarVentasUsuario);
router.put("/:id", adminAuth, ventaEntregada);

module.exports = router;
