import { useState, useEffect, useMemo, useCallback } from 'react';
import useCarrito from './hooks/useCarrito';
import Navbar from './components/Navbar';
import Alerta from './components/Alerta';
import Hero from './components/Hero';
import Carrusel from './components/Carrusel';
import Beneficios from './components/Beneficios';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

/**
 * Componente raíz: concentra el estado compartido de la tienda
 * y gestiona el ciclo de vida de la carga de productos.
 */
export default function App() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('todos');
  const [alerta, setAlerta] = useState(null);

  // Custom hook que abstrae la lógica del carrito de compras
  const carro = useCarrito();
  const { agregar } = carro; // referencia estable gracias al useCallback del hook

  // useEffect: carga el catálogo asegurando la limpieza (cleanup) con AbortController
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetch(`${import.meta.env.BASE_URL}productos.json`, { signal })
      .then((r) => {
        if (!r.ok) throw new Error(`Error de red: ${r.status}`);
        return r.json();
      })
      .then(setProductos)
      .catch((e) => {
        // Ignorar el error si la petición fue abortada intencionalmente al desmontar
        if (e.name !== 'AbortError') {
          console.error('Error al cargar productos:', e);
          setError('No fue posible cargar el catálogo. Por favor, intenta más tarde.');
        }
      })
      .finally(() => {
        // Solo se termina la carga si la petición no fue abortada
        if (!signal.aborted) setCargando(false);
      });

    return () => controller.abort(); // Limpieza al desmontar el componente
  }, []);

  // useMemo: filtra productos solo cuando cambian las dependencias relevantes
  const visibles = useMemo(
    () =>
      productos.filter(
        (p) =>
          (categoria === 'todos' || p.categoria === categoria) &&
          p.titulo.toLowerCase().includes(busqueda.trim().toLowerCase())
      ),
    [productos, categoria, busqueda]
  );

  const cerrarAlerta = useCallback(() => setAlerta(null), []);

  // useCallback: mantiene la misma referencia mientras "agregar" no cambie
  const manejarAgregar = useCallback(
    (producto) => {
      agregar(producto);
      setAlerta({ id: Date.now(), tipo: 'success', mensaje: `"${producto.titulo}" se agregó al carrito.` });
    },
    [agregar]
  );

  const manejarCategoria = (cat) => {
    setCategoria(cat);
    setBusqueda('');
  };

  const irAProductos = () => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar
        cantidad={carro.cantidadTotal}
        categoria={categoria}
        onCategoria={manejarCategoria}
        busqueda={busqueda}
        onBusqueda={setBusqueda}
        onBuscar={irAProductos}
      />

      {/* Renderizado condicional de la alerta temporal */}
      {alerta && (
        <div className="bg-alertas-wrapper" aria-live="assertive">
          <div className="container">
            <Alerta key={alerta.id} tipo={alerta.tipo} mensaje={alerta.mensaje} onCerrar={cerrarAlerta} />
          </div>
        </div>
      )}

      <Hero />
      <Carrusel />

      <main className="container my-5">
        <Beneficios />
        <ProductList
          productos={visibles}
          cargando={cargando}
          error={error}
          busqueda={busqueda}
          onAgregar={manejarAgregar}
        />
        <ShoppingCart
          carrito={carro.carrito}
          cantidadTotal={carro.cantidadTotal}
          total={carro.total}
          onSumar={manejarAgregar} /* Se pasa la función directamente */
          onRestar={carro.restar}
          onQuitar={carro.quitar}
          onVaciar={carro.vaciar}
        />
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
}
