const express = require("express");
const stripe = require("stripe")(
  "sk_test_51OMEiVI1zNR8sZYDhbr9NCc7zuiymsX9kFPFLf73mubeF28mu2nrjFspwD70eBu5hRXDpCUUGhCZgOlGVDUnxjLT00i5i8Davv"
); // replace with your actual Stripe secret key

const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  const { cartItems } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.imageSrc],
        },
        unit_amount: parseInt(item.price * 100), // Stripe requires the amount in cents
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    success_url: "http://localhost:3000/success", // Replace with your success URL
    cancel_url: "http://localhost:3000/cancel", // Replace with your cancel URL
  });

  res.json({ id: session.id });
});

module.exports = router;
