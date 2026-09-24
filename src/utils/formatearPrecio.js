// Convierte un número a formato de peso chileno: 27990 -> "$27.990"
export const formatearPrecio = (valor) => `$${valor.toLocaleString('es-CL')}`;
