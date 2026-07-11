# TODO - Mejoras carrito (descuentos + UI naranjo + modal bonito)

- [x] Revisar y actualizar `src/context/CartContext.jsx` para soportar `precioOriginal`, `descuentoPct` y `ahorroTotal`.
- [x] Actualizar `src/pages/Ofertas.jsx` para enviar metadatos de descuento al carrito.
- [x] Actualizar `src/components/CardProducto.jsx` para enviar estructura de precio consistente sin descuento.
- [x] Actualizar `src/pages/Cart.jsx` para mostrar:
  - precio original tachado,
  - descuento (%),
  - precio final por ítem,
  - ahorro total del carrito.
- [x] Actualizar `src/components/CartModal.jsx` para mostrar la misma lógica de descuentos y ahorro.
- [x] Cambiar botón carrito en `Navbar` a color naranjo.
- [x] Cambiar comportamiento de clic en carrito para abrir `CartModal`.
- [x] Aplicar rediseño visual “bonito” del modal con paleta naranjo.
- [x] Corregir agregar al carrito desde `src/pages/DetalleProducto.jsx` (botón + contexto + tamaño + mensaje).
- [ ] Crear `src/components/TrackingSimulationModal.jsx` para simular seguimiento de envío.
- [ ] Integrar ventana de simulación en `src/components/CartModal.jsx` después de confirmar envío.
- [ ] Agregar estilos de simulación en `src/components/CartModal.css`.
- [ ] Ejecutar validación manual de flujo (oferta + normal + mixto + detalle producto + simulación de envío) en carrito y modal.
