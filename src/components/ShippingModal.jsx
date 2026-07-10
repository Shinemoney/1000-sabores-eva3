import React, { useState } from 'react';
import './CartModal.css';

const ShippingModal = ({ isOpen, onClose, cart, resumen, onConfirm }) => {
  const [fecha, setFecha] = useState('');
  const [direccion, setDireccion] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const hoy = new Date().toISOString().split('T')[0];

  const confirmar = () => {
    if (!fecha) {
      setError('Selecciona una fecha de entrega');
      return;
    }

    if (fecha < hoy) {
      setError('La fecha de entrega no puede ser anterior a hoy');
      return;
    }

    setError('');
    onConfirm({ fechaEntrega: fecha, direccionEntrega: direccion });
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 99999 }}>
      <div className="modal-content shipping-modal" style={{ zIndex: 99999 }}>
        <button onClick={onClose} style={{ float: 'right' }}>
          X
        </button>
        <h2>Datos de Envío</h2>

        <div className="order-summary" style={{ background: '#fff5e1', padding: '10px', borderRadius: '5px' }}>
          <h3>Detalle de productos</h3>
          {cart.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>
                {item.nombre} (x{item.cantidad})
              </span>
              <span>${(item.precio * item.cantidad).toLocaleString()}</span>
            </div>
          ))}
        </div>

        <div className="shipping-totals">
          <p>
            Subtotal: <strong>${resumen.subtotal.toLocaleString()} CLP</strong>
          </p>
          <p>
            Despacho: <strong>${resumen.despacho.toLocaleString()} CLP</strong>
          </p>
          <h3 style={{ marginTop: '8px' }}>
            Total a pagar: ${resumen.total.toLocaleString()} CLP
          </h3>
        </div>

        <label>Fecha de entrega preferida:</label>
        <input
          type="date"
          value={fecha}
          min={hoy}
          onChange={(e) => setFecha(e.target.value)}
          style={{ width: '100%', padding: '10px', marginTop: '10px' }}
        />

        <label style={{ marginTop: '10px', display: 'block' }}>Dirección de entrega:</label>
        <input
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          placeholder="Ej: Violeta Parra 123, La Pintana"
          style={{ width: '100%', padding: '10px', marginTop: '10px' }}
        />

        {error && <p className="cart-error">{error}</p>}

        <button onClick={confirmar} className="btn-finalizar" style={{ marginTop: '20px', width: '100%' }}>
          Confirmar Pedido
        </button>
      </div>
    </div>
  );
};

export default ShippingModal;
