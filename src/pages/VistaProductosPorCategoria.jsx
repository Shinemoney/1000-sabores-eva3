// src/pages/VistaProductosPorCategoria.jsx
import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { productos } from '../data/mockDatabase';
import { CartContext } from '../context/CartContext';
import './VistaProductosPorCategoria.css';

const VistaProductosPorCategoria = () => {
  const { nombreCategoria } = useParams();
  const categoriaDecodificada = decodeURIComponent(nombreCategoria);
  const { addToCart } = useContext(CartContext);

  const productosFiltrados = productos.filter(
    (p) => p.categoria === categoriaDecodificada
  );

  return (
    <section className="vista-categoria-page">
      <div className="vista-categoria-header">
        <h2>Resultados para: {categoriaDecodificada}</h2>
        <Link to="/categorias" className="vista-categoria-back">
          ← Volver a categorías
        </Link>
      </div>

      {productosFiltrados.length === 0 ? (
        <p className="vista-categoria-empty">No encontramos productos para esta categoría.</p>
      ) : (
        <div className="vista-productos-grid">
          {productosFiltrados.map((prod) => (
            <article key={prod.id} className="vista-producto-card">
              <img src={prod.imagen} alt={prod.nombre} className="vista-producto-img" />
              <div className="vista-producto-info">
                <h3>{prod.nombre}</h3>
                <p className="vista-producto-precio">${prod.precio}</p>
                <button
                  type="button"
                  className="vista-btn-carrito"
                  onClick={() => addToCart(prod)}
                >
                  Agregar al carrito
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default VistaProductosPorCategoria;
