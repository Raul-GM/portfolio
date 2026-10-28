# Accesibilidad — fan-art-studio-ghibli — 2026-10-28
Resumen: 0 crítico · 0 serio · 0 moderado · 3 menor

Ámbito: entrada `fan-art-studio-ghibli` en `src/views/data/works.js:19-58`, `/portfolio/fan-art-studio-ghibli` (`src/views/portfolio/WorkComponent.vue`) y su tarjeta en `/` (`src/components/ProjectCard.vue`). Aquí no repito los problemas globales que ya están en `specs/agents_in_portfolio.md` §6b (menú `aria-expanded="isOpened"`, foco al cambiar de ruta, `prefers-reduced-motion`, contraste del azul, `/portfolio` duplicado, logo).

| Sev. | Criterio WCAG | Dónde (fichero:línea / ruta) | Problema | Corrección propuesta |
|---|---|---|---|---|
| menor | 1.1.1 (texto alternativo de obra; mejora) | `src/views/data/works.js:52` · 2.ª imagen (`Totoro`) | El alt es correcto: lo he comparado con `Totoro_1280.jpeg`. Le falta un detalle de la escena: Totoro también duerme, tumbado boca arriba con la panza al aire, y Mei descansa encima boca abajo, con las piernas levantadas. Ahora solo se entiende que «Mei duerme sobre Totoro». | Opcional, por ejemplo: «Mei, una niña con coletas, duerme boca abajo sobre la barriga de Totoro, que también duerme tumbado boca arriba en un claro del bosque, de noche, entre luciérnagas verdes; la escena está enmarcada con bordes irregulares, como de papel rasgado.» |
| menor | 2.4.4, 1.1.1 | `src/views/portfolio/WorkComponent.vue:34` · `/portfolio/fan-art-studio-ghibli` | La flecha «←» es texto del enlace, así que los lectores de pantalla leen «flecha izquierda, Volver al portfolio» (salida de `render.js`: `← Volver al portfolio → /portfolio`). Afecta a todas las fichas de obra. Lo he deducido del DOM; no lo he probado con un lector real. | `<span aria-hidden="true">←</span> Volver al portfolio`. |
| menor | Documentación | `CLAUDE.md` («Architecture», «Gotchas: Añadir un proyecto…», «Datos») | `CLAUDE.md` dice que cada proyecto tiene su componente en `src/views/portfolio/`, su ruta escrita a mano y una entrada en `portfolio.js`. En el código, las obras son datos en `src/views/data/works.js` y las pinta un único `WorkComponent.vue` (`src/router/index.js:3` importa `findWork`). Si se siguen las instrucciones documentadas, se duplicarán rutas. | Actualizar `CLAUDE.md` para describir `works.js` + `WorkComponent` y el flujo `/nueva-obra`. |

## Revisado y correcto
- **Alt de la 1.ª imagen** (`works.js:44`, `Totoro_2`): lo he comparado con la imagen. Es fiel: tres Totoros (grande gris, mediano azul, pequeño blanco) en una rama bajo la lluvia de noche, cada uno con una hoja como paraguas, entre follaje oscuro. `altReviewed: true` está justificado.
- **Alt de la 2.ª imagen** (`works.js:52`): el contenido es correcto (Mei con coletas, Totoro, luciérnagas verdes, marco de papel rasgado). Solo le falta el matiz que indico arriba.
- Ningún alt es el valor por defecto `Image`. Las dos imágenes pasan por `OptimizedImageComponent` (`WorkComponent.vue:14-21`). La primera se carga con `eager` y la segunda con `lazy`. Los ficheros de `_960` se sirven a 800 px, y `width`/`height` coinciden con la imagen (1280×1280, 1280×905).
- **Estructura** (`render.js`): `lang=es`, un solo `<main>`, una sola `<h1>` («Homenaje a Studio Ghibli»), sin saltos de encabezado. `<article aria-labelledby>` apunta a la h1. La sección se llama «Imágenes de Homenaje a Studio Ghibli». El `header` y el `footer` de la obra van dentro de `article`, así que no crean landmarks banner ni contentinfo duplicados.
- **`<title>` propio**: «Fan art de Studio Ghibli | Ilustración - Raúl García».
- **Teclado y foco**: el orden es lógico: nav → «← Volver al portfolio» (Tab 6) → «¿Quieres un encargo así? Escríbeme» (Tab 7) → redes (Tab 8). El foco es visible (`outline: auto 1px`), comprobado en captura. En la home, la tarjeta recibe el foco en Tab 9 con contorno visible.
- **Tarjeta en `/`**: es un enlace con nombre «Ir al proyecto Homenaje a Studio Ghibli», `<h2>` con el título y categoría «Cultura pop». El nombre accesible contiene el título visible (2.5.3). La portada es un fondo CSS dentro de un enlace con nombre, así que no le falta alternativa. El texto va sobre blanco (15,5:1, ya medido en la auditoría del sitio).
- **Contraste**: los metadatos «Cultura pop · Studio Ghibli · 2026» usan `--primary-color` sobre `#FAFAFA` = 10,35:1. El cuerpo usa `#252422` sobre `#FAFAFA` = 14,86:1. No hay texto sobre la imagen en la ficha.
- **Móvil (390×844, dpr 2)**: no hay desbordes. Los dos enlaces del pie de la obra se apilan con 1rem de separación, así que cumplen 2.5.8 por la excepción de espaciado.
- No hay iframes ni vídeo en esta obra.

## No verificado (y por qué)
- **Lector de pantalla real** (NVDA/VoiceOver): solo he usado el árbol que da `render.js`.
- **Tarjeta en móvil y su hover**: no he hecho captura. El movimiento ya figura en §6b.
- **Foco y anuncio al llegar desde la home** (navegación SPA): es un problema global ya registrado en §6b.
