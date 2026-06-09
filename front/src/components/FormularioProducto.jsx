import { useState, useEffect } from 'react'

// Valores iniciales vacios del formulario
const FORMULARIO_VACIO = {
    nombre: "",
    precio: "",
    descripcion: "",
    stock: "",
}

export default function FormularioProducto({productoEditar, onGuardar, onCancelar}) {
    // Estado del formulario
    const [formulario, setFormulario] = useState(FORMULARIO_VACIO);

    // Si recibimos un producto para editar, llenamos el formulario con sus datos
    // Si no, restablecemos los campos al estado inicial vacio
    useEffect(() => {
        if(productoEditar){
            setFormulario({
                nombre: productoEditar.nombre,
                precio: productoEditar.precio,
                descripcion: productoEditar.descripcion || "",
                stock: productoEditar.stock,
            });
        }else{
            setFormulario(FORMULARIO_VACIO);
        }
    }, [productoEditar]);

    // Actualiza el campo que cambio sin perder el resto del formulario
    function handleChange(evento){
        const {name, value} = evento.target;
        setFormulario({...formulario, [name]: value});
    }

    // Envia los datos del formulario al componente padre,
    // convirtiendo precio y stock a valores numéricos
    function handleSubmit(evento){
        evento.preventDefault();

        onGuardar({
            ...formulario,
            precio: Number(formulario.precio),
            stock: Number(formulario.stock),
        })
    }

    const esEdicion = Boolean(productoEditar);

    return (
        <div className="modal-fondo">
            <div className="modal">

                <div className="modal__cabecera">
                    <h2>{esEdicion ? 'Editar producto' : 'Nuevo producto'}</h2>
                    <button className="modal__cerrar" onClick={onCancelar}>✕</button>
                </div>

                <form onSubmit={handleSubmit} className="formulario">

                    <div className="campo">
                        <label htmlFor="nombre">Nombre *</label>
                        <input
                            id="nombre"
                            name="nombre"
                            type="text"
                            value={formulario.nombre}
                            onChange={handleChange}
                            required
                            placeholder="Ej: Coca Cola 1.5L"
                        />
                    </div>

          <div className="fila-dos-columnas">
            <div className="campo">
              <label htmlFor="precio">Precio *</label>
              <input
                id="precio"
                name="precio"
                type="number"
                value={formulario.precio}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>

            <div className="campo">
              <label htmlFor="stock">Stock *</label>
              <input
                id="stock"
                name="stock"
                type="number"
                value={formulario.stock}
                onChange={handleChange}
                required
                min="0"
                placeholder="0"
              />
            </div>
          </div>

          <div className="campo">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formulario.descripcion}
              onChange={handleChange}
              rows={3}
              placeholder="Descripción opcional..."
            />
          </div>

                    <div className="formulario__botones">
                        <button type="button" className="btn btn--secundario" onClick={onCancelar}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn--primario">
                            {esEdicion ? 'Guardar cambios' : 'Crear producto'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}