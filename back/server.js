const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const productosRouter = require('./routes/productos');

const app = express();

// Middlewares
app.use(express.json()); // Permite recibir JSON en el body
app.use(cors()); // Permite peticiones desde el frontend

// Rutas
app.use('/api/productos', productosRouter);

// Arranque del servidor
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/productos_db';

// Conexion al servidor y a MongoDB
mongoose
.connect(MONGO_URI)
.then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en puerto ${PORT}`);
    })
}).catch((error) => {
    console.error('Error al conectar a MongoDB:', error.message);
})