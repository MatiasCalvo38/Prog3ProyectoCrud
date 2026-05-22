const express = require('express');
const router = express.Router();
const controller = require('../controllers/productosController');

// Cada ruta HTTP llama a su funcion del controlador correspondiente
// Estas rutas implementan las operaciones CRUD para los productos
router.get('/', controller.obtenerProductos); // Listar los productos
router.get('/:id', controller.obtenerProducto) //Obtener un producto por su ID
router.post('/', controller.crearProducto); // Crear un nuevo producto
router.put('/:id', controller.actualizarProducto); // Actualizar un producto por su ID
router.delete('/:id', controller.eliminarProducto); // Eliminar un producto por su ID

module.exports = router;
