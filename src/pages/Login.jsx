import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateFields = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'El campo Correo Electrónico es requerido.';
    }

    if (!password.trim()) {
      newErrors.password = 'El campo Contraseña es requerido.';
    }

    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    setSuccessMessage('');

    if (!validateFields()) return;

    if (loginUser(email, password)) {
      setSuccessMessage('Inicio de sesión exitoso.');
      setTimeout(() => navigate('/'), 700);
    } else {
      setAuthError('Correo o contraseña incorrectos.');
    }
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    if (fieldErrors.email) {
      setFieldErrors({ ...fieldErrors, email: '' });
    }
    if (authError) setAuthError('');
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    if (fieldErrors.password) {
      setFieldErrors({ ...fieldErrors, password: '' });
    }
    if (authError) setAuthError('');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Iniciar Sesión</h2>

        {authError && <p className="error-msg">{authError}</p>}
        {successMessage && <p className="success-msg">{successMessage}</p>}

        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input
            type="email"
            placeholder="Ingresa tu correo"
            value={email}
            style={fieldErrors.email ? { border: '2px solid #ff0033' } : {}}
            onChange={(e) => handleEmailChange(e.target.value)}
          />
          {fieldErrors.email && <p className="field-error">{fieldErrors.email}</p>}
        </div>

        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            style={fieldErrors.password ? { border: '2px solid #ff0033' } : {}}
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
          {fieldErrors.password && <p className="field-error">{fieldErrors.password}</p>}
        </div>

        <button type="submit" className="btn-ingresar">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
