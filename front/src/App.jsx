import { useState,useEffect } from 'react'
import FormularioProducto from './components/FormularioProducto'
import ListaProductos from './components/ListaProductos'

// URL de la base de datos
const API_URL = '/api/productos'

export default function App(){

// Estados
const [productos,setProductos]=useState([]) // Lista de productos
const [cargando,setCargando]=useState(true) // Indicador de carga
const [error,setError]=useState(null) // Mensaje de error
const [productoEditar,setProductoEditar]=useState(null) // Producto a editar
const [mostrarFormulario,setMostrarFormulario]=useState(false) // Mostrar formulario

// Efectos
// Cargar productos al montar el componente
// Hace la solicitud inicial a la API para obtener la lista de productos

useEffect(()=>{
  obtenerProductos()
},[])

// Leer: obtener todos los productos
// Solicita todos los productos al backend,actualiza el estado de carga,
// guarda los datos en el estado local y maneja errores de conexion
async function obtenerProductos(){
  setCargando(true)
  setError(null)

  try{
    const respuesta=await fetch(API_URL)
    const datos=await respuesta.json()

    setProductos(datos)
  }catch(err){
    setError('No se pudo conectar con el servidor')
  }finally{
    setCargando(false)
  }
}

// Crear: enviar nuevo producto
// Envia un POST al backend para crear el producto y, si tiene exito,
// añade el resultado al estado local para mostrarlo inmediatamente
async function crearProducto(producto){
  try{
    const respuesta = await fetch(API_URL,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(producto),
    })

    const productoNuevo = await respuesta.json()

    if(!respuesta.ok){
      alert('Error: ' + productoNuevo.mensaje)
      return
    }

    // Agrego el nuevo producto al inicio de la lista
    setProductos([productoNuevo,...productos])
    setMostrarFormulario(false)
  }catch(err){
    alert('Error al crear el producto')
  }
}

// Actualizar: modificar el producto existente
// Enviua un PUT añ backend con el ID y los nuevos datos,luego reemplaza
// el producto actualizado en el estdo local para mantener la UI sincronizada
async function actualizarProducto(id,datosFormulario){
  try{
    const respuesta=await fetch(`${API_URL}/${id}`,{
      method:'PUT',
      headers:{'content-Type':'application/json'},
      body:JSON.stringify(datosFormulario),
    })

    const productoActualizado = await respuesta.json()
    if(!respuesta.ok){
      alert('Error: ' + productoActualizado.mensaje)
      return
    }

    // Reemplazo el producto antiguo por el actualizado en la lista
    setProductos(productos.map(p => p._id === id ? productoActualizado : p))
    setProductoEditar(null)
    setMostrarFormulario(false)
  }catch(err){
    alert('Error al actualizar el producto')
  }
}

// Eliminar: eliminar un producto
// Pregunta al usuario antes de eliminar y envia un DELETE al backend
// si la operacion es exitos, actualiza el estado local filtrando el producto
async function eliminarProducto(id){
  const confirmar = window.confirm('¿Estas seguro de eliminar el producto?')

  if(!confirmar){
     return
  }

  try{
    const respuesta = await fetch(`${API_URL}/${id}`,{
      method: 'DELETE',
    })

    if(!respuesta.ok){
      alert('Error al eliminar el producto')
      return
    }

    // Filtro la lista para quitar el producto eliminado
    setProductos(productos.filter(p=>p._id !== id))
  }catch(err){
    alert('Error al eliminar el producto')
  }
}

// Elige si se guarda un nuevo producto o se actualiza uno existente
function handleGuardar(datosFormulario){
  if(productoEditar){
    actualizarProducto(productoEditar._id,datosFormulario)
  }else{
    crearProducto(datosFormulario)
  }
}

// Selecciona un producto para editar y muestra el formulario con sus datos
function handleEditar(producto){
  setProductoEditar(producto)
  setMostrarFormulario(true)
}

// Prepara el formulario para crear un nuevo producto desde cero
function handleNuevo(){
  setProductoEditar(null)
  setMostrarFormulario(true)
}

// Cierra el formulario y elimina la seleccion de edicion si existia
function handleCancelar(){
  setProductoEditar(null)
  setMostrarFormulario(false)
}

  return (
    <div className="app">

      <header className="header">
        <div className="header__texto">
          <h1 className="header__titulo">CRUD <span>Productos</span></h1>
          <p className="header__subtitulo">Stack MERN · MongoDB · Express · React · Node.js</p>
        </div>
        <button className="btn btn--primario" onClick={handleNuevo}>
          + Nuevo producto
        </button>
      </header>

      <main className="contenido">

        {/* Formulario — se muestra solo cuando corresponde */}
        {mostrarFormulario && (
          <FormularioProducto
            productoEditar = {productoEditar}
            onGuardar = {handleGuardar}
            onCancelar = {handleCancelar}
          />
        )}

        {/* Estados de carga y error */}
        {cargando && <p className="estado">Cargando productos...</p>}
        {error    && <p className="estado estado--error">{error}</p>}

        {/* Lista de productos */}
        {!cargando && !error && (
          <ListaProductos
            productos={productos}
            onEditar={handleEditar}
            onEliminar={eliminarProducto}
          />
        )}

      </main>
    </div>
  )
}