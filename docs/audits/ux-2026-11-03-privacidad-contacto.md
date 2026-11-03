# UX — /contact y /privacidad — 2026-11-03

Capturas en el scratchpad (1590, 1100 y 390 px, página entera). Los estados de error de email, enviando y éxito/error no se han capturado: no hay forma de provocarlos con `render.js` sin escribir en el formulario, y no se ha enviado nada a Formspree. Se describen según `ContactComponent.vue`.

## Incoherencias
| Prioridad | Dónde | Problema | Propuesta |
|---|---|---|---|
| media | /contact, `ContactComponent.vue:60`, `.contact__aside-title` | El aside "Otras formas de contactar" usa el mismo h2/`section-title` que las secciones de Encargos y Privacidad, pero el formulario no tiene título propio. En escritorio el aside parece tener más rango que el formulario, que es lo que se quiere que se use. | Bajar el aside a `<h2>` de menor peso (16-18 px negrita) o ponerle un h2 "Escríbeme" al formulario. |
| media | /contact móvil (`m-1.png`) | La entradilla a 18 px ocupa 5 líneas y empuja el campo Nombre al 30 % de la pantalla. El texto largo está bien en escritorio, pero en móvil se come el primer pantallazo. | Recortar el texto (ver Mejoras) o dejar 16 px en móvil. |
| baja | /privacidad vs /contact | La entradilla de privacidad (18 px) va pegada al primer h2 (unos 20 px de separación, `d1590-2.png`). En Contacto hay 1.5 rem. Los h2 de privacidad quedan más cerca del párrafo anterior que del suyo, y la jerarquía se lee a trompicones. | `section` con `padding-top` o `margin-top` mayor antes de cada h2 (1.5-2 rem) y menos entre h2 y su párrafo. |
| baja | /contact, pie del formulario | La microcopia de privacidad usa 14 px y `simple_link` (negrita subrayada), mientras el resto del formulario va a 16 px sin ayuda. Es coherente con la escala 16/18/14, pero el "Raúl García Martín" del responsable se repite en el pie de página. | Mantener, y acortar: ver Mejoras. |

El resto cuadra con Encargos y Sobre mí: h1 `section-title`, entradilla 18 px con `--prose-max` (720 px), cuerpo 16 px, 14 px para microcopia, botón `.button-primary` sin diferencias visibles (mismo azul, 16 px negrita). El `<input type=submit>` queda alineado con los botones de las otras páginas.

## Camino al encargo
- Desde una obra o la home el CTA lleva a `/encargos` y de ahí a `/contact`. En `/contact` el camino es claro: entradilla, tres campos, aviso de privacidad, botón azul. Es la página más directa del sitio.
- 1590: composición razonablemente equilibrada. Intro a ancho de lectura, formulario 3fr (unos 690 px) y aside 2fr. El aside queda corto (un párrafo y tres iconos) y debajo hay unos 400 px de vacío a la derecha. No es grave, pero la columna derecha pesa menos que la izquierda y parece un añadido. A 1100 se comporta igual y el botón queda visible sin scroll en 800 px de alto. En 1590 x 900 también.
- 390: una sola columna; el botón queda ocupando el ancho completo, a 1360 px de scroll aproximadamente (en píxeles de captura x2). Hay que bajar casi dos pantallas para llegar al botón: 5 líneas de entradilla + 3 campos + aviso. Aceptable, pero la entradilla es la que sobra.
- El tono del mensaje no dice si el encargo es en digital o físico, ni cuánto cuesta: Contacto promete "presupuesto y plazo", y esa información está en /encargos, que solo se enlaza desde el aside, abajo del todo en móvil. Quien llega directamente a /contact (p. ej. desde la nav) no ve el enlace a "cómo trabajo" hasta el final de la página.
- Texto de la entradilla: "para cuándo lo necesitas y si necesitas más información" repite "necesitas" y la última cláusula es confusa (¿quien pide más información lo pone en el mensaje?). Es la frase más débil del texto.
- Mensaje de 255 caracteres como máximo (`message.maxlength`, línea 124). Para un encargo (personaje, serie, tamaño, fecha, referencias) es muy corto; el contador "0 / 255" lo hace evidente y es un freno: un cliente que quiere describir un retrato familiar se queda sin sitio y no sabe que puede ampliar por Instagram. La captura de la lámina (`m-3.png`) llega a 81/255 solo con el texto pre-rellenado.
- Enlace desde lámina `/contact?lamina=cuero`: el mensaje sale pre-rellenado, "Hola, me interesa la lámina «Cuero» (10 €). ¿Sigue disponible? Te escribo desde: ", y el cursor no queda puesto en el textarea. El texto acaba en "Te escribo desde:" sin nada que completar, porque ya se pide el email; parece una frase cortada. Tampoco hay aviso visible de que el mensaje se ha rellenado (nadie ve de dónde viene), pero se entiende por el contenido. Consume 81 de 255 caracteres.
- Estados del formulario (por código):
  - Error de email: se valida al cambiar el campo y al enviar; aparece una barra roja a ancho completo con "Ups! Este mail no es válido." entre Email y Mensaje, sin texto de ayuda. "Ups!" y "mail" son un registro más informal que el resto de la página ("correo"). Además `type=email` con `required` activa antes la validación nativa del navegador, así que en la mayoría de casos se ve la burbuja del navegador y no la barra propia: dos mensajes distintos para lo mismo.
  - Enviando: el botón se atenúa al 70 % y cambia el cursor; debajo del botón aparece "Enviando…" en texto normal. Es discreto pero suficiente.
  - Éxito: "Correo enviado correctamente." en azul negrita bajo el botón y el formulario se vacía. No dice "te contesto en X días" ni repite el compromiso, ni lleva a otra parte (obras, encargos): es un final seco para un momento clave. Si el usuario está abajo en móvil, el mensaje queda debajo del botón, visible.
  - Error de envío: "Hubo un problema al enviar el correo. Inténtalo de nuevo." en rojo negrita. El formulario conserva los datos (bien), pero no ofrece alternativa (Instagram o el email) que sí existe en el aside, y en móvil el aside queda por debajo.
- El correo directo de Raúl solo aparece en /privacidad. Quien prefiere escribir un email no lo encuentra en Contacto.

## Mejoras propuestas (máx. 5, opinión razonada)
1. **Subir el límite del mensaje (255 → 1000-1500) o quitar el contador.** Es lo que más puede cortar un encargo: un pedido de retrato o fan art necesita describir referencias, tamaño y fecha. Es una decisión de negocio, pero hoy el campo desanima.
2. **Acortar la entradilla a dos frases**, p. ej. "¿Tienes una idea para un encargo? Cuéntame qué personaje o retrato quieres y para cuándo lo necesitas; te respondo con presupuesto y plazo, sin compromiso." Quita la repetición de "necesitas" y baja de 5 a 3-4 líneas en móvil.
3. **Mejorar los finales del formulario:** éxito con una línea más ("Gracias, te escribo en cuanto pueda") y un enlace a las obras o a Encargos; error con el correo directo como salida; unificar el mensaje de email ("Ups! Este mail…" → "Revisa el correo: no parece válido.") y evitar el doble aviso nativo/propio (`novalidate` o dejar solo uno).
4. **Dar más sentido al aside:** añadir el email directo y el enlace a Encargos con más peso ("Antes de escribir: cómo trabajo, plazos y precios"), y subir ese enlace por encima del formulario en móvil (hoy está tras dos pantallas). Con esto la columna derecha deja de ser un hueco en escritorio.
5. **Mensaje de lámina:** quitar "Te escribo desde:" (acaba la frase en el aire), dejar el mensaje terminado y poner el foco en el textarea o en Nombre. En /privacidad, separar más cada sección (margen superior de h2) y acortar la microcopia bajo el formulario a "Uso tus datos solo para responderte. Más información en la política de privacidad."

## Privacidad: valoración
- Legibilidad buena: columna de 720 px, cuerpo 16 px, interlineado 1.5, enlaces subrayados. En 390 px sin desbordes. Longitud razonable (siete secciones, una pantalla y media en 1590, cuatro en móvil), lenguaje llano y en tú, el mismo registro que el resto.
- Jerarquía: h1 + entradilla + h2 coherentes con Encargos. Fallo: el espacio antes de cada h2 es casi igual que dentro de la sección (ver Incoherencias), y "Cookies y analítica" ocupa una sola línea con un título entero; podría ir como nota al final de "Qué datos recojo".
- Una nota de contenido: la fecha "Última actualización: 29 de octubre de 2026" va en la entradilla junto al enlace, mezclada; mejor separada en una línea pequeña. En escritorio queda a 720 px y a la derecha 700 px en blanco, como en Encargos: igual de coherente.
- Pie de página enlaza a Privacidad en todas las páginas: bien. En el menú, "Contacto" no queda resaltado en /privacidad: correcto.

## Fuera de mi ámbito
- Los campos no llevan `autocomplete` (name, email) ni `inputmode`; los marca `required` pero sin indicar "obligatorio" (accesibilidad).
- El `role="alert"` vacío del email y `role="status"` sin región: a11y-auditor.
- El `<input type=submit>` se desactiva solo mientras envía, sin `aria-busy` (a11y).
- Los enlaces sociales abren con `target="_blank"` sin aviso, y el de YouTube lleva parámetro `?si=` de seguimiento (SEO/privacidad).
- El h1 de /contact tiene `id="contactForm"` usado como `aria-labelledby` del formulario: correcto, pero el título "Contáctame" y el `<title>` de pages.js pueden no coincidir (SEO).

## Capturas revisadas
Todas en `C:\Users\Raul\AppData\Local\Temp\claude\d--workspace-portfolio\01e4e8a3-2380-432b-84dd-0a221bfa702a\scratchpad\`:
- `d1590-1.png` (/contact 1590), `d1590-2.png` (/privacidad 1590)
- `d1100-1.png` (/contact 1100), `d1100-2.png` (/privacidad 1100, no abierta en detalle)
- `m-1.png` (/contact 390 página entera), `m-2.png` (/privacidad 390), `m-3.png` (/contact?lamina=cuero 390)
