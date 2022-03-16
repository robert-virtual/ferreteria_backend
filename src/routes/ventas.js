
const { query } = require("express-validator");
const { listarVentas } = require("../controllers/ventas");

const router = require("express").Router();

// crear
router.post("/");

// obtener rango
router.get("/listar", query("inicio").isInt().default(0),query("cantidad").isInt().default(20) , listarVentas);


// obtener compras de usuario
router.get("/");

module.exports = router;
