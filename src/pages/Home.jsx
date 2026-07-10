import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [mostrarHorario, setMostrarHorario] = useState(false);

  return (
    <div className="home-container">
      {/* Sección de acciones */}
      <div className="home-grid-acciones">
        <div className="home-card-accion" onClick={() => navigate('/catalogo')}>
          <h3>Ver Catálogo</h3>
        </div>
        
        <div className="home-card-accion" onClick={() => setMostrarHorario(true)}>
          <h3>Horario</h3>
        </div>

        {/* Tarjeta de Acceso Admin */}
        <div className="home-card-accion card-admin" onClick={() => navigate('/admin-login')}>
          <h3>Acceso Administrador</h3>
        </div>
      </div>

      {/* Modal de Horario */}
      {mostrarHorario && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setMostrarHorario(false)}>X</button>
            <h2>Horario de Atención</h2>
            <p>Lunes a Viernes: 09:00 - 19:00</p>
            <p>Sábados: 10:00 - 18:00</p>
            <p>Domingos: Cerrado</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;