// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verificar usuario autenticado
const verifyUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });
        req.user = await User.findById(decoded.userId);
        next();
    });
};

// Verificar que el usuario sea administrador
const verifyAdmin = (req, res, next) => {
    verifyUser(req, res, () => {
        if (req.user?.isAdmin) {
            next();
        } else {
            res.status(403).json({ message: 'Acceso denegado: solo administradores' });
        }
    });
};

module.exports = { verifyUser, verifyAdmin };
