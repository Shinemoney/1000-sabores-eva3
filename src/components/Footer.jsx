import React from 'react';
import './Footer.css';
// ELIMINA O COMENTA LA LÍNEA DEL IMPORT:
// import logo from '../assets/2logo.jpeg'; 

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-logo-section">
        {/* Usa la ruta directa empezando con / */}
        <img src="/2logo.jpeg" alt="Logo Pastelería" className="footer-logo" />
        <h2>Pastelería 1000 Sabores</h2>
      </div>
      
      <div className="footer-info">
        <p>Dirección: Violeta Parra 123, La Pintana, Santiago, Chile</p>
        <p>Contacto: +56 9 1234 5678 • ✉️ contacto@1000sabores.cl</p>
      </div>
    </footer>
  );
};

export default Footer;