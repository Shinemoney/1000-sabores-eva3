import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const estadoLabel = {
  preparacion: 'En preparación',
  despacho: 'En despacho',
  entrega: 'Entregado',
};

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    resumen,
    pedidoActual,
    removeFromCart,
    updateCantidad,
    avanzarEstadoPedido,
    limpiarPedidoActual,
    limpiarCarrito,
  } = useContext(CartContext);

  return (
    <div className="cart-container" style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
      <h1>Tu Carrito</h1>

      {cart.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>Tu carrito está vacío</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="cart-item"
              style={{
                borderBottom: '1px solid #ccc',
                padding: '10px 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <h3>{item.nombre}</h3>
                {item.descuentoPct > 0 ? (
                  <>
                    <p style={{ margin: 0 }}>
                      <span style={{ textDecoration: 'line-through', color: '#777' }}>
                        ${item.precioOriginal.toLocaleString()} CLP
                      </span>{' '}
                      <span style={{ color: '#b12704', fontWeight: 700 }}>-{item.descuentoPct}%</span>
                    </p>
                    <p style={{ margin: '2px 0 0 0', fontWeight: 700 }}>
                      ${item.precio.toLocaleString()} CLP
                    </p>
                  </>
                ) : (
                  <p>${item.precio.toLocaleString()} CLP</p>
                )}
                <small>Subtotal: ${(item.precio * item.cantidad).toLocaleString()} CLP</small>
              </div>
              <div className="cart-controls">
                <button onClick={() => updateCantidad(item.id, -1)}>-</button>
                <span style={{ margin: '0 10px' }}>{item.cantidad}</span>
                <button onClick={() => updateCantidad(item.id, 1)}>+</button>
                <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: '15px', color: 'red' }}>
                  🗑️
                </button>
              </div>
            </div>
          ))}

          <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <p>Productos: {resumen.cantidadTotal}</p>
            <p>Subtotal: ${resumen.subtotal.toLocaleString()} CLP</p>
            <p>Ahorro total: -${resumen.ahorroTotal.toLocaleString()} CLP</p>
            <p>Despacho: ${resumen.despacho.toLocaleString()} CLP</p>
            <h2>Total: ${resumen.total.toLocaleString()} CLP</h2>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={limpiarCarrito}
                style={{
                  backgroundColor: '#f1f1f1',
                  color: '#333',
                  padding: '12px 20px',
                  border: '1px solid #ccc',
                  cursor: 'pointer',
                  fontSize: '1rem',
                }}
              >
                Limpiar carrito
              </button>

              <button
                onClick={() => navigate('/checkout')}
                style={{
                  backgroundColor: '#8b4513',
                  color: 'white',
                  padding: '12px 24px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                }}
              >
                Comprar ahora
              </button>
            </div>
          </div>
        </>
      )}

      {pedidoActual && (
        <div
          style={{
            marginTop: '30px',
            background: '#fff',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
          }}
        >
          <h2>Seguimiento del Pedido</h2>
          <p>
            <strong>ID Pedido:</strong> {pedidoActual.id}
          </p>
          <p>
            <strong>Estado:</strong> {estadoLabel[pedidoActual.estado] || pedidoActual.estado}
          </p>
          <p>
            <strong>Código de seguimiento:</strong> {pedidoActual.tracking.codigo}
          </p>
          <p>
            <strong>Fecha entrega preferida:</strong> {pedidoActual.boleta.fechaEntregaPreferida}
          </p>

          <h3>Boleta</h3>
          <p>
            <strong>Folio:</strong> {pedidoActual.boleta.folio}
          </p>
          <p>
            <strong>Total boleta:</strong> ${pedidoActual.boleta.total.toLocaleString()} CLP
          </p>

          <div style={{ marginTop: '10px' }}>
            <h4>Historial de estados</h4>
            {pedidoActual.tracking.historial.map((h, idx) => (
              <div key={`${h.timestamp}-${idx}`} style={{ marginBottom: '6px' }}>
                <strong>{estadoLabel[h.estado] || h.estado}</strong> - {new Date(h.timestamp).toLocaleString()}
                <div>{h.descripcion}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button onClick={avanzarEstadoPedido}>Actualizar estado</button>
            <button onClick={limpiarPedidoActual}>Limpiar seguimiento</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
