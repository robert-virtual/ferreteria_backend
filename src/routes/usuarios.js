const { body, query } = require("express-validator");
const { upload } = require("../config/s3Upload");
const { me, update, obtenerClientes } = require("../controllers/usuarios");
const { auth, adminAuth } = require("../middlewares/auth");
const { validate } = require("../middlewares/validate");

const router = require("express").Router();

router.get("/me", auth, me);
router.put(
  "/",
  auth,
  upload.array("perfil"),
  body("latitude").toFloat(),
  body("longitude").toFloat(),
  update
);
router.get(
  "/",
  query("inicio").toInt().default(0),
  query("cantidad").toInt().default(5),
  validate,
  adminAuth,
  obtenerClientes
);

module.exports = router;
