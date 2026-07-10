import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './BlogDetalle.css';

const articulos = {
  '1': {
    titulo: 'Técnicas de Temperado',
    contenido: [
      'El temperado del chocolate es clave para lograr brillo, textura crujiente y un acabado profesional.',
      'Paso 1: Derrite el chocolate a baño maría sin que le entre agua.',
      'Paso 2: Enfría parte del chocolate sobre una superficie de mármol hasta bajar su temperatura.',
      'Paso 3: Vuelve a integrar y verifica que alcance el rango ideal para trabajar.',
      'Con esta técnica, tus decoraciones y coberturas tendrán mejor presentación y durabilidad.',
    ],
  },
  '2': {
    titulo: 'Merengue Italiano',
    contenido: [
      'El merengue italiano se prepara con almíbar caliente y claras batidas, logrando una textura estable y brillante.',
      'Paso 1: Bate claras a velocidad media hasta espumar.',
      'Paso 2: Prepara un almíbar a punto bolita blanda (aprox. 118°C).',
      'Paso 3: Vierte el almíbar en hilo sobre las claras mientras sigues batiendo.',
      'Ideal para decorar tortas, rellenar postres y mantener forma por más tiempo.',
    ],
  },
  '3': {
    titulo: 'Tendencias 2026',
    contenido: [
      'La repostería moderna avanza hacia opciones más saludables, sostenibles y visualmente atractivas.',
      'Uso de menos azúcar refinada y más endulzantes naturales.',
      'Incorporación de harinas integrales, vegetales y alternativas sin gluten.',
      'Decoraciones minimalistas con ingredientes locales de temporada.',
      'Estas tendencias permiten innovar sin perder sabor ni calidad artesanal.',
    ],
  },
};

const BlogDetalle = () => {
  const { id } = useParams();
  const articulo = articulos[id];

  if (!articulo) {
    return (
      <section className="blog-detalle-page">
        <div className="blog-detalle-card">
          <h1>Artículo no encontrado</h1>
          <p>El contenido solicitado no existe o fue movido.</p>
          <Link to="/blog" className="volver-blog-btn">
            ← Volver al Blog
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="blog-detalle-page">
      <article className="blog-detalle-card">
        <h1>{articulo.titulo}</h1>
        <div className="blog-detalle-content">
          {articulo.contenido.map((parrafo, index) => (
            <p key={index}>{parrafo}</p>
          ))}
        </div>
        <Link to="/blog" className="volver-blog-btn">
          ← Volver al Blog
        </Link>
      </article>
    </section>
  );
};

export default BlogDetalle;
