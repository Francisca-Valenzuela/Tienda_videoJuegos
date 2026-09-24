import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// "base" debe coincidir con el nombre del repositorio para que funcione en GitHub Pages
export default defineConfig({ plugins: [react()], base: '/Tienda_videoJuegos/' });
