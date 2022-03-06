const { param, body, query } = require("express-validator");
const {
  listarProds,
  eliminarProd,
  crear,
  updateProd,
  buscar,
} = require("../controllers/productos");
const { validate } = require("../middlewares/validate");

const router = require("express").Router();

// listar
router.get(
  "/",
  query("inicio").isInt({ min: 1 }).toInt().default(0),
  query("cantidad").isInt({ min: 1 }).toInt().default(10),
  listarProds
);

// buscar
router.get(
  "/buscar",
  query("nombre").isString().isLength({ min: 3 }),
  query("inicio").isInt({ min: 1 }).toInt().default(0),
  query("cantidad").isInt({ min: 1 }).toInt().default(10),
  buscar
);

// crear
router.post(
  "/",
  body("nombre")
    .isLength({ min: 3 })
    .withMessage("El nombre de tener minimo 3 caracteres "),
  body("precio").isNumeric(),
  body("stock").isInt({ min: 1 }),
  validate,
  crear
);

// eliminar
router.delete(
  "/:id",
  param("id").isInt().withMessage("Debe proporcionar un id de producto"),
  validate,
  eliminarProd
);

//actualizar
router.put(
  "/:id",
  param("id").isInt().withMessage("Debe proporcionar un id de producto"),
  validate,
  updateProd
);
module.exports = router;
