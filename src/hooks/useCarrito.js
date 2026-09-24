import { useState, useCallback } from 'react';

/**
 * Hook personalizado con toda la lógica del carrito (estado con useState).
 * Devuelve el carrito, las acciones y los valores calculados (cantidad y total).
 * Las acciones usan useCallback con dependencias vacías: como actualizan el
 * estado con la forma funcional (prev => ...), su referencia nunca cambia.
 */
export default function useCarrito() {
  const [carrito, setCarrito] = useState([]);

  // Agrega un producto o suma 1 a su cantidad si ya existe
  const agregar = useCallback((producto) =>
    setCarrito((prev) =>
      prev.some((i) => i.id === producto.id)
        ? prev.map((i) => (i.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i))
        : [...prev, { ...producto, cantidad: 1 }]
    ), []);

  // Resta 1 unidad; si llega a 0 el producto se elimina
  const restar = useCallback((id) =>
    setCarrito((prev) =>
      prev.map((i) => (i.id === id ? { ...i, cantidad: i.cantidad - 1 } : i)).filter((i) => i.cantidad > 0)
    ), []);

  // Elimina por completo un producto del carrito
  const quitar = useCallback((id) => setCarrito((prev) => prev.filter((i) => i.id !== id)), []);

  // Deja el carrito vacío
  const vaciar = useCallback(() => setCarrito([]), []);

  // Valores derivados: no necesitan estado propio
  const cantidadTotal = carrito.reduce((acc, i) => acc + i.cantidad, 0);
  const total = carrito.reduce((acc, i) => acc + i.precioOferta * i.cantidad, 0);

  return { carrito, agregar, restar, quitar, vaciar, cantidadTotal, total };
}