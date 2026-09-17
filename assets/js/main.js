/**
 * Archivo Principal de JavaScript - Tienda de Videojuegos
 * Asignatura: Desarrollo Frontend I (PFY2201) - Semana 6
 * Descripción: Carga asincrónica con Fetch API, eventos click (carrito) y submit
 *              (búsqueda y contacto), manipulación del DOM y validación de formularios.
 */

// Estado global del carrito de compras
let carrito = [];

// Ejecución principal al cargar completamente el DOM del documento
document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    configurarEventosCarrito();
    configurarBusqueda();
    configurarFiltroCategorias();
    configurarFormularioContacto();
    inicializarEventosMouse();
});

/* ======================================================
   1. FETCH API: CARGA DE PRODUCTOS DESDE JSON LOCAL
   ====================================================== */

/**
 * Obtiene productos adicionales desde un archivo JSON local usando Fetch API.
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
            // Brecha abordada: se informa el error tanto en consola como visualmente en la interfaz
            console.error('Ocurrió un error en la carga de productos:', error);
            notificarGlobal('No fue posible cargar el catálogo adicional de productos en este momento. Por favor, intenta más tarde.', 'danger');
        });
}

/**
 * Crea y renderiza dinámicamente las tarjetas de producto en el DOM.
 * @param {Array} productos - Arreglo de objetos con la información de los videojuegos
 */
function renderizarProductos(productos) {
    const contenedor = document.getElementById('contenedor-productos');
    if (!contenedor) return;

    productos.forEach(producto => {
        // Manipulación del DOM: creación de un nuevo elemento
        const columna = document.createElement('div');
        columna.className = 'col-12 col-sm-6 col-lg-4 producto-item';
        columna.dataset.categoria = producto.categoria;
        columna.dataset.titulo = producto.titulo;

        columna.innerHTML = `
            <div class="card h-100 shadow-sm producto-card border-0">
                <img src="${producto.imagen}" class="card-img-top" alt="Carátula de ${producto.titulo}" loading="lazy">
                <div class="card-body d-flex flex-column bg-light rounded-bottom">
                    <span class="badge bg-secondary align-self-start mb-2">${producto.categoria}</span>
                    <h3 class="card-title h5 fw-bold" style="color: var(--color-secundario);">${producto.titulo}</h3>
                    <p class="card-text text-secondary small">${producto.descripcion}</p>
                    <p class="fw-bold mb-2" style="color: var(--color-primario);">$${producto.precio.toLocaleString('es-CL')}</p>
                    <button type="button" class="btn btn-custom mt-auto fw-bold btn-agregar" data-id="${producto.id}" data-titulo="${producto.titulo}" data-precio="${producto.precio}">
                        Agregar al carrito 🛒
                    </button>
                </div>
            </div>
        `;

        // Manipulación del DOM: inserción del elemento en el contenedor principal
        contenedor.appendChild(columna);
    });

    // Reaplicamos los efectos de hover a las tarjetas recién insertadas
    inicializarEventosMouse();
}

/* ======================================================
   2. EVENTOS: HOVER EN TARJETAS
   ====================================================== */

function inicializarEventosMouse() {
    const tarjetas = document.querySelectorAll('.producto-card');

    tarjetas.forEach(tarjeta => {
        tarjeta.removeEventListener('mouseover', manejarMouseOver);
        tarjeta.removeEventListener('mouseout', manejarMouseOut);
        tarjeta.addEventListener('mouseover', manejarMouseOver);
        tarjeta.addEventListener('mouseout', manejarMouseOut);
    });
}

function manejarMouseOver() {
    this.style.opacity = '0.9';
}

function manejarMouseOut() {
    this.style.opacity = '1';
}

/* ======================================================
   3. EVENTO CLICK: CARRITO DE COMPRAS
   ====================================================== */

/**
 * Configura, mediante delegación de eventos, el click para agregar productos
 * al carrito y las acciones dentro del propio carrito (quitar, vaciar).
 * La delegación evita tener que re-registrar listeners cada vez que se
 * agregan tarjetas nuevas vía Fetch API.
 */
function configurarEventosCarrito() {
    const contenedorProductos = document.getElementById('contenedor-productos');
    if (contenedorProductos) {
        contenedorProductos.addEventListener('click', evento => {
            const boton = evento.target.closest('.btn-agregar');
            if (!boton) return;

            const id = Number(boton.dataset.id);
            const titulo = boton.dataset.titulo;
            const precio = Number(boton.dataset.precio);
            agregarAlCarrito(id, titulo, precio);
        });
    }

    const listaCarrito = document.getElementById('lista-carrito');
    if (listaCarrito) {
        listaCarrito.addEventListener('click', evento => {
            const boton = evento.target.closest('.btn-quitar-item');
            if (!boton) return;

            const id = Number(boton.dataset.id);
            carrito = carrito.filter(item => item.id !== id);
            actualizarResumenCarrito();
        });
    }

    const btnVaciar = document.getElementById('btn-vaciar-carrito');
    if (btnVaciar) {
        btnVaciar.addEventListener('click', () => {
            carrito = [];
            actualizarResumenCarrito();
        });
    }
}

/**
 * Agrega un producto al carrito o incrementa su cantidad si ya existe.
 */
function agregarAlCarrito(id, titulo, precio) {
    const itemExistente = carrito.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({ id, titulo, precio, cantidad: 1 });
    }

    actualizarResumenCarrito();
    notificarGlobal(`"${titulo}" se agregó al carrito.`, 'success');
}

/**
 * Manipulación dinámica del DOM: reconstruye el resumen del carrito
 * (lista de ítems, total y contador de la navbar) en el área designada.
 */
function actualizarResumenCarrito() {
    const lista = document.getElementById('lista-carrito');
    const vacioMsg = document.getElementById('carrito-vacio');
    const resumen = document.getElementById('carrito-resumen');
    const totalTexto = document.getElementById('total-carrito');
    const btnVaciar = document.getElementById('btn-vaciar-carrito');
    const contador = document.getElementById('contador-carrito');

    lista.innerHTML = '';

    const totalItems = carrito.reduce((acumulado, item) => acumulado + item.cantidad, 0);
    contador.textContent = totalItems;

    if (carrito.length === 0) {
        vacioMsg.classList.remove('d-none');
        resumen.classList.add('d-none');
        btnVaciar.classList.add('d-none');
        return;
    }

    vacioMsg.classList.add('d-none');
    resumen.classList.remove('d-none');
    btnVaciar.classList.remove('d-none');

    let total = 0;
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center px-0 bg-transparent';
        li.innerHTML = `
            <span class="small">${item.titulo} <span class="text-secondary">x${item.cantidad}</span></span>
            <span class="d-flex align-items-center gap-2">
                <strong class="small">$${subtotal.toLocaleString('es-CL')}</strong>
                <button type="button" class="btn btn-sm btn-outline-danger py-0 px-2 btn-quitar-item" data-id="${item.id}" aria-label="Quitar ${item.titulo} del carrito">✕</button>
            </span>
        `;
        lista.appendChild(li);
    });

    totalTexto.textContent = `$${total.toLocaleString('es-CL')}`;
}

/* ======================================================
   4. EVENTO SUBMIT: BÚSQUEDA DE PRODUCTOS
   ====================================================== */

/**
 * Filtra los productos visibles según el texto ingresado en el buscador.
 * Funciona tanto con las tarjetas estáticas como con las cargadas por Fetch API.
 */
function configurarBusqueda() {
    const formulario = document.getElementById('formulario-busqueda');
    if (!formulario) return;

    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault();

        const termino = document.getElementById('input-busqueda').value.trim().toLowerCase();
        const items = document.querySelectorAll('.producto-item');
        const mensaje = document.getElementById('mensaje-productos');
        let coincidencias = 0;

        items.forEach(item => {
            const coincide = item.dataset.titulo.toLowerCase().includes(termino);
            item.classList.toggle('d-none', termino !== '' && !coincide);
            if (termino === '' || coincide) coincidencias++;
        });

        mensaje.innerHTML = '';
        if (termino !== '' && coincidencias === 0) {
            mensaje.innerHTML = `<p class="text-secondary">No se encontraron juegos que coincidan con "<strong>${termino}</strong>".</p>`;
        }

        document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
    });
}

/* ======================================================
   5. EVENTO CLICK: FILTRO POR CATEGORÍA (NAVBAR)
   ====================================================== */

function configurarFiltroCategorias() {
    const enlaces = document.querySelectorAll('.nav-categoria');

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function() {
            const categoria = this.dataset.categoria;
            const items = document.querySelectorAll('.producto-item');
            const mensaje = document.getElementById('mensaje-productos');
            const inputBusqueda = document.getElementById('input-busqueda');

            items.forEach(item => {
                const mostrar = categoria === 'todos' || item.dataset.categoria === categoria;
                item.classList.toggle('d-none', !mostrar);
            });

            mensaje.innerHTML = '';
            if (inputBusqueda) inputBusqueda.value = '';
        });
    });
}

/* ======================================================
   6. EVENTO SUBMIT: FORMULARIO DE CONTACTO
   ====================================================== */

/**
 * Configura el evento 'submit' en el formulario de contacto,
 * con validación de campos y retroalimentación visual accesible.
 */
function configurarFormularioContacto() {
    const formulario = document.querySelector('#contacto form');
    if (!formulario) return;

    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        // 1. Validación de campos vacíos
        if (nombre === '' || email === '' || mensaje === '') {
            mostrarAlertaFormulario('Por favor, completa todos los campos del formulario antes de enviar.', 'danger');
            return;
        }

        // 2. Validación de formato de correo mediante expresión regular
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexCorreo.test(email)) {
            mostrarAlertaFormulario('Por favor, ingresa un correo electrónico válido que contenga un "@" y un dominio.', 'danger');
            return;
        }

        // 3. Flujo exitoso
        mostrarAlertaFormulario(`Gracias por contactarnos, ${nombre}. Hemos recibido tu mensaje y te responderemos a ${email}.`, 'success');
        formulario.reset();
    });
}

/**
 * Inyecta una alerta de Bootstrap dentro del formulario de contacto.
 */
function mostrarAlertaFormulario(mensaje, tipo) {
    const formulario = document.querySelector('#contacto form');

    const alertaPrevia = formulario.querySelector('.alerta-dinamica');
    if (alertaPrevia) alertaPrevia.remove();

    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} alert-dismissible fade show alerta-dinamica mb-4`;
    alerta.setAttribute('role', 'alert');
    alerta.innerHTML = `
        <strong>${tipo === 'danger' ? '¡Error!' : '¡Éxito!'}</strong> ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    `;

    formulario.prepend(alerta);
}

/* ======================================================
   7. UTILIDAD: ALERTAS GLOBALES (fetch, carrito, búsqueda)
   ====================================================== */

/**
 * Muestra una alerta de Bootstrap en el área global de notificaciones,
 * ubicada justo debajo de la navbar. Se autoelimina a los pocos segundos.
 * @param {string} mensaje - Texto de la alerta
 * @param {string} tipo - Tipo de alerta de Bootstrap ('success', 'danger', 'info')
 */

function notificarGlobal(mensaje, tipo = 'info') {
    const contenedor = document.getElementById('alertas-globales');
    if (!contenedor) return;

    contenedor.innerHTML = '';

    const alerta = document.createElement('div');
    // Se agrega 'mt-3' dinámicamente al elemento hijo
    alerta.className = `alert alert-${tipo} alert-dismissible fade show mb-2 mt-3`;
    alerta.setAttribute('role', 'alert');
    alerta.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    `;
    contenedor.appendChild(alerta);

    setTimeout(() => alerta.remove(), 4000);

}