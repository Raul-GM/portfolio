// Única fuente de las obras del portfolio: home, página de obra, SEO, sitemap y HTML para redes salen de aquí.
// Se rellena con /nueva-obra y se valida con `npm run check`.
//
// slug         URL /portfolio/<slug>; estable, en minúsculas con guiones
// category     clave de Categories (POP_CULTURE, PORTRAIT)
// franchise    serie, película o videojuego; null si no aplica
// status       'featured' | 'visible' | 'archived' (archived no se publica)
// order        orden en la home, de menor a mayor
// kind         'commission' | 'personal'
// date         'AAAA-MM-DD' (creación)
// summary      frase corta para la tarjeta de la home
// body         párrafos de la página
// seo          title y description (≤ 155 caracteres); la imagen OG es public/og/<slug>.jpg
// cover        imagen de la tarjeta, ruta sin sufijo ni extensión
// blocks       { type: 'image', image, alt, width, height, altReviewed } | { type: 'video', youtubeId, title }
import { Categories } from './categories';

export const works = [
  {
    slug: 'retrato-isabel-ii',
    title: 'Isabel II, icono pop',
    category: 'PORTRAIT',
    franchise: null,
    status: 'featured',
    order: 10,
    kind: 'commission',
    client: null,
    series: null,
    date: '2023-09-01',
    summary: 'Retrato de la reina Isabel II con tatuajes que repasan su vida',
    body: [
      'Este retrato nació del encargo de una persona que quería una ilustración de la reina Isabel II de Inglaterra como el icono pop que fue. El resto lo dejó a mi elección.',
      'Lo primero fue empaparme de su vida: desde lo oficial hasta lo publicado por la prensa más amarilla británica, buscando los detalles que pudieran enriquecer la ilustración.',
      'De esa investigación salió la idea: imaginar que, bajo la rectitud y la pompa que exige la corona, se escondía una vena irreverente que guardaba solo para sí misma. Por eso, debajo de la ropa, Isabel II lleva tatuados los eventos y las personas que marcaron su vida. La envuelve la bandera británica y, de fondo, un collage de noticias suyas de periódicos de todo el mundo, porque la prensa fue una constante en su vida.'
    ],
    seo: {
      title: 'Isabel II, icono pop | Retrato por encargo - Raúl García',
      description: 'Retrato ilustrado por encargo de la reina Isabel II como icono pop: tatuajes sobre su vida, bandera británica y collage de periódicos.'
    },
    cover: 'portfolio/RetratoIsabelII/Elizabetth_II',
    blocks: [
      {
        type: 'image',
        image: 'portfolio/RetratoIsabelII/Elizabetth_II',
        alt: 'Retrato de perfil de la reina Isabel II con corona de diamantes, envuelta en la bandera británica y con el pecho y los hombros cubiertos de pequeños tatuajes (un corgi, un ancla, la palabra Lilibet), sobre un fondo de recortes de periódico.',
        width: 1280,
        height: 1600,
        altReviewed: false
      }
    ]
  }
];

export const publishedWorks = works
  .filter(work => work.status !== 'archived')
  .sort((a, b) => a.order - b.order);

export const findWork = (slug) => publishedWorks.find(work => work.slug === slug);

export const getCategoryLabel = (work) => Categories[work.category];

export const getWorkUrl = (work) => `/portfolio/${work.slug}`;

export const getOgImage = (work) => `og/${work.slug}.jpg`;
