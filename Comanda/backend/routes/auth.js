const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Definimos las rutas.
// Cuando alguien haga un POST a /api/auth/register, se ejecutará authController.register
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;