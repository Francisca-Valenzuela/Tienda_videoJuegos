import { useState, useEffect } from 'react';

const BASE = import.meta.env.BASE_URL;
const SLIDES = [
  { img: 'minecraft.webp', titulo: 'Minecraft', texto: 'Construye, explora y sobrevive en un mundo abierto de bloques.' },
  { img: 'resident_evil_4_remake.webp', titulo: 'Resident Evil 4 Remake', texto: 'Sobrevive al horror en la piel de Leon S. Kennedy.' },
  { img: 'hogwarts_legacy.webp', titulo: 'Hogwarts Legacy', texto: 'Vive la experiencia de estudiar magia en Hogwarts.' },
];

/** Carrusel de destacados controlado con useState y useEffect (cambia cada 3 s). */
export default function Carrusel() {
  const [actual, setActual] = useState(0);
  const ir = (i) => setActual((i + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const intervalo = setInterval(() => setActual((a) => (a + 1) % SLIDES.length), 3000);
    return () => clearInterval(intervalo); // se reinicia al cambiar de slide manualmente
  }, [actual]);

  return (
    <section aria-label="Destacados">
      <div className="carousel slide">
        <div className="carousel-indicators">
          {SLIDES.map((s, i) => (
            <button key={s.img} type="button" className={i === actual ? 'active' : ''} aria-label={`Slide ${i + 1}`} onClick={() => ir(i)}></button>
          ))}
        </div>
        <div className="carousel-inner">
          {SLIDES.map((s, i) => (
            <div key={s.img} className={`carousel-item ${i === actual ? 'active' : ''}`}>
              <img src={`${BASE}img/${s.img}`} className="d-block w-100 object-fit-cover carousel-img" alt={`Carátula del juego ${s.titulo}`} />
              <div className="carousel-caption">
                <h5 className="fw-bold bg-dark bg-opacity-50 d-inline-block p-2 rounded">{s.titulo}</h5>
                <p className="d-none d-md-block">{s.texto}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" onClick={() => ir(actual - 1)}>
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" onClick={() => ir(actual + 1)}>
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>
    </section>
  );
}
