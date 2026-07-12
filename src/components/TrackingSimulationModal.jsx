import React, { useEffect, useState } from 'react';
import './CartModal.css';

const estadoLabel = {
  preparacion: 'En preparación',
  despacho: 'En despacho',
  entrega: 'Entregado',
};

const formatearFechaHora = (valor) => {
  if (!valor) return '-';
  return new Date(valor).toLocaleString('es-CL');
};

const tiempoRelativo = (valor) => {
  if (!valor) return '-';
  const diffMs = Date.now() - new Date(valor).getTime();
  const diffSeg = Math.max(Math.floor(diffMs / 1000), 0);
  if (diffSeg < 60) return `hace ${diffSeg}s`;
  const diffMin = Math.floor(diffSeg / 60);
  if (diffMin < 60) return `hace ${diffMin} min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `hace ${diffH} h`;
  const diffD = Math.floor(diffH / 24);
  return `hace ${diffD} día${diffD === 1 ? '' : 's'}`;
};

const TrackingSimulationModal = ({ isOpen, pedidoActual, onClose, onUpdateEstado }) => {
  const [, setNow] = useState(Date.now());

  useEffect(() => {
    if (!isOpen || !pedidoActual) return undefined;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [isOpen, pedidoActual?.tracking?.actualizadoEn]);

  if (!isOpen || !pedidoActual) return null;

  const ultimoEstado = pedidoActual.estado === 'entrega';
  const historial = pedidoActual.tracking?.historial || [];

  return (
    <div className="modal-overlay" style={{ zIndex: 100000 }}>
      <div className="modal-content tracking-modal" style={{ zIndex: 100000 }}>
        <button onClick={onClose} className="btn-close-tracking" aria-label="Cerrar simulación">
          ✕
        </button>

        <h2>Simulación de Envío</h2>
        <p className="tracking-subtitle">Sigue y actualiza el estado de tu pedido en tiempo real.</p>

        <div className="tracking-card">
          <p>
            <strong>ID Pedido:</strong> {pedidoActual.id}
          </p>
          <p>
            <strong>Código de seguimiento:</strong> {pedidoActual.tracking?.codigo}
          </p>
          <p>
            <strong>Estado actual:</strong>{' '}
            <span className={`tracking-status status-${pedidoActual.estado}`}>
              {estadoLabel[pedidoActual.estado] || pedidoActual.estado}
            </span>
          </p>
          <p>
            <strong>Última actualización:</strong> {formatearFechaHora(pedidoActual.tracking?.actualizadoEn)} ({tiempoRelativo(pedidoActual.tracking?.actualizadoEn)})
          </p>
        </div>

        <div className="tracking-history">
          <h3>Historial de estados</h3>
          {historial.length === 0 ? (
            <p>No hay eventos de seguimiento aún.</p>
          ) : (
            historial.map((h, idx) => (
              <div key={`${h.timestamp}-${idx}`} className="tracking-history-item">
                <strong>{estadoLabel[h.estado] || h.estado}</strong>
                <span>{formatearFechaHora(h.timestamp)} ({tiempoRelativo(h.timestamp)})</span>
                <small>{h.descripcion}</small>
              </div>
            ))
          )}
        </div>

        <div className="tracking-actions">
          <button className="btn-finalizar" onClick={onUpdateEstado} disabled={ultimoEstado}>
            {ultimoEstado ? 'Pedido entregado' : 'Actualizar estado'}
          </button>
          <button className="btn-volver" onClick={onClose}>
            Cerrar simulación
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackingSimulationModal;
