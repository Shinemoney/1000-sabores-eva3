import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productos } from '../data/mockDatabase';
import './DetalleProducto.css';

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const producto = productos.find(p => p.id === parseInt(id));
  const [mensaje, setMensaje] = useState("");

  if (!producto) return <h2>Producto no encontrado</h2>;

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

        <select className="selector-tamano">
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

        <button className="btn-agregar">🛒 Añadir al Carrito</button>
      </div>
    </div>
  );
};

export default DetalleProducto;