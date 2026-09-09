# 🎮 Tienda de Videojuegos - Frontend

Este proyecto es una plataforma web responsiva e interactiva para la visualización y venta de videojuegos, desarrollada como parte de la asignatura Desarrollo Frontend I.

## 🚀 Tecnologías Utilizadas
*   **HTML5:** Estructura semántica (`header`, `nav`, `section`, `footer`).
*   **CSS3:** Variables globales, modelo de cajas y accesibilidad por teclado.
*   **Bootstrap 5.3:** Grid System, Navbar colapsable, Cards, Carrusel interactivo y Alertas dinámicas.
*   **JavaScript (Vanilla JS):** Manipulación del DOM, manejo de eventos y asincronía mediante promesas.

## 📂 Estructura Principal
*   `index.html`: Página principal (Landing Page) que contiene el carrusel de destacados, formulario de contacto y la grilla dinámica de productos.
*   `css/style.css`: Hoja de estilos personalizada para complementar el framework.
*   `js/main.js`: Script principal que controla la lógica de la interfaz, validación de formularios y la renderización de datos.
*   `productos.json`: Fuente de datos local que simula una API externa con el catálogo de videojuegos.
*   `img/`: Directorio de recursos gráficos optimizados en formato WebP.

## ✨ Funcionalidades Dinámicas (Semana 5)
Para mejorar la interactividad y la experiencia del usuario, se implementaron las siguientes características mediante JavaScript:
*   **Catálogo Asíncrono (Fetch API):** Los productos adicionales se cargan dinámicamente desde el archivo `productos.json` y se inyectan en el DOM (`createElement`, `innerHTML`, `appendChild`).
*   **Gestión de Eventos:** 
    *   Efectos visuales de opacidad en las tarjetas al interactuar con el cursor (`mouseover` / `mouseout`).
    *   Escucha de eventos de botón (`click`) para información detallada.
*   **Validación de Formulario y Accesibilidad (UX):** Intercepción del evento `submit` (previniendo la recarga de la página) para validar campos vacíos. La retroalimentación al usuario se realiza inyectando dinámicamente **Alertas de Bootstrap** directamente en el DOM, evitando el uso de ventanas emergentes invasivas y mejorando la accesibilidad web.