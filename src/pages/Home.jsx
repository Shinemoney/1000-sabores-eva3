import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [mostrarHorario, setMostrarHorario] = useState(false);
  const slides = [
    {
      titulo: 'Torta Tres Leches',
      descripcion: 'Bizcocho suave con crema y toque de vainilla, ideal para celebraciones.',
      imagen: '/1image.jpeg',
    },
    {
      titulo: 'Caja de Cupcakes',
      descripcion: 'Cupcakes surtidos decorados a mano, perfectos para compartir.',
      imagen: '/2image.jpeg',
    },
    {
      titulo: 'Cheesecake de Frutos Rojos',
      descripcion: 'Base crocante, crema suave y cobertura de frutos rojos frescos.',
      imagen: '/3image.jpeg',
    },
  ];
  const [slideActual, setSlideActual] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSlideActual((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(intervalo);
  }, [slides.length]);

  const irSlideAnterior = () => {
    setSlideActual((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const irSlideSiguiente = () => {
    setSlideActual((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="home-container">
      <div className="home-layout">
        <aside className="home-sidebar-acciones">
          <button className="home-card-accion" onClick={() => navigate('/catalogo')}>
            Ver catálogo
          </button>

          <button className="home-card-accion" onClick={() => setMostrarHorario(true)}>
            Ver Horario
          </button>

          <button className="home-card-accion card-admin" onClick={() => navigate('/admin-login')}>
            Admin
          </button>
        </aside>

        <section className="home-main-placeholder">
          <div className="home-lanzamientos-card">
            <button className="slider-arrow" onClick={irSlideAnterior} aria-label="Slide anterior">❮</button>

            <div className="home-lanzamientos-content">
              <img
                src={slides[slideActual].imagen}
                alt={slides[slideActual].titulo}
                className="home-slide-image"
              />
              <h2>{slides[slideActual].titulo}</h2>
              <p>{slides[slideActual].descripcion}</p>
              <div className="slider-dots">
                {slides.map((_, index) => (
                  <span key={index} className={`dot ${index === slideActual ? 'active' : ''}`}></span>
                ))}
              </div>
            </div>

            <button className="slider-arrow" onClick={irSlideSiguiente} aria-label="Siguiente slide">❯</button>
          </div>
        </section>
      </div>

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
