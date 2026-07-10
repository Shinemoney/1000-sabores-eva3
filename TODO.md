# TODO - Mejoras de páginas informativas

## Blog (vista + detalle por artículo)
- [x] Revisar `src/pages/Blog.jsx` y `src/pages/Blog.css`.
- [x] Reestructurar `Blog.jsx` para coincidir con la referencia (título, subtítulo y 3 tarjetas).
- [x] Actualizar `Blog.css` para replicar estilo visual (tipografía, colores, bordes, layout responsive).
- [x] Verificar consistencia de textos y jerarquía visual.
- [x] Crear `src/pages/BlogDetalle.jsx`.
- [x] Crear `src/pages/BlogDetalle.css`.
- [x] Agregar ruta dinámica `/blog/:id` en `src/App.jsx`.
- [x] Convertir CTAs "Leer artículo" a enlaces dinámicos en `src/pages/Blog.jsx`.
- [x] Verificar renderizado de artículo individual + botón "Volver al Blog".

## Nosotros (estilo profesional)
- [x] Revisar `src/pages/Nosotros.jsx` y `src/pages/Nosotros.css`.
- [x] Mejorar estructura visual en `Nosotros.jsx` (subtítulo + etiquetas de sección).
- [x] Aplicar rediseño premium en `Nosotros.css` (jerarquía, espaciado, hover y responsive).
- [x] Verificar consistencia visual con el resto del sitio.

## Categorías (flujo tarjeta -> listado -> productos por categoría)
- [x] Revisar `src/pages/Categorias.jsx`, `src/pages/Categorias.css`, `src/pages/VistaProductosPorCategoria.jsx` y `src/data/mockDatabase.js`.
- [x] Mostrar 4 categorías destacadas de forma dinámica en `Categorias.jsx`.
- [x] Navegar al hacer clic en cada categoría hacia `/categoria/:nombreCategoria`.
- [x] Mejorar estilos de tarjetas de categorías en `Categorias.css`.
- [x] Mejorar la vista `VistaProductosPorCategoria.jsx` (estado vacío + volver a categorías).
- [x] Verificar consistencia del flujo completo.
- [x] Mostrar imagen de producto en `VistaProductosPorCategoria.jsx`.
- [x] Crear estilos dedicados en `src/pages/VistaProductosPorCategoria.css`.

## Formularios (validación + mensajes)
- [x] Mejorar `useFormValidation` para mensajes por campo con nombre visible.
- [x] Actualizar `Registro.jsx` con errores por campo en rojo y mensaje de éxito en pantalla.
- [x] Actualizar `Contacto.jsx` con errores por campo en rojo y mensaje de éxito en pantalla.
- [x] Actualizar `Login.jsx` con validación de vacíos por campo y mensaje de éxito.
- [x] Ajustar estilos en `Login.css` para mensajes de estado.
- [x] Convertir `region` y `comuna` a campos `<select>` en `Registro.jsx`.
- [x] Agrandar un poco el botón "Registrarse".
- [x] Forzar borde rojo visible en `Contacto.jsx` cuando haya error de validación.
- [x] Forzar borde rojo visible en `Login.jsx` cuando haya error de validación.
- [x] Quitar datos sugeridos automáticos en placeholders de Login.
- [x] Persistir usuarios registrados en localStorage desde `Registro.jsx`.
- [x] Validar login con usuarios registrados en `AuthContext.jsx` (manteniendo admin fijo).
- [x] Confirmar flujo real registro -> iniciar sesión en `Login.jsx`.

## Separación de acceso usuario vs admin
- [x] Separar funciones de autenticación en `AuthContext.jsx` (`loginUser` y `loginAdmin`).
- [x] Ajustar `Login.jsx` para usar solo `loginUser`.
- [x] Crear `AdminLogin.jsx` para acceso exclusivo admin.
- [x] Actualizar rutas en `App.jsx` (`/login` usuarios, `/admin-login` admin).
- [x] Cambiar tarjeta "Acceso Administrador" en `Home.jsx` hacia `/admin-login`.

## Home lateral izquierda (tarjetas café)
- [x] Reestructurar `Home.jsx` a layout lateral izquierdo (vertical y compacto).
- [x] Aplicar estilo profesional café en `Home.css` para las 3 tarjetas.
- [x] Verificar consistencia responsive y mantener modal de horario.
