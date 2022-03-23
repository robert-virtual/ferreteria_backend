const { me, update, obtenerCliente } = require("../controllers/usuarios");
const { auth } = require("../middlewares/auth");

const router = require("express").Router();

router.get("/me", auth, me);
router.put("/", auth, update);
router.get("/", auth, obtenerCliente);

module.exports = router;
