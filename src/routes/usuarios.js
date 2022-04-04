const { body } = require("express-validator");
const { upload } = require("../config/s3Upload");
const { me, update, obtenerClientes } = require("../controllers/usuarios");
const { auth, adminAuth } = require("../middlewares/auth");

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
router.get("/", adminAuth, obtenerClientes);

module.exports = router;
