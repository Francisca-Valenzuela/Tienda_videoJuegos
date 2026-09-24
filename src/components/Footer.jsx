/** Pie de página. */
export default function Footer() {
  return (
    <footer className="text-center py-4 mt-auto footer-bg">
      <div className="container text-white">
        <p className="fw-bold mb-1">© 2026 Videojuegos. Todos los derechos reservados.</p>
        <p className="mb-1 text-light opacity-75 small">Calle Wallaby 42, Sídney</p>
        <p className="mb-1 text-light opacity-75 small">soporte@videojuegos.cl</p>
        <p className="mb-0 text-light opacity-75 small">
          <a href="#" className="text-light text-decoration-none mx-1">📷 Instagram</a> ·{' '}
          <a href="#" className="text-light text-decoration-none mx-1">🐦 X</a> ·{' '}
          <a href="#" className="text-light text-decoration-none mx-1">🎮 Discord</a>
        </p>
      </div>
    </footer>
  );
}
