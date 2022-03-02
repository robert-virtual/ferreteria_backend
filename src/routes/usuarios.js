const { body, param } = require("express-validator");
const { login, registrar, logout, me } = require("../controllers/usuarios");

const router = require("express").Router();

router.get(
  "/me",
  (req, res, next) => {
    // verificar token
    const token = req.header("Authentication");
    if (!token) {
      return res.json({ error: "NO envio token" });
    }
    req.user = {};
    next();
  },
  me
);

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
router.delete("/logout/:id", logout);

module.exports = router;
