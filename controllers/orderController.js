// controllers/orderController.js
const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    try {
        const order = new Order({ user: req.user.id, ...req.body });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('products.product');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
