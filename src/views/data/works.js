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
    slug: 'retratos-rock-metal',
    title: 'Retratos de rock y metal',
    category: 'PORTRAIT',
    franchise: null,
    status: 'featured',
    order: -10,
    kind: 'personal',
    client: null,
    series: null,
    date: '2023-01-01',
    summary: 'Retratos digitales de músicos de Lacuna Coil, Ankor y Dark Moor',
    body: [
      'Serie personal de retratos digitales de artistas del rock y del metal.',
      'Cinco son los miembros de Ankor, con una composición común: un gran círculo rojo sobre un fondo de pintura blanca rascada. Completan la serie Cristina Scabbia, de Lacuna Coil, y Enrik García, de Dark Moor.',
      'Si quieres un retrato así de tu músico favorito o de tu grupo, escríbeme.'
    ],
    seo: {
      title: 'Retratos de rock y metal | Retrato ilustrado - Raúl García',
      description: 'Retratos ilustrados digitales de músicos de rock y metal: Cristina Scabbia (Lacuna Coil), los miembros de Ankor y Enrik García (Dark Moor), serie personal.'
    },
    cover: 'portfolio/RetratosMusicales/Jesse_Williams',
    blocks: [
      {
        type: 'image',
        image: 'portfolio/RetratosMusicales/Jesse_Williams',
        alt: 'Jesse Williams, de Ankor: melena pelirroja, ojos delineados y la cara salpicada de manchas oscuras, sobre un círculo rojo y un fondo de pintura blanca rascada.',
        width: 1280,
        height: 1280,
        altReviewed: true
      },
      {
        type: 'image',
        image: 'portfolio/RetratosMusicales/David_Romeu',
        alt: 'David Romeu, de Ankor, con tupé y barba corta, mirando hacia arriba, sobre un círculo rojo y un fondo de pintura blanca rascada.',
        width: 1280,
        height: 1280,
        altReviewed: true
      },
      {
        type: 'image',
        image: 'portfolio/RetratosMusicales/Eleni_Nota',
        alt: 'Eleni Nota, de Ankor, con flequillo y pelo largo oscuro, el rostro en penumbra y la mirada seria, sobre un círculo rojo.',
        width: 1280,
        height: 1280,
        altReviewed: true
      },
      {
        type: 'image',
        image: 'portfolio/RetratosMusicales/Fito_Martinez',
        alt: 'Fito Martínez, de Ankor, con cresta clara de punta y los ojos maquillados de oscuro, de tres cuartos sobre un círculo rojo.',
        width: 1280,
        height: 1280,
        altReviewed: true
      },
      {
        type: 'image',
        image: 'portfolio/RetratosMusicales/Julio_Lopez',
        alt: 'Julio López, de Ankor, con gorra y barba poblada, mirando al frente sobre un círculo rojo.',
        width: 1280,
        height: 1280,
        altReviewed: true
      },
      {
        type: 'image',
        image: 'portfolio/RetratosMusicales/Cri',
        alt: 'Retrato de Cristina Scabbia, de Lacuna Coil, en blanco y negro con toques rojos: melena oscura, labios rojos y una franja de maquillaje sobre un ojo, rodeada de salpicaduras de tinta.',
        width: 1200,
        height: 1200,
        altReviewed: true
      },
      {
        type: 'image',
        image: 'portfolio/RetratosMusicales/Enrik',
        alt: 'Enrik García, de Dark Moor, con pelo largo y barba, en tonos ocres sobre un círculo amarillo anaranjado.',
        width: 1280,
        height: 1280,
        altReviewed: true
      }
    ]
  },
  {
    slug: 'fan-art-studio-ghibli',
    title: 'Homenaje a Studio Ghibli',
    category: 'POP_CULTURE',
    franchise: 'Studio Ghibli',
    status: 'featured',
    order: 0,
    kind: 'personal',
    client: null,
    series: null,
    date: '2026-04-14',
    summary: 'Fan art de las películas de Studio Ghibli, empezando por Mi vecino Totoro',
    body: [
      'Este es un proyecto personal y en marcha: mi homenaje, en forma de fan art, a las películas de Studio Ghibli.',
      'De momento la protagonista es Mi vecino Totoro: Mei durmiendo sobre Totoro entre luciérnagas y los tres Totoros resguardándose de la lluvia bajo sus paraguas de hoja. Irán llegando ilustraciones de otras películas.'
    ],
    seo: {
      title: 'Fan art de Studio Ghibli | Ilustración - Raúl García',
      description: 'Fan art de Studio Ghibli: ilustraciones de Mi vecino Totoro con Totoro bajo la lluvia y Mei dormida entre luciérnagas. Proyecto personal en marcha.'
    },
    cover: 'portfolio/StudioGhibli/Totoro_2',
    blocks: [
      {
        type: 'image',
        image: 'portfolio/StudioGhibli/Totoro_2',
        alt: 'Los tres Totoros, grande, mediano y pequeño, sentados en una rama bajo la lluvia nocturna, cada uno resguardado con una hoja a modo de paraguas, entre el follaje oscuro del bosque.',
        width: 1280,
        height: 1280,
        altReviewed: true
      },
      {
        type: 'image',
        image: 'portfolio/StudioGhibli/Totoro',
        alt: 'Mei, una niña con coletas, duerme tumbada sobre la barriga de Totoro, que también duerme boca arriba en un claro del bosque, de noche, rodeados de luciérnagas verdes; la escena está enmarcada con bordes irregulares, como de papel rasgado.',
        width: 1280,
        height: 905,
        altReviewed: false
      }
    ]
  },
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
