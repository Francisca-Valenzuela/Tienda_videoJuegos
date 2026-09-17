# 🎮 Tienda de Videojuegos - Frontend

Este proyecto es una plataforma web responsiva e interactiva para la visualización y venta de videojuegos, desarrollada como parte de la asignatura Desarrollo Frontend I.

## 🚀 Tecnologías Utilizadas
*   **HTML5:** Estructura semántica (`header`, `nav`, `section`, `footer`).
*   **CSS3:** Variables globales, modelo de cajas y accesibilidad por teclado.
*   **Bootstrap 5.3:** Grid System, Navbar colapsable, Cards, Carrusel interactivo y Alertas dinámicas.
*   **JavaScript (Vanilla JS):** Manipulación del DOM, manejo de eventos, delegación de eventos y asincronía mediante promesas.

## 📂 Estructura Principal
*   `index.html`: Página principal (Landing Page) que contiene el carrusel de destacados, navbar con categorías y buscador, la grilla dinámica de productos, el resumen del carrito y el formulario de contacto.
*   `assets/css/style.css`: Hoja de estilos personalizada para complementar el framework.
*   `assets/js/main.js`: Script principal que controla la lógica de la interfaz, el carrito de compras, la búsqueda, la validación de formularios y la renderización de datos.
*   `productos.json`: Fuente de datos local que simula una API externa con el catálogo de videojuegos (incluye precio y categoría de cada uno).
*   `assets/img/`: Directorio de recursos gráficos optimizados en formato WebP/JPEG.

## ✨ Funcionalidades Dinámicas (Semana 6)
Para mejorar la interactividad y la experiencia del usuario, se implementaron las siguientes características mediante JavaScript:

*   **Catálogo Asíncrono (Fetch API):** Los productos adicionales se cargan dinámicamente desde `productos.json` y se inyectan en el DOM (`createElement`, `innerHTML`, `appendChild`), con manejo de errores mediante `.catch()` y una alerta visual amigable si la carga falla.
*   **Navbar con categorías simuladas:** Enlaces "Acción" y "Aventura" que filtran el catálogo en vivo, además de "Productos" para restablecer la vista completa.
*   **Carrito de compras (evento `click`):** Cada tarjeta de producto tiene un botón "Agregar al carrito" gestionado por delegación de eventos, que actualiza en tiempo real el contador de la navbar y el resumen (`#carrito`) con cantidad, subtotal y total; permite quitar ítems individuales o vaciar el carrito.
*   **Buscador de productos (evento `submit`):** Un formulario en la navbar intercepta el envío, filtra las tarjetas por título y muestra un mensaje si no hay coincidencias.
*   **Validación de Formulario y Accesibilidad (UX):** Intercepción del evento `submit` del formulario de contacto (previniendo la recarga de la página) para validar campos vacíos y formato de correo. La retroalimentación al usuario se realiza inyectando dinámicamente **Alertas de Bootstrap** directamente en el DOM, evitando el uso de ventanas emergentes invasivas y mejorando la accesibilidad web.
*   **Efectos visuales:** Opacidad en las tarjetas al interactuar con el cursor (`mouseover` / `mouseout`), reaplicados automáticamente a los productos cargados vía Fetch API.