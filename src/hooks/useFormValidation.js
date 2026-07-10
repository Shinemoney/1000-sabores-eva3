// src/hooks/useFormValidation.js
import { useState } from 'react';

export const useFormValidation = (initialState, fieldLabels = {}) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const resolveLabel = (key) => fieldLabels[key] || key;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};

    Object.keys(values).forEach((key) => {
      const rawValue = values[key];
      const currentValue = typeof rawValue === 'string' ? rawValue.trim() : rawValue;

      if (!currentValue) {
        newErrors[key] = `El campo ${resolveLabel(key)} es requerido.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { values, errors, setErrors, setValues, handleChange, validate };
};
