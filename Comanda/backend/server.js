const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// --- NUEVO ---
// Importamos las rutas de autenticación
const authRoutes = require('./routes/auth');

const app = express();

// Middleware para que el servidor entienda JSON
app.use(express.json());

// --- NUEVO ---
// Usamos las rutas. Esto significa que cualquier URL que empiece
// por /api/auth será gestionada por el archivo routes/auth.js
app.use('/api/auth', authRoutes);

// Ruta de prueba para saber que funciona
app.get('/', (req, res) => {
    res.send('✅ El servidor de comandas está funcionando');
});

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('🍃 Conectado a la base de datos MongoDB'))
    .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});