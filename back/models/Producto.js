const mongoose = require('mongoose');

// Definimos los campos que tendra cada producto en la base de datos
const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo']
    },
    stock: {
        type: Number,
        required: [true, 'El stock es obligatorio'],
        min: [0, 'El stock no puede ser negativo'],
        default: 0
    },
    descripcion: {
        type: String,
        default: ''
    }
},
{timestamps: true} // Agrega automaticamente createdAt o updatedAt
)

module.exports = mongoose.model('Producto', productoSchema);