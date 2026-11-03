# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Portfolio SPA en español (fan art y retratos por encargo + tienda de láminas), desplegada en `https://raulgarcia.me`. Vite, Vue 3 Options API, vue-router 4, SCSS, `@unhead/vue`. Todo el texto de cara al usuario va en español.

## Commands

- `npm run serve` — dev server de Vite (`http://localhost:5173`)
- `npm run build` — build de producción; es la verificación principal (no hay tests). `prebuild` valida `works.js` y regenera `public/sitemap.xml`; `postbuild` escribe `dist/portfolio/<slug>/index.html` con las metas de cada obra
- `npm run images -- <origen> --slug <slug> [--folder <Carpeta> | --dir <carpeta>] [--og <fichero>]` — desde `inbox/…` genera `_320/_640/_960/_1280.jpeg` ([anchos](src/views/data/imageWidths.js)) en `src/assets/images/portfolio/<Carpeta>/` (o `src/assets/images/<carpeta>/` con `--dir`, que usa la tienda: `--dir shop --slug shop-<id>`) y `public/og/<slug>.jpg`; imprime JSON con rutas y dimensiones para `works.js`
- `npm run check` — valida `works.js` (slugs, imágenes, alt, longitudes SEO)
- `npm run lint` — ESLint, **auto-corrige** archivos; revisa `git diff` después

**Node 22 (≥ 22.12, ver `.nvmrc`).** Vite y Babel 8 no arrancan con versiones anteriores. Si `node -v` no da 22, antepón Node 22 al `PATH` sin cambiar la versión global (nvm-windows): `export PATH="/c/Users/Raul/AppData/Roaming/nvm/v22.22.3:$PATH"` (Bash) antes de `npm`. No toques versiones de dependencias salvo que se pida.

**`sharp` necesita su script de instalación** (descarga libvips). npm bloquea los scripts que no estén en `allowScripts` de `package.json`; si se sube la versión de `sharp`, apruébala con `npm install-scripts approve sharp`.

**`@unhead/vue` sigue en 1.x.** Con Vite ya se podría subir, pero la 2.x/3.x cambia la API: hazlo en un cambio aparte.

## Verification

Tras cualquier cambio: `npm run lint` y `npm run build` deben pasar. Una imagen inexistente no rompe el build: se pinta `fallback.png`. `npm run check` (en `prebuild`) es lo que la detecta. Para ver una página renderizada sin abrir el navegador: sirve `dist/` y usa el Chromium de Playwright (`~/AppData/Local/ms-playwright/chromium_headless_shell-*/…/chrome-headless-shell.exe --dump-dom|--screenshot`).

## Architecture

- **Rutas** ([src/router/index.js](src/router/index.js)): todo salvo Home es lazy-loaded. Las obras comparten `/portfolio/:slug` ([WorkComponent](src/views/portfolio/WorkComponent.vue)); un slug inexistente o archivado muestra la 404 sin cambiar la URL. La tienda (`/shop`, láminas en `/shop/:product`, [ShopProductComponent](src/views/shop/ShopProductComponent.vue)) está en el menú y no tiene carrito ni cobro: quien quiere una lámina va a `/contact?lamina=<id>`, que deja el mensaje empezado. `/privacidad` es la política de privacidad del formulario (`noindex`, enlazada desde el pie). `/encargos` explica cómo encargar; las llamadas a la acción de la home y de cada obra apuntan ahí. `/` y `/portfolio` renderizan Home.
- **Layout**: cada vista renderiza ella misma `NavbarComponent` y `FooterComponent`. Cada vista aporta su propio `<main>`. [App.vue](src/App.vue) solo aporta `<router-view :key="$route.path">` (fuerza `setup()` y SEO al cambiar de obra) y el SCSS global de `src/assets/styles/`.
- **Datos**: [src/views/data/works.js](src/views/data/works.js) (**única fuente de obras**; el formato está comentado en su cabecera), [categories.js](src/views/data/categories.js) (Fan art, Retratos), [pages.js](src/views/data/pages.js) (título y description de las páginas fijas) y [shop.js](src/views/data/shop.js) (**única fuente de láminas**; formato comentado en su cabecera; lo valida `npm run check`).
- **Netlify**: despliega cada push a `main`. [public/_redirects](public/_redirects) contiene los 301 de obras retiradas, y, la última, `/*` → SPA con **404** (las páginas fijas, las obras y las láminas tienen HTML propio en `dist/`; una ruta nueva de la SPA sin HTML propio necesita su regla 200).
- **Contacto**: el formulario envía a Formspree (endpoint en [ContactComponent.vue](src/views/ContactComponent.vue)). No hay `.env`: el proyecto no usa variables de entorno.
- **Sin analítica ni cookies** (decisión de valores): no añadas Google Analytics, píxeles ni scripts de terceros que guarden datos; así no hace falta banner de cookies.
- **Revisores** (`.claude/agents/`): `a11y-auditor`, `ux-reviewer`, `seo-auditor`, solo lectura, informes en `docs/audits/`. Compila antes de lanzarlos y diles que no compilen (comparten `dist/`). Herramientas: [scripts/render.js](scripts/render.js) (sirve `dist/` como Netlify y abre rutas en Chromium: resumen, `--raw`, `--requests`, `--screenshot`, `--tab`, `--click`) y [scripts/contrast.js](scripts/contrast.js).

## Gotchas

- **Publicar una obra** = `npm run images` + una entrada en `works.js`. Nada más: ruta, tarjeta, sitemap, OG y HTML para redes salen de ahí. No crees componentes por obra ni edites `sitemap.xml`. El flujo guiado es el skill [`/nueva-obra`](.claude/skills/nueva-obra/SKILL.md); para mirar originales pesados sin abrirlos, `node scripts/preview.js <origen> <salida>`.
- **Scripts de Node y `works.js`**: [scripts/lib/load-works.js](scripts/lib/load-works.js) carga los ficheros de `src/views/data/` transpilándolos con Babel. Esos ficheros solo pueden importar con rutas relativas (sin `@/`) y no pueden importar `.vue` ni assets.
- **Originales** en `inbox/` u `originals/` (ignorados por git). Nunca se modifican.
- **URLs retiradas**: se redirigen en `public/_redirects`, no en el router. No reutilices sus slugs.
- **Imágenes**: [OptimizedImageComponent](src/components/OptimizedImageComponent.vue) recibe la ruta relativa a `src/assets/images/` **sin sufijo ni extensión** y busca `<nombre>_<ancho>` con [getImageUrl](src/utils/getImageUrl.js) (un `import.meta.glob` de todo `src/assets/images/`) para cada ancho de [imageWidths.js](src/views/data/imageWidths.js) (`format` por defecto `jpeg`) y construye el `srcset`. Todos los tamaños deben existir (`npm run check` lo valida). Pasa `width`/`height` (de `works.js`) y `sizes`; `eager` solo en la imagen principal. Sin espacios en los nombres de fichero: rompen el `srcset`.
- **SEO**: toda vista llama a `useSeoMeta({ title, description, ogImage, ogUrl, schema })` ([src/composables/useSeoMeta.js](src/composables/useSeoMeta.js)) dentro de `setup()`, con `getSchemaCreativeWork` / `getSchemaPersonProfile`. `ogImage` es relativo a la raíz salvo que empiece por `http`. El título lo gestiona unhead, no `meta.title` del router. Las páginas fijas (sitemap y HTML con metas) salen de `pages.js`; [scripts/prerender-meta.js](scripts/prerender-meta.js) escribe ese HTML para páginas fijas y obras. `useSeoMeta` pone canonical y `og:url` de la ruta actual; la 404 pasa `noindex: true`.

## Conventions

1. **Imita al vecino:** antes de crear un componente, copia la estructura de uno existente de la misma carpeta (orden `<template>` → `<script>` → `<style lang="scss">`).
2. **Options API:** `components: {}` explícito y `setup()` solo para `useSeoMeta`. Nada de `<script setup>` ni TypeScript.
3. **Imports con alias `@/`**, nunca rutas relativas `../../`.
4. **Semántica y accesibilidad:** una sola `<h1>` por vista, secciones con `aria-label`, y `altTitle` descriptivo en cada imagen (nunca el valor por defecto `Image`).
5. **Imágenes siempre con `OptimizedImageComponent`**, nunca `<img>` directo, para mantener `srcset` y `loading="lazy"`.
6. **Ficheros de desarrollo en inglés** (componentes `.vue`, composables, estilos, nombres de ruta e identificadores), en PascalCase para componentes. Excepciones: los ficheros y carpetas de **imágenes conservan el nombre original de la obra** (`Cuero`, `RetratoIsabelII/Elizabetth_II`…) aunque esté en español o lleve tildes: no los renombres (salvo espacios → `_`, que hace el script). El texto visible al usuario va en español.
7. **URLs en castellano** (el público es hispanohablante/España), en minúsculas con guiones: p. ej. `/portfolio/geralt-de-rivia`, `/portfolio/comision-retrato-familiar`. No cambies una URL pública sin añadir un 301 en `_redirects`.
8. **Dependencias y estilos:** no añadas librerías sin pedirlo. Usa las variables de `assets/styles/` (`_variables`, `_colors`) en vez de valores sueltos en el SCSS.
- `.agents/skills/seo-audit` es un skill instalado (ver `skills-lock.json`), no código de la app.
