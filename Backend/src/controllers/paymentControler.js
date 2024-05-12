const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//Create a new checkout session
const createCheckoutSession = async (req, res) => {
  const { items } = req.body;

  const lineItems = items.map((item) => ({
    price_data: {
      currency: "USD",
      product_data: {
        name: item.itemName,
        images: [item.imgdata],
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:5173/PaymentSuccess",  // The port can be changed to the port of the frontend
    cancel_url: "http://localhost:5173/PaymentCancelled", // The port can be changed to the port of the frontend
  });

  res.json({ id: session.id });
};

module.exports = { createCheckoutSession };
