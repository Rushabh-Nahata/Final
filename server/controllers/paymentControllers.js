

import Razorpay from "razorpay";

// Initialize Razorpay
const instance = new Razorpay({
  key_id: "rzp_live_jCWpsTxWR135dj", // Replace with your Razorpay Key ID
  key_secret: "ZrZhtEwOao0tt8Bs3yJtKgjq", // Replace with your Razorpay Key Secret
});

const createOrder = async (amount) => {
  try {
    const options = {
      amount: amount * 100, // Amount is in paise
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    const order = await instance.orders.create(options);
    return order;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const processPayment = async (req, res) => {
  const { totalPrice } = req.body; // Assuming amount is sent in request body
  // console.log("This is totalPrice", totalPrice)
  // console.log("This is order",req.body)
  try {
    const order = await createOrder(totalPrice);
    console.log("This is order", order);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};