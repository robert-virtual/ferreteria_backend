const { getCategorias, postCategoria } = require("../controllers/categorias");

const router = require("express").Router();

router.get("/", getCategorias);
router.post("/", postCategoria);

module.exports = router;
