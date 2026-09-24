import { useState } from 'react';

const CATEGORIAS = [
  { id: 'todos', texto: 'Productos' },
  { id: 'Acción', texto: 'Acción' },
  { id: 'Aventura', texto: 'Aventura' },
];

/** Barra de navegación con categorías, buscador y contador del carrito. */
export default function Navbar({ cantidad, categoria, onCategoria, busqueda, onBusqueda, onBuscar }) {
  const [abierto, setAbierto] = useState(false); // menú colapsable en móvil

  const manejarSubmit = (e) => {
    e.preventDefault();
    onBuscar();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={{ backgroundColor: 'var(--color-secundario)' }}>
      <div className="container-fluid px-4">
        <a className="navbar-brand fw-bold fs-3" href="#inicio">🎮 Videojuegos</a>
        <button className="navbar-toggler" type="button" aria-expanded={abierto} aria-label="Abrir menú de navegación" onClick={() => setAbierto(!abierto)}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse justify-content-end ${abierto ? 'show' : ''}`}>
          <ul className="navbar-nav gap-2 me-auto ms-lg-3">
            <li className="nav-item"><a className="nav-link" href="#inicio">Inicio</a></li>
            <li className="nav-item"><a className="nav-link" href="#nosotros">Nosotros</a></li>
            {CATEGORIAS.map((c) => (
              <li className="nav-item" key={c.id}>
                <a className={`nav-link ${categoria === c.id ? 'active' : ''}`} href="#productos" onClick={() => onCategoria(c.id)}>
                  {c.texto}
                </a>
              </li>
            ))}
            <li className="nav-item"><a className="nav-link" href="#contacto">Contacto</a></li>
          </ul>

          <form id="formulario-busqueda" className="d-flex my-2 my-lg-0 me-lg-3" role="search" onSubmit={manejarSubmit}>
            <label htmlFor="input-busqueda" className="visually-hidden">Buscar juego</label>
            <input className="form-control form-control-sm" type="search" id="input-busqueda" placeholder="Buscar juego..." value={busqueda} onChange={(e) => onBusqueda(e.target.value)} />
            <button className="btn btn-sm btn-custom ms-2" type="submit" aria-label="Buscar">🔍</button>
          </form>

          <a href="#carrito" className="btn btn-sm btn-custom position-relative align-self-start align-self-lg-center" title="Ver carrito">
            🛒 Carrito
            <span className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle" id="contador-carrito">{cantidad}</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
