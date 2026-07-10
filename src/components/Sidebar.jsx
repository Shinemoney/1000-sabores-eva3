// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div className="d-flex flex-column p-3 text-white" style={{ width: '250px', backgroundColor: '#5D4037', minHeight: '100vh' }}>
    <h4 style={{ fontFamily: 'Pacifico, cursive' }}>Admin Panel</h4>
    <hr />
    <ul className="nav nav-pills flex-column mb-auto">
      <li className="nav-item"><Link to="/admin/productos" className="nav-link text-white">Gestionar Productos</Link></li>
      <li className="nav-item"><Link to="/" className="nav-link text-white">Volver a la Tienda</Link></li>
    </ul>
  </div>
);

export default Sidebar;