const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
exports.listarVentas = async (req, res) => {
    const { inicio, cantidad } = req.query

    const ventas = await prisma.venta.findMany({
        skip: inicio,
        take: cantidad
    })
    res.json({ ventas })
}
exports.listarVentasUsuario = async (req, res) => {
    const { id } = req.user;

    const ventas = await prisma.venta.findMany({
        where: {
            clienteFk: id,
        }
    })
    res.json({ ventas })
}

exports.crearVenta = async (req, res) => {
    const { id } = req.user;
    const { productos } = req.body;

    const ventas = await prisma.venta.create({
        data: {
            clienteFk: id,
            detalles: {
            create: productos
            }

        }
    })
    res.json({ ventas })
} 