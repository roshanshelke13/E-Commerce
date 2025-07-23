const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const Razorpay = require("razorpay");

// global variables
const currency = 'inr';
const deliveryCharge = 10; // delivery charge

// Razorpay instance
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Placing orders using COD Method
const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const totalAmount = amount + deliveryCharge;

        const orderData = {
            userId,
            items,
            address,
            amount: totalAmount,
            deliveryCharge,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed (COD)" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Placing orders using Razorpay
const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const totalAmount = amount + deliveryCharge;

        const orderData = {
            userId,
            items,
            address,
            amount: totalAmount,
            deliveryCharge,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const options = {
            amount: totalAmount * 100, // amount in paisa
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        };

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.json({ success: false, message: error });
            }
            res.json({ success: true, order });
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Verify Razorpay Payment
const verifyRazorpay = async (req, res) => {
    try {
        const { userId, razorpay_order_id } = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            res.json({ success: true, message: "Payment Successful" });
        } else {
            res.json({ success: false, message: 'Payment Failed' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// All Orders for Admin Panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// User Orders
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;

        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Update Order Status
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: 'Status Updated' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

module.exports = {
    placeOrderCOD,
    placeOrderRazorpay,
    verifyRazorpay,
    allOrders,
    userOrders,
    updateStatus
};
