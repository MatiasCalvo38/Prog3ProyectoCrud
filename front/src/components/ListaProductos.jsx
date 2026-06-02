import TarjetaProducto from "./TarjetaProducto"


export default function ListaProductos({productos, onEditar, onEliminar}){
    // Muestra un mensaje si no hay productos o renderiza una tarjeta
    // para cada producto disponible
    if(productos.length === 0){
        return(
            <div className="lista-vacia">
                <span className="lista-vacia_icono">📦</span>
                <p>No hay productos disponibles</p>
                <p>Crea uno</p>
            </div>
        )
    }

  return (
    <div>
      <p className="contador">{productos.length} producto{productos.length !== 1 ? 's' : ''}</p>
      <div className="grilla">
        {productos.map(producto => (
          <TarjetaProducto
            key={producto._id}
            producto={producto}
            onEditar={onEditar}
            onEliminar={onEliminar}
          />
        ))}
      </div>
    </div>
  )
}