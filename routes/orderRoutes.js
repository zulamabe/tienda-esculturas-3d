// routes/orderRoutes.js
const express = require('express');
const { getUserOrders, createOrder } = require('../controllers/orderController');
const { verifyUser } = require('../middleware/authMiddleware');

const router = express.Router();

// Ruta protegida para obtener todos los pedidos de un usuario
router.get('/', verifyUser, getUserOrders);

// Ruta protegida para crear un nuevo pedido
router.post('/', verifyUser, createOrder);

module.exports = router;
