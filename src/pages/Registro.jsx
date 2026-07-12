// src/pages/Registro.jsx
import React, { useState, useEffect } from 'react';
import { useFormValidation } from '../hooks/useFormValidation';

const fieldLabels = {
  nombre: 'Nombre',
  apellido: 'Apellido',
  fechaNacimiento: 'Fecha de Nacimiento',
  email: 'Correo Electrónico',
  password: 'Contraseña',
  emailDuoc: 'Correo Institucional (duoc.cl)',
  codigoDescuento: 'Código (FELICES50)',
  region: 'Región',
  comuna: 'Comuna',
  direccion: 'Dirección',
};

const hashText = async (text) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

const Registro = () => {
  const [successMessage, setSuccessMessage] = useState('');

  const { values, errors, handleChange, validate } = useFormValidation(
    {
      nombre: '',
      apellido: '',
      fechaNacimiento: '',
      email: '',
      password: '',
      emailDuoc: '',
      codigoDescuento: '',
      region: '',
      comuna: '',
      direccion: '',
    },
    fieldLabels
  );

  useEffect(() => {
    const form = document.querySelector('form[data-user-register="true"]');
    if (form) form.reset();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    if (validate()) {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const exists = registeredUsers.some((u) => u.email.toLowerCase() === values.email.toLowerCase());

      if (exists) {
        setSuccessMessage('Este correo ya está registrado.');
        return;
      }

      const passwordHash = await hashText(values.password);

      const newUser = {
        nombre: values.nombre,
        apellido: values.apellido,
        email: values.email,
        password: passwordHash,
      };

      localStorage.setItem('registeredUsers', JSON.stringify([...registeredUsers, newUser]));
      setSuccessMessage('Registro completado con éxito.');
    }
  };

  const regiones = [
    'Región Metropolitana',
    'Valparaíso',
    'Biobío',
    'La Araucanía',
  ];

  const comunasPorRegion = {
    'Región Metropolitana': ['La Pintana', 'Puente Alto', 'San Bernardo', 'La Florida'],
    Valparaíso: ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana'],
    Biobío: ['Concepción', 'Talcahuano', 'San Pedro de la Paz', 'Chiguayante'],
    'La Araucanía': ['Temuco', 'Padre Las Casas', 'Villarrica', 'Pucón'],
  };

  const fields = [
    { name: 'nombre', label: 'Nombre' },
    { name: 'apellido', label: 'Apellido' },
    { name: 'fechaNacimiento', label: 'Fecha de Nacimiento', type: 'date' },
    { name: 'email', label: 'Correo Electrónico' },
    { name: 'password', label: 'Contraseña', type: 'password' },
    { name: 'emailDuoc', label: 'Correo Institucional (duoc.cl)' },
    { name: 'codigoDescuento', label: 'Código (FELICES50)' },
    { name: 'region', label: 'Región', type: 'select' },
    { name: 'comuna', label: 'Comuna', type: 'select' },
    { name: 'direccion', label: 'Dirección' },
  ];

  return (
    <div className="container mt-5">
      <form
        onSubmit={handleSubmit}
        className="card p-4 shadow-sm"
        style={{ maxWidth: '600px', margin: 'auto' }}
        autoComplete="off"
        data-user-register="true"
      >
        <h2 style={{ color: '#5D4037', fontFamily: 'Pacifico, cursive' }}>Registro</h2>

        {successMessage && (
          <div className="alert alert-success py-2 mt-2" role="alert">
            {successMessage}
          </div>
        )}

        {fields.map((f) => (
          <div className="mb-2" key={f.name}>
            <label className="form-label">{f.label}</label>

            {f.name === 'region' ? (
              <select
                name={f.name}
                value={values[f.name]}
                className="form-control"
                style={errors[f.name] ? { border: '2px solid #ff0033' } : {}}
                onChange={handleChange}
              >
                <option value="">Selecciona una región</option>
                {regiones.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            ) : f.name === 'comuna' ? (
              <select
                name={f.name}
                value={values[f.name]}
                className="form-control"
                style={errors[f.name] ? { border: '2px solid #ff0033' } : {}}
                onChange={handleChange}
                disabled={!values.region}
              >
                <option value="">
                  {values.region ? 'Selecciona una comuna' : 'Primero selecciona una región'}
                </option>
                {(comunasPorRegion[values.region] || []).map((comuna) => (
                  <option key={comuna} value={comuna}>
                    {comuna}
                  </option>
                ))}
              </select>
            ) : (
              <input
                name={f.name}
                type={f.type || 'text'}
                autoComplete={
                  f.name === 'email'
                    ? 'username'
                    : f.name === 'password'
                    ? 'new-password'
                    : 'off'
                }
                value={values[f.name]}
                className="form-control"
                style={errors[f.name] ? { border: '2px solid #ff0033' } : {}}
                onChange={handleChange}
              />
            )}

            {errors[f.name] && (
              <div className="text-danger small">
                {f.name === 'password'
                  ? 'La contraseña es requerida (Mínimo 6 caracteres)'
                  : 'Este campo es obligatorio'}
              </div>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="btn w-100 mt-3"
          style={{ backgroundColor: '#FFC0CB', color: '#5D4037', padding: '14px', fontSize: '1.05rem', fontWeight: 700 }}
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Registro;
