import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const CheckoutResult = () => {
  const navigate = useNavigate();
  const {
    paymentResult,
    checkoutDraft,
    guardarCheckoutDraft,
    limpiarResultadoPago,
  } = useContext(CartContext);

  if (!paymentResult) {
    return (
      <div style={{ maxWidth: '1100px', margin: '20px auto', padding: '16px' }}>
        <h1>Resultado del Pago</h1>
        <p>No hay resultado disponible.</p>
        <button onClick={() => navigate('/checkout')}>Ir a checkout</button>
      </div>
    );
  }

  const imprimirBoleta = () => {
    window.print();
  };

  const enviarBoletaEmail = () => {
    const destino = paymentResult?.cliente?.email || checkoutDraft?.cliente?.email;
    alert(`Boleta enviada (simulado) a ${destino || 'correo no definido'}`);
  };

  const reintentar = () => {
    if (checkoutDraft) {
      guardarCheckoutDraft(checkoutDraft);
    }
    limpiarResultadoPago();
    navigate('/checkout');
  };

  const volverInicio = () => {
    limpiarResultadoPago();
    navigate('/');
  };

  const exito = paymentResult.status === 'success';

  return (
    <div style={{ maxWidth: '1100px', margin: '20px auto', padding: '16px' }}>
      <h1>{exito ? 'Pago realizado con éxito' : 'No se pudo procesar el pago'}</h1>
      <p><strong>Número de orden:</strong> {paymentResult.numeroOrden}</p>
      <p><strong>Fecha:</strong> {new Date(paymentResult.creadoEn).toLocaleString()}</p>

      {exito ? (
        <div style={{ background: '#edf9ed', border: '1px solid #b8dfb8', borderRadius: '8px', padding: '16px' }}>
          <p>Tu pedido fue confirmado correctamente.</p>
          <p><strong>ID Pedido:</strong> {paymentResult.pedido?.id}</p>
          <p><strong>Folio boleta:</strong> {paymentResult.pedido?.boleta?.folio}</p>
          <p><strong>Total:</strong> ${paymentResult.pedido?.boleta?.total?.toLocaleString()} CLP</p>
        </div>
      ) : (
        <div style={{ background: '#fff3f3', border: '1px solid #f1b9b9', borderRadius: '8px', padding: '16px' }}>
          <p>{paymentResult.motivo || 'Error de pago'}</p>
          <button
            onClick={reintentar}
            style={{ background: '#8b4513', color: '#fff', border: 'none', padding: '10px 16px' }}
          >
            VOLVER A REALIZAR EL PAGO
          </button>
        </div>
      )}

      <div style={{ marginTop: '16px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={imprimirBoleta}>Imprimir boleta PDF</button>
        <button onClick={enviarBoletaEmail}>Enviar boleta por email</button>
        <button onClick={volverInicio}>Volver al inicio</button>
      </div>
    </div>
  );
};

export default CheckoutResult;
