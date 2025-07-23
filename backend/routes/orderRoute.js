const express = require("express");
const {
  placeOrderCOD,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyRazorpay
} = require('../controllers/orderController');

const adminAuth = require('../middleware/adminAuth');
const authUser = require('../middleware/auth');

const orderRouter = express.Router();

// Admin Features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// Payment Features
orderRouter.post('/place', authUser, placeOrderCOD);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);
// User Feature
orderRouter.post('/userorders', authUser, userOrders);


orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay);

module.exports = orderRouter;
