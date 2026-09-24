const BENEFICIOS = [
  { icono: '🚚', titulo: 'Envío rápido', texto: 'Recibe tus juegos en tiempo récord en tu domicilio.' },
  { icono: '💳', titulo: 'Pago seguro', texto: 'Todas tus transacciones están cifradas y protegidas.' },
  { icono: '🎧', titulo: 'Soporte 24/7', texto: 'Atención personalizada para tus dudas a toda hora.' },
];

/** Sección "¿Por qué comprar con nosotros?" generada a partir de un arreglo. */
export default function Beneficios() {
  return (
    <section id="nosotros" className="mb-5">
      <h2 className="text-center mb-4 fw-bold" style={{ color: 'var(--color-primario)' }}>¿Por qué comprar con nosotros?</h2>
      <div className="row g-4 text-center justify-content-center">
        {BENEFICIOS.map((b) => (
          <div className="col-12 col-sm-6 col-lg-4" key={b.titulo}>
            <div className="p-3 border rounded-3 shadow-sm bg-white h-100">
              <div className="fs-1">{b.icono}</div>
              <h3 className="h5 fw-bold mt-2">{b.titulo}</h3>
              <p className="text-secondary small mb-0">{b.texto}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
