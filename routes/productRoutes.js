// routes/productRoutes.js
const express = require('express');
const { getAllProducts, createProduct, deleteProduct } = require('../controllers/productController');
const { verifyAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Ruta para obtener todos los productos
router.get('/', getAllProducts);

// Ruta protegida para crear un nuevo producto (solo admin)
router.post('/', verifyAdmin, createProduct);

// Ruta protegida para eliminar un producto por ID (solo admin)
router.delete('/:id', verifyAdmin, deleteProduct);

module.exports = router;
