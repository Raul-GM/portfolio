# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Portfolio SPA en español (ilustración de cultura pop y retratos + tienda de láminas), desplegada en `https://raulgarcia.me`. Vue CLI 4.5 (webpack), Vue 3 Options API, vue-router 4, SCSS, `@unhead/vue`. Todo el texto de cara al usuario va en español.

## Commands

- `npm run serve` — dev server
- `npm run build` — build de producción; es la verificación principal (no hay tests). `prebuild` valida `works.js` y regenera `public/sitemap.xml`; `postbuild` escribe `dist/portfolio/<slug>/index.html` con las metas de cada obra
- `npm run images -- <origen> --slug <slug> [--folder <Carpeta>] [--og <fichero>]` — desde `inbox/…` genera `_320/_640/_960/_1280.jpeg` ([anchos](src/views/data/imageWidths.js)) en `src/assets/images/portfolio/<Carpeta>/` y `public/og/<slug>.jpg`; imprime JSON con rutas y dimensiones para `works.js`
- `npm run check` — valida `works.js` (slugs, imágenes, alt, longitudes SEO)
- `npm run lint` — ESLint, **auto-corrige** archivos; revisa `git diff` después

**Node 16 obligatorio.** `node-sass@6` solo tiene binario compilado para Node 16 (`node_modules/node-sass/vendor/win32-x64-93`). Con Node 22 (la versión por defecto de esta máquina) `serve`/`build` fallan en SCSS. Sin cambiar la versión global (nvm-windows), antepón Node 16 al `PATH`: `export PATH="/c/Users/Raul/AppData/Roaming/nvm/v16.20.2:$PATH"` (Bash) antes de `npm`. No migres a `sass` ni toques versiones de dependencias salvo que se pida.

**`@unhead/vue` fijado a 1.x.** La 3.x exige Vue ≥ 3.5 y webpack 5 y rompe el build. [vue.config.js](vue.config.js) lo transpila y apunta sus dependencias a sus builds ESM; si se añade una dependencia de unhead que falle con "Can't import the named export … from non EcmaScript module", va a esa lista.

## Verification

Tras cualquier cambio: `npm run lint` y `npm run build` deben pasar. Un `require()` de imagen inexistente solo falla en build, no en lint. Para ver una página renderizada sin abrir el navegador: sirve `dist/` y usa el Chromium de Playwright (`~/AppData/Local/ms-playwright/chromium_headless_shell-*/…/chrome-headless-shell.exe --dump-dom|--screenshot`).

## Architecture

- **Rutas** ([src/router/index.js](src/router/index.js)): todo salvo Home es lazy-loaded. Las obras comparten `/portfolio/:slug` ([WorkComponent](src/views/portfolio/WorkComponent.vue)); un slug inexistente o archivado muestra la 404 sin cambiar la URL. La tienda comparte `/shop/:product`. `/` y `/portfolio` renderizan Home.
- **Layout**: cada vista renderiza ella misma `NavbarComponent` y `FooterComponent`. Cada vista aporta su propio `<main>`. [App.vue](src/App.vue) solo aporta `<router-view :key="$route.path">` (fuerza `setup()` y SEO al cambiar de obra) y el SCSS global de `src/assets/styles/`.
- **Datos**: [src/views/data/works.js](src/views/data/works.js) (**única fuente de obras**; el formato está comentado en su cabecera), [categories.js](src/views/data/categories.js) (Cultura pop, Retratos) y [shop.js](src/views/data/shop.js).
- **Netlify**: despliega cada push a `main`. [public/_redirects](public/_redirects) contiene los 301 de obras retiradas y el fallback de SPA (debe ir el último).
- **Contacto**: EmailJS vía `VUE_APP_EMAILJS_*` en `.env` / `.env.production` (ambos versionados). No imprimas ni copies esos valores.

## Gotchas

- **Publicar una obra** = `npm run images` + una entrada en `works.js`. Nada más: ruta, tarjeta, sitemap, OG y HTML para redes salen de ahí. No crees componentes por obra ni edites `sitemap.xml`. El flujo guiado será el skill `/nueva-obra` (plan en [specs/agents_in_portfolio.md](specs/agents_in_portfolio.md)).
- **Scripts de Node y `works.js`**: [scripts/lib/load-works.js](scripts/lib/load-works.js) carga los ficheros de `src/views/data/` transpilándolos con Babel. Esos ficheros solo pueden importar con rutas relativas (sin `@/`) y no pueden importar `.vue` ni assets.
- **Originales** en `inbox/` u `originals/` (ignorados por git). Nunca se modifican.
- **`npm run serve` no ve carpetas de imágenes creadas después de arrancar** (webpack 4 cachea el `require` dinámico): da `Cannot find module './portfolio/…_1280.jpeg'` aunque el fichero exista. Reinicia el dev server tras `npm run images`.
- **URLs retiradas**: se redirigen en `public/_redirects`, no en el router. No reutilices sus slugs.
- **Imágenes**: [OptimizedImageComponent](src/components/OptimizedImageComponent.vue) recibe la ruta relativa a `src/assets/images/` **sin sufijo ni extensión** y hace `require` de `<nombre>_<ancho>` para cada ancho de [imageWidths.js](src/views/data/imageWidths.js) (`format` por defecto `jpeg`) y construye el `srcset`. Todos los tamaños deben existir (`npm run check` lo valida). Pasa `width`/`height` (de `works.js`) y `sizes`; `eager` solo en la imagen principal. Sin espacios en los nombres de fichero: rompen el `srcset`.
- **SEO**: toda vista llama a `useSeoMeta({ title, description, ogImage, ogUrl, schema })` ([src/composables/useSeoMeta.js](src/composables/useSeoMeta.js)) dentro de `setup()`, con `getSchemaCreativeWork` / `getSchemaPersonProfile`. `ogImage` es relativo a la raíz salvo que empiece por `http`. El título lo gestiona unhead, no `meta.title` del router. Las rutas fijas del sitemap están en [scripts/sitemap.js](scripts/sitemap.js); las metas de obra para redes, en [scripts/prerender-meta.js](scripts/prerender-meta.js).

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
