# SEO y rendimiento — sitio (recheck tras fe78ccd y 16ae91f) — 2026-11-03
Resumen: 0 alto · 1 medio · 3 bajo (7 hallazgos del informe anterior: 5 resueltos, 2 parciales)

| Impacto | Área | Dónde | Problema (evidencia) | Corrección propuesta |
|---|---|---|---|---|
| Medio | Contenido Ghibli | `works.js:122-127` | La description nueva (107 car.) es correcta, pero sigue repitiendo el título ("Fan art de Studio Ghibli: ...") y sin "por encargo". El cuerpo sigue en 2 frases y sin h2 | Añadir CTA a fan art por encargo en description (hay hasta 155) y 1-2 frases de cuerpo con enlace a /encargos |
| Bajo | 404 sin JS | `render.js /portfolio/no-existe --raw` | HTTP 404 real, pero el HTML lleva las metas de la home (canonical `/`, sin noindex). Inocuo con código 404 | Aceptable; opcional `noindex` |
| Bajo | LCP / navbar | `NavbarComponent.vue:7,46` | El logo PNG (13 KB, 1380x181 natural, 419x55 mostrado) sale `loading=lazy` y está en el primer viewport | Pasar `eager` al logo o usar una variante más pequeña |
| Bajo | Home móvil | `render.js / --requests --width 390 --dpr 2` | Descarga las 6 tarjetas (35-253 KB; `Elizabetth_II_960` 253 KB) pese a `lazy`; sin cambios respecto a antes | Revisar `sizes` de tarjetas; sin urgencia |

## Verificación punto por punto
- Home sin JS (`dist/index.html`): RESUELTO. title y description nuevos (153 car., <=155), `og:url` `https://raulgarcia.me/` con barra, `og:type=website`, `twitter:card/title/description/image`, canonical `/`, JSON-LD `Person` (con `description`, `sameAs`, imagen absoluta). Coincide con tras JS.
- Description Ghibli: cambiada a "Fan art de Studio Ghibli: dos ilustraciones de Mi vecino Totoro dentro de un proyecto personal en marcha." (107). Parcial (ver tabla).
- og:type: RESUELTO. `website` en HTML estático (`prerender-meta.js:35`) y SPA (`useSeoMeta.js:40`) en obras, láminas y fijas.
- `inLanguage: 'es'`: RESUELTO en `useSeoMeta.js:132` y `prerender-meta.js:59`; presente en el JSON-LD de la obra, sin y con JS.
- Prerender: obras, `/shop/cuero` (Product + Offer), `/about-me`, `/encargos`, `/contact`, `/shop` -> 200 con title, description, og:*, twitter:*, canonical y og:url propios; og:image absolutas. `/privacidad` 200 con `noindex` y fuera del sitemap. `retratos-rock-metal` description 174 B de JSON (con escapes), sin cambios.
- Sitemap: 13 URLs canónicas (home, encargos, about-me, contact, shop, 6 obras, shop/cuero, shop/diosa), todas 200. `robots.txt`: `Allow: /` y sitemap.
- Redirecciones: `/portfolio` -> 301 `/`; `/portfolio/crush` -> 301 `/`; `/portfolio/no-existe` -> 404; reglas retiradas intactas; `/*` -> 404.

## sizes y layout de la ficha (`WorkComponent.vue:18`)
- `sizes="(min-width: 1120px) 960px, 100vw"`. Móvil 390 dpr2 (780 px necesarios): carga `Totoro_2_960` (76 KB), renderizada 960x960 natural 960x960 en el chequeo. Escritorio 1280 dpr1: `Totoro_2_960`, 960 css px: ajuste exacto. En dpr2 de escritorio ideal sería 1280 (existe). Adecuado.
- LCP: imagen `eager`, con `width`/`height` del dato, `aspect-ratio` en bloques de vídeo: sin CLS apreciable. Igual que antes (76 KB). Segunda imagen `lazy`.

## Métricas observadas
- JS inicial `dist/assets/index-B6N-aQYf.js`: 157 560 B (55 383 gzip), +0,5 KB frente a antes; CSS `index-CLGBkaiK.css` 7 711 B (antes 2,1 KB gzip, equiv. ~7 KB). WorkComponent 3 KB. Sin terceros.
- Fuentes: Roboto-Regular 30 KB + AbrilFatface 18 KB, woff, `font-display: swap`.
- Móvil home: LCP probable `Clau_960` 100 KB; Ghibli: `Totoro_2_960` 76 KB.
- Imágenes > 300 KB: solo `Elizabetth_II_1280.jpeg` (445 KB), sin cambios.
