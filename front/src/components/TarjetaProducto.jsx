export default function TarjetaProducto({producto, onEditar, onEliminar}){
    // Calcula el color del stock segun la cantidad disponible
    let colorStock = "#383838"; // Cuando hay stock suficiente

    if(producto.stock === 0){
        colorStock = "#ef4444"; // Sin stock
    }else if(producto.stock < 6){
        colorStock = "#f59e0b"; // Stock bajo
    }else{
        colorStock = "#22c55e"; // Stock suficiente
    }

  return (
    <article className="tarjeta">

      {/* Inicial del producto como avatar */}
      <div className="tarjeta__avatar">
        {producto.nombre.charAt(0).toUpperCase()}
      </div>

      <div className="tarjeta__cuerpo">
        <h3 className="tarjeta__nombre">{producto.nombre}</h3>

        {producto.descripcion && (
          <p className="tarjeta__descripcion">{producto.descripcion}</p>
        )}

        <div className="tarjeta__datos">
          <span className="tarjeta__precio">
            ${Number(producto.precio).toFixed(2)}
          </span>
          <span className="tarjeta__stock" style={{ color: colorStock }}>
            Stock: {producto.stock}
          </span>
        </div>
      </div>

      <div className="tarjeta__acciones">
        <button
          className="btn btn--pequeño btn--secundario"
          onClick={() => onEditar(producto)}
        >
          Editar
        </button>
        <button
          className="btn btn--pequeño btn--peligro"
          onClick={() => onEliminar(producto._id)}
        >
          Eliminar
        </button>
      </div>

    </article>
  )
}