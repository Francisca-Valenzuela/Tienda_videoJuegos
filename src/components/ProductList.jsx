import ProductCard from './ProductCard';

/** Listado de productos con renderizado condicional: cargando, error, sin resultados o lista. */
export default function ProductList({ productos, cargando, error, busqueda, onAgregar }) {
  let contenido;
  if (cargando) {
    contenido = <div className="text-center"><div className="spinner-border" role="status"><span className="visually-hidden">Cargando...</span></div></div>;
  } else if (error) {
    contenido = <div className="alert alert-danger" role="alert">{error}</div>;
  } else if (productos.length === 0) {
    contenido = (
      <p className="text-secondary text-center">
        {busqueda ? <>No se encontraron juegos que coincidan con "<strong>{busqueda}</strong>".</> : 'No hay juegos en esta categoría.'}
      </p>
    );
  } else {
    contenido = (
      <div className="row g-4 justify-content-center">
        {productos.map((p) => <ProductCard key={p.id} producto={p} onAgregar={onAgregar} />)}
      </div>
    );
  }

  return (
    <section id="productos" className="mb-5">
      <h2 className="text-center mb-4 fw-bold" style={{ color: 'var(--color-primario)' }}>Productos Destacados</h2>
      {contenido}
    </section>
  );
}
