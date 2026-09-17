/**
 * Archivo Principal de JavaScript - Tienda de Videojuegos
 * Asignatura: Desarrollo Frontend I (PFY2201)
 * Descripción: Manejo de carga asincrónica con Fetch API, interactividad mediante eventos
 *              y validación robusta de formularios con retroalimentación visual accesible.
 */

// Ejecución principal al cargar completamente el DOM del documento
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    configurarFormulario();
});

/**
 * Función que obtiene productos desde un archivo JSON local usando Fetch API.
 * Incorpora manejo de promesas y retroalimentación de errores al usuario.
 */
function cargarProductos() {
    fetch('productos.json')
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error(`Error de red: ${respuesta.status} ${respuesta.statusText}`);
            }
            return respuesta.json();
        })
        .then(datos => {
            renderizarProductos(datos);
        })
        .catch(error => {
            // Brecha abordada: Se informa el error tanto en consola como visualmente en la interfaz
            console.error('Ocurrió un error en la carga de productos:', error);
            mostrarAlerta('No fue posible cargar el catálogo de productos en este momento. Por favor, intenta más tarde.', 'danger');
        });
}

/**
 * Función que crea y renderiza dinámicamente elementos en el DOM
 * @param {Array} productos - Arreglo de objetos con la información de los videojuegos
 */
function renderizarProductos(productos) {
    const contenedor = document.getElementById('contenedor-productos');

    // Validación de seguridad por si el contenedor no existe en el DOM
    if (!contenedor) return;

    productos.forEach(producto => {
        // Manipulación del DOM: Creación de un nuevo elemento div
        const columna = document.createElement('div');
        columna.className = 'col-12 col-sm-6 col-lg-4'; 

        // Manipulación del DOM: Uso de innerHTML para estructurar la tarjeta de forma semántica
        columna.innerHTML = `
            <div class="card h-100 shadow-sm producto-card border-0">
                <img src="${producto.imagen}" class="card-img-top" alt="Carátula de ${producto.titulo}" loading="lazy">
                <div class="card-body d-flex flex-column bg-light rounded-bottom">
                    <h3 class="card-title h5 fw-bold" style="color: var(--color-secundario);">${producto.titulo}</h3>
                    <p class="card-text text-secondary small">${producto.descripcion}</p>
                    <a href="#contacto" class="btn btn-custom mt-auto fw-bold btn-info-dinamico">Más información</a>
                </div>
            </div>
        `;

        // Manipulación del DOM: Inserción del elemento en el contenedor principal
        contenedor.appendChild(columna);
    });

    // Inicializamos eventos de mouse tras renderizar los nodos
    inicializarEventosMouse();
}

/**
 * Configura los eventos 'mouseover' y 'click' para las tarjetas y botones.
 * Brecha abordada: Se optimiza el registro de eventos evitando duplicidades.
 */
function inicializarEventosMouse() {
    const tarjetas = document.querySelectorAll('.producto-card');
    const botonesInfo = document.querySelectorAll('.btn-info-dinamico, a.btn-custom');

    // Evento mouseover y mouseout: Efecto visual de opacidad al pasar el cursor
    tarjetas.forEach(tarjeta => {
        // Evitamos añadir listeners múltiples si la función se invoca más de una vez
        tarjeta.removeEventListener('mouseover', manejarMouseOver);
        tarjeta.removeEventListener('mouseout', manejarMouseOut);

        tarjeta.addEventListener('mouseover', manejarMouseOver);
        tarjeta.addEventListener('mouseout', manejarMouseOut);
    });

    // Evento click en botones de información
    botonesInfo.forEach(boton => {
        boton.removeEventListener('click', manejarClickInfo);
        boton.addEventListener('click', manejarClickInfo);
    });
}

// Handlers independientes para prevenir duplicidad de referencias en memoria
function manejarMouseOver() {
    this.style.opacity = '0.9';
}

function manejarMouseOut() {
    this.style.opacity = '1';
}

function manejarClickInfo(evento) {
    evento.preventDefault();
    mostrarAlerta("Pronto tendremos más información detallada sobre este título en nuestra tienda.", "info");
    document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
}

/**
 * Función única que configura el evento 'submit' en el formulario de contacto.
 * Brecha abordada: Se elimina la función duplicada y se unifica con validación estricta de correo.
 */
function configurarFormulario() {
    const formulario = document.querySelector('form'); 

    if (!formulario) return;

    formulario.addEventListener('submit', function(evento) {
        // Evitamos que la página se recargue automáticamente
        evento.preventDefault();

        // Capturamos los valores de los campos
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        // 1. Validación de campos vacíos
        if (nombre === '' || email === '' || mensaje === '') {
            mostrarAlerta('Por favor, completa todos los campos del formulario antes de enviar.', 'danger');
            return;
        } 
        
        // 2. Validación específica de formato de correo electrónico mediante Expresión Regular
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexCorreo.test(email)) {
            mostrarAlerta('Por favor, ingresa un correo electrónico válido que contenga un "@" y un dominio.', 'danger');
            return;
        }

        // 3. Flujo exitoso (si pasa todas las validaciones)
        mostrarAlerta(`Gracias por contactarnos, ${nombre}. Hemos recibido tu mensaje y te responderemos a ${email}.`, 'success');
        formulario.reset(); 
    });
}

/**
 * Función que crea e inyecta una alerta de Bootstrap en el DOM de forma accesible
 * @param {string} mensaje - El texto que mostrará la alerta
 * @param {string} tipo - El tipo de alerta de Bootstrap ('success', 'danger', 'info', etc.)
 */
function mostrarAlerta(mensaje, tipo) {
    const formulario = document.querySelector('form');

    // Eliminamos cualquier alerta previa para no acumular elementos en pantalla
    const alertaPrevia = document.querySelector('.alerta-dinamica');
    if (alertaPrevia) {
        alertaPrevia.remove();
    }

    // Creación del nodo dinámico de alerta
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} alert-dismissible fade show alerta-dinamica mb-4`;
    alerta.setAttribute('role', 'alert');

    alerta.innerHTML = `
        <strong>${tipo === 'danger' ? '¡Error!' : tipo === 'success' ? '¡Éxito!' : '¡Aviso!'}</strong> ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    `;

    // Inserción al comienzo del formulario para garantizar visibilidad inmediata y UX óptima
    formulario.prepend(alerta); 
}