// Única fuente de las obras del portfolio: home, página de obra, SEO, sitemap y HTML para redes salen de aquí.
// Se rellena con /nueva-obra y se valida con `npm run check`.
//
// slug         URL /portfolio/<slug>; estable, en minúsculas con guiones
// category     clave de Categories (FAN_ART, PORTRAIT, DESIGN)
// franchise    serie, película o videojuego; null si no aplica
// status       'featured' | 'visible' | 'archived' (archived no se publica)
// order        orden en la home, de menor a mayor
// kind         'commission' | 'personal'
// client       nombre del cliente del encargo; null si es personal o no se quiere nombrar.
//              Reservado: hoy no se muestra en ninguna parte
// series       nombre de la serie o colección si la obra forma parte de una; null si no.
//              Reservado: hoy no se usa en ninguna parte
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
    date: '',
    summary: 'Retratos digitales de diferentes músicos de la escena del Rock & Roll y del Metal, como Cristina Scabbia (Lacuna Coil), los miembros de Ankor y Enrik García (Dark Moor).',
    body: [
      'Proyecto personal que trata de una serie de retratos digitales de artistas del mundo del rock y del metal.',
      'En este proyecto aparece la banda al completo de Ankor, con una composición común: un gran círculo rojo sobre un fondo de pintura blanca rascada basados en su EP "Shoganai". Completan la serie una de los vocalistas de Lacuna Coil, Cristina Scabbia, y Enrik García, fundador, lider y guitarrista de Dark Moor.',
      'Si quieres un retrato así de tu músico favorito o de tu grupo, escríbeme.'
    ],
    seo: {
      title: 'Retratos de rock y metal | Retrato ilustrado - Raúl García',
      description: 'Retratos ilustrados digitales de músicos de rock y metal: Cristina Scabbia (Lacuna Coil), los miembros de Ankor y Enrik García (Dark Moor), serie personal.'
    },
    cover: 'portfolio/RetratosMusicales/Cri',
    blocks: [
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
    category: 'FAN_ART',
    franchise: 'Studio Ghibli',
    status: 'featured',
    order: 0,
    kind: 'personal',
    client: null,
    series: null,
    date: '2026-04-14',
    summary: 'Fan art de las películas de Studio Ghibli',
    body: [
      'Este es un proyecto personal en el que trato de homenajear, en forma de fan art, a las películas de Studio Ghibli que tanto han marcado mi vida.',
      'La tirada cuenta con dos ilustraciones de Mi vecino Totoro, una de La tumba de las luciérnagas y completa la colección, de momento, una mítica imagen de Porco Rosso.'
    ],
    seo: {
      title: 'Fan art de Studio Ghibli | Ilustración - Raúl García',
      description: 'Fan art de Studio Ghibli: ilustraciones de Mi vecino Totoro con Totoro bajo la lluvia y Mei dormida entre luciérnagas, La tumba de las luciérnagas y Porco Rosso. Proyecto personal en marcha.'
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
      'De esa investigación salió la idea: imaginar que, bajo la rectitud y la pompa que exige la corona, se escondía una vena irreverente que guardaba solo para sí misma. Por eso, debajo de la ropa, Isabel II lleva tatuados los eventos y las personas que marcaron su vida. La envuelve la bandera británica y, de fondo, un collage de noticias suyas de periódicos de todo el mundo, porque la prensa fue una constante en su vida.',
      'Junto con la ilustración, realicé un dossier que explica el significado de cada uno de los tatuajes que aparecen en el retrato, y que acompaña a la obra.'
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
      },
      {
        type: 'image',
        image: 'portfolio/RetratoIsabelII/Elizabetth_II_Dossier_copy',
        alt: 'Dossier del retrato de Isabel II: la reina de perfil en el centro, y a los lados una columna de círculos con cada uno de sus tatuajes (la corona, un corgi, un ancla, un cisne negro, la rosa Tudor) junto a un texto que explica su significado.',
        width: 1280,
        height: 905,
        altReviewed: false
      }
    ]
  },
  {
    slug: 'retratos-familiares-por-encargo',
    title: 'Retratos de familia, amigos y mascotas',
    category: 'PORTRAIT',
    franchise: null,
    status: 'visible',
    order: -20,
    kind: 'commission',
    client: null,
    series: null,
    date: '2025-04-25',
    summary: 'Retratos de familias, amigos y mascotas a partir de tus fotos, para regalar o colgar',
    body: [
      'Serie de retratos por encargo de familias, parejas, amigos y mascotas. Para hacerlos necesito unas fotos de referencias y que me cuentes qué te gustaría ver, anécdotas, personalidad de las personas que aparecerán en la ilustración, gustos, etc. Cuanta más información mejor podré  reflejar la verdadera esencia de cada una.',
      'Lo hablamos juntos hasta tener una idea en común, y de ahí sale una ilustración para regalar o para colgar en casa.',
      'Si quieres un retrato así, escríbeme y te paso presupuesto y plazo.'
    ],
    seo: {
      title: 'Retratos familiares por encargo | Raúl García',
      description: 'Retratos ilustrados por encargo de familias, parejas, amigos y mascotas a partir de tus fotos. Un regalo para colgar en casa. Pide presupuesto.'
    },
    cover: 'portfolio/RetratosFamiliares/Clau',
    blocks: [
      {
        type: 'image',
        image: 'portfolio/RetratosFamiliares/Clau',
        alt: 'Retrato de una mujer sonriente con el pelo recogido y sudadera azul, abrazando a dos perros: uno blanco con manchas canela y otro negro, sobre una mancha de acuarela verde.',
        width: 1280,
        height: 1810,
        altReviewed: true
      },
      {
        type: 'image',
        image: 'portfolio/RetratosFamiliares/retrato',
        alt: 'Retrato de una pareja con un perro negro de lengua fuera y un cachorro blanco y canela, dentro de un círculo beige.',
        width: 1280,
        height: 1811,
        altReviewed: true
      },
      {
        type: 'image',
        image: 'portfolio/RetratosFamiliares/Retrato_2',
        alt: 'Retrato de familia con una pareja y dos niñas, una haciendo la señal de la paz, y un perro pequeño blanco, dentro de un círculo amarillo.',
        width: 1280,
        height: 1811,
        altReviewed: true
      },
      {
        type: 'image',
        image: 'portfolio/RetratosFamiliares/Con_amiga_pelo_castaño',
        alt: 'Retrato de dos amigas de pelo castaño, sonriendo juntas dentro de un círculo naranja rodeado de tréboles verdes.',
        width: 1280,
        height: 1810,
        altReviewed: true
      },
      {
        type: 'image',
        image: 'portfolio/RetratosFamiliares/Con_amiga_pelo_rubio',
        alt: 'Retrato de dos amigas, una rubia y otra morena, dentro de un círculo naranja rodeado de tréboles verdes.',
        width: 1280,
        height: 1810,
        altReviewed: true
      },
      {
        type: 'image',
        image: 'portfolio/RetratosFamiliares/Colgados_en_la_pared',
        alt: 'Dos retratos de amigas enmarcados en blanco, colgados en la pared de un comedor con mesa de madera.',
        width: 1280,
        height: 1280,
        altReviewed: true
      }
    ]
  },
  {
    slug: 'marcapaginas-por-encargo',
    title: 'Marcapáginas por encargo',
    category: 'DESIGN',
    franchise: null,
    status: 'visible',
    order: -15,
    kind: 'commission',
    client: null,
    series: null,
    date: '2026-06-09',
    summary: 'Marcapáginas ilustrados y diseñados a medida, con sus dos caras',
    body: [
      'Marcapáginas que ilustro y diseño por encargo: el concepto, la ilustración y la maquetación para imprimir, con una cara y otra pensadas juntas.',
      'Aquí muestro un par de ejemplos. El primero de ellos se trata de un encargo para un grupo de opositores. A partir de una serie de conversaciones con la persona que realizó el encargo diseñé las dos caras y realicé las ilustraciones usando acuarelas digitales. El otro encargo se trataba de un regalo para las maestras de una escuela infantil. En este diseño aparece una serie de personas relacionadas con la evolución de la pedagogía moderna y una frase al reverso que resume la idea de que no hay límites para aprender y enseñar.',
      'Si quieres uno para un grupo, un evento o un regalo, escríbeme.'
    ],
    seo: {
      title: 'Marcapáginas ilustrados por encargo | Raúl García',
      description: 'Diseño e ilustración de marcapáginas por encargo para grupos, eventos y regalos: concepto, ilustración y maquetación lista para imprimir.'
    },
    cover: 'portfolio/Marcapaginas/Bookmark_Mockup_3',
    blocks: [
      {
        type: 'image',
        image: 'portfolio/Marcapaginas/Bookmark_Mockup_3',
        alt: 'Marcapáginas con tortugas marinas nadando entre burbujas con objetos dentro, sobre un libro de tapa oscura.',
        width: 1280,
        height: 960,
        altReviewed: true
      },
      {
        type: 'image',
        image: 'portfolio/Marcapaginas/Marcapáginas',
        alt: 'Las dos caras de un marcapáginas: a la izquierda, tortugas nadando bajo el agua entre burbujas con objetos; a la derecha, crías de tortuga que van de la arena al mar.',
        width: 1280,
        height: 1280,
        altReviewed: true
      },
      {
        type: 'image',
        image: 'portfolio/Marcapaginas/Bookmark_Mockup_2',
        alt: 'Marcapáginas con tortugas en la orilla y crías avanzando por la arena desde los cascarones, sobre un libro oscuro.',
        width: 1280,
        height: 960,
        altReviewed: true
      },
      {
        type: 'image',
        image: 'portfolio/Marcapaginas/Mockup01',
        alt: 'Marcapáginas amarillo claro con retratos dibujados de siete personas de la pedagogía y su nombre bajo cada uno, entre ellos María Montessori y Emmi Pikler, sobre un libro negro.',
        width: 1280,
        height: 1280,
        altReviewed: true
      },
      {
        type: 'image',
        image: 'portfolio/Marcapaginas/Mockup02',
        alt: 'Reverso del marcapáginas: la frase «Que no te digan que el cielo es el límite cuando hay huellas en la luna» en caligrafía sobre una mancha de acuarela rosa.',
        width: 1280,
        height: 1280,
        altReviewed: true
      }
    ]
  },
  {
    slug: 'carteles-de-musica',
    title: 'Carteles de música',
    category: 'DESIGN',
    franchise: null,
    status: 'visible',
    order: 20,
    kind: 'personal',
    client: null,
    series: null,
    date: '2023-06-01',
    summary: 'Carteles para grupos de música, como el de la gira de Infected Rain en España',
    body: [
      'Diseño de carteles para grupos de música. En este caso presento un cartel que realicé por mi cuenta para celebrar el paso de la banda Infected Rain por España.',
      'Si necesitas un cartel para tu banda o tu concierto, escríbeme.'
    ],
    seo: {
      title: 'Carteles de música | Diseño de carteles - Raúl García',
      description: 'Diseño de carteles para grupos de música y conciertos, como el de la gira española de Infected Rain. Ilustración y diseño por encargo.'
    },
    cover: 'portfolio/CartelesMusica/Poster_en_la_pared',
    blocks: [
      {
        type: 'image',
        image: 'portfolio/CartelesMusica/Poster_en_la_pared',
        alt: 'Cartel de Infected Rain: la cantante gritando entre una bajista y un baterista dentro de un triángulo de neón naranja, sobre fondo oscuro con humo.',
        width: 1280,
        height: 960,
        altReviewed: true
      },
      {
        type: 'image',
        image: 'portfolio/CartelesMusica/Muchos_posters',
        alt: 'Muchos carteles de Infected Rain colocados en diagonal sobre un fondo naranja.',
        width: 1280,
        height: 960,
        altReviewed: true
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
