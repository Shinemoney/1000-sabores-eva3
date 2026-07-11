// src/components/CardProducto.jsx
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CardProducto = ({ producto }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="card h-100 shadow-sm" style={{ width: '100%' }}>
      <div className="card-body">
        <h5 className="card-title" style={{ color: '#5D4037', fontFamily: 'Pacifico, cursive' }}>
          {producto.nombre}
        </h5>
        <h6 className="card-subtitle mb-2 text-muted">{producto.categoria}</h6>
        <p className="card-text" style={{ fontSize: '0.9rem' }}>{producto.descripcion}</p>
        <p className="fw-bold fs-5">${producto.precio.toLocaleString('es-CL')}</p>
        <button
          className="btn btn-outline-primary"
          style={{ backgroundColor: '#FFC0CB', borderColor: '#FFC0CB', color: '#5D4037' }}
          onClick={() =>
            addToCart({
              ...producto,
              precioOriginal: producto.precio,
              descuentoPct: 0,
              precio: producto.precio,
            })
          }
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export default CardProducto;