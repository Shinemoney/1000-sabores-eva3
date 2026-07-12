import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productos } from '../data/mockDatabase';
import { CartContext } from '../context/CartContext';
import './Ofertas.css';

const STORAGE_KEY = 'admin_productos';

const cargarProductosDisponibles = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // fallback abajo
  }
  return productos;
};

const Ofertas = () => {
  const { addToCart } = useContext(CartContext);
  const [productosEnOferta, setProductosEnOferta] = useState([]);

  useEffect(() => {
    const refrescarOfertas = () => {
      const productosFuente = cargarProductosDisponibles();
      const ofertasAdmin = productosFuente.filter(
        (p) => p.oferta === true && p.imagen && p.imagen !== '/favicon.svg'
      );
      const ofertasBase = productos.filter(
        (p) => p.oferta === true && p.imagen && p.imagen !== '/favicon.svg'
      );

      const combinadas = [...ofertasAdmin];
      const ids = new Set(combinadas.map((p) => p.id));

      for (const p of ofertasBase) {
        if (combinadas.length >= 4) break;
        if (!ids.has(p.id)) {
          combinadas.push(p);
          ids.add(p.id);
        }
      }

      setProductosEnOferta(combinadas.slice(0, 4));
    };

    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) refrescarOfertas();
    };

    refrescarOfertas();
    window.addEventListener('storage', onStorage);
    window.addEventListener('admin-stock-updated', refrescarOfertas);

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('admin-stock-updated', refrescarOfertas);
    };
  }, []);

  const calcularPreciosOferta = (precioBase) => {
    const descuento = 20; // descuento estándar para tarjeta de oferta
    const precioFinal = Math.round(precioBase * (1 - descuento / 100));
    const ahorro = precioBase - precioFinal;

    return { descuento, precioFinal, ahorro };
  };

  return (
    <div className="ofertas-container">
      <h1>Ofertas Especiales!</h1>

      {productosEnOferta.length === 0 ? (
        <div className="ofertas-empty">
          <p>Por ahora no hay productos en oferta.</p>
          <p>Vuelve pronto para ver nuevas promociones.</p>
        </div>
      ) : (
        <div className="grid-productos">
          {productosEnOferta.map((prod) => {
            const { descuento, precioFinal, ahorro } = calcularPreciosOferta(prod.precio);

            return (
              <div key={prod.id} className="card-producto oferta-card">
                <span className="oferta-badge">Oferta -{descuento}%</span>

                <img src={prod.imagen} alt={prod.nombre} className="oferta-imagen" />

                <h3>{prod.nombre}</h3>
                <p className="oferta-descripcion">{prod.descripcion}</p>

                <div className="oferta-pricing">
                  <p className="precio-anterior">${prod.precio.toLocaleString()} CLP</p>
                  <p className="precio-final">${precioFinal.toLocaleString()} CLP</p>
                  <p className="oferta-ahorro">Ahorras ${ahorro.toLocaleString()} CLP</p>
                </div>

                <div className="oferta-actions">
                  <button
                    className="btn-agregar-oferta"
                    onClick={() =>
                      addToCart({
                        ...prod,
                        precioOriginal: prod.precio,
                        descuentoPct: descuento,
                        precio: precioFinal,
                      })
                    }
                  >
                    Agregar al carrito
                  </button>
                  <Link to={`/producto/${prod.id}`} className="btn-detalle-oferta">
                    Ver detalle
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Ofertas;
