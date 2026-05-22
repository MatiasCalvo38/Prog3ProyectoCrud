const Producto = require('../models/Producto');

// GET/api/productos
// Busca todos los productos en la base de dats y retorna una lista como un JSON

async function obtenerProductos(req, res){
    try{
        const productos = await Producto.find().sort({createdAt: -1});

        res.json(productos);
    }catch(error){
        res.status(500).json({message: 'Error al obtener los productos'})
    }
}

// GET/api/productos/:id
// Busca un producto por su ID y devuelve sus datos si lo encuentra

async function obtenerProducto(req, res){
    try{
        const producto = await Producto.findById(req.params.id);

        if(!producto){
            return res.status(404).json({message: 'Producto no encontrado'});
        }

        res.json(producto);
    }catch(error){
        res.status(500).json({message: 'Error al obtener el producto'})
    }
}

// POST/api/productos
// Crea un nuevo producto con los datos enviados en el cuerpo de la peticion

async function crearProducto(req, res){
    try{
        const nuevoProducto = new Producto(req.body)

        const productoGuardado = await nuevoProducto.save();

        res.status(201).json(productoGuardado);
    }catch(error){
        res.status(400).json({message: error.message})
    }
}

// PUT/api/productos/:id
// Actualiza un producto existente por su ID con los datos enviados y devuelve el producto actualizado

async function actualizarProducto(req, res){
    try{
        const productoActualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if(!productoActualizado){
            return res.status(404).json({message: 'Producto no encontrado'});
        }

        res.json(productoActualizado);
    }catch(error){
        res.status(400).json({message: error.message})
    }
}

// DELETE/api/productos/:id
// Elimina un producto por su ID y devuelve un mensaje de confirmacion

async function eliminarProducto(req, res){
    try{
        const productoEliminado = await Producto.findByIdAndDelete(req.params.id);

        if(!productoEliminado){
            return res.status(404).json({message: 'Producto no encontrado'});
        }

        res.json({message: 'Producto eliminado correctamente'});
    }catch(error){
        res.status(500).json({message: 'Error al eliminar el producto'})
    }
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}