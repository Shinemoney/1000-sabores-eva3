import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.jpeg';
import CartModal from './CartModal';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const [busqueda, setBusqueda] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const { resumen } = useContext(CartContext);

  const manejarBusqueda = () => {
    if (busqueda.trim()) {
      navigate(`/catalogo?q=${busqueda}`);
    }
  };

  return (
    <nav className="navbar-container">
      <div className="top-bar">
        <div className="brand-container">
          <img src={logo} alt="Logo" className="logo-img" />
          <span className="brand-name">Pastelería 1000 Sabores</span>
        </div>

        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Buscar" 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button onClick={manejarBusqueda}>Buscar</button>
        </div>

        <div className="auth-buttons">
          <button className="btn-login" onClick={() => navigate('/login')}>Iniciar Sesión</button>
          <Link to="/registro"><button className="btn-register">Crear Cuenta</button></Link>
        </div>
      </div>

      <div className="nav-menu">
        <ul className="menu-links">
          <li><Link to="/" className="menu-card">Home</Link></li>
          <li><Link to="/categorias" className="menu-card">Categorías</Link></li>
          <li><Link to="/ofertas" className="menu-card">Ofertas</Link></li>
          <li><Link to="/nosotros" className="menu-card">Nosotros</Link></li>
          <li><Link to="/blog" className="menu-card">Blog</Link></li>
          <li><Link to="/contacto" className="menu-card">Contacto</Link></li>
        </ul>
        <button className="btn-cart" onClick={() => setIsCartOpen(true)}>
          🛒 Carrito ({resumen.cantidadTotal})
        </button>
      </div>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
};

export default Navbar;