// server.js or api.js (or your server file)
const express = require("express");
const stripe = require("stripe")("your_secret_stripe_key"); // Replace with your actual secret key

const app = express();
const port = 3001;

app.use(express.json());

app.post("/api/create-checkout-session", async (req, res) => {
  // Get your product information from the request body
  const { title, price, quantity, imageSrc } = req.body;

  // Create a checkout session using the Stripe API
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        name: title,
        description: "Custom bouquet",
        images: [imageSrc],
        amount: Math.round(price * 100), // Convert price to cents
        currency: "usd",
        quantity: quantity,
      },
    ],
    success_url: "http://localhost:3000/success", // Replace with your success URL
    cancel_url: "http://localhost:3000/cancel", // Replace with your cancel URL
  });

  res.json({ id: session.id });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
