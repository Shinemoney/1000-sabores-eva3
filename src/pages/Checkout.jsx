import React, { useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
  const navigate = useNavigate();
  const {
    cart,
    resumen,
    checkoutDraft,
    guardarCheckoutDraft,
    procesarPagoSimulado,
  } = useContext(CartContext);

  const [cliente, setCliente] = useState(
    checkoutDraft?.cliente || {
      nombre: '',
      apellidos: '',
      email: '',
      telefono: '',
    }
  );

  const [direccion, setDireccion] = useState(
    checkoutDraft?.direccion || {
      calle: '',
      departamento: '',
      region: '',
      comuna: '',
      indicaciones: '',
    }
  );

  const [fechaEntrega, setFechaEntrega] = useState(checkoutDraft?.fechaEntrega || '');
  const [forzarError, setForzarError] = useState(false);
  const [error, setError] = useState('');

  const minFecha = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }, []);

  const onChangeCliente = (field, value) => {
    const next = { ...cliente, [field]: value };
    setCliente(next);
  };

  const onChangeDireccion = (field, value) => {
    const next = { ...direccion, [field]: value };
    setDireccion(next);
  };

  const guardarBorrador = () => {
    guardarCheckoutDraft({ cliente, direccion, fechaEntrega });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');

    guardarBorrador();

    const resultado = procesarPagoSimulado({
      cliente,
      direccion,
      fechaEntrega,
      forzarError,
    });

    if (!resultado.ok) {
      setError(resultado.message || 'No se pudo procesar el pago');
      return;
    }

    navigate('/checkout/resultado');
  };

  if (!cart.length) {
    return (
      <div style={{ maxWidth: '1100px', margin: '20px auto', padding: '16px' }}>
        <h1>Checkout</h1>
        <p>No hay productos en el carrito.</p>
        <button onClick={() => navigate('/cart')}>Volver al carrito</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '20px auto', padding: '16px' }}>
      <h1>Checkout</h1>

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: '20px' }}>
        <section style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '16px' }}>
          <h2>Datos del cliente</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '12px' }}>
            <input placeholder="Nombre" value={cliente.nombre} onChange={(e) => onChangeCliente('nombre', e.target.value)} />
            <input placeholder="Apellidos" value={cliente.apellidos} onChange={(e) => onChangeCliente('apellidos', e.target.value)} />
            <input placeholder="Email" type="email" value={cliente.email} onChange={(e) => onChangeCliente('email', e.target.value)} />
            <input placeholder="Teléfono" value={cliente.telefono} onChange={(e) => onChangeCliente('telefono', e.target.value)} />
          </div>
        </section>

        <section style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '16px' }}>
          <h2>Dirección de entrega</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '12px' }}>
            <input placeholder="Calle y número" value={direccion.calle} onChange={(e) => onChangeDireccion('calle', e.target.value)} />
            <input placeholder="Departamento (opcional)" value={direccion.departamento} onChange={(e) => onChangeDireccion('departamento', e.target.value)} />
            <input placeholder="Región" value={direccion.region} onChange={(e) => onChangeDireccion('region', e.target.value)} />
            <input placeholder="Comuna" value={direccion.comuna} onChange={(e) => onChangeDireccion('comuna', e.target.value)} />
          </div>
          <textarea
            placeholder="Indicaciones adicionales (opcional)"
            value={direccion.indicaciones}
            onChange={(e) => onChangeDireccion('indicaciones', e.target.value)}
            style={{ marginTop: '12px', width: '100%', minHeight: '80px' }}
          />
        </section>

        <section style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '16px' }}>
          <h2>Entrega y pago</h2>
          <label htmlFor="fechaEntrega">Fecha de entrega:</label>
          <input
            id="fechaEntrega"
            type="date"
            min={minFecha}
            value={fechaEntrega}
            onChange={(e) => setFechaEntrega(e.target.value)}
            style={{ display: 'block', marginTop: '8px', marginBottom: '14px' }}
          />

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" checked={forzarError} onChange={(e) => setForzarError(e.target.checked)} />
            Simular error de pago
          </label>
        </section>

        <section style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '16px' }}>
          <h2>Resumen</h2>
          {cart.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span>{item.nombre} x{item.cantidad}</span>
              <span>${(item.precio * item.cantidad).toLocaleString()} CLP</span>
            </div>
          ))}
          <hr />
          <p>Subtotal: ${resumen.subtotal.toLocaleString()} CLP</p>
          <p>Ahorro: -${resumen.ahorroTotal.toLocaleString()} CLP</p>
          <p>Despacho: ${resumen.despacho.toLocaleString()} CLP</p>
          <h3>Total: ${resumen.total.toLocaleString()} CLP</h3>
        </section>

        {error && <p style={{ color: 'red', fontWeight: 700 }}>{error}</p>}

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button type="button" onClick={() => navigate('/cart')}>Volver al carrito</button>
          <button type="button" onClick={guardarBorrador}>Guardar datos</button>
          <button type="submit" style={{ background: '#8b4513', color: '#fff', border: 'none', padding: '10px 18px' }}>
            Pagar y confirmar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
