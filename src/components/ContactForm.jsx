import { useState } from 'react';

const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INICIAL = { nombre: '', email: '', mensaje: '' };

/** 
 * Formulario de contacto con inputs controlados (onChange) y validación al enviar (onSubmit). 
 * Se ha mejorado la accesibilidad mediante el uso de atributos ARIA.
 */
export default function ContactForm() {
  const [datos, setDatos] = useState(INICIAL);
  const [aviso, setAviso] = useState(null); // Estado para renderizado condicional de la alerta: { tipo, texto }

  // Handler dinámico para actualizar el estado basado en el atributo 'name' del input
  const manejarCambio = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

  const manejarSubmit = (e) => {
    e.preventDefault();
    const { nombre, email, mensaje } = datos;
    
    // Validación de campos vacíos
    if (!nombre.trim() || !email.trim() || !mensaje.trim()) {
      return setAviso({ tipo: 'danger', texto: 'Por favor, completa todos los campos obligatorios del formulario antes de enviar.' });
    }
    
    // Validación mediante expresión regular para el correo
    if (!REGEX_CORREO.test(email.trim())) {
      return setAviso({ tipo: 'danger', texto: 'Por favor, ingresa un correo electrónico válido que contenga un "@" y un dominio.' });
    }
    
    // Éxito
    setAviso({ tipo: 'success', texto: `Gracias por contactarnos, ${nombre.trim()}. Hemos recibido tu mensaje y te responderemos a ${email.trim()}.` });
    setDatos(INICIAL);
  };

  const etiqueta = { color: 'var(--color-secundario)' };

  return (
    <section id="contacto" className="p-4 rounded-4 shadow-sm bg-white border" style={{ borderColor: '#eee' }}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="text-center mb-4">
            <h2 className="h4 mb-3 fw-bold" style={{ color: 'var(--color-primario)' }}>Contacto</h2>
            <p className="text-secondary">
              ¿Tienes dudas sobre nuestros productos? Escríbenos a{' '}
              <a href="mailto:soporte@videojuegos.cl" className="text-decoration-none fw-bold text-dark">soporte@videojuegos.cl</a>{' '}
              o completa el siguiente formulario:
            </p>
          </div>
          
          <form onSubmit={manejarSubmit} noValidate>
            
            {/* Renderizado condicional de la alerta. aria-live="assertive" asegura que los lectores de pantalla lo anuncien de inmediato */}
            {aviso && (
              <div 
                className={`alert alert-${aviso.tipo} alert-dismissible fade show mb-4`} 
                role="alert"
                aria-live="assertive" 
              >
                <strong>{aviso.tipo === 'danger' ? '¡Error!' : '¡Éxito!'}</strong> {aviso.texto}
                <button type="button" className="btn-close" aria-label="Cerrar" onClick={() => setAviso(null)}></button>
              </div>
            )}
            
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label fw-bold" style={etiqueta}>Nombre: <span className="text-danger" aria-hidden="true">*</span></label>
              <input type="text" className="form-control" id="nombre" name="nombre" placeholder="Ingresa tu nombre" value={datos.nombre} onChange={manejarCambio} aria-required="true" />
            </div>
            
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold" style={etiqueta}>Correo electrónico: <span className="text-danger" aria-hidden="true">*</span></label>
              <input type="email" className="form-control" id="email" name="email" placeholder="ejemplo@correo.com" value={datos.email} onChange={manejarCambio} aria-required="true" />
            </div>
            
            <div className="mb-4">
              <label htmlFor="mensaje" className="form-label fw-bold" style={etiqueta}>Mensaje: <span className="text-danger" aria-hidden="true">*</span></label>
              <textarea className="form-control" id="mensaje" name="mensaje" rows="4" placeholder="Escribe tu mensaje aquí..." value={datos.mensaje} onChange={manejarCambio} aria-required="true"></textarea>
            </div>
            
            <div className="text-center">
              <button type="submit" className="btn btn-custom fw-bold px-5 py-2">Enviar mensaje</button>
            </div>
          </form>
          
        </div>
      </div>
    </section>
  );
}