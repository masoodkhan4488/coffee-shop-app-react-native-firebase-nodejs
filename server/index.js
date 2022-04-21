require("dotenv").config();
const express = require("express");
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51KqJ4DAAUyqQ9D2QYq0XQgT5fpbO2LfNOUbdF8sCPhfMnC1WmFkr2LEbn6aOibauP8EHT7R53cPIX3bT39EI8mCk00IQcYDpqP",
  { apiVersion: "2020-08-27" }
);

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post("/payment", async (req, res) => {
  const { totalAmount, totalItemsPurchased } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100,
      currency: "usd",
      description: `The total coffees purchased are ${totalItemsPurchased}`,
      payment_method_types: ["card"],
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});

app.listen(PORT, (req, res) => {
  console.log(`server running on port ${PORT}`);
});
