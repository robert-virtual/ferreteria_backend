const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { transporter } = require("../config/mailer");
const prisma = new PrismaClient();
const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// imporante el orden
// la ruta webhook debe ser la primera siempre

router.post(
  "/webhook",
  (req, res, next) => {
    console.log("webhook");
    next();
  },
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      // On error, log and return the error message
      console.log(`❌ Error message: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    try {
      var {
        billing_details: { email },
      } = event.charges.data[0];
    } catch (error) {
      return res.json({ error: error.message });
    }

    if (event.type === "payment_intent.payment_failed") {
      await transporter.sendMail({
        from: `"Pago fallido Ferreteria Movil <${process.env.MAIL}>"`,
        to: email,
        text: "El pago de tu compra fallo no se realizo ningun cargo en tu targeta",
      });
    }
    if (event.type === "payment_intent.canceled") {
      await transporter.sendMail({
        from: `"Pago cancelado Ferreteria Movil <${process.env.MAIL}>"`,
        to: email,
        text: "El pago de tu compra fue cacelado no se realizo ningun cargo en tu targeta",
      });
    }
    if (event.type === "payment_intent.succeeded") {
      try {
        var { receipt_url } = event.charges.data[0];
      } catch (error) {
        return res.json({ error: error.message });
      }
      await transporter.sendMail({
        from: `"Factura Ferreteria Movil <${process.env.MAIL}>"`,
        to: email,
        html: {
          path: receipt_url,
        },
      });
    }
    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  }
);

router.use(express.json());

router.post("/create-payment-intent", async (req, res) => {
  let productos = [{ id: 0, cantidad: 0 }]; // structura que se espera revicir en el req body
  const { email } = req.body;
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
      receipt_email: email,
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
