// Título y description de las páginas fijas. Los usan sus vistas (useSeoMeta), el sitemap
// y el HTML con metas para redes (scripts/prerender-meta.js).
// noindex: la página existe pero no se indexa ni entra en el sitemap (la política de privacidad).
export const pages = {
  home: {
    path: '/',
    title: 'Raúl García | Fan art por encargo y retratos ilustrados',
    description: 'Portfolio de Raúl García: fan art por encargo de personajes de series, películas y videojuegos, y retratos ilustrados.'
  },
  commissions: {
    path: '/encargos',
    title: 'Encargos de ilustración y retratos | Raúl García',
    description: 'Encarga una ilustración de tu personaje favorito de series, películas o videojuegos, o un retrato ilustrado. Proceso, plazos y presupuesto sin compromiso.'
  },
  aboutMe: {
    path: '/about-me',
    title: 'Sobre mí | Raúl García - Ilustrador',
    description: 'Soy Raúl García, ilustrador de fan art y retratos por encargo. De programador front-end a la ilustración: quién soy y dónde encontrarme.'
  },
  contact: {
    path: '/contact',
    title: 'Contacto | Encargos de ilustración - Raúl García',
    description: 'Cuéntame tu idea para un fan art o un retrato por encargo y te paso presupuesto y plazo sin compromiso.'
  },
  shop: {
    path: '/shop',
    title: 'Tienda de láminas | Raúl García',
    description: 'Láminas impresas de las ilustraciones de Raúl García. Escríbeme con la que te guste y te confirmo disponibilidad y envío.'
  },
  privacy: {
    path: '/privacidad',
    title: 'Política de privacidad | Raúl García',
    description: 'Qué datos recojo con el formulario de contacto, para qué los uso, cuánto tiempo los guardo y cómo ejercer tus derechos.',
    noindex: true
  }
};

export const notFoundPage = {
  title: 'Página no encontrada | Raúl García',
  description: 'La página que buscas no existe. Vuelve al portfolio de Raúl García.'
};
