# 🎮 Tienda de Videojuegos – React (Semana 7)

Tienda de videojuegos interactiva desarrollada para **Desarrollo Frontend I (PFY2201)**. Evolución del proyecto de las semanas 5 y 6 (HTML + JS) migrada a **React + Vite**, manteniendo el diseño original con Bootstrap 5.

- 🔗 **Sitio publicado:** https://Francisca-Valenzuela.github.io/Tienda_videoJuegos/
- 📦 **Repositorio:** https://github.com/Francisca-Valenzuela/Tienda_videoJuegos

## Funcionalidades
- **Listado de productos** con nombre, precio normal (tachado), precio oferta, descuento, descripción corta e imagen.
- **Carrito de compras:** agregar, sumar/restar unidades, eliminar un producto y vaciar; **contador** de productos y **total** en pesos.
- **Búsqueda** en vivo y **filtro por categoría** (Acción / Aventura).
- **Renderizado condicional:** carrito vacío, estado de carga, error de carga, "sin resultados" y alertas temporales.
- **Formulario de contacto** con validación.

## Conceptos de React aplicados
| Concepto | Dónde |
|---|---|
| Componentes funcionales y props | `src/components/*` |
| `useState` | `useCarrito`, `App`, `Navbar`, `ContactForm`, `Carrusel` |
| `useEffect` | `App` (fetch), `Alerta` (temporizador), `Carrusel` (intervalo) |
| `useMemo` / `useCallback` | `App` (filtrado y cierre de alertas) |
| Hook personalizado | `src/hooks/useCarrito.js` |
| Eventos | `onClick`, `onChange`, `onSubmit` |
| Renderizado condicional | `ProductList`, `ShoppingCart`, `Alerta` |

## Estructura
```
src/
├── components/   Navbar, Hero, Carrusel, Beneficios, ProductList, ProductCard,
│                 ShoppingCart, CartItem, CartTotal, ContactForm, Footer, Alerta
├── hooks/        useCarrito.js
├── utils/        formatearPrecio.js
├── App.jsx  main.jsx  index.css
public/           productos.json e imágenes
```

## Cómo ejecutarlo
```bash
npm install
npm run dev        # http://localhost:5173/Tienda_videoJuegos/
npm run build
npm run deploy     # publica en la rama gh-pages
```

## Capturas de pantalla
> Guarda las imágenes en `docs/capturas/` con estos nombres.

| Funcionalidad | Captura |
|---|---|
| Listado de productos (precio normal y oferta) | ![Listado](docs/capturas/01-listado.png) |
| Agregar al carrito y alerta | ![Agregar](docs/capturas/02-agregar.png) |
| Carrito con contador y total | ![Carrito](docs/capturas/03-carrito.png) |
| Eliminar / restar producto | ![Eliminar](docs/capturas/04-eliminar.png) |
| Carrito vacío | ![Vacío](docs/capturas/05-vacio.png) |
| Búsqueda sin resultados | ![Búsqueda](docs/capturas/06-busqueda.png) |
| Filtro por categoría | ![Categoría](docs/capturas/07-categoria.png) |
| Formulario de contacto | ![Contacto](docs/capturas/08-contacto.png) |
