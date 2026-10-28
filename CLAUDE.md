# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Portfolio SPA en español (ilustración y diseño gráfico + tienda de láminas), desplegada en `https://raulgarcia.me`. Vue CLI 4.5 (webpack), Vue 3 Options API, vue-router 4, SCSS, `@unhead/vue`. Todo el texto de cara al usuario va en español.

## Commands

- `npm run serve` — dev server
- `npm run build` — build de producción; es la verificación principal (no hay tests)
- `npm run lint` — ESLint, **auto-corrige** archivos; revisa `git diff` después

**Node 16 obligatorio.** `node-sass@6` solo tiene binario compilado para Node 16 (`node_modules/node-sass/vendor/win32-x64-93`). Con Node 22 (la versión por defecto de esta máquina) `serve`/`build` fallan en SCSS. No migres a `sass` ni toques versiones de dependencias salvo que se pida.

## Verification

Tras cualquier cambio: `npm run lint` y `npm run build` deben pasar. Un `require()` de imagen inexistente solo falla en build, no en lint.

## Architecture

- **Rutas** ([src/router/index.js](src/router/index.js)): todo salvo Home es lazy-loaded. Cada proyecto tiene su ruta escrita a mano en `/portfolio/<slug>` y su propio componente en [src/views/portfolio/](src/views/portfolio/). La tienda comparte `/shop/:product`. `/` y `/portfolio` renderizan Home.
- **Layout**: cada vista renderiza ella misma `NavbarComponent` (prop `sideType`, p. ej. `"designer"`) y `FooterComponent`. [App.vue](src/App.vue) solo aporta `<router-view>` y el SCSS global de `src/assets/styles/`.
- **Datos**: [src/views/data/portfolio.js](src/views/data/portfolio.js) (tarjetas de Home), [categories.js](src/views/data/categories.js) (enum de filtros) y [shop.js](src/views/data/shop.js).
- **Contacto**: EmailJS vía `VUE_APP_EMAILJS_*` en `.env` / `.env.production` (ambos versionados). No imprimas ni copies esos valores.

## Gotchas

- **Añadir un proyecto de portfolio** exige tocar 4 sitios a la vez: componente en `src/views/portfolio/` (copia uno existente como [CrushComponent.vue](src/views/portfolio/CrushComponent.vue)), ruta en el router, entrada en `portfolio.js` (`projectSrc` debe ser idéntico a la ruta; `category` desde `Categories`) y `<url>` en [public/sitemap.xml](public/sitemap.xml). Olvidar alguno rompe SEO o navegación sin error visible.
- **Slugs**: se comparan literalmente entre router, `portfolio.js` y sitemap. Los de comisiones usan `comision-…`; las URLs antiguas `commision-…`/`commission-…` solo sobreviven como `redirect` en el router, no las uses.
- **Imágenes**: [OptimizedImageComponent](src/components/OptimizedImageComponent.vue) recibe la ruta relativa a `src/assets/images/` **sin sufijo ni extensión** y hace `require` de `<nombre>_320`, `_640` y `_1280` (`format` por defecto `jpeg`). Los tres tamaños deben existir. `portfolio.js` referencia el `_640` con extensión.
- **SEO**: toda vista llama a `useSeoMeta({ title, description, ogImage, ogUrl, schema })` ([src/composables/useSeoMeta.js](src/composables/useSeoMeta.js)) dentro de `setup()`, con `getSchemaCreativeWork` / `getSchemaPersonProfile`. `ogImage` es relativo a la raíz salvo que empiece por `http`. El título lo gestiona unhead, no `meta.title` del router. Si cambian rutas, actualiza también `sitemap.xml` y `robots.txt`.

## Conventions

1. **Imita al vecino:** antes de crear un componente, copia la estructura de uno existente de la misma carpeta (orden `<template>` → `<script>` → `<style lang="scss">`).
2. **Options API:** `components: {}` explícito y `setup()` solo para `useSeoMeta`. Nada de `<script setup>` ni TypeScript.
3. **Imports con alias `@/`**, nunca rutas relativas `../../`.
4. **Semántica y accesibilidad:** una sola `<h1>` por vista, secciones con `aria-label`, y `altTitle` descriptivo en cada imagen (nunca el valor por defecto `Image`).
5. **Imágenes siempre con `OptimizedImageComponent`**, nunca `<img>` directo, para mantener `srcset` y `loading="lazy"`.
6. **Ficheros de desarrollo en inglés** (componentes `.vue`, composables, estilos, nombres de ruta e identificadores), en PascalCase para componentes. Excepciones: los ficheros y carpetas de **imágenes conservan el nombre original de la obra** (`MalasMujeres/`, `Valla_Publicitaria`, `Cuero`, `ComisiónNightySummerVibes/`…) aunque esté en español o lleve tildes: no los renombres. El texto visible al usuario va en español.
7. **URLs en castellano** (el público es hispanohablante/España), en minúsculas con guiones: p. ej. `/portfolio/malas-mujeres`, `/portfolio/comision-retratos-personalizados`. No cambies una URL pública sin añadir un `redirect`.
8. **Dependencias y estilos:** no añadas librerías sin pedirlo. Usa las variables de `assets/styles/` (`_variables`, `_colors`) en vez de valores sueltos en el SCSS.
- `.agents/skills/seo-audit` es un skill instalado (ver `skills-lock.json`), no código de la app.
