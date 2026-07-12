import React, { createContext, useState, useEffect, useMemo } from 'react';

export const CartContext = createContext();

const ESTADOS_PEDIDO = ['preparacion', 'despacho', 'entrega'];

export const CartProvider = ({ children }) => {
  // Carrito
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Pedido actual
  const [pedidoActual, setPedidoActual] = useState(() => {
    const savedPedido = localStorage.getItem('pedidoActual');
    return savedPedido ? JSON.parse(savedPedido) : null;
  });

  // Checkout y pago simulado
  const [checkoutDraft, setCheckoutDraft] = useState(() => {
    const savedDraft = localStorage.getItem('checkoutDraft');
    return savedDraft ? JSON.parse(savedDraft) : null;
  });

  const [paymentResult, setPaymentResult] = useState(() => {
    const savedResult = localStorage.getItem('paymentResult');
    return savedResult ? JSON.parse(savedResult) : null;
  });

  // Persistencia
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (pedidoActual) {
      localStorage.setItem('pedidoActual', JSON.stringify(pedidoActual));
    } else {
      localStorage.removeItem('pedidoActual');
    }
  }, [pedidoActual]);

  useEffect(() => {
    if (checkoutDraft) {
      localStorage.setItem('checkoutDraft', JSON.stringify(checkoutDraft));
    } else {
      localStorage.removeItem('checkoutDraft');
    }
  }, [checkoutDraft]);

  useEffect(() => {
    if (paymentResult) {
      localStorage.setItem('paymentResult', JSON.stringify(paymentResult));
    } else {
      localStorage.removeItem('paymentResult');
    }
  }, [paymentResult]);

  // Resumen de carrito
  const resumen = useMemo(() => {
    const cantidadTotal = cart.reduce((acc, item) => acc + item.cantidad, 0);
    const subtotal = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    const ahorroTotal = cart.reduce((acc, item) => {
      const precioOriginal = item.precioOriginal ?? item.precio;
      const ahorroUnitario = Math.max(precioOriginal - item.precio, 0);
      return acc + ahorroUnitario * item.cantidad;
    }, 0);
    const despacho = subtotal > 0 ? 2990 : 0;
    const total = subtotal + despacho;

    return {
      cantidadTotal,
      subtotal,
      ahorroTotal,
      despacho,
      total,
    };
  }, [cart]);

  // Carrito: agregar producto
  const addToCart = (producto) => {
    setCart((prev) => {
      const productoNormalizado = {
        ...producto,
        precioOriginal: producto.precioOriginal ?? producto.precio,
        descuentoPct: producto.descuentoPct ?? 0,
      };

      const existe = prev.find((item) => item.id === productoNormalizado.id);

      if (existe) {
        return prev.map((item) =>
          item.id === productoNormalizado.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }

      return [...prev, { ...productoNormalizado, cantidad: 1 }];
    });
  };

  // Carrito: eliminar producto
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Carrito: actualizar cantidad por delta (+1 / -1)
  const updateCantidad = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nuevaCantidad = item.cantidad + delta;
            return { ...item, cantidad: nuevaCantidad };
          }
          return item;
        })
        .filter((item) => item.cantidad > 0)
    );
  };

  // Carrito: establecer cantidad exacta
  const setCantidad = (id, cantidad) => {
    const cantidadSegura = Number(cantidad);
    if (Number.isNaN(cantidadSegura)) return;

    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, cantidad: cantidadSegura } : item))
        .filter((item) => item.cantidad > 0)
    );
  };

  // Crear boleta local
  const generarBoleta = ({ fechaEntrega, direccionEntrega }) => {
    return {
      folio: `BOL-${Date.now()}`,
      emitidaEn: new Date().toISOString(),
      items: cart.map((item) => ({
        id: item.id,
        nombre: item.nombre,
        precioOriginal: item.precioOriginal ?? item.precio,
        descuentoPct: item.descuentoPct ?? 0,
        precioUnitario: item.precio,
        cantidad: item.cantidad,
        subtotal: item.precio * item.cantidad,
      })),
      subtotal: resumen.subtotal,
      ahorroTotal: resumen.ahorroTotal,
      despacho: resumen.despacho,
      total: resumen.total,
      fechaEntregaPreferida: fechaEntrega,
      direccionEntrega: direccionEntrega || 'No especificada',
    };
  };

  // Confirmación de pedido y creación de tracking
  const confirmarPedido = ({ fechaEntrega, direccionEntrega }) => {
    if (!cart.length) return { ok: false, message: 'El carrito está vacío' };
    if (!fechaEntrega) return { ok: false, message: 'Debes seleccionar una fecha de entrega' };

    const boleta = generarBoleta({ fechaEntrega, direccionEntrega });
    const codigoSeguimiento = `TRK-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    const nuevoPedido = {
      id: `PED-${Date.now()}`,
      creadoEn: new Date().toISOString(),
      estadoIndex: 0,
      estado: ESTADOS_PEDIDO[0],
      estadosDisponibles: ESTADOS_PEDIDO,
      tracking: {
        codigo: codigoSeguimiento,
        actualizadoEn: new Date().toISOString(),
        historial: [
          {
            estado: ESTADOS_PEDIDO[0],
            timestamp: new Date().toISOString(),
            descripcion: 'Pedido confirmado, iniciando preparación',
          },
        ],
      },
      boleta,
    };

    setPedidoActual(nuevoPedido);
    setCart([]);

    return { ok: true, pedido: nuevoPedido };
  };

  // Avanza estado del pedido (simulación frontend)
  const avanzarEstadoPedido = () => {
    setPedidoActual((prev) => {
      if (!prev) return prev;
      if (prev.estadoIndex >= ESTADOS_PEDIDO.length - 1) return prev;

      const siguienteIndex = prev.estadoIndex + 1;
      const siguienteEstado = ESTADOS_PEDIDO[siguienteIndex];
      const descripcionPorEstado = {
        despacho: 'Pedido en despacho hacia destino',
        entrega: 'Pedido entregado exitosamente',
      };

      return {
        ...prev,
        estadoIndex: siguienteIndex,
        estado: siguienteEstado,
        tracking: {
          ...prev.tracking,
          actualizadoEn: new Date().toISOString(),
          historial: [
            ...prev.tracking.historial,
            {
              estado: siguienteEstado,
              timestamp: new Date().toISOString(),
              descripcion: descripcionPorEstado[siguienteEstado] || 'Actualización de estado',
            },
          ],
        },
      };
    });
  };

  // Compatibilidad con implementación previa
  const finalizarPedido = async () => {
    const resultado = confirmarPedido({
      fechaEntrega: new Date().toISOString().split('T')[0],
      direccionEntrega: 'Dirección no especificada',
    });

    if (!resultado.ok) return;

    try {
      await fetch('http://localhost:5000/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pedido: resultado.pedido,
        }),
      });
    } catch (error) {
      console.error('No se pudo sincronizar pedido con backend:', error);
    }
  };

  const limpiarCarrito = () => setCart([]);

  const generarNumeroOrden = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `#${y}${m}${d}-${Math.floor(1000 + Math.random() * 9000)}`;
  };

  const guardarCheckoutDraft = (draft) => {
    setCheckoutDraft(draft);
  };

  const procesarPagoSimulado = ({ cliente, direccion, fechaEntrega, forzarError = false }) => {
    if (!cart.length) return { ok: false, message: 'El carrito está vacío' };
    if (!cliente?.nombre || !cliente?.apellidos || !cliente?.email) {
      return { ok: false, message: 'Completa los datos del cliente' };
    }
    if (!direccion?.calle || !direccion?.region || !direccion?.comuna) {
      return { ok: false, message: 'Completa la dirección de entrega' };
    }
    if (!fechaEntrega) return { ok: false, message: 'Debes seleccionar fecha de entrega' };

    const resultadoExitoso = !forzarError;
    const numeroOrden = generarNumeroOrden();

    if (resultadoExitoso) {
      const direccionTexto = `${direccion.calle}${direccion.departamento ? `, Depto ${direccion.departamento}` : ''}, ${direccion.comuna}, ${direccion.region}${direccion.indicaciones ? ` (${direccion.indicaciones})` : ''}`;
      const confirmacion = confirmarPedido({
        fechaEntrega,
        direccionEntrega: direccionTexto,
      });

      if (!confirmacion.ok) return confirmacion;

      const result = {
        status: 'success',
        numeroOrden,
        creadoEn: new Date().toISOString(),
        cliente,
        direccion,
        pedido: confirmacion.pedido,
      };

      setPaymentResult(result);
      return { ok: true, result };
    }

    const result = {
      status: 'error',
      numeroOrden,
      creadoEn: new Date().toISOString(),
      cliente,
      direccion,
      cartSnapshot: cart,
      resumenSnapshot: resumen,
      motivo: 'No se pudo realizar el pago',
    };

    setPaymentResult(result);
    return { ok: true, result };
  };

  const limpiarResultadoPago = () => setPaymentResult(null);
  const limpiarPedidoActual = () => setPedidoActual(null);

  return (
    <CartContext.Provider
      value={{
        cart,
        resumen,
        pedidoActual,
        addToCart,
        removeFromCart,
        updateCantidad,
        setCantidad,
        confirmarPedido,
        avanzarEstadoPedido,
        limpiarPedidoActual,
        finalizarPedido,
        limpiarCarrito,
        checkoutDraft,
        guardarCheckoutDraft,
        paymentResult,
        procesarPagoSimulado,
        limpiarResultadoPago,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
