import { formatearPrecio } from '../utils/formatearPrecio';

/** Muestra el total a pagar. Props: total. */
export default function CartTotal({ total }) {
  return (
    <div className="d-flex justify-content-between align-items-center border-top pt-3">
      <strong style={{ color: 'var(--color-secundario)' }}>Total:</strong>
      <strong style={{ color: 'var(--color-primario)' }}>{formatearPrecio(total)}</strong>
    </div>
  );
}
