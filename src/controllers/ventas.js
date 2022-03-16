const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
exports.listarVentas = async (req, res) =>{
    const {inicio,cantidad} = req.query
    
    const ventas = await prisma.venta.findMany({
        skip: inicio,
        take: cantidad
    })
    res.json({ventas})
} 