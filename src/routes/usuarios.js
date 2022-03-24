const { body } = require("express-validator");
const { upload } = require("../config/multer");
const { me, update, obtenerCliente } = require("../controllers/usuarios");
const { auth } = require("../middlewares/auth");

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
router.get("/", auth, obtenerCliente);

module.exports = router;
