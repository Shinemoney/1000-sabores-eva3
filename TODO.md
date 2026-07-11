# TODO - Implementar visualización de descuentos en carrito

- [x] Revisar y actualizar `src/context/CartContext.jsx` para soportar `precioOriginal`, `descuentoPct` y `ahorroTotal`.
- [x] Actualizar `src/pages/Ofertas.jsx` para enviar metadatos de descuento al carrito.
- [x] Actualizar `src/components/CardProducto.jsx` para enviar estructura de precio consistente sin descuento.
- [x] Actualizar `src/pages/Cart.jsx` para mostrar:
  - precio original tachado,
  - descuento (%),
  - precio final por ítem,
  - ahorro total del carrito.
- [x] Actualizar `src/components/CartModal.jsx` para mostrar la misma lógica de descuentos y ahorro.
- [ ] Ejecutar validación manual de flujo (oferta + normal + mixto) en carrito y modal.
