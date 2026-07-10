// src/pages/Contacto.jsx
import React, { useState } from 'react';
import { useFormValidation } from '../hooks/useFormValidation';

const fieldLabels = {
  nombreCompleto: 'Nombre Completo',
  correo: 'Correo',
  mensaje: 'Mensaje',
};

const Contacto = () => {
  const [successMessage, setSuccessMessage] = useState('');

  const { values, errors, handleChange, validate } = useFormValidation(
    { nombreCompleto: '', correo: '', mensaje: '' },
    fieldLabels
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('');

    if (validate()) {
      setSuccessMessage('Tu mensaje fue enviado con éxito.');
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm" style={{ maxWidth: '500px', margin: 'auto' }}>
        <h2 style={{ color: '#5D4037', fontFamily: 'Pacifico, cursive' }}>Contacto</h2>

        {successMessage && (
          <div className="alert alert-success py-2 mt-2" role="alert">
            {successMessage}
          </div>
        )}

        {[
          { name: 'nombreCompleto', label: 'Nombre Completo', type: 'text' },
          { name: 'correo', label: 'Correo', type: 'email' },
          { name: 'mensaje', label: 'Mensaje', type: 'text' },
        ].map((f) => (
          <div className="mb-3" key={f.name}>
            <label className="form-label">{f.label}</label>
            <input
              name={f.name}
              type={f.type}
              value={values[f.name]}
              className="form-control"
              style={errors[f.name] ? { border: '2px solid #ff0033' } : {}}
              onChange={handleChange}
            />
            {errors[f.name] && <div className="text-danger small">{errors[f.name]}</div>}
          </div>
        ))}

        <button type="submit" className="btn w-100" style={{ backgroundColor: '#FFC0CB', color: '#5D4037' }}>
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Contacto;
