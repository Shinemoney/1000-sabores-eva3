// src/pages/AdminProductos.jsx
import React, { useState } from 'react';
import { productos, eliminarProducto } from '../data/mockDatabase';
import Sidebar from '../components/Sidebar';

const AdminProductos = () => {
  const [lista, setLista] = useState(initialProductos);

  const handleDelete = (id) => {
    eliminarProducto(id);
    setLista(lista.filter(p => p.id !== id));
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-4">
        <h2 style={{ fontFamily: 'Pacifico, cursive', color: '#5D4037' }}>Gestión de Productos</h2>
        <table className="table mt-3">
          <thead>
            <tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {lista.map(p => (
              <tr key={p.id}>
                <td>{p.codigo}</td>
                <td>{p.nombre}</td>
                <td>${p.precio.toLocaleString('es-CL')}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductos;