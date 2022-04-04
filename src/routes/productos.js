const { param, query } = require("express-validator");
const { upload } = require("../config/s3Upload");
const {
  listarProds,
  eliminarProd,
  crear,
  updateProd,
} = require("../controllers/productos");
const { adminAuth } = require("../middlewares/auth");
const { validate } = require("../middlewares/validate");

const router = require("express").Router();

// listar
router.get(
  "/",
  query("inicio").isInt({ min: 0 }).toInt().default(0),
  query("cantidad").isInt({ min: 1 }).toInt().default(10),
  listarProds
);

// crear
router.post("/", adminAuth, upload.array("imagenes"), crear);

// eliminar
router.delete(
  "/:id",
  adminAuth,
  param("id").isInt().withMessage("Debe proporcionar un id de producto"),
  validate,
  eliminarProd
);

//actualizar
router.put("/", adminAuth, upload.array("imagenes"), updateProd);
module.exports = router;
