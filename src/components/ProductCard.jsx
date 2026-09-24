import { formatearPrecio } from '../utils/formatearPrecio';

/** Tarjeta de un producto. Props: producto, onAgregar. */
export default function ProductCard({ producto, onAgregar }) {
  const { titulo, descripcion, imagen, precioNormal, precioOferta, categoria } = producto;
  const descuento = Math.round((1 - precioOferta / precioNormal) * 100);

  return (
    <div className="col-12 col-sm-6 col-lg-4">
      <div className="card h-100 shadow-sm producto-card border-0">
        <img src={`${import.meta.env.BASE_URL}${imagen}`} className="card-img-top" alt={`Carátula de ${titulo}`} loading="lazy" />
        <div className="card-body d-flex flex-column bg-light rounded-bottom">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <span className="badge bg-secondary">{categoria}</span>
            <span className="badge bg-danger">-{descuento}%</span>
          </div>
          <h3 className="card-title h5 fw-bold" style={{ color: 'var(--color-secundario)' }}>{titulo}</h3>
          <p className="card-text text-secondary small">{descripcion}</p>
          <p className="mb-2">
            <s className="text-secondary small me-2">{formatearPrecio(precioNormal)}</s>
            <span className="fw-bold fs-5" style={{ color: 'var(--color-primario)' }}>{formatearPrecio(precioOferta)}</span>
          </p>
          <button type="button" className="btn btn-custom mt-auto fw-bold" onClick={() => onAgregar(producto)}>
            Agregar al carrito 🛒
          </button>
        </div>
      </div>
    </div>
  );
}
