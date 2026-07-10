import React from 'react';
import { useNavigate } from 'react-router-dom';
import { productos } from '../data/mockDatabase';
import './Categorias.css';

const Categorias = () => {
  const navigate = useNavigate();

  const categoriasUnicas = [...new Set(productos.map((p) => p.categoria))];
  const categoriasDestacadas = categoriasUnicas.slice(0, 4);

  return (
    <div className="categorias-page">
      <h1>Categorías</h1>
      <p className="categorias-subtitle">
        Explora nuestras categorías y descubre productos seleccionados para cada ocasión.
      </p>

      <div className="grid-categorias">
        {categoriasDestacadas.map((categoria) => (
          <article
            key={categoria}
            className="card-categoria"
            onClick={() => navigate(`/categoria/${encodeURIComponent(categoria)}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigate(`/categoria/${encodeURIComponent(categoria)}`);
              }
            }}
          >
            <h3>{categoria}</h3>
            <p>Haz clic para ver productos de esta categoría</p>
            <span className="categoria-link">Ver productos →</span>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Categorias;
