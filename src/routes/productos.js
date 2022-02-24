const { param, body } = require("express-validator");
const {
  listarProds,
  eliminarProd,
  crear,
} = require("../controllers/productos");
const { validate } = require("../middlewares/validate");

const router = require("express").Router();

router.get("/", listarProds);
router.post(
  "/",
  body("nombre")
    .isLength({ min: 3 })
    .withMessage("El nombre de tener minimo 3 caracteres "),
  validate,
  crear
);

router.delete(
  "/:id",
  param("id").isInt().withMessage("Debe proporcionar un id de producto"),
  validate,
  eliminarProd
);

module.exports = router;
