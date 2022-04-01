const { param, body, query } = require("express-validator");
const { upload } = require("../config/s3Upload");
const {
  listarProds,
  eliminarProd,
  crear,
  updateProd,
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

// crear
router.post(
  "/",
  (req, res, next) => {
    console.log(req.body);
    console.log(req.headers);

    next();
  },
  body("nombre")
    .isLength({ min: 3 })
    .withMessage("El nombre de tener minimo 3 caracteres "),
  body("precio").toFloat().isNumeric(),
  body("stock").toInt().isInt({ min: 1 }),
  validate,
  upload.array("imagenes"),
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
