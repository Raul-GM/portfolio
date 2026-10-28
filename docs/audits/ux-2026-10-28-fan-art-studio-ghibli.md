# UX — obra `fan-art-studio-ghibli` — 2026-10-28

Ámbito: `/portfolio/fan-art-studio-ghibli` y su tarjeta en `/`. No repito lo ya recogido en `specs/agents_in_portfolio.md` §6b (texto antes de la imagen, CTA como botón primario, página de encargos, logo «Ilustración × Diseño», titular de la home, Tienda en el menú, `aria-expanded`).

Contexto: es un proyecto vivo. Irán llegando ilustraciones de otras películas de Ghibli a esta misma página, así que buena parte de lo que sigue trata de cómo aguanta la página cuando crezca.

## Incoherencias

| Prioridad | Dónde | Problema | Propuesta |
|---|---|---|---|
| Media | `src/views/data/works.js:21` vs `:36`; `desk-1.png` | La misma obra tiene dos nombres. La `<h1>` y la tarjeta dicen «Homenaje a Studio Ghibli», pero la pestaña, los resultados de búsqueda y lo que se ve al compartirla dicen «Fan art de Studio Ghibli». Alguien que llega desde Google con «fan art» ve otro nombre arriba. | Quedarse con uno. La spec (§2.1) quiere «fan art» en SEO y no como etiqueta, así que basta con un `seo.title` del tipo «Homenaje a Studio Ghibli: fan art de Mi vecino Totoro…», que contiene la `<h1>`. |
| Media | `WorkComponent.vue:80-86`; `desk-1.png` | La línea de metadatos solo marca un tipo de obra: en los encargos pone «Encargo», pero en las obras personales no pone nada. Aquí sale «Cultura pop · Studio Ghibli · 2026», y que es un proyecto personal solo se sabe por el párrafo de debajo. Con más obras, el visitante no sabrá con un vistazo qué fue encargo y qué no. | Que la meta diga siempre el tipo: «Encargo» / «Proyecto personal». |
| Media | `works.js:33`; `desk-1.png`, `full-1.png` | El cuerpo describe a mano las dos imágenes actuales («De momento la protagonista es Mi vecino Totoro: Mei… y los tres Totoros…»). En cuanto llegue la primera ilustración de otra película, el texto se quedará viejo y habrá que reescribirlo cada vez. Si se olvida, la página contradirá a sus propias imágenes. | Un cuerpo estable («homenaje en marcha a las películas de Ghibli; cada ilustración, una película») y llevar la descripción a cada imagen (ver mejora 1). |
| Baja | `WorkComponent.vue:85`; `desk-1.png` | La fecha «2026» es la de la primera pieza (`date: '2026-04-14'`). En una serie viva, cuando se añadan piezas en 2027, la página parecerá parada en su primer año. | En proyectos vivos, mostrar un rango («2026–») o la fecha de la última pieza añadida. |
| Baja | `full-1.png` (2.ª imagen) | La primera imagen va a sangre, cuadrada; la segunda trae su propio marco de papel rasgado sobre fondo gris claro. Seguidas y sin separación, parecen piezas de proyectos distintos. Es de la obra, no lo toco, pero se nota más porque no hay nada entre ellas. | Se resuelve con el pie por imagen de la mejora 1, que da ritmo de serie. |

## Camino al encargo

**Desde la home (`desk-2.png`, `mob-2.png`, `full-2.png`):**
1. La tarjeta de Ghibli ocupa el hueco ancho de la primera posición (`order: 0` + `HomeComponent.vue:83-86`) y ha desplazado a Isabel II, que es un encargo real. La primera pieza que ve quien llega es un fan art personal y a medias. Para el público fan funciona como gancho, pero quien busca un retrato de regalo ve primero algo que nadie encargó.
2. La tarjeta dice solo «Homenaje a Studio Ghibli / Cultura pop». No pone de qué película es ni que se puede pedir algo parecido. El `summary` existe (`works.js:30`), se pasa como `resume` (`HomeComponent.vue:16`), pero `ProjectCard.vue:4-7` no lo pinta.
3. Clic en la tarjeta. En móvil, el texto ocupa el primer pantallazo y la imagen empieza a ~350 px CSS (`mob-1.png`). Ya está en §6b.

**Desde la obra (`full-1.png`):**
4. Tras las dos imágenes solo hay dos salidas en enlace de texto: «← Volver al portfolio» y «¿Quieres un encargo así? Escríbeme». No hay ninguna otra obra ni ninguna otra película a la vista.
5. «¿Quieres un encargo así?» es ambiguo en una obra personal de personajes con copyright. El fan no sabe si «así» significa «un Totoro para mí», «mi personaje favorito en este estilo» o «un homenaje a una saga entera». Tampoco sabe qué recibe (digital, impreso), en cuánto tiempo ni por cuánto: no hay página de encargos (§6b).
6. En `/contact` el camino sigue con los problemas ya conocidos de §6b.

Atasco principal: el visitante con más ganas de esta página es el fan de Ghibli, y la página no le dice en ningún momento que puede pedir **su** escena o **su** personaje.

## Mejoras propuestas (máx. 5, opinión razonada)

1. **Un pie de imagen por pieza, con la película y la escena** (p. ej. `caption` opcional en cada bloque de `works.js`, pintado bajo la imagen). Es lo que convierte la página en una serie que crece sin reescribir el cuerpo. El fan escanea las películas que reconoce y cada pieza nueva tiene su nombre. Sin esto, con 6-8 piezas la página se vuelve un scroll mudo de imágenes.
2. **Una llamada a la acción adaptada al fan art**, en lugar del genérico «¿Quieres un encargo así?». Algo como «¿Tienes una película o un personaje favorito? Te lo ilustro por encargo», con enlace a encargos o contacto. Mejor si se puede definir por obra en `works.js` y no está fija en `WorkComponent.vue:35`. Aquí está el mayor potencial de encargos de la página: un regalo para un fan de Ghibli es exactamente el caso de uso.
3. **Decidir a conciencia qué ocupa la primera tarjeta ancha.** Hoy la ocupa una obra personal en curso porque `order: 0` la pone ahí. Si el objetivo es el encargo, la tarjeta ancha debería ir a la pieza que mejor venda lo encargable, o alternar. Esto pide una regla en la selección (`order`/`featured`), no un retoque de esta obra.
4. **Mostrar el `summary` en la tarjeta** (`ProjectCard.vue`). «Fan art de las películas de Studio Ghibli, empezando por Mi vecino Totoro» dice el tema y el estado del proyecto mejor que «Cultura pop», y el dato ya está escrito.
5. **Señal de vida en la serie:** meta con «Proyecto personal · en curso» y fecha de la última pieza, y el orden de las imágenes de la más reciente a la más antigua (o por película, pero decidido). Así quien vuelve ve que hay novedades y no la misma página de abril.

## Fuera de mi ámbito

- `seo.title` distinto de la `<h1>` y del nombre en el JSON-LD: revisor SEO.
- Los alt de ambas imágenes son largos (unos 170-190 caracteres) y describen bien. Si sobra el detalle del marco «de papel rasgado», lo decide el revisor de accesibilidad.
- Propiedad intelectual: el nombre «Studio Ghibli» en el título y la URL está bien para portfolio. Si algún día se venden láminas de estas piezas, aplica el aviso de §2.1.

## Capturas revisadas

Carpeta: `C:\Users\Raul\AppData\Local\Temp\claude\d--workspace-portfolio\8625b3b0-f9e0-4ac3-8719-020d84d91beb\scratchpad\ux-obra\`

- `desk-1.png`: obra, escritorio 1280×800
- `mob-1.png`: obra, móvil 390×844 @2x
- `full-1.png`: obra, móvil, página entera
- `desk-2.png`: home, escritorio 1280×800
- `mob-2.png`: home, móvil 390×844 @2x
- `full-2.png`: home, móvil, página entera
- `desk-home-full.png`: home, escritorio, página entera
- Resumen de texto de `render.js` para `/portfolio/fan-art-studio-ghibli` (enlaces, metadatos, imágenes)
