# Accesibilidad — sitio — 2026-11-03 (recheck tras fe78ccd y 16ae91f)
Resumen: 0 crítico · 0 serio · 1 moderado · 4 menor

Método: `scripts/render.js` (resumen, `--dom`, `--tab`, `--click .menu--icon`) a 390 y 320 px sobre `/`, `/encargos`, `/contact`, `/shop`, `/shop/cuero`, `/portfolio/marcapaginas-por-encargo`, `/about-me`, `/portfolio/no-existe`; capturas a 320 px y 1280 px; medida de objetivos táctiles y desbordamiento horizontal con una copia de `render.js` en el scratchpad que evalúa JS en la página (no toca el repo ni `dist/`). Lectura de `NavbarComponent.vue`, `ContactComponent.vue`, `WorkComponent.vue` y del diff `6b0a1a4..HEAD`.

## Estado de los hallazgos de la auditoría anterior

| Hallazgo previo | Estado | Evidencia |
|---|---|---|
| Serio: enlaces del logo vacíos con el menú abierto | **Resuelto** (a medias en el resumen) | DOM con menú abierto a 390 px: `<a class="simple_link menu--ra--link--mobile" aria-hidden="true" tabindex="-1">` y `<a class="simple_link nav--side" aria-hidden="true" tabindex="-1">` (`NavbarComponent.vue:4`, `:36-38`). `render.js` sigue listándolos como ` → /` porque no filtra `aria-hidden`; no se anuncian ni reciben Tab. Con el menú cerrado el logo tiene nombre «Raúl García, ir al inicio». |
| Moderado: sin `inert` en main/footer con menú abierto | **Resuelto** | DOM con menú abierto: `<main class="main-container" inert="">` y `<footer … inert="">` (`NavbarComponent.vue:93-99`). Tab con el menú abierto: 5 → body, 6 → «Saltar al contenido», 8 → «Portfolio»; el foco no entra en el contenido. Se retira en `beforeUnmount`. |
| Menor: `<time>` en el año de la ficha | **Resuelto** | `<p class="work__meta">Diseño · Encargo · <time datetime="2026">2026</time></p>` (`WorkComponent.vue:7`). Los rangos se parten en un `<time>` por año con «–» entre ellos. Matiz: la marca `<!---->` del `v-if` es inocua. Los «·» siguen siendo texto (menor, ver abajo). |
| Menor: `aria-describedby` del contador | **Resuelto** | `<textarea … aria-describedby="textarea-counter">` y `<span class="counter" id="textarea-counter">` en `/contact` (`ContactComponent.vue:48-50`). Sigue pendiente el `font-size: 10px` del contador (ver abajo). |
| Menor: enlace «Saltar al contenido» | **Resuelto** | Primer Tab en `/encargos` (390 y escritorio) → `a.skip-link` con `outline: solid 2px #4C57EE`. `skipToContent` pone `tabindex=-1` en `main` y lo enfoca (`NavbarComponent.vue:80-85`). Fuera de pantalla hasta recibir foco (`top:-4rem`). Probado el foco, no el salto en sí (deducido del código). |
| Moderado: alt de Totoro (bloque 2) con «duerme» | Sin cambio en esta pasada | No se ha vuelto a revisar; consta en la auditoría anterior. |
| Menor: contacto con `aria-label` «Visita mi Instagram» sobre alt «Logo Instagram»; `rel` ausente | Sin cambio | En `/encargos` los enlaces del pie se nombran «Ir a Instagram de Raúl García» (coherente). |

## Hallazgos nuevos o vigentes

| Sev. | Criterio WCAG | Dónde | Problema | Corrección propuesta |
|---|---|---|---|---|
| moderado | 2.5.8 | Pie, enlace «Privacidad» (`FooterComponent.vue`) · todas las rutas a 320 y 390 px | Medido: 67×18 px. Es un enlace suelto, no está dentro de una frase, así que no aplica la excepción «en línea»; está a ~20 px del copyright y de los iconos, pero su alto es < 24. Los iconos sociales sí miden 24×24. | `padding-block: .3rem` o `display:inline-block; min-height:24px` en `.footer-container__link`. |
| menor | 2.5.8 | Enlace «← Volver al portfolio» en `/shop/cuero` a 320/390 px | Medido: 127×17 px, enlace aislado en su línea. | Mismo ajuste (`min-height: 24px`, `display:inline-block`). |
| menor | 2.5.8 (límite) | Filtros de la home (`.category-filter_button`) a 320/390 px | Medidos 52×24, 58×24, 66×24, 58×24: cumplen justo el mínimo de 24 px. Sin margen; recomendable ≥ 32-44 px de alto en táctil (AAA 2.5.5, recomendado). | Aumentar el `padding` vertical en móvil. |
| menor | 1.4.4, 1.3.1 | `ContactComponent.vue:47-50` | El contador sigue en `font-size: 10px` (comprobado en la auditoría anterior; el diff no lo toca). | `rem` ≥ .75. |
| menor | 4.1.3 / semántica | Navbar en `/portfolio/<slug>` y en la 404 | «Portfolio» se marca como activo con `isPortfolioRoute` (`path.includes('portfolio')`): en `/portfolio/no-existe` (404) aparece resaltado aunque la página no existe; visual solamente, sin `aria-current` (deducido del código y visto en la captura). | Opcional: `aria-current="page"` en la opción activa; excluir la 404. |
| menor | Documentación | `CLAUDE.md` («secciones con `aria-label`») | La obra usa `<article aria-labelledby>`; el pie lleva `role="contentinfo"` redundante. | Ajustar la frase. |

## Revisado y correcto (regresiones del nuevo layout)
- **Reflow 1.4.10 a 320 px** (`--width 320`): `scrollWidth` = `clientWidth` = 320 en `/`, `/encargos`, `/contact`, `/shop`, `/shop/cuero`, obra de marcapáginas, `/about-me` y 404. Sin scroll horizontal; lo único «fuera» de 320 es el menú móvil cerrado, desplazado fuera de pantalla. Con el menú cerrado no entra en el orden de Tab (Tab 1 skip-link, 2 logo, 3 «Abrir menú», 4 contenido principal, 5 «Privacidad»).
- **Contenedor común y rejillas:** `/encargos` a 320 px apila Fan art / Retratos / Diseño en una columna, legible, sin recortes (captura). Home a 1280 px: tarjetas con orden de lectura = orden del DOM, la primera ocupa 2 columnas, encabezados `h2` por tarjeta. Los `h3` de Encargos mantienen la jerarquía h1→h2→h3.
- **404:** una `<h1>` («404 - Página no encontrada»), enlace «Vuelve al portfolio» en negrita y subrayado, `<title>` propio, `main` único. Sin regresión tras eliminar el CSS propio.
- **Botón del formulario** (`input.button-primary.form--submit`): conserva `value="Enviar mensaje"`; fondo `--secondary-color` con texto `--secondary-text-color` (5,15:1 en la auditoría anterior; no he repetido el cálculo con el hover `--dark-color`). Foco con el contorno global. `:disabled` con `opacity .7` (los controles deshabilitados están exentos de 1.4.3). Ocupa el 100 % en móvil.
- **Foco:** `outline: solid 2px #4C57EE` en el skip-link, logo, botón de menú, «Portfolio», CTA «Cuéntame tu idea» y «Privacidad».
- Sin `{{ }}` en atributos en las rutas probadas. Una `<h1>`, un `<main>`, `lang="es"` en cada ruta.

## No verificado (y por qué)
- El salto efectivo del skip-link (Enter) y el anuncio de lector de pantalla: solo foco y código.
- `/privacidad`, `/portfolio/<otras obras>` y la pantalla `/contact` completa a 320 px (captura generada en segundo plano, no revisada); el contraste del botón en hover/foco del formulario no se ha recalculado.
- Objetivos táctiles de la página de obra y de `/contact` fuera de lo listado: la medida solo cubre `a, button, input, textarea, select`; las filas que no aparecen cumplen ≥ 24 px o son enlaces en línea (excluidos por criterio).
