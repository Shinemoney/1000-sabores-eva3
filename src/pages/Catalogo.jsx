import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; 
import './Catalogo.css'; // Asegúrate de que la ruta relativa a tus estilos sea correcta desde src/pages
import CartModal from '../components/CartModal';

const Catalogo = () => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Obtener el término de búsqueda de la URL (ej: /catalogo?q=chocolate)
  const query = new URLSearchParams(useLocation().search).get('q');

  const productos = [
    { id: 1,  nombre: "Torta Cuadrada de Chocolate", categoria: "Tortas Cuadradas", precio: 45000, descripcion: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas.", imagen: "/1image.jpeg", oferta: true },
    { id: 2,  nombre: "Torta Cuadrada de Frutas", categoria: "Tortas Cuadradas", precio: 50000, descripcion: "Mezcla de frutas frescas y crema chantilly sobre bizcocho de vainilla.", imagen: "/2image.jpeg" },
    { id: 3,  nombre: "Torta Circular de Vainilla", categoria: "Tortas Circulares", precio: 40000, descripcion: "Bizcocho de vainilla clásico relleno con crema pastelera.", imagen: "/3image.jpeg" },
    { id: 4,  nombre: "Torta Circular de Manjar", categoria: "Tortas Circulares", precio: 42000, descripcion: "Torta tradicional chilena con manjar y nueces.", imagen: "/4image.jpeg" },
    { id: 5,  nombre: "Mousse de Chocolate", categoria: "Postres Individuales", precio: 5000, descripcion: "Postre individual cremoso y suave de chocolate de alta calidad.", imagen: "/5image.jpeg" },
    { id: 6,  nombre: "Tiramisú Clásico", categoria: "Postres Individuales", precio: 5500, descripcion: "Postre italiano con capas de café, mascarpone y cacao.", imagen: "/6image.jpeg", oferta: true },
    { id: 7,  nombre: "Torta Sin Azúcar de Naranja", categoria: "Productos Sin Azúcar", precio: 48000, descripcion: "Torta ligera y deliciosa, endulzada naturalmente.", imagen: "/7image.jpeg" },
    { id: 8,  nombre: "Cheesecake Sin Azúcar", categoria: "Productos Sin Azúcar", precio: 47000, descripcion: "Suave y cremoso, perfecto para disfrutar sin culpa.", imagen: "/8image.jpeg" },
    { id: 9,  nombre: "Empanada de Manzana", categoria: "Pastelería Tradicional", precio: 3000, descripcion: "Rellena de manzanas especiadas, perfecta para un dulce desayuno.", imagen: "/9image.jpeg" },
    { id: 10, nombre: "Tarta de Santiago", categoria: "Pastelería Tradicional", precio: 6000, descripcion: "Tradicional tarta española hecha con almendras y huevos.", imagen: "/10image.jpeg" },
    { id: 11, nombre: "Brownie Sin Gluten", categoria: "Productos Sin Gluten", precio: 4000, descripcion: "Rico y denso, perfecto para quienes necesitan evitar el gluten.", imagen: "/11image.jpeg" },
    { id: 12, nombre: "Pan Sin Gluten", categoria: "Productos Sin Gluten", precio: 3500, descripcion: "Suave y esponjoso, ideal para sándwiches.", imagen: "/12image.jpeg" },
    { id: 13, nombre: "Torta Vegana de Chocolate", categoria: "Productos Vegana", precio: 50000, descripcion: "Torta húmeda sin productos de origen animal.", imagen: "/13image.jpeg", oferta: true },
    { id: 14, nombre: "Galletas Veganas de Avena", categoria: "Productos Vegana", precio: 4500, descripcion: "Crujientes y sabrosas, una excelente opción saludable.", imagen: "/14image.jpeg" },
    { id: 15, nombre: "Torta Especial de Cumpleaños", categoria: "Tortas Especiales", precio: 55000, descripcion: "Diseñada para celebraciones, personalizable con decoraciones.", imagen: "/15image.jpeg" },
    { id: 16, nombre: "Torta Especial de Boda", categoria: "Tortas Especiales", precio: 60000, descripcion: "Elegante, diseñada para ser el centro de atención.", imagen: "/16image.jpeg" }
  ];

  // Filtrado local basado en el término de búsqueda de la URL
  const productosFiltrados = query 
    ? productos.filter(p => p.nombre.toLowerCase().includes(query.toLowerCase()))
    : productos;

  return (
    <div className="catalogo-wrapper">
      <div className="header-actions">
        <button className="btn-volver" onClick={() => navigate('/')}>← Volver al Home</button>
        <button className="btn-ver-carrito" onClick={() => setIsCartOpen(true)}>🛒 Ver Carrito</button>
      </div>
      
      <h1 style={{ textAlign: 'center' }}>
        {query ? `Resultados para: "${query}"` : "Nuestro Catálogo"}
      </h1>

      <div className="catalogo-grid">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map(p => (
            <div key={p.id} className="producto-card">
              <img src={p.imagen} alt={p.nombre} onError={(e) => e.target.src = '/placeholder.jpg'} />
              <h2>{p.nombre}</h2>
              <h3>${p.precio?.toLocaleString()} CLP</h3>
              <button className="btn-agregar" onClick={() => addToCart(p)}>Añadir al carrito</button>
              <button onClick={() => navigate(`/producto/${p.id}`)}>Ver detalles</button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', width: '100%' }}>No se encontraron productos con ese nombre.</p>
        )}
      </div>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Catalogo;