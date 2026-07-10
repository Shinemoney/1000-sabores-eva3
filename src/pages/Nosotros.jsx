import React from 'react';
import { Link } from 'react-router-dom';
import './Nosotros.css';

const Nosotros = () => {
  return (
    <div className="nosotros-container">
      <section className="nosotros-card nosotros-card-principal">
        <span className="nosotros-badge">Nuestra historia</span>
        <h1>Pastelería 1000 Sabores</h1>
        <p className="nosotros-subtitle">
          50 años creando momentos dulces con tradición, calidad e innovación.
        </p>
        <p>
          Celebramos nuestro 50 aniversario como un referente en la repostería chilena.
          Somos reconocidos por nuestra participación en un récord Guinness en 1995,
          cuando colaboramos en la creación de la torta más grande del mundo.
        </p>
      </section>

      <section className="nosotros-grid">
        <article className="nosotros-card">
          <span className="nosotros-badge">Misión</span>
          <h2>Compromiso con cada detalle</h2>
          <p>
            Ofrecer una experiencia dulce y memorable a nuestros clientes, con tortas y
            productos de repostería de alta calidad para cada ocasión, celebrando nuestras
            raíces históricas y fomentando la creatividad gastronómica.
          </p>
        </article>

        <article className="nosotros-card">
          <span className="nosotros-badge">Visión</span>
          <h2>Liderazgo e innovación en Chile</h2>
          <p>
            Consolidarnos como la tienda online líder en repostería en Chile, destacando
            por innovación, excelencia y aporte a la comunidad, especialmente en la
            formación de nuevos talentos en gastronomía.
          </p>
        </article>
      </section>

      <div className="nosotros-home-action">
        <Link to="/" className="nosotros-home-btn">
          ← Volver al Home
        </Link>
      </div>
    </div>
  );
};

export default Nosotros;