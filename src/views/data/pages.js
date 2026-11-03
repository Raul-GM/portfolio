// Título y description de las páginas fijas. Los usan sus vistas (useSeoMeta), el sitemap
// y el HTML con metas para redes (scripts/prerender-meta.js).
// noindex: la página existe pero no se indexa ni entra en el sitemap (la tienda, hasta la fase 4).
export const pages = {
  home: {
    path: '/',
    title: 'Raúl García | Ilustración de cultura pop y retratos por encargo',
    description: 'Portfolio de Raúl García: ilustraciones de series, películas y videojuegos, y retratos ilustrados por encargo.'
  },
  commissions: {
    path: '/encargos',
    title: 'Encargos de ilustración y retratos | Raúl García',
    description: 'Encarga una ilustración de tu personaje favorito de series, películas o videojuegos, o un retrato ilustrado. Proceso, plazos y presupuesto sin compromiso.'
  },
  aboutMe: {
    path: '/about-me',
    title: 'Sobre mí | Raúl García - Ilustrador',
    description: 'Soy Raúl García, ilustrador de cultura pop y retratos por encargo. De programador front-end a la ilustración: quién soy y dónde encontrarme.'
  },
  contact: {
    path: '/contact',
    title: 'Contacto | Encargos de ilustración - Raúl García',
    description: 'Cuéntame tu idea para una ilustración de cultura pop o un retrato por encargo y te paso presupuesto y plazo sin compromiso.'
  },
  shop: {
    path: '/shop',
    title: 'Tienda | Raúl García - Compra mis obras',
    description: 'Explora y compra las obras de arte y diseño de Raúl García. También disponibles comisiones y trabajos personalizados.',
    noindex: true
  }
};

export const notFoundPage = {
  title: 'Página no encontrada | Raúl García',
  description: 'La página que buscas no existe. Vuelve al portfolio de Raúl García.'
};
