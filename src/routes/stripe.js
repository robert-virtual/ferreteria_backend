const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// imporante el orden
// la ruta webhook debe ser la primera siempre

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      // On error, log and return the error message
      console.log(`❌ Error message: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "payment_intent.canceled") {
      // enviar correo al cliente de pago cancelado
    }
    if (event.type === "payment_intent.succeeded") {
      // enviar correo al cliente de pago confirmado
      console.log("pago exitoso");
      console.log(event);
    }
    // Successfully constructed event
    console.log("✅ Success:", event.id);

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  }
);

router.use(express.json());

router.post("/create-payment-intent", async (req, res) => {
  let productos = [{ id: 0, cantidad: 0 }]; // structura que se espera revicir en el req body
  productos = req.body.productos;
  const prods = await prisma.producto.findMany({
    where: {
      id: {
        in: productos.map((p) => p.id),
      },
    },
    select: {
      id: true,
      precio: true,
    },
  });
  productos = productos.map((p) => ({
    ...p,
    precio: prods.find((pd) => pd.id == p.id).precio,
  }));
  let lpsValorInicial = 0;
  let lps = productos.reduce(
    (prev, c) => c.precio * c.cantidad + prev,
    lpsValorInicial
  );

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: lps * 100, // convertir la cantidad en centavos
      currency: "HNl",
      payment_method_types: ["card"],
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/config", (req, res) => {
  res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

module.exports = router;
