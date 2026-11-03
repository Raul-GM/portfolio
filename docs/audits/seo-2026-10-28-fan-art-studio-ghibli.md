# SEO y rendimiento — obra `fan-art-studio-ghibli` — 2026-10-28
Resumen: 0 alto · 2 medio · 5 bajo

Base: rama `portfolio_v2` con cambios sin commitear (`works.js`, `sitemap.xml`, `public/og/fan-art-studio-ghibli.jpg`, `src/assets/images/portfolio/StudioGhibli/`) y el `dist/` local ya compilado, servido con `scripts/render.js`. No he consultado producción. No repito lo que ya está en `specs/agents_in_portfolio.md` §6b ni en `docs/audits/seo-2026-10-28-sitio.md` (`og:type` article/website, `CreativeWork` → `VisualArtwork`, fondo CSS de la tarjeta, fuentes TTF, `/portfolio` duplicado de `/`).

| Impacto | Área | Dónde | Problema (evidencia) | Corrección propuesta |
|---|---|---|---|---|
| Medio | Redes (OG) | `public/og/fan-art-studio-ghibli.jpg`; `scripts/images.js:79` | **La imagen OG tiene casi la mitad en blanco.** Mide 1200×630 y pesa 51 KB (correcto), pero se ha generado a partir de `Totoro_2`, que es cuadrada (1280×1280). Con `fit: 'contain'` sobre fondo blanco, la ilustración ocupa unos 630×630 en el centro y deja dos franjas blancas de unos 285 px cada una (≈ 48 % del área). Una escena nocturna oscura entre bandas blancas se ve pequeña y desequilibrada en WhatsApp, X y LinkedIn, y eso resta clics. | Regenerarla a partir de `Totoro` (1280×905, proporción 1,41, mucho más cercana a 1,91): `npm run images -- <origen> --slug fan-art-studio-ghibli --og Totoro.<ext>`. A medio plazo, en `images.js`, usar `fit: 'cover'` con `position: 'attention'` en las obras apaisadas, o rellenar los laterales con un color oscuro o una versión desenfocada de la propia obra en lugar del blanco. |
| Medio | Contenido | `src/views/data/works.js` (entrada `fan-art-studio-ghibli`, `body` y `title`) | **Poco texto indexable y un h1 sin la búsqueda objetivo.** El `<main>` tiene unas 98 palabras, y solo unas 60 son de la obra (2 frases en `body`). El h1 es "Homenaje a Studio Ghibli": no incluye "fan art" ni "ilustración", que sí están en el `<title>`. Tampoco se mencionan Hayao Miyazaki, ni la técnica, ni que se aceptan encargos de fan art (el CTA "¿Quieres un encargo así?" no lleva texto que lo apoye). Para "fan art Studio Ghibli", "fan art Totoro" o "fan art por encargo", la página compite con muy poco contenido. | Ampliar `body` a 150–250 palabras: técnica y proceso (pincel, textura, paleta nocturna), por qué estas escenas y una frase sobre fan art por encargo de películas y series. Cambiar `title` (que se usa como h1 y en la tarjeta) a algo como "Fan art de Studio Ghibli: Mi vecino Totoro", o mantener "Homenaje…" y añadir un subtítulo con "fan art" e "ilustración". |
| Bajo | Metas | `works.js` `seo.title` | El título (52 caracteres) y la description (147) están bien, son únicos y coinciden con y sin JS. Al título le sobran 8 caracteres que podrían usarse para "Totoro", el término con más búsquedas de los que aparecen en la obra. | p. ej. `Fan art de Studio Ghibli y Totoro \| Raúl García Ilustración` (59). |
| Bajo | Datos estructurados | `src/views/portfolio/WorkComponent.vue:67`; `src/composables/useSeoMeta.js:88-104` | El JSON-LD es válido y sus URLs son absolutas, pero no usa el campo `franchise: 'Studio Ghibli'` de la obra, que ya existe en los datos. En el fan art es justo lo que relaciona la obra con la entidad que se busca. | Añadir al schema `about: { '@type': 'Movie', name: 'Mi vecino Totoro' }` (o `CreativeWorkSeries` "Studio Ghibli" a partir de `franchise`), `genre: 'Fan art'` y `keywords`. Conviene hacerlo junto al cambio a `VisualArtwork` que ya está en el backlog. |
| Bajo | Redes (OG) | `scripts/prerender-meta.js:46` (zona de metas) | En el HTML sin JS faltan `og:image:width`/`og:image:height` (1200/630), `og:image:alt` y `og:locale=es_ES`. Sin las dimensiones, algunos rastreadores (Facebook/WhatsApp) no muestran la imagen grande la primera vez que se comparte la URL. | Emitir las cuatro metas en `prerender-meta.js` (y en `useSeoMeta`). Como `og:image:alt` puede servir el alt del primer bloque. |
| Bajo | Sitemap | `public/sitemap.xml` (entrada de la obra); `scripts/sitemap.js` | `lastmod` es 2026-04-14, la fecha de creación (`date`), aunque la página se publica ahora. Además, el sitemap no declara las imágenes: para Google Imágenes, que es donde se busca fan art, un `<image:image>` por bloque ayuda a descubrir las variantes 1280. | `lastmod` a partir de la fecha de publicación o modificación (p. ej. la del último commit que toca la obra) y añadir `xmlns:image` con `<image:loc>` de cada bloque. |
| Bajo | Google Imágenes | `src/assets/images/portfolio/StudioGhibli/` | Los ficheros se llaman `Totoro` y `Totoro_2`. El nombre del fichero es una señal (débil) para Google Imágenes, y `Totoro_2` no describe nada. Los alt sí son excelentes: concretos, sin relleno y con `altReviewed: true`. | Opcional, solo si se regeneran: algo como `Totoro_Mei_Luciernagas` y `Totoros_Lluvia_Paraguas`. CLAUDE.md pide conservar los nombres originales de la obra, así que es decisión del autor. |

### Lo que está bien
- **Indexación:** `render.js /portfolio/fan-art-studio-ghibli --raw` → **HTTP 200** con el HTML prerenderizado (`dist/portfolio/fan-art-studio-ghibli/index.html`): `<title>`, description, `og:*`, `twitter:*` (`summary_large_image`), canonical y JSON-LD `CreativeWork`, con URLs absolutas. Tras JS: un solo title, una description, un canonical y un JSON-LD, sin metas duplicadas.
- La OG `https://raulgarcia.me/og/fan-art-studio-ghibli.jpg` existe en `public/og/` y en `dist/og/` (1200×630, 51 872 B).
- Sitemap: la URL aparece una vez, es canónica y responde 200. `public/sitemap.xml` y `dist/sitemap.xml` son idénticos.
- Un solo h1. Los dos alt son descriptivos y nombran a los personajes (Totoro, Mei).
- **Imagen LCP:** `Totoro_2` con `loading="eager"`, `fetchpriority="high"`, `width="1280" height="1280"` (sin CLS), srcset y `sizes="(min-width: 840px) 800px, 100vw"`. La segunda imagen es `lazy` y también lleva `width`/`height`.
- **Tarjeta en la home:** es la primera (`order: 0`), con un h2 "Homenaje a Studio Ghibli" y enlace "Ir al proyecto Homenaje a Studio Ghibli" → `/portfolio/fan-art-studio-ghibli`. Aligera el LCP de la home: ahora es Totoro (76 KB en móvil) en lugar de Isabel II (253 KB).

## Métricas observadas

**Imagen LCP por dispositivo** (`render.js --requests`)

| Página | Móvil 390×844 @2x | Escritorio 1280×900 @1x |
|---|---|---|
| `/portfolio/fan-art-studio-ghibli` | `Totoro_2_960.jpeg` 76 KB (`<img>`, eager, `fetchpriority=high`); además `Totoro_960.jpeg` 52 KB (lazy, entra al hacer scroll) | `Totoro_2_960.jpeg` 76 KB (mostrada a 800×800); `Totoro_960.jpeg` 52 KB |
| `/` (tarjeta) | `Totoro_2_960.jpeg` 76 KB (fondo CSS) | `Totoro_2_640.jpeg` 39 KB |

**Variantes de la obra** (`src/assets/images/portfolio/StudioGhibli/`, ninguna > 300 KB)
- `Totoro_2`: 320 (12 KB) · 640 (39 KB) · 960 (76 KB) · 1280 (118 KB), cuadrada 1280×1280.
- `Totoro`: 320 (9 KB) · 640 (26 KB) · 960 (52 KB) · 1280 (88 KB), 1280×905.
- OG: 1200×630, 51 KB.

**JS/CSS inicial:** sin cambios respecto al informe del sitio (`chunk-vendors` 187 KB, `app.js` 25 KB, `app.css` 8 KB; el chunk de la obra son 6 KB de JS y 1 KB de CSS).

**URL en el sitemap**

| URL | HTTP sin JS | Metas propias sin JS | lastmod |
|---|---|---|---|
| `/portfolio/fan-art-studio-ghibli` | 200 | sí, completas (title 52, description 147) | 2026-04-14 |
