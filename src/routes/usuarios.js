const { me, update } = require("../controllers/usuarios");
const { auth } = require("../middlewares/auth");

const router = require("express").Router();

router.get("/me", auth, me);
router.put("/", auth, update);

module.exports = router;
