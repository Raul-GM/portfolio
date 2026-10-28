# Plan: portfolio de cultura pop y retratos + publicación automatizada de obra (v4)

> v4: incorpora las respuestas a P1–P6. La v2 original está en `agents_in_portfolio.v2-original.md`.
> Las decisiones aún abiertas están en la sección 2.3.

---

## 0. Punto de partida

### 0.1 Realidad del repo (corrige supuestos de la v2)

| Supuesto v2 | Realidad | Consecuencia |
|---|---|---|
| Vite/Nuxt, TS, Composition API | Vue CLI 4.5 (webpack), JS, Options API, **Node 16** (`node-sass@6`) | Todo en JS + Options API; scripts compatibles con Node 16 |
| Sin `CLAUDE.md` | Existe | Se amplía al final de la fase 1 |
| Obras en un fichero de datos | Cada obra = componente `.vue` + ruta + `portfolio.js` + sitemap, sincronizados a mano | Se pasa a **obras como datos** (3.1) |
| `image-optimizer` como subagente | Trabajo mecánico | **Script** `npm run images` |

### 0.2 Problemas detectados en producción (Netlify, `raulgarcia.me`)

- **El build falla desde el 7-may-2026** (commit `153ad50`): `@unhead/vue@3` exige Vue ≥ 3.5 y webpack 5. Netlify sigue sirviendo el último deploy que compiló (anterior al SEO). **Arreglado** en `fix/build-and-spa-fallback` (`@unhead/vue@1.11` + `vue.config.js`).
- **Toda URL que no sea `/` devuelve 404 de Netlify** si se visita directamente o se recarga (`/portfolio/crush`, `/about-me`, `/sitemap.xml`…); navegar desde la home sí funciona. Google y los enlaces compartidos ven el 404. **Arreglado** con `public/_redirects` en la misma rama.
- `og:image` apunta a URLs inexistentes (las imágenes de `src/assets` se publican como `/img/<nombre>.<hash>.jpeg`); el `og-image.jpg` por defecto no existe.
- Las redes sociales no ejecutan JS: aunque se arregle lo anterior, verán las metas genéricas de `index.html`, no las de cada obra (solución en sección 5).

---

## 1. Objetivo

1. **Publicar una obra nueva = un comando** (`/nueva-obra`): le das las imágenes, un título y un comentario, y Claude genera todo lo demás, lo revisa y te deja un commit.
2. Portfolio **centrado en dos líneas: ilustración de cultura pop y retratos**. Solo las mejores piezas. Diseño gráfico, logos, vídeo y el resto de encargos salen de la web.
3. Captar **comisiones** de esas dos líneas.
4. Accesible (WCAG 2.2 AA), rápido e indexable, con previsualización correcta al compartir.

| Métrica | Antes | Objetivo |
|---|---|---|
| Páginas que responden 200 en producción | solo `/` | todas |
| Ficheros a tocar a mano para publicar una obra | 4 + imágenes | 0 |
| Páginas de obra con `og:image` válido | 0 | 100 % |
| Lighthouse Performance (móvil) | `<<fase 0>>` | ≥ 90 |
| Lighthouse Accessibility | `<<fase 0>>` | 100 |
| Incidencias axe serias/críticas | `<<fase 0>>` | 0 |
| Obras publicadas | 13 (mezcla) | 12–20, todas del nicho |

---

## 2. Decisiones

### 2.1 Nicho y nombre

**Líneas:** cultura pop (series, películas, videojuegos, cómic, anime, música…) y retratos.

**Nombre propuesto (a confirmar, P7):**

- Etiqueta de sección: **"Cultura pop"** y **"Retratos"**.
- Titular de la web: **"Ilustración de cultura pop y retratos por encargo"**.
- Palabras clave SEO (en textos y descripciones, no como etiqueta): *fan art por encargo*, *ilustración de series/películas/videojuegos*, *retrato ilustrado personalizado*, *regalo personalizado*.
- Descartados como etiqueta principal: *fan art* (suena amateur y no oficial, aunque se busca mucho: va en SEO), *geek/friki* (demasiado coloquial), *pop culture art* (el público es hispanohablante).

**Pieza puente recomendada:** *"te retrato al estilo de tu serie/videojuego favorito"*. Une las dos líneas, es muy fácil de vender como comisión y como regalo, y le da a la web una oferta clara.

**Aviso de propiedad intelectual:** los personajes con copyright no son tuyos. Mostrarlos en portfolio y aceptar encargos personales es práctica habitual; **vender reproducciones** (láminas, prints) de esos personajes en la tienda de fase 2 es otra cosa y conviene consultarlo. No uses logos oficiales de las franquicias en las imágenes destacadas.

### 2.2 Tomadas

| Decisión | Motivo |
|---|---|
| Flujo "publicar obra" como **skill** (`/nueva-obra`) | Corre en el hilo principal: ve la imagen, te pregunta, te enseña un borrador y lanza subagentes revisores |
| **Obras como datos** (`works.js` + página genérica `/portfolio/:slug`) | Publicar = imágenes + 1 entrada de datos; sin generar código |
| **Reset completo:** se retiran las 13 obras actuales y se empieza de cero | Decisión tuya (P2). Las obras que vuelvan entran por `/nueva-obra` como cualquier otra |
| URLs antiguas → **redirect 301 a `/portfolio`** en `_redirects` (o a la obra nueva equivalente si vuelve) | No regalar 404 a enlaces externos ni a Google |
| Se borran las imágenes antiguas de `src/assets` (siguen en el historial de git); se conservan `shop/`, `aboutMe/`, `icons/` y logos | Repo más ligero; la tienda no se toca |
| Originales fuera de git (`originals/` e `inbox/` en `.gitignore`) | El repo ya pesa 129 MB en imágenes |
| `sharp@0.32` como devDependency (P3) | Última versión compatible con Node 16 |
| Node 16 vía **nvm-windows** (P4): los scripts y el skill llaman directamente a `%APPDATA%\nvm\v16.20.2\node.exe`, sin `nvm use` | `nvm use` cambia la versión global y puede pedir permisos de administrador; así no interfiere con tu Node 22 |
| Hosting **Netlify** (P5): `_redirects` en `public/`, HTML por obra generado tras el build (sección 5) | Netlify sirve `portfolio/<slug>/index.html` si existe, antes del fallback |
| Tienda congelada hasta fase 2 (P6) | — |
| **No se despliega el reset hasta tener ≥ 6 obras nuevas** | Mientras, producción sigue con la web actual (solo con el hotfix 0.2) |

### 2.3 Abiertas

| # | Pregunta | Recomendación | Bloquea |
|---|---|---|---|
| P7 | ✅ Categorías: **Cultura pop** y **Retratos**. Más adelante, Animación y Motion Graphics (el modelo lo admite añadiendo una categoría) | — | — |
| P8 | ✅ Hotfix hecho en rama `fix/build-and-spa-fallback`. Falta tu OK para mergear a `main` (Netlify despliega en cada push a `main`) | — | — |
| P9 | ✅ Despliegue: Netlify compila cada push a `main` | — | — |
| P10 | ✅ Fuera el código muerto y lo de desarrollador: inventario pendiente de tu OK antes de borrar | — | Fase 1 |

---

## 3. Arquitectura

```
                tú: /nueva-obra inbox/mi-ilustracion "Título" "comentario"
                                      │
                ┌─────────────────────▼─────────────────────┐
                │  Skill nueva-obra (hilo principal)        │
                │  pregunta · redacta · escribe datos ·     │
                │  ejecuta scripts · integra revisiones     │
                └───┬───────────────┬───────────────┬───────┘
         scripts    │               │  subagentes   │ (lectura, en paralelo)
   ┌────────────────▼──┐     ┌──────▼──────┐ ┌──────▼──────┐ ┌─────────────┐
   │ npm run images    │     │ a11y-auditor│ │ ux-reviewer │ │ seo-auditor │
   │ npm run check     │     └─────────────┘ └─────────────┘ └─────────────┘
   │ lint · build      │
   └───────────────────┘
   Fuera del flujo diario: portfolio-curator (sesión interactiva: selección inicial, revisión semestral)
```

### 3.1 Obras como datos

- `src/views/data/works.js` es la **única fuente**: tarjetas de la home, página de obra, SEO, sitemap y HTML para redes salen de ahí. Sustituye a `portfolio.js`.
- Un solo componente `src/views/portfolio/WorkComponent.vue` en `/portfolio/:slug`. Slug inexistente o archivado → `NotFound`.
- Contenido por **bloques**: `image`, `video` (YouTube, para *speedpaints* o procesos), `text`.

```js
// src/views/data/works.js
import { Categories } from './categories';

export const works = [
  {
    slug: 'geralt-de-rivia',          // URL /portfolio/geralt-de-rivia; estable (servirá como id en la tienda)
    title: 'Geralt de Rivia',
    category: Categories.POP_CULTURE, // POP_CULTURE | PORTRAIT
    franchise: 'The Witcher',         // serie/peli/juego; null en retratos. Filtro y SEO
    status: 'visible',                // 'destacado' | 'visible' | 'archivo'
    order: 10,                        // orden en la home
    year: 2026,
    kind: 'personal',                 // 'encargo' | 'personal'
    client: null,
    series: null,                     // agrupa piezas de una misma serie
    summary: 'Retrato de Geralt en tinta y color digital',  // tarjeta de la home
    body: ['…'],                      // párrafos de la página
    seo: {
      title: 'Geralt de Rivia (The Witcher) | Ilustración - Raúl García',
      description: '…',               // ≤ 155 caracteres
      ogImage: 'og/geralt-de-rivia.jpg', // en public/, generada por el script
    },
    cover: 'portfolio/GeraltDeRivia/geralt',               // sin sufijo ni extensión
    blocks: [
      { type: 'image', image: 'portfolio/GeraltDeRivia/geralt', alt: '…', width: 1280, height: 1600, altReviewed: true },
    ],
  },
];
```

### 3.2 Scripts (deterministas, sin IA)

| Comando | Qué hace |
|---|---|
| `npm run images -- <origen> <Carpeta> <slug>` | Desde `inbox/…` genera en `src/assets/images/portfolio/<Carpeta>/` los `_320`, `_640`, `_1280` (JPEG sRGB, sin metadatos salvo copyright; WebP opcional), `public/og/<slug>.jpg` (1200×630) y devuelve ancho/alto. **Nunca toca el origen** |
| `npm run check` | Valida `works.js`: slugs únicos en minúsculas-con-guiones, existen los 3 tamaños y la og, ningún `alt` vacío o `Image`, `description` ≤ 155, categoría válida |
| `prebuild` | Regenera `public/sitemap.xml` desde `works.js` |
| `postbuild` | Genera `dist/portfolio/<slug>/index.html` con metas de cada obra (sección 5) |

### 3.3 Skill `/nueva-obra` (`.claude/skills/nueva-obra/SKILL.md`)

**Entrada:** ruta a imagen o carpeta, título y comentario breve.

1. **Recoger.** Mira las imágenes. Pregunta solo lo que no pueda deducir, máximo 3 preguntas a la vez: cultura pop o retrato, franquicia, año, encargo/personal (y si el cliente acepta salir), ¿destacada?, ¿serie existente?
2. **Encaje** con `docs/brief/reglas-portfolio.md`: avisa si la obra no es de cultura pop ni retrato, y si la home ya tiene el máximo sugiere cuál archivar. Decides tú.
3. **Borrador** en un único mensaje para tu OK: slug, texto en tu voz a partir del comentario (**sin inventar datos**), `summary`, título y description SEO, `alt` por imagen, orden. **Único punto de control obligatorio.**
4. **Generar:** `npm run images`, entrada en `works.js` (`altReviewed: true` solo si aprobaste los alt).
5. **Verificar:** `check`, `lint` (revisa el diff que auto-corrige), `build` con Node 16.
6. **Revisar en paralelo:** `a11y-auditor`, `ux-reviewer`, `seo-auditor` con ámbito "obra `<slug>`". Aplica lo que sea de datos/texto; te enseña el resto.
7. **Entregar:** rama `obra/<slug>`, commit y resumen (cómo verla en local, peso de imágenes, avisos de calidad, hallazgos pendientes). **No hace push sin que lo pidas.**

Variantes: *"añade estas imágenes a `<slug>`"*, *"archiva `<slug>`"*, *"destaca `<slug>`"*.

### 3.4 Subagentes (`.claude/agents/`, solo lectura salvo su informe)

| Agente | Papel |
|---|---|
| `a11y-auditor` | WCAG 2.2 AA + convenciones de `CLAUDE.md`. Ámbito "obra" o "sitio" |
| `ux-reviewer` | Coherencia y claridad del mensaje: ¿se entiende en 5 s que haces cultura pop y retratos, y cómo encargarte uno? |
| `seo-auditor` | `og:image` resoluble, schema, sitemap, títulos únicos, respuesta 200 de cada URL. Se apoya en el skill `seo-audit` instalado |
| `portfolio-curator` | Sesión interactiva: selección inicial desde `inbox/` y revisión semestral. Criterio: encaje con el nicho y coherencia, no calidad artística |

Informes en `docs/audits/<agente>-<fecha>-<ámbito>.md`; al hilo principal, ≤ 10 líneas.

---

## 4. Fases

### Hotfix (en `main`, ya; requiere P8 y P9)

`public/_redirects` con fallback SPA + `netlify.toml` (`NODE_VERSION=16`, comando de build). Comprobar tras desplegar que `/about-me`, una obra y `/sitemap.xml` responden 200.

### Fase 0 — Línea base y selección (en paralelo con la fase 1)

- **0.1** Crear los tres auditores y ejecutarlos sobre la web actual → columna "Antes".
- **0.2** Reunir en `inbox/` **toda** tu obra de cultura pop y retratos (también la que no está en la web). Una carpeta por obra; `nota.txt` opcional (año, encargo, contexto).
- **0.3** `portfolio-curator` → `docs/brief/reglas-portfolio.md` (reglas del nicho) y `docs/brief/seleccion.md` (qué entra, qué falta: p. ej. "solo hay videojuegos, faltan series").

### Fase 1 — Cimientos (rama `portfolio_v2`)

1. **Reset:** borrar los 13 componentes de obra, sus rutas, `portfolio.js` y sus imágenes; redirects 301 de las URLs antiguas a `/portfolio`.
2. `works.js` vacío + `WorkComponent.vue` + ruta `/portfolio/:slug` + home leyendo de `works.js` (con estado vacío digno mientras no haya obras).
3. Scripts `images` (+ `sharp`) y `check`. `OptimizedImageComponent`: `width`/`height`, `sizes`, WebP opcional.
4. SEO: `og:image` reales, sitemap y HTML por obra generados.
5. `CLAUDE.md`: "publicar obra = `/nueva-obra`; `works.js` es la única fuente; Node 16 vía ruta de nvm".

### Fase 2 — Skill `/nueva-obra`

Escribirlo y probarlo con 3 obras reales distintas (cultura pop suelta, serie, retrato). Ajustar el prompt con lo que falle.

### Fase 3 — Web orientada al nicho y lanzamiento

1. Publicar la selección con `/nueva-obra` (≥ 6 obras para lanzar).
2. Categorías y filtros: Cultura pop / Retratos (y franquicia si hay suficientes obras).
3. Home, "Sobre mí" (P10), página de **comisiones** (qué haces, proceso, plazos, desde qué precio) y contacto orientados a encargos.
4. Auditorías completas → columna "Después" → merge a `main` y despliegue.

### Fase 4 — Tienda (se repiensa)

Ver aviso de propiedad intelectual en 2.1.

### Flujo permanente

- **Obra nueva:** dejarla en `inbox/` → `/nueva-obra` → aprobar el borrador → ver en local → push.
- **Cada 6 meses:** `portfolio-curator` + auditoría de sitio.

---

## 5. SEO en Netlify: previsualizaciones sociales

`postbuild` genera `dist/portfolio/<slug>/index.html` copiando `index.html` con título, description, `og:*` y schema de esa obra. Netlify sirve ese fichero (existe) en lugar del fallback de `_redirects`; el navegador arranca la SPA igual que siempre. Sin dependencias nuevas. Mismo trato para `/`, `/portfolio`, `/about-me` y `/contact`.

---

## 6. Riesgos

| Riesgo | Mitigación |
|---|---|
| El reset deja la web vacía | No se despliega hasta tener ≥ 6 obras; producción sigue como está (con hotfix) |
| Enlaces antiguos rotos | Redirects 301 en `_redirects` |
| El skill inventa contexto (cliente, fecha, premio) | Regla explícita + borrador obligatorio |
| Alt genéricos | `altReviewed` + `npm run check` |
| Colores apagados / artefactos | sRGB en el script; aviso del skill en línea fina y degradados |
| Build con Node 22 | Scripts y skill usan la ruta de Node 16 de nvm |
| Propiedad intelectual de personajes | Aviso en 2.1; consulta antes de vender reproducciones |
| Subagentes que escriben fuera de su zona | Solo lectura salvo informe; `git status` tras cada ejecución |

---

## 6b. Backlog de la primera auditoría (2026-10-28)

Informes completos en `docs/audits/*-2026-10-28-sitio.md`. La obra `retrato-isabel-ii` sale bien en los tres.

**A. Fallos técnicos (independientes del contenido; antes de lanzar):**
- [x] Bindings rotos: `aria-label="… {{ shopItem.name }}"` (ShopComponent) y `aria-expanded="isOpened"` + etiqueta fija del menú (Navbar).
- [x] Contacto: el estado de envío nunca se muestra (`formStatus` sin declarar ni pintar); error de email sin `aria-invalid`/`role="alert"`; `outline: none` sin foco visible.
- [x] Una `<h1>` y `<title>` propio en Sobre mí, Contacto, Tienda, ficha de producto y 404.
- [x] Contraste `#FAFAFA` sobre `--secondary-color` = 4,42:1 (filtro activo, hovers, botón): oscurecer el azul.
- [x] SEO: `public/og-image.jpg` por defecto; `prerender-meta.js` también para `/about-me`, `/contact`, `/shop`; `og:url`/canonical por ruta; `/portfolio` duplica `/`; 404 reales (soft 404) en `_redirects`.
- [x] Rendimiento: `Bio 1.png` (6,1 MB) por `npm run images`; Roboto a WOFF2 con `font-display: swap`.
- [x] Foco al cambiar de ruta; `prefers-reduced-motion`; menú móvil (foco, Escape).

**B. Contenido y mensaje (fase 3):**
- [ ] Logo y su alt ("Ilustración × Diseño").
- [x] Home: titular visible + llamada a la acción "Pide tu encargo"; estado vacío por filtro.
- [x] Página de encargos: qué se encarga, proceso, plazos, precio orientativo; enlazada desde cada obra (CTA como botón primario).
- [x] Sobre mí y Contacto reescritos para el nicho; redes de la etapa de diseño.
- [x] Tienda: ocultarla del menú hasta la fase 4; alt reales en `shop.js`.
- [x] Ficha de obra: imagen antes del texto (hoy empieza a ~425 px).

## 7. Checklist

- [ ] Responder P7–P10.
- [ ] Hotfix `_redirects` + `netlify.toml` en `main`.
- [ ] Fase 0: auditores + línea base · `inbox/` · curaduría.
- [x] Fase 1: reset → `works.js` + `WorkComponent` → scripts → SEO → `CLAUDE.md`. Probado con `retrato-isabel-ii`.
  - Decisión: **solo JPEG** (mozjpeg q80). Con ilustración texturizada, WebP y AVIF pesaban igual o más.
  - Pendiente: `public/og-image.jpg` por defecto (no existe), verificar en Netlify que sirve `portfolio/<slug>/index.html`, `Bio 1.png` de 6 MB.
- [ ] Fase 2: `/nueva-obra` probado con 3 obras.
- [ ] Fase 3: ≥ 6 obras, comisiones, auditorías, lanzamiento.
