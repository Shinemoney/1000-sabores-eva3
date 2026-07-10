import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import ShippingModal from './ShippingModal';
import './CartModal.css';

const CartModal = ({ isOpen, onClose }) => {
  const { cart, resumen, removeFromCart, updateCantidad, confirmarPedido } = useContext(CartContext);
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [errorConfirmacion, setErrorConfirmacion] = useState('');

  if (!isOpen) return null;

  const handleConfirmarPedido = ({ fechaEntrega, direccionEntrega }) => {
    const resultado = confirmarPedido({ fechaEntrega, direccionEntrega });

    if (!resultado.ok) {
      setErrorConfirmacion(resultado.message);
      return;
    }

    setErrorConfirmacion('');
    setIsShippingOpen(false);
    onClose();
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content cart-modal">
          <button className="btn-volver" onClick={onClose}>
            ← Volver al Catálogo
          </button>
          <h2>Tu Carrito</h2>

          {cart.length === 0 ? (
            <p>El carrito está vacío</p>
          ) : (
            <>
              <div className="cart-items-list">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div>
                      <strong>{item.nombre}</strong>
                      <div className="cart-item-price">
                        ${item.precio.toLocaleString()} x {item.cantidad}
                      </div>
                    </div>

                    <div className="cart-controls">
                      <button onClick={() => updateCantidad(item.id, -1)}>-</button>
                      <button onClick={() => updateCantidad(item.id, 1)}>+</button>
                      <button onClick={() => removeFromCart(item.id)}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-resumen">
                <p>
                  <span>Productos:</span>
                  <strong>{resumen.cantidadTotal}</strong>
                </p>
                <p>
                  <span>Subtotal:</span>
                  <strong>${resumen.subtotal.toLocaleString()} CLP</strong>
                </p>
                <p>
                  <span>Despacho:</span>
                  <strong>${resumen.despacho.toLocaleString()} CLP</strong>
                </p>
                <p className="cart-total-line">
                  <span>Total:</span>
                  <strong>${resumen.total.toLocaleString()} CLP</strong>
                </p>
              </div>

              {errorConfirmacion && <p className="cart-error">{errorConfirmacion}</p>}

              <button className="btn-finalizar" onClick={() => setIsShippingOpen(true)}>
                Finalizar Pedido
              </button>
            </>
          )}
        </div>
      </div>

      <ShippingModal
        isOpen={isShippingOpen}
        onClose={() => setIsShippingOpen(false)}
        cart={cart}
        resumen={resumen}
        onConfirm={handleConfirmarPedido}
      />
    </>
  );
};

export default CartModal;
