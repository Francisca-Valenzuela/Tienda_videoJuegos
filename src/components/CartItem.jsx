import { formatearPrecio } from '../utils/formatearPrecio';

/** Una línea del carrito con botones − / + y eliminar. */
export default function CartItem({ item, onSumar, onRestar, onQuitar }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center px-0 bg-transparent">
      <span className="small">{item.titulo} <span className="text-secondary">x{item.cantidad}</span></span>
      <span className="d-flex align-items-center gap-2">
        <strong className="small">{formatearPrecio(item.precioOferta * item.cantidad)}</strong>
        <button type="button" className="btn btn-sm btn-outline-secondary py-0 px-2" aria-label={`Restar una unidad de ${item.titulo}`} onClick={() => onRestar(item.id)}>−</button>
        <button type="button" className="btn btn-sm btn-outline-secondary py-0 px-2" aria-label={`Sumar una unidad de ${item.titulo}`} onClick={() => onSumar(item.id)}>+</button>
        <button type="button" className="btn btn-sm btn-outline-danger py-0 px-2" aria-label={`Quitar ${item.titulo} del carrito`} onClick={() => onQuitar(item.id)}>✕</button>
      </span>
    </li>
  );
}
