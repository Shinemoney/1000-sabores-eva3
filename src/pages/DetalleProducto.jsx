import React, { useState, useContext, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productos } from '../data/mockDatabase';
import { CartContext } from '../context/CartContext';
import './DetalleProducto.css';

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, carrito } = useContext(CartContext);
  const producto = productos.find(p => p.id === parseInt(id));
  const [mensaje, setMensaje] = useState('');
  const [tamano, setTamano] = useState('Pequeña (10p)');

  if (!producto) return <h2>Producto no encontrado</h2>;

  const textoOrigen = useMemo(() => {
    if (producto.categoria.includes('Pastelería Tradicional') || producto.nombre.includes('Tarta')) {
      return 'Inspirado en recetas tradicionales transmitidas por generaciones, elaborado con técnicas de pastelería clásica para preservar su sabor auténtico.';
    }
    if (producto.categoria.includes('Sin Azúcar') || producto.categoria.includes('Sin Gluten') || producto.categoria.includes('Vegana')) {
      return 'Receta desarrollada para ofrecer opciones inclusivas y equilibradas, manteniendo calidad artesanal y excelente sabor.';
    }
    return 'Producto elaborado en nuestra pastelería artesanal con selección cuidadosa de ingredientes y técnicas de repostería profesional.';
  }, [producto]);

  const recomendaciones = useMemo(() => {
    const categoriasEnCarrito = new Set((carrito || []).map((item) => item.categoria));
    const priorizarCategoria = categoriasEnCarrito.size > 0
      ? [...categoriasEnCarrito][0]
      : producto.categoria;

    const relacionadas = productos.filter(
      (p) => p.id !== producto.id && p.categoria === priorizarCategoria,
    );

    const fallback = productos.filter(
      (p) => p.id !== producto.id && p.categoria === producto.categoria,
    );

    return (relacionadas.length ? relacionadas : fallback).slice(0, 3);
  }, [carrito, producto]);

  const handleAgregarAlCarrito = () => {
    const precioBase = producto.precio;
    const descuentoPct = producto.oferta ? 20 : 0;
    const precioFinal = descuentoPct > 0 ? Math.round(precioBase * (1 - descuentoPct / 100)) : precioBase;

    addToCart({
      ...producto,
      tamano,
      mensajeEspecial: mensaje.trim(),
      precioOriginal: precioBase,
      descuentoPct,
      precio: precioFinal,
    });

    setMensaje('');
  };

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
        <p><strong>Descripción:</strong> {producto.descripcion}</p>

        <section className="extra-info">
          <article className="extra-card">
            <h3>Origen de la receta</h3>
            <p>{textoOrigen}</p>
          </article>

          <article className="extra-card">
            <h3>Recomendaciones personalizadas</h3>
            {recomendaciones.length > 0 ? (
              <ul className="extra-recomendaciones">
                {recomendaciones.map((rec) => (
                  <li key={rec.id}>
                    <strong>{rec.nombre}</strong> — ${rec.precio.toLocaleString('es-CL')} CLP
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay recomendaciones disponibles por ahora.</p>
            )}
          </article>

          <article className="extra-card extra-impacto">
            <h3>Impacto comunitario</h3>
            <p>
              Cada compra impulsa la formación de estudiantes de gastronomía y fortalece la economía local,
              apoyando iniciativas de aprendizaje, práctica profesional y desarrollo comunitario.
            </p>
          </article>
        </section>

        <select className="selector-tamano" value={tamano} onChange={(e) => setTamano(e.target.value)}>
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

        <button className="btn-agregar" onClick={handleAgregarAlCarrito}>
          🛒 Añadir al Carrito
        </button>
      </div>
    </div>
  );
};

export default DetalleProducto;