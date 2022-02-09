const { param } = require("express-validator");
const { listarProds, eliminarProd } = require("../controllers/productos");
const { validate } = require("../middlewares/validate");

const router = require("express").Router();

router.get("/", listarProds);
router.delete(
  "/:id",
  param().isInt().withMessage("Debe proporcionar un id de producto"),
  validate,
  eliminarProd
);

module.exports = router;
