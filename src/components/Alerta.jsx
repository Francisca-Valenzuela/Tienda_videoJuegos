import { useEffect } from 'react';

/** Alerta de Bootstrap que se cierra sola a los 4 segundos. Props: tipo, mensaje, onCerrar. */
export default function Alerta({ tipo, mensaje, onCerrar }) {
  useEffect(() => {
    const temporizador = setTimeout(onCerrar, 4000);
    return () => clearTimeout(temporizador); // limpieza al desmontar
  }, [onCerrar]);

  return (
    <div className={`alert alert-${tipo} alert-dismissible fade show mb-2 mt-3`} role="alert">
      {mensaje}
      <button type="button" className="btn-close" aria-label="Cerrar" onClick={onCerrar}></button>
    </div>
  );
}
