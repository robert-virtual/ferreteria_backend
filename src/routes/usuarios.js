const { body } = require("express-validator");

const {
  login,
  registrar,
  logout,
  me,
  refresh,
} = require("../controllers/usuarios");
const { auth } = require("../middlewares/auth");

const router = require("express").Router();

router.get("/me", auth, me);

router.post("/refresh", refresh);
//login
router.post(
  "/login",
  body("correo").isEmail(),
  body("clave").notEmpty(),
  login
);

//registro
router.post(
  "/registro",
  body("nombre").isLength({ min: 3 }),
  body("correo").isEmail(),
  body("clave").isLength({ min: 3 }),
  registrar
);

//cerrar session
router.delete("/logout", auth, logout);

module.exports = router;
