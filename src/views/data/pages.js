// Título y description de las páginas fijas. Los usan sus vistas (useSeoMeta), el sitemap
// y el HTML con metas para redes (scripts/prerender-meta.js).
export const pages = {
  home: {
    path: '/',
    title: 'Raúl García | Ilustración de cultura pop y retratos por encargo',
    description: 'Portfolio de Raúl García: ilustraciones de series, películas y videojuegos, y retratos ilustrados por encargo.'
  },
  aboutMe: {
    path: '/about-me',
    title: 'Sobre mí | Raúl García - Diseñador e Ilustrador',
    description: 'Conoce a Raúl García: estudiante de Diseño Digital, ilustrador y desarrollador front-end apasionado por el arte y la creatividad.'
  },
  contact: {
    path: '/contact',
    title: 'Contacto | Raúl García - Ponte en contacto conmigo',
    description: 'Contacta con Raúl García para encargos, propuestas o simplemente para conversar. Disponible para trabajos de ilustración y diseño gráfico.'
  },
  shop: {
    path: '/shop',
    title: 'Tienda | Raúl García - Compra mis obras',
    description: 'Explora y compra las obras de arte y diseño de Raúl García. También disponibles comisiones y trabajos personalizados.'
  }
};

export const notFoundPage = {
  title: 'Página no encontrada | Raúl García',
  description: 'La página que buscas no existe. Vuelve al portfolio de Raúl García.'
};
