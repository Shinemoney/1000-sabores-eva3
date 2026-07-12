// src/pages/AdminProductos.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productos as productosBase, eliminarProducto } from '../data/mockDatabase';
import './AdminProductos.css';

const STORAGE_KEY = 'admin_productos';

const normalizarProducto = (p, idx = 0) => ({
  ...p,
  id: Number(p.id) || Date.now() + idx,
  codigo: p.codigo || `PRD${Date.now() + idx}`,
  nombre: p.nombre || 'Producto sin nombre',
  categoria: p.categoria || 'Sin categoría',
  precio: Number(p.precio) || 0,
  stock: Number(p.stock ?? 0),
  oferta: Boolean(p.oferta),
});

const cargarProductos = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.map((p, idx) => normalizarProducto(p, idx));
      }
    }
  } catch {
    // fallback abajo
  }
  return productosBase.map((p, idx) => normalizarProducto(p, idx));
};

const guardarProductos = (lista) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
  window.dispatchEvent(new Event('admin-stock-updated'));
};

const AdminProductos = () => {
  const [lista, setLista] = useState(cargarProductos);
  const [nuevo, setNuevo] = useState({
    codigo: '',
    nombre: '',
    categoria: '',
    precio: '',
    stock: '',
    oferta: false,
  });
  const [edicion, setEdicion] = useState({});

  useEffect(() => {
    const map = {};
    lista.forEach((p) => {
      map[p.id] = {
        codigo: p.codigo,
        nombre: p.nombre,
        categoria: p.categoria,
        precio: String(Number(p.precio || 0)),
        stock: String(Number(p.stock || 0)),
        oferta: Boolean(p.oferta),
      };
    });
    setEdicion(map);
  }, [lista]);

  const handleDelete = (id) => {
    eliminarProducto(id);
    const actualizada = lista.filter((p) => p.id !== id);
    setLista(actualizada);
    guardarProductos(actualizada);
  };

  const handleNuevoChange = (field, value) => {
    setNuevo((prev) => ({ ...prev, [field]: value }));
  };

  const handleAgregarProducto = (e) => {
    e.preventDefault();

    const codigo = nuevo.codigo.trim();
    const nombre = nuevo.nombre.trim();
    const categoria = nuevo.categoria.trim();
    const precio = Number(nuevo.precio);
    const stock = Number(nuevo.stock);

    if (!codigo || !nombre || !categoria || Number.isNaN(precio) || Number.isNaN(stock)) {
      return;
    }

    const nuevoProducto = {
      id: Date.now(),
      codigo,
      nombre,
      categoria,
      precio: Math.max(0, precio),
      stock: Math.max(0, stock),
      oferta: Boolean(nuevo.oferta),
      descripcion: '',
      imagen: '/favicon.svg',
    };

    const actualizada = [nuevoProducto, ...lista];
    setLista(actualizada);
    guardarProductos(actualizada);

    setNuevo({
      codigo: '',
      nombre: '',
      categoria: '',
      precio: '',
      stock: '',
      oferta: false,
    });
  };

  const handleEdicionChange = (id, field, value) => {
    setEdicion((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || {}), [field]: value },
    }));
  };

  const handleGuardarFila = (id) => {
    const fila = edicion[id];
    if (!fila) return;

    const codigo = String(fila.codigo || '').trim();
    const nombre = String(fila.nombre || '').trim();
    const categoria = String(fila.categoria || '').trim();
    const precio = Number(fila.precio);
    const stock = Number(fila.stock);
    const oferta = Boolean(fila.oferta);

    if (!codigo || !nombre || !categoria || Number.isNaN(precio) || Number.isNaN(stock)) {
      return;
    }

    const actualizada = lista.map((p) =>
      p.id === id
        ? {
            ...p,
            codigo,
            nombre,
            categoria,
            precio: Math.max(0, precio),
            stock: Math.max(0, stock),
            oferta,
          }
        : p
    );

    setLista(actualizada);
    guardarProductos(actualizada);
  };

  return (
    <div className="admin-productos-page">
      <main className="admin-productos-content">
        <section className="admin-productos-card">
          <div style={{ marginBottom: '12px' }}>
            <Link to="/admin" className="admin-btn admin-btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
              ← Volver al Dashboard
            </Link>
          </div>
          <h2 className="admin-productos-title">Gestión de Productos</h2>
          <p className="admin-productos-subtitle">
            Agrega, edita y actualiza stock de productos desde un solo lugar.
          </p>

          <form className="admin-form-grid" onSubmit={handleAgregarProducto}>
            <input
              className="admin-input"
              placeholder="Código"
              value={nuevo.codigo}
              onChange={(e) => handleNuevoChange('codigo', e.target.value)}
            />
            <input
              className="admin-input"
              placeholder="Nombre"
              value={nuevo.nombre}
              onChange={(e) => handleNuevoChange('nombre', e.target.value)}
            />
            <input
              className="admin-input"
              placeholder="Categoría"
              value={nuevo.categoria}
              onChange={(e) => handleNuevoChange('categoria', e.target.value)}
            />
            <input
              className="admin-input"
              type="number"
              min="0"
              placeholder="Precio"
              value={nuevo.precio}
              onChange={(e) => handleNuevoChange('precio', e.target.value)}
            />
            <input
              className="admin-input"
              type="number"
              min="0"
              placeholder="Stock"
              value={nuevo.stock}
              onChange={(e) => handleNuevoChange('stock', e.target.value)}
            />
            <label className="admin-check" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={nuevo.oferta}
                onChange={(e) => handleNuevoChange('oferta', e.target.checked)}
              />
              En oferta
            </label>
            <button type="submit" className="admin-btn admin-btn-primary">
              Agregar producto
            </button>
          </form>

          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Oferta</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {lista.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <input
                        className="admin-input"
                        value={edicion[p.id]?.codigo ?? ''}
                        onChange={(e) => handleEdicionChange(p.id, 'codigo', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="admin-input"
                        value={edicion[p.id]?.nombre ?? ''}
                        onChange={(e) => handleEdicionChange(p.id, 'nombre', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="admin-input"
                        value={edicion[p.id]?.categoria ?? ''}
                        onChange={(e) => handleEdicionChange(p.id, 'categoria', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="admin-input"
                        type="number"
                        min="0"
                        value={edicion[p.id]?.precio ?? ''}
                        onChange={(e) => handleEdicionChange(p.id, 'precio', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="admin-input"
                        type="number"
                        min="0"
                        value={edicion[p.id]?.stock ?? ''}
                        onChange={(e) => handleEdicionChange(p.id, 'stock', e.target.value)}
                      />
                    </td>
                    <td>
                      <label className="admin-check" style={{ display: 'flex', justifyContent: 'center' }}>
                        <input
                          type="checkbox"
                          checked={Boolean(edicion[p.id]?.oferta)}
                          onChange={(e) => handleEdicionChange(p.id, 'oferta', e.target.checked)}
                        />
                      </label>
                    </td>
                    <td>
                      <div className="admin-row-actions">
                        <button
                          type="button"
                          className="admin-btn admin-btn-success"
                          onClick={() => handleGuardarFila(p.id)}
                        >
                          Guardar cambios
                        </button>
                        <button
                          type="button"
                          className="admin-btn admin-btn-danger"
                          onClick={() => handleDelete(p.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {lista.length === 0 && (
                  <tr>
                    <td colSpan="7" className="admin-empty">
                      No hay productos cargados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminProductos;
