import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const estadoLabel = {
  preparacion: 'En preparación',
  despacho: 'En despacho',
  entrega: 'Entregado',
};

const Cart = () => {
  const {
    cart,
    resumen,
    pedidoActual,
    removeFromCart,
    updateCantidad,
    confirmarPedido,
    avanzarEstadoPedido,
    limpiarPedidoActual,
  } = useContext(CartContext);

  const finalizarDirecto = () => {
    const fechaDefault = new Date();
    fechaDefault.setDate(fechaDefault.getDate() + 1);

    confirmarPedido({
      fechaEntrega: fechaDefault.toISOString().split('T')[0],
      direccionEntrega: 'Dirección no especificada',
    });
  };

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
                <p>${item.precio.toLocaleString()} CLP</p>
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
            <p>Despacho: ${resumen.despacho.toLocaleString()} CLP</p>
            <h2>Total: ${resumen.total.toLocaleString()} CLP</h2>
            <button
              onClick={finalizarDirecto}
              style={{
                backgroundColor: '#8b4513',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              Confirmar Pedido
            </button>
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
