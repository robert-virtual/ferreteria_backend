const { param, body } = require("express-validator");
const {
  listarProds,
  eliminarProd,
  crear,
  updateProd,
} = require("../controllers/productos");
const { validate } = require("../middlewares/validate");

const router = require("express").Router();

// listar
router.get("/", listarProds);

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
