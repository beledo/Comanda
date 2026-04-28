const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Función para REGISTRAR nuevos usuarios
exports.register = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;

        // 1. Verificar si el usuario ya existe
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'El usuario ya existe' });

        // 2. Encriptar la contraseña (¡Seguridad ante todo!)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Crear y guardar el usuario
        user = new User({ nombre, email, password: hashedPassword, rol });
        await user.save();

        res.status(201).json({ msg: 'Usuario creado con éxito' });
    } catch (err) {
        res.status(500).send('Error en el servidor');
    }
};

// Función para LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Ver si el email existe
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Credenciales inválidas' });

        // 2. Comparar la contraseña escrita con la de la base de datos
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Credenciales inválidas' });

        // 3. Crear el Token (JWT) para que la App Android sepa quién es el usuario
        const payload = { user: { id: user.id, rol: user.rol } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

        res.json({ token, rol: user.rol, nombre: user.nombre });
    } catch (err) {
        res.status(500).send('Error en el servidor');
    }
};