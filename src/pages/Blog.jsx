import React from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

const articulos = [
  {
    id: 1,
    titulo: 'Técnicas de Temperado',
    descripcion: 'Dominar el temperado del chocolate es esencial para lograr ese brillo profesional.',
  },
  {
    id: 2,
    titulo: 'Merengue Italiano',
    descripcion: 'La guía definitiva para un merengue estable y brillante. Perfecto para decorar.',
  },
  {
    id: 3,
    titulo: 'Tendencias 2026',
    descripcion: 'Exploramos las nuevas tendencias de repostería saludable marcando pauta este año.',
  },
];

const Blog = () => {
  return (
    <section className="blog-page">
      <h1 className="blog-title">Rincón del Aprendiz</h1>
      <p className="blog-subtitle">
        Consejos, recetas y noticias compartidas por nuestros estudiantes de gastronomía.
      </p>

      <div className="blog-grid">
        {articulos.map((articulo) => (
          <article key={articulo.id} className="blog-card">
            <h2>{articulo.titulo}</h2>
            <p>{articulo.descripcion}</p>
            <Link to={`/blog/${articulo.id}`} className="blog-link">
              Leer artículo →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Blog;
