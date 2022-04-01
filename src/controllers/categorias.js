const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getCategorias = async (req, res) => {
  const { nombre } = req.query;
  const categorias = await prisma.categoria.findMany({
    take: 10,
    where: {
      nombre: {
        startsWith: nombre,
      },
    },
  });
  res.json(categorias);
};

exports.postCategoria = async (req, res) => {
  const categoria = await prisma.categoria.create({
    data: req.body,
  });
  res.json(categoria.id);
};
