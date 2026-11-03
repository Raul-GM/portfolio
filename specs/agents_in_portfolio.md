# Plan: portfolio de fan art y retratos + publicación automatizada de obra (v5)

> v5 (2026-10-29): migración a Vite y Node 22, sin analítica ni cookies, limpieza de código muerto y cierre antes del lanzamiento (6c). Los apartados que citan Node 16 o Vue CLI describen el punto de partida histórico.
> v4: incorpora las respuestas a P1–P6. La v2 original está en `agents_in_portfolio.v2-original.md`.
> Las decisiones aún abiertas están en la sección 2.3.

---

## 0. Punto de partida

### 0.1 Realidad del repo (corrige supuestos de la v2)

| Supuesto v2 | Realidad | Consecuencia |
|---|---|---|
| Vite/Nuxt, TS, Composition API | Vue CLI 4.5 (webpack), JS, Options API, **Node 16** (`node-sass@6`) | Todo en JS + Options API. **Actualizado el 2026-10-29: migrado a Vite 8 y Node 22** (6c) |
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
2. Portfolio **centrado en dos líneas: fan art y retratos**. Solo las mejores piezas. Diseño gráfico, logos, vídeo y el resto de encargos salen de la web.
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

**Líneas:** fan art (series, películas, videojuegos, cómic, anime, música…) y retratos.

**Nombre propuesto (a confirmar, P7):**

- Etiqueta de sección: **"Fan art"** y **"Retratos"** (decidido el 2026-10-29; antes "Cultura pop").
- Titular de la web: **"Ilustración de personajes de series, películas y videojuegos, y retratos por encargo"**. Título SEO: "Raúl García | Fan art por encargo y retratos ilustrados".
- Palabras clave SEO (en textos y descripciones): *fan art por encargo*, *ilustración de series/películas/videojuegos*, *retrato ilustrado personalizado*, *regalo personalizado*.
- *Fan art* se adopta como etiqueta (2026-10-29): es lo que se busca y se entiende al instante, aunque suene menos "oficial". Descartados: *cultura pop* (vaga y poco buscada), *geek/friki* (demasiado coloquial), *pop culture art* (el público es hispanohablante).

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
| `sharp@0.32` como devDependency (P3) | Era la última compatible con Node 16. Con Node 22 funciona; su script de instalación está aprobado en `allowScripts` |
| ~~Node 16 vía nvm-windows (P4)~~ → **Node 22** (`.nvmrc`, `engines >=22.12`); Netlify lo toma del `.nvmrc` (sin `NODE_VERSION` en el panel) | Vite 8 y Babel 8 lo exigen; con Node 16 el proyecto ya no arranca |
| Hosting **Netlify** (P5): `_redirects` en `public/`, HTML por obra generado tras el build (sección 5) | Netlify sirve `portfolio/<slug>/index.html` si existe, antes del fallback |
| Tienda congelada hasta fase 2 (P6) → **se incorpora en el lanzamiento**; propuesta de cambios en 6c.D | Decisión del autor, 2026-10-29 |
| **Sin analítica ni cookies** (se retira Google Analytics) | Coherencia con los valores del autor; evita el banner de cookies. Lo legal que sí queda, en 6c.B |
| Rama de trabajo `portfolio_v2` (la web actual sigue en `main`) | La V2 está a medias: no se sube a `main` hasta el lanzamiento |
| **No se despliega el reset hasta tener ≥ 6 obras nuevas** | Mientras, producción sigue con la web actual (solo con el hotfix 0.2) |

### 2.3 Abiertas

| # | Pregunta | Recomendación | Bloquea |
|---|---|---|---|
| P7 | ✅ Categorías: **Fan art** y **Retratos**. Más adelante, Animación y Motion Graphics (el modelo lo admite añadiendo una categoría) | — | — |
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
    category: Categories.FAN_ART, // FAN_ART | PORTRAIT
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

1. **Recoger.** Mira las imágenes. Pregunta solo lo que no pueda deducir, máximo 3 preguntas a la vez: fan art o retrato, franquicia, año, encargo/personal (y si el cliente acepta salir), ¿destacada?, ¿serie existente?
2. **Encaje** con `docs/brief/reglas-portfolio.md`: avisa si la obra no es fan art ni retrato, y si la home ya tiene el máximo sugiere cuál archivar. Decides tú.
3. **Borrador** en un único mensaje para tu OK: slug, texto en tu voz a partir del comentario (**sin inventar datos**), `summary`, título y description SEO, `alt` por imagen, orden. **Único punto de control obligatorio.**
4. **Generar:** `npm run images`, entrada en `works.js` (`altReviewed: true` solo si aprobaste los alt).
5. **Verificar:** `check`, `lint` (revisa el diff que auto-corrige), `build` con Node 22.
6. **Revisar en paralelo:** `a11y-auditor`, `ux-reviewer`, `seo-auditor` con ámbito "obra `<slug>`". Aplica lo que sea de datos/texto; te enseña el resto.
7. **Entregar:** rama `obra/<slug>`, commit y resumen (cómo verla en local, peso de imágenes, avisos de calidad, hallazgos pendientes). **No hace push sin que lo pidas.**

Variantes: *"añade estas imágenes a `<slug>`"*, *"archiva `<slug>`"*, *"destaca `<slug>`"*.

### 3.4 Subagentes (`.claude/agents/`, solo lectura salvo su informe)

| Agente | Papel |
|---|---|
| `a11y-auditor` | WCAG 2.2 AA + convenciones de `CLAUDE.md`. Ámbito "obra" o "sitio" |
| `ux-reviewer` | Coherencia y claridad del mensaje: ¿se entiende en 5 s que haces fan art y retratos, y cómo encargarte uno? |
| `seo-auditor` | `og:image` resoluble, schema, sitemap, títulos únicos, respuesta 200 de cada URL. Se apoya en el skill `seo-audit` instalado |
| `portfolio-curator` | Sesión interactiva: selección inicial desde `inbox/` y revisión semestral. Criterio: encaje con el nicho y coherencia, no calidad artística |

Informes en `docs/audits/<agente>-<fecha>-<ámbito>.md`; al hilo principal, ≤ 10 líneas.

---

## 4. Fases

### Hotfix (en `main`, ya; requiere P8 y P9)

`public/_redirects` con fallback SPA + `netlify.toml` (`NODE_VERSION=16`, comando de build). *Hoy no hay `netlify.toml`: Netlify usa el `.nvmrc` y el comando de build del panel; confirma que `main` ya tiene el arreglo del build.* Comprobar tras desplegar que `/about-me`, una obra y `/sitemap.xml` responden 200.

### Fase 0 — Línea base y selección (en paralelo con la fase 1)

- **0.1** Crear los tres auditores y ejecutarlos sobre la web actual → columna "Antes".
- **0.2** Reunir en `inbox/` **toda** tu obra de fan art y retratos (también la que no está en la web). Una carpeta por obra; `nota.txt` opcional (año, encargo, contexto).
- **0.3** `portfolio-curator` → `docs/brief/reglas-portfolio.md` (reglas del nicho) y `docs/brief/seleccion.md` (qué entra, qué falta: p. ej. "solo hay videojuegos, faltan series").

### Fase 1 — Cimientos (rama `portfolio_v2`)

1. **Reset:** borrar los 13 componentes de obra, sus rutas, `portfolio.js` y sus imágenes; redirects 301 de las URLs antiguas a `/portfolio`.
2. `works.js` vacío + `WorkComponent.vue` + ruta `/portfolio/:slug` + home leyendo de `works.js` (con estado vacío digno mientras no haya obras).
3. Scripts `images` (+ `sharp`) y `check`. `OptimizedImageComponent`: `width`/`height`, `sizes`, WebP opcional.
4. SEO: `og:image` reales, sitemap y HTML por obra generados.
5. `CLAUDE.md`: "publicar obra = `/nueva-obra`; `works.js` es la única fuente; Node 22".

### Fase 2 — Skill `/nueva-obra`

Escribirlo y probarlo con 3 obras reales distintas (fan art suelto, serie, retrato). Ajustar el prompt con lo que falle.

### Fase 3 — Web orientada al nicho y lanzamiento

1. Publicar la selección con `/nueva-obra` (≥ 6 obras para lanzar).
2. Categorías y filtros: Fan art / Retratos (y franquicia si hay suficientes obras).
3. Home, "Sobre mí" (P10), página de **comisiones** (qué haces, proceso, plazos, desde qué precio) y contacto orientados a encargos.
4. Auditorías completas → columna "Después" → merge a `main` y despliegue.

### Fase 4 — Tienda (se repiensa)

Ver aviso de propiedad intelectual en 2.1. La tienda entra en el lanzamiento: revisión y mejoras propuestas en 6c.D (pendiente de tus decisiones).

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
| Build con Node distinto de 22 | `.nvmrc` y `engines`; `CLAUDE.md` indica cómo anteponer Node 22 al `PATH` |
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
- [x] Logo: se mantiene tal cual, con "Ilustración × Diseño" (decisión del autor). Alt actualizado.
- [x] Home: titular visible + llamada a la acción "Pide tu encargo"; estado vacío por filtro.
- [x] Página de encargos: qué se encarga, proceso, plazos, precio orientativo; enlazada desde cada obra (CTA como botón primario).
- [x] Sobre mí y Contacto reescritos para el nicho; redes de la etapa de diseño.
- [x] Tienda: ocultarla del menú hasta la fase 4; alt reales en `shop.js`.
- [x] Ficha de obra: imagen antes del texto (hoy empieza a ~425 px).

## 6c. Cierre antes del lanzamiento (2026-10-29)

**Hecho en esta ronda**
- [x] Migración de Vue CLI (webpack 4) a **Vite 8** y **Node 22** (`.nvmrc`). Verificada comparando `dist/` y 9 rutas renderizadas con la versión anterior: metas, JSON-LD, imágenes y 404 iguales.
- [x] Imágenes: `import.meta.glob` en `src/utils/getImageUrl.js` en lugar de `require()` dinámico. El dev server ya ve carpetas nuevas sin reiniciar.
- [x] **Sin Google Analytics ni cookies.** Retirados el script de `index.html` y el bloqueo de analítica de `scripts/render.js`. Regla nueva en `CLAUDE.md`.
- [x] Código muerto retirado: `.env` y `.env.production` (variables de EmailJS sin uso), `meta.title` de las rutas, ~80 líneas de SCSS sin uso (`.portfolio-project-container`, `.aboutme-container`, `.portfolio-more-projects-button`, `.visually-hidden`), campos `url` y `left` de `shop.js` y datos sin uso de `ShopProductComponent`.
- [x] Fix: en el hover de las cards se veía el fondo de la página bajo el pie; ahora es blanco.

**A. Contenido (lo que decide el autor)**
- [ ] Obras: 3 publicadas de las ≥ 6 necesarias. Revisar el alt de `retrato-isabel-ii` (`altReviewed: false`).
- [ ] Revisar los textos de todas las páginas.
- [ ] Revisar el proceso de encargos (`/encargos`).
- [ ] Revisar Sobre mí y Contacto (el formulario funciona, comprobado).

**B. Legal mínimo (sin analítica)**
Sin cookies no hace falta banner ni política de cookies. Sigue haciendo falta, si hay actividad económica (encargos, tienda) y un formulario que recoge datos personales (no es asesoría legal; confírmalo con un gestor):
- [ ] **Identificación del prestador** (LSSI, art. 10): nombre, correo, NIF y domicilio.
- [x] **Información de privacidad del formulario** (RGPD, art. 13): redactada en `/privacidad` y resumida bajo el formulario. Confirmar el plazo de conservación (1 año) y las condiciones de Formspree (DPA, retención).
- [ ] **Condiciones de compra** (si se vende por la web): precio con IVA, envío, desistimiento, garantía.
- [x] Política de privacidad enlazada desde el pie (`/privacidad`). La identificación del prestador y las condiciones de compra quedan sin hacer por decisión del autor.

**C. Técnico y despliegue**
- [ ] Auditorías de accesibilidad, UX y SEO tras cerrar contenido, para la columna "Después".
- [ ] Netlify: comando `npm run build`, carpeta `dist`, sin `NODE_VERSION` (ya confirmado: sin variables de entorno). Probar con deploy preview.
- [ ] Merge de `portfolio_v2` a `main` solo al lanzar. Después: 301 de URLs antiguas, 404 real, `/sitemap.xml`, vista previa al compartir.
- [ ] Alta en Google Search Console y envío del sitemap.
- [ ] Opcional: subir `@unhead/vue` (2.x/3.x), en un cambio aparte.

**D. Tienda: hallazgos y propuesta** (decidido el 2026-10-29: se mantienen las 2 láminas, sin carrito ni cobro; se compra por contacto; hecho salvo lo marcado)
- Contenido: 2 productos (Cuero 14 €, Diosa 10 €) de la web anterior, sin relación con las obras actuales; "Offfset" con tres f; imágenes con marco y texto "Sin marco"; stock escrito a mano ("Quedan 5 copias") que se queda viejo; faltan envío, plazos, pago y devoluciones; texto con "interesado o interesada".
- Contacto: el enlace a Instagram es un hilo concreto (`instagram.com/direct/t/…`), probablemente inútil para un visitante: usar el perfil o `ig.me`. El correo va en texto plano.
- Técnico: imágenes sin `OptimizedImageComponent` ni `npm run images` (sin `srcset`, sin `width`/`height`, sin 960); `format="jpg"` pasado a `ImageComponent`, que no lo usa; `noindex` fijo en la ficha; sin `og:image` ni `schema` Product; las fichas no tienen HTML propio en `dist/` (vista previa genérica) ni entran en el sitemap.
- [x] Hecho: `shop.js` como `works.js` con validación en `check`; imágenes por `npm run images -- … --dir shop`; `OptimizedImageComponent`; HTML con metas, schema Product y sitemap por ficha; `/contact?lamina=<id>` con mensaje empezado; "Tienda" en el menú; enlace desde la obra a su lámina (`workSlug`); enlace de Instagram al perfil; sin `noindex`; sin regla `/shop/*` en `_redirects`.
- [ ] Pendiente: confirmar el texto de envío ("te confirmo disponibilidad, gastos de envío y plazo antes de que pagues nada"), condiciones de compra y propiedad intelectual (6c.B y punto 8).
- Propuesta original: (1) pasar `shop.js` al estilo de `works.js` (cabecera comentada, `workSlug`, alt, dimensiones, validación en `check`); (2) imágenes por el script y `OptimizedImageComponent`; (3) HTML con metas y schema Product por ficha, y sitemap; (4) botón "Quiero esta lámina" que rellena el formulario de Contacto con el nombre del producto; (5) texto de envío, plazos y devoluciones; (6) "Tienda" en menú y pie, y enlace desde la obra a su lámina; (7) cobro: empezar por contacto + enlace de pago (sin cookies en la web) y no usar carritos de terceros; (8) revisar la propiedad intelectual antes de vender láminas de personajes con copyright.

## 7. Checklist

- [x] Responder P7–P10 (todas resueltas en 2.3).
- [ ] Hotfix `_redirects` en `main` (el `netlify.toml` ya no se usa: Node por `.nvmrc`). Confirmar que `main` lo tiene.
- [ ] Fase 0: auditores + línea base · `inbox/` · curaduría.
- [x] Fase 1: reset → `works.js` + `WorkComponent` → scripts → SEO → `CLAUDE.md`. Probado con `retrato-isabel-ii`.
  - Decisión: **solo JPEG** (mozjpeg q80). Con ilustración texturizada, WebP y AVIF pesaban igual o más.
  - Pendiente: `public/og-image.jpg` por defecto (no existe), verificar en Netlify que sirve `portfolio/<slug>/index.html`, `Bio 1.png` de 6 MB.
- [x] Fase 2: `/nueva-obra` probado con 3 obras (Isabel II, Studio Ghibli, Retratos de rock y metal).
- [x] Migración a Vite + Node 22; sin analítica; limpieza de código muerto (6c).
- [ ] Fase 3: ≥ 6 obras, textos, encargos, Sobre mí y Contacto, legal mínimo, tienda, auditorías, lanzamiento (6c A–D).
