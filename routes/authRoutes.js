// routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// Ruta para registro de usuario
router.post('/register', register);

// Ruta para inicio de sesión de usuario
router.post('/login', login);

module.exports = router;
