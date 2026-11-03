// URLs finales de todas las imágenes de src/assets/images, indexadas por su ruta relativa
// (p. ej. 'icons/menu.svg'). Vite resuelve el glob en el build: sustituye al require() dinámico.
const images = import.meta.glob('@/assets/images/**/*.{png,jpg,jpeg,svg}', { eager: true, import: 'default' })

const PREFIX = '/src/assets/images/'
const urls = Object.fromEntries(Object.entries(images).map(([path, url]) => [path.slice(PREFIX.length), url]))

export const fallbackImage = urls['fallback.png']

// Si la imagen no existe, devuelve la de respaldo (npm run check valida que existan todas)
export const getImageUrl = (file) => urls[file] || fallbackImage
