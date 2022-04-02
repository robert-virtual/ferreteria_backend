const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { adminAuth } = require("../middlewares/auth");
const prisma = new PrismaClient();
router.get("/", adminAuth, async (req, res) => {
  const imgs = await prisma.imagen.findMany();
  res.json(imgs);
});

module.exports = router;
