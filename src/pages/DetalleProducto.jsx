import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productos } from '../data/mockDatabase';
import { CartContext } from '../context/CartContext';
import './DetalleProducto.css';

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const producto = productos.find(p => p.id === parseInt(id));
  const [mensaje, setMensaje] = useState('');
  const [tamano, setTamano] = useState('Pequeña (10p)');

  if (!producto) return <h2>Producto no encontrado</h2>;

  const handleAgregarAlCarrito = () => {
    const precioBase = producto.precio;
    const descuentoPct = producto.oferta ? 20 : 0;
    const precioFinal = descuentoPct > 0 ? Math.round(precioBase * (1 - descuentoPct / 100)) : precioBase;

    addToCart({
      ...producto,
      tamano,
      mensajeEspecial: mensaje.trim(),
      precioOriginal: precioBase,
      descuentoPct,
      precio: precioFinal,
    });

    setMensaje('');
  };

  return (
    <div className="detalle-producto-container">
      {/* Botón para volver al catálogo */}
      <button className="btn-volver" onClick={() => navigate('/catalogo')}>
        ← Volver al Catálogo
      </button>

      <img src={producto.imagen} alt={producto.nombre} className="img-detalle" />
      
      <div className="detalle-info">
        <h1>{producto.nombre}</h1>
        <p><strong>Categoría:</strong> {producto.categoria}</p>

        <select className="selector-tamano" value={tamano} onChange={(e) => setTamano(e.target.value)}>
          <option>Pequeña (10p)</option>
          <option>Mediana (20p)</option>
          <option>Grande (30p)</option>
        </select>

        <input 
          type="text" 
          placeholder="Mensaje especial..." 
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          className="input-mensaje"
        />

        <h2>${producto.precio.toLocaleString('es-CL')} CLP</h2>

        {/* Iconos de Redes Sociales */}
        <div className="redes-sociales">
          <a href="https://wa.me/" target="_blank" rel="noreferrer">
            <img src="/wp.png" alt="WhatsApp" className="icono-social" />
          </a>
          <a href="https://facebook.com/" target="_blank" rel="noreferrer">
            <img src="/fb.png" alt="Facebook" className="icono-social" />
          </a>
        </div>

        <button className="btn-agregar" onClick={handleAgregarAlCarrito}>
          🛒 Añadir al Carrito
        </button>
      </div>
    </div>
  );
};

export default DetalleProducto;