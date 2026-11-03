# UX — sitio (recheck tras fe78ccd y 16ae91f) — 2026-11-03

Capturas con `scripts/render.js` sobre `dist/` (sin rebuild), en `C:\Users\Raul\AppData\Local\Temp\claude\d--workspace-portfolio\01e4e8a3-2380-432b-84dd-0a221bfa702a\scratchpad\rc\`. Nomenclatura: `w-N` escritorio 1590x900, `t-N` 1100x800, `m-N` móvil 390 @2x, `f-N` móvil página entera, `menu.png` menú móvil abierto. N: 1 home, 2 marcapáginas, 3 Ghibli, 4 sobre mí, 5 contacto, 6 encargos, 7 tienda, 8 ficha de lámina, 9 404. Vistas con Read: w-1..9, t-1, t-2, t-6, m-1, m-3, m-5, f-2, f-8, f-9, menu. Sin abrir: t-3..5, t-7..9, m-2, m-4, m-6..9, f-1, f-3..7.

## Veredicto sobre lo señalado antes

| Punto | Estado | Evidencia |
|---|---|---|
| Contenedor común centrado, contenido a la izquierda | Resuelto | `w-1`..`w-9`: logo, título, contenido y pie comparten borde izquierdo (x=195) y derecho (x=1395) a 1590 px. A 1100 (`t-1`, `t-6`) el margen es de 80 px en todo. |
| Intro de la home apilada | Resuelto (decisión vuestra, distinta de mi propuesta) | `w-1`: h1 en una línea de ~1160 px, texto, botón. Aceptable; el h1 es largo pero cabe en una línea a 1590. A 1100 (`t-1`) pasa a dos líneas, sin problema. |
| Rejilla de 4 columnas | Resuelto con un matiz | `w-1`: primera tarjeta 2 columnas + 2 de 1; fila 2 con 3 tarjetas y un hueco a la derecha. Ya no hay tarjeta ancha huérfana. El hueco es el que anticipé; aceptable. `t-1`: 4 columnas, títulos de tarjeta en 2 líneas, legibles. |
| Diseño en /encargos | Resuelto | `w-6`, `t-6`: tercer tipo "Diseño" (marcapáginas, carteles) en rejilla de 3 columnas. |
| Textos de Ghibli | Resuelto | `m-3`: "Este es un proyecto personal…" y "De momento hay dos ilustraciones de Mi vecino Totoro, y vendrán más." Sin jerga. Pendiente menor: la meta sigue "Fan art · Studio Ghibli · 2026" (`w-3`), sin "Proyecto personal". |
| Año único del marcapáginas | Resuelto | `w-2`, `t-2`, `f-2`: "Diseño · Encargo · 2026". |
| Marcapáginas en párrafos | Resuelto | `f-2`: cuatro párrafos cortos, escaneable. |
| Contacto y 404 alineados | Resuelto | `w-5`, `w-9`, `m-5`, `f-9`: mismo h1 serif a la izquierda, misma y de título (~120) que Encargos, Tienda y Sobre mí. |
| Botón de envío = `.button-primary` | Resuelto | `w-5`, `m-5`: "Enviar mensaje" azul/violeta idéntico a "Pide tu encargo" y "Cuéntame tu idea". |
| Errata "parejasm" | Resuelto | `w-4`. |
| Franja bajo el pie en móvil | **Real, no es artefacto** (ver abajo) | medición con DOM. |

## La franja clara de ~60 px bajo el pie en móvil: es real

Medí en Chromium (390x844) con una copia de `render.js` en el scratchpad que imprime métricas. En `/portfolio/no-existe`: el pie acaba en 844 px (justo el viewport), pero `scrollHeight` del documento es 904. Los únicos elementos que sobrepasan el pie son `NAV.nav` (904) y `.nav--container` (903). En Ghibli: pie en 1251, documento 1311, de nuevo `NAV.nav` 1311. En escritorio (1590x900) no ocurre: documento = 900.

Causa: el menú desplegable cerrado se queda con caja. En `NavbarComponent.vue:206-207` el `.nav` móvil se oculta con `display: none; visibility: hidden`, pero el segundo bloque `@media (max-width: $media-mobile)` (`:251-255`) vuelve a poner `display: flex`, `position: absolute; top: 60px; height: 100%`. Al ser posterior y de igual especificidad, gana: la capa invisible ocupa de 60 px a 60 px + 100 % del contenedor y alarga el documento 60 px. Consecuencias: (1) la franja clara tras el pie en todas las páginas, (2) se puede hacer scroll hasta una zona vacía, (3) en la 404 y en páginas cortas aparece barra de scroll sin que haga falta. Arreglo: que `.nav` móvil cerrado sea `display: none` de verdad (mover el `display: flex` a `&.opened`, o fijar `position: fixed; top: 0; height: 100vh` en la regla del segundo bloque). La captura con `--full-page` no es la causa: solo refleja el alto real del documento.

## Incoherencias (lo que queda)

| Prioridad | Dónde | Problema | Propuesta |
|---|---|---|---|
| media | Móvil, todas las páginas (`f-2`, `f-8`, `f-9`) | Franja clara de 60 px bajo el pie y scroll sobrante (causa arriba). | Corregir el `display` del `.nav` cerrado. |
| media | Tienda (`w-7`) | Las dos láminas se centran dentro de celdas de ~600 px: el contenido flota en el centro (x=331 y 939) mientras el resto del sitio va a la izquierda, y la distancia entre ellas es enorme. Rompe la regla "el contenedor se centra, el contenido no". Intro a 14 px frente a 1.1rem de Encargos y Home. | Rejilla de 3-4 columnas fijas con tarjetas a la izquierda, como la home; intro a `1.1rem`. |
| media | Ficha de obra en escritorio ancho (`w-2`, `w-3`) | La imagen (960 px) queda a la izquierda y deja ~240 px vacíos a la derecha del contenedor, sin que haya nada ahí. Es el coste anunciado de la regla única; se nota más porque la ficha no tiene columna lateral. | Valorar poner meta, texto y CTA en una columna lateral a partir de 1360 px (como la ficha de lámina `w-8`), o dejarlo. |
| media | Menú móvil abierto (`menu.png`) | Desaparece el logo (solo se ve la X), se pierde el contexto de a qué web se está; el elemento activo lleva doble línea azul (foco/borde) que no existe en el resto del sitio. | Mantener el logo con el menú abierto; revisar el borde azul (probable `:focus`). |
| baja | Meta de Ghibli (`w-3`) | Sigue sin indicar "Proyecto personal" mientras el cuerpo sí lo dice. | Añadirlo a la meta. |
| baja | 404 (`w-9`, `f-9`) | El menú marca "Portfolio" como activo en una página inexistente; sigue sin salida a Encargos. | Sin ítem activo; añadir "o pide un encargo". |
| baja | Contacto escritorio (`w-5`) | El texto lateral arranca en y~103 y el h1 en y~120: dos columnas con cabeceras desalineadas. | Alinear la primera línea del texto con el h1 o bajarlo. |
| baja | Tamaño de texto general (`w-4`, `w-5`, `w-6`, `w-8`) | Cuerpo a 14 px y secundarios menores; con la página limitada a 1200 px hay espacio para 16 px. Mezcla de cuerpos (1.1rem en intros, 14 px en el resto). | Subir el cuerpo base a 16 px (lo audita también accesibilidad). |

## Camino al encargo (diagnóstico)

- **Home** (`w-1`, `m-1`): el primer pantallazo dice fan art y retratos, y el botón "Pide tu encargo" está visible en escritorio y en móvil. Home -> `/encargos` -> "Cuéntame tu idea" -> contacto: 2 clics. Resuelto el hilo del marcapáginas: Encargos ya ofrece "Diseño" (`w-6`).
- **Obra** (`f-2`): la CTA sigue al final (tras ~5 pantallas en móvil); el botón arriba no existe. En escritorio la imagen ocupa el primer pantallazo y la CTA queda lejos.
- **Qué/cómo/cuánto** (`w-6`): tipos, 4 pasos y señal del 50 %; sigue sin precio orientativo ni plazo concreto.
- **Móvil** (`m-5`): formulario cómodo, botón a ancho completo; orden correcto. Ficha de lámina (`f-8`): imagen, precio, texto y bloque de "Quiero esta lámina" bien resueltos, a buen tamaño; "← Volver a la tienda" al final.
- **404 móvil** (`f-9`): títulos y enlace legibles, página vacía con la franja ya descrita.
- Formulario: mensaje máximo 255 caracteres, sin selector de tipo. Envío no verificado.

## Mejoras propuestas (máx. 5, por impacto)

1. **Arreglar el `.nav` móvil cerrado** (`NavbarComponent.vue:206-255`): quita la franja bajo el pie y el scroll fantasma en todas las páginas móviles. Cambio de una línea.
2. **Precio orientativo y plazo en Encargos** ("retrato desde X EUR, 2-3 semanas"): sigue siendo la pregunta previa a escribir y lo que más frena a quien regala.
3. **CTA corta arriba en las fichas** (o enlace "Pedir algo así" junto a la meta), sobre todo en el marcapáginas, donde la CTA está a 5 pantallas.
4. **Tienda: llevar las láminas a la izquierda** en rejilla fija, con el mismo tamaño de intro que el resto; hoy es la única página que centra contenido dentro del contenedor.
5. **Menú móvil: conservar el logo y quitar la doble línea azul**; añadir "Proyecto personal" a la meta de Ghibli y un enlace a Encargos en la 404.

## Fuera de mi ámbito

- Franja y scroll sobrante: es un fallo técnico de CSS (descrito arriba por ser lo que preguntabas); además la capa `.nav` invisible sigue en el árbol, comprobar que el `inert` no deja huecos.
- `body { height: 100vh }` (`_main.scss:4`) con contenido más largo: no causa la franja pero es frágil.
- Contraste del botón azul/blanco y tamaño de texto: revisor de accesibilidad.

## Capturas revisadas

`rc\w-1`..`w-9`, `rc\t-1`, `t-2`, `t-6`, `rc\m-1`, `m-3`, `m-5`, `rc\f-2`, `f-8`, `f-9`, `rc\menu.png` (ruta del scratchpad arriba). La copia `probe.js` de render.js con métricas está en el scratchpad, no en el repo.
