import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";


dotenv.config();

// global variable
const currency = 'usd'
const deliveryCharge = 50;

/// getway initialization
const stripe = new Stripe(process.env.STRIPEE_SECRET_KEY)



// placing cod 
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    if (!userId || !items || !amount || !address) {
      return res.json({ success: false, message: "Missing fields" });
    }

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: 'COD',
      payment: false,
      status:"Order Placed",
      date: Date.now()
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // ✅ yahan order ka data bhi bhej rahe hain
    res.json({ success: true, message: "OrderPlaced", order: newOrder });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// placing stripe
const placeOrderStripe = async (req, res) => {
  try {
      const { userId, items, amount, address } = req.body
      const { origin } = req.headers;

     const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: 'Stripe',
      payment: false,
      status:"Order Placed",
      date: Date.now()
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item)=>({
      price_data:{
        currency:currency,
        product_data:{
          name:item.name
        },
        unit_amount:item.price * 100,
      },
      quantity:item.quantity
    }))

    line_items.push({
      price_data:{
        currency:currency,
        product_data:{
          name: 'Delivery Charges'
        },
        unit_amount:deliveryCharge * 100,
      },
      quantity:1
    })

    const session = await stripe.checkout.sessions.create({ 
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: 'payment',
    })

    res.json({success:true,session_url:session.url})

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};  


/// verify stripe


const verifyStripe = async (req,res) =>{
  const{orderId,success, userId} = req.body
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true, message: "Payment Successful and Order Placed" });
    } else{
      await orderModel.findByIdAndDelete(orderId)
      res.json({ success: false, message: "Payment Failed, Order Cancelled" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}
// placing razorpay



// all order data for admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({})
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// user data
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId })
    res.json({ success: true, orders })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// updating status
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  verifyStripe,
  placeOrder,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus
};
