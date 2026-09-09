/**
 * Función que obtiene productos desde un archivo JSON local usando Fetch API
 */
function cargarProductos() {
    // Uso de promesas para manejar el flujo asincrónico y posibles errores de red
    fetch('productos.json')
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return respuesta.json();
        })
        .then(datos => {
            renderizarProductos(datos);
        })
        .catch(error => {
            console.error('Ocurrió un error en la carga de productos:', error);
        });
}

/**
 * Función que crea y renderiza dinámicamente elementos en el DOM
 * @param {Array} productos - Arreglo de objetos con la información de los videojuegos
 */
function renderizarProductos(productos) {
    const contenedor = document.getElementById('contenedor-productos');

    productos.forEach(producto => {
        // Manipulación del DOM: Creación de un nuevo elemento div
        const columna = document.createElement('div');
        columna.className = 'col-12 col-sm-6 col-lg-4'; 

        // Manipulación del DOM: Uso de innerHTML para estructurar la tarjeta
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

    // Una vez renderizados los nuevos elementos, inicializamos sus eventos de mouse
    inicializarEventosMouse();
}

/**
 * Configura los eventos 'mouseover' y 'click' para las tarjetas y botones
 */
function inicializarEventosMouse() {
    const tarjetas = document.querySelectorAll('.producto-card');
    const botonesInfo = document.querySelectorAll('.btn-info-dinamico, .btn-custom');

    // Evento mouseover: Cambia un estilo temporalmente al pasar el ratón
    tarjetas.forEach(tarjeta => {
        tarjeta.addEventListener('mouseover', function() {
            this.style.opacity = '0.9';
        });
        tarjeta.addEventListener('mouseout', function() {
            this.style.opacity = '1';
        });
    });

    // Evento click: Desencadena una notificación visual en la interfaz
    botonesInfo.forEach(boton => {
        boton.addEventListener('click', function(evento) {
            // Evitamos el comportamiento de salto predeterminado del enlace
            evento.preventDefault();
            
            // Reutilizamos tu función de alertas para integrarla con la navegación
            mostrarAlerta("Pronto tendremos más información detallada sobre este título en nuestra tienda.", "info");
            
            // Hacemos un scroll suave hacia el formulario donde se inyecta la alerta
            document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

/**
 * Función que configura el evento 'submit' en el formulario de contacto
 */
function configurarFormulario() {
    const formulario = document.querySelector('form'); 

    formulario.addEventListener('submit', function(evento) {
        // Evitamos que la página se recargue automáticamente
        evento.preventDefault();

        // Capturamos los valores de los campos
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('mensaje').value;

        // Validaciones de campos vacíos
        if (nombre.trim() === '' || email.trim() === '' || mensaje.trim() === '') {
            // Inyectamos una alerta de error (roja) usando la clase 'danger' de Bootstrap
            mostrarAlerta('Por favor, completa todos los campos del formulario antes de enviar.', 'danger');
        } else {
            // Inyectamos una alerta de éxito (verde) usando la clase 'success' de Bootstrap
            mostrarAlerta(`Gracias por contactarnos, ${nombre}. Hemos recibido tu mensaje y te responderemos a ${email}.`, 'success');
            
            // Limpiamos los campos del formulario tras el envío exitoso
            formulario.reset(); 
        }
    });
}

// Ejecución principal al cargar el script
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    configurarFormulario();
});

/**
 * Función que crea e inyecta una alerta de Bootstrap en el DOM
 * @param {string} mensaje - El texto que mostrará la alerta
 * @param {string} tipo - El tipo de alerta de Bootstrap (success, danger, warning, etc.)
 */
function mostrarAlerta(mensaje, tipo) {
    // 1. Seleccionamos el formulario donde inyectaremos la alerta
    const formulario = document.querySelector('form');

    // 2. Eliminamos cualquier alerta previa para no acumular mensajes en pantalla
    const alertaPrevia = document.querySelector('.alerta-dinamica');
    if (alertaPrevia) {
        alertaPrevia.remove(); // Manipulación del DOM: eliminación de nodos
    }

    // 3. Manipulación del DOM: Creación del nuevo elemento div
    const alerta = document.createElement('div');
    
    // 4. Asignamos las clases de Bootstrap 5 para alertas dismissible (que se pueden cerrar)
    alerta.className = `alert alert-${tipo} alert-dismissible fade show alerta-dinamica mb-4`;
    alerta.setAttribute('role', 'alert');

    // 5. Estructuramos el contenido interno de la alerta usando innerHTML
    alerta.innerHTML = `
        <strong>${tipo === 'danger' ? '¡Error!' : '¡Éxito!'}</strong> ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    `;

    // 6. Manipulación del DOM: Insertamos la alerta al principio del formulario
    formulario.prepend(alerta); 
}
