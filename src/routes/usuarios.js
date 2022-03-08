const { body } = require("express-validator");

const {
  login,
  registrar,
  logout,
  me,
  refresh,
  recuperar,
  cambiarClave,
  verificarPin,
  update,
} = require("../controllers/usuarios");
const { auth } = require("../middlewares/auth");

const router = require("express").Router();

router.get("/me", auth, me);
router.put("/", auth, update);

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

// recuperar clave
router.post("/recuperar", body("correo").isEmail(), recuperar);
// cambiar clave
router.post(
  "/pin",
  body("correo").isEmail(),
  body("pin").isLength({ min: 4 }),
  verificarPin
);

router.post(
  "/clave",
  body("correo").isEmail(),
  body("pin").isLength({ min: 4 }),
  body("clave").isString().isLength({ min: 3 }),
  cambiarClave
);

//cerrar session
router.delete("/logout", auth, logout);

module.exports = router;
