---
name: nueva-obra
description: Publica una obra en el portfolio de raulgarcia.me a partir de sus imágenes (normalmente una carpeta de inbox/), un título y un comentario. Genera las imágenes optimizadas, la entrada de works.js (texto, SEO, alt), verifica el build, pasa los revisores de accesibilidad, UX y SEO, y deja un commit. Úsalo también para añadir imágenes a una obra, archivarla, destacarla o reordenarla. Ejemplo - /nueva-obra inbox/Totoro "Totoro bajo la lluvia" "fan art de Mi vecino Totoro, personal"
---

# /nueva-obra

Convierte una obra en una página del portfolio siguiendo los estándares de la web. El autor solo aporta imágenes, título y un comentario; tú haces el resto y le pides **una sola aprobación**.

Lee `CLAUDE.md` si no lo tienes en contexto: explica `works.js`, los scripts y las convenciones.

**Node 16 en cada comando de Node o npm** (Bash): `export PATH="/c/Users/Raul/AppData/Roaming/nvm/v16.20.2:$PATH" && …`

## Reglas
- **No inventes datos.** Cliente, fecha, encargo, premios, técnica o contexto solo si salen del autor, de `nota.txt` o del historial de la web (ver paso 1). Si falta algo que importa, pregunta.
- **No identifiques a personas reales por su cara.** El nombre de una persona retratada sale del título, del comentario, de la nota o del nombre de fichero, nunca de reconocerla en la imagen.
- **Personajes de ficción y franquicias:** puedes proponerlos si la imagen o el nombre de fichero lo sugieren, pero en el borrador van marcados para que el autor los confirme. Nunca se publican sin esa confirmación.
- **Nunca modifiques los originales** (`inbox/`, `originals/`).
- Nada de push, merge ni despliegue sin que el autor lo pida.
- Textos en español de España, primera persona, cercanos y concretos, sin superlativos ("increíble", "único") ni relleno. Tuteo.

## 1. Recoger

1. **Entrada.** Ruta (carpeta o fichero), título y comentario. Si falta la ruta, lista las carpetas de `inbox/` y pregunta cuál.
2. **Mira las imágenes** sin abrir los originales (pesan hasta 25 MB):
   `node scripts/preview.js "<origen>" "<scratchpad>/preview/<carpeta>"` y Read de cada preview. La salida da tamaño, transparencia y fecha de modificación.
3. **Contexto que ya exista:**
   - `nota.txt` en la carpeta.
   - **Web anterior:** las obras retiradas están en el commit `2718226` (`git show 2718226:src/views/portfolio/<Componente>.vue`; lista con `git show 2718226 --stat -- src/views/portfolio` o busca con `git grep -i "<palabra>" 2718226 -- src/views`). Si la obra estuvo allí, propone reutilizar su texto y su `dateCreated`, y añade su URL antigua al 301 de `public/_redirects` hacia el slug nuevo.
   - Obras ya publicadas en `src/views/data/works.js`: ¿es otra pieza de una serie existente? ¿Repite algo?
4. **Deduce** de título, comentario y nota: categoría (`POP_CULTURE` si es de una serie, película, videojuego, cómic o anime; `PORTRAIT` si es un retrato de personas reales), franquicia, encargo o personal, cliente, año.
5. **Pregunta solo lo que falte**, como máximo 3 preguntas en un único turno (con `AskUserQuestion` si está disponible). Candidatas, por orden de importancia: categoría y franquicia si no están claras; encargo o personal (y si el cliente acepta aparecer); año (propón el de la fecha de modificación como opción, no lo des por hecho); destacada en la home o no; con varias imágenes, cuál es la principal.

## 2. Borrador (único punto de control)

Presenta **en un solo mensaje** y espera respuesta:

```
Slug:        /portfolio/<slug>          (minúsculas con guiones, en español, ≤ 5 palabras;
                                         lleva la franquicia o el nombre si aporta búsquedas)
Título:      …
Categoría:   Cultura pop · <franquicia>   |  Retratos
Tipo / año:  Encargo · 2024              |  Personal · 2024
Home:        destacada / visible · posición (por defecto, la primera)
Resumen:     … (tarjeta de la home, ≤ 90 caracteres)
Texto:       1–3 párrafos a partir del comentario
SEO título:  … (≤ 60 caracteres; patrones: "<Título> (<franquicia>) | Ilustración - Raúl García",
              "Fan art de <franquicia> | Ilustración - Raúl García" o
              "<Título> | Retrato por encargo - Raúl García")
SEO desc.:   … (≤ 155 caracteres, con la búsqueda que encaje: fan art de <franquicia>,
              ilustración de <serie/peli/juego>, retrato ilustrado por encargo…)
Imágenes:    1. <fichero> — alt: "…"   (principal: tarjeta, OG y primera en la página)
             2. …
```

- **Alt:** describe la escena para quien no la ve (quién, qué hace, ambiente, técnica si se aprecia); con el nombre del personaje o persona si el autor lo ha dado. 1–2 frases.
- **Proyectos vivos** (una serie que irá creciendo, como "fan art de Studio Ghibli"): slug y título genéricos para la serie, no para la primera pieza, y un texto que no caduque al añadir imágenes.
- Termina preguntando si publica así o qué cambia. Aplica los cambios y, si son grandes, vuelve a enseñar solo lo que cambió.

## 3. Generar

1. **Imágenes:** `npm run images -- "<origen>" --slug <slug> --folder <Carpeta> [--og <fichero principal>]`. `<Carpeta>`: el nombre original de la obra sin espacios (p. ej. `RetratosMusicales`). La salida JSON da rutas, `width` y `height`; los avisos (transparencia, sRGB, tamaño pequeño) van al resumen final.
   - Si el orden de las imágenes no es el alfabético, `--og` marca la principal y en `blocks` las ordenas tú.
2. **`works.js`:** añade la entrada siguiendo el formato de la cabecera del fichero y el estilo de las existentes.
   - `order`: posición pedida; por defecto la primera (el menor `order` existente − 10).
   - `cover`: la imagen principal. `blocks`: en el orden aprobado.
   - `altReviewed: true` solo si el autor aprobó el borrador con esos alt; si los cambiaste después por tu cuenta, `false`.
3. **Redirects:** si la obra estuvo en la web anterior, cambia su 301 en `public/_redirects` para que apunte al slug nuevo.

## 4. Verificar

1. `npm run check` → sin errores.
2. `npm run lint` → revisa `git diff` (auto-corrige).
3. `npm run build` → sin errores (genera `dist/` para los revisores).
4. **Mírala tú:** `node scripts/render.js /portfolio/<slug> / --screenshot "<scratchpad>/obra.png" --width 1280 --height 900` y lo mismo con `--width 390 --height 844 --dpr 2`; Read de las capturas. Busca recortes feos en la tarjeta, orden de imágenes, textos cortados.

## 5. Revisar

Lanza **en paralelo** (un solo mensaje, tres llamadas) los agentes `a11y-auditor`, `ux-reviewer` y `seo-auditor` con este encargo:

> Ámbito: obra `<slug>`. Fecha: <AAAA-MM-DD>. `dist/` está compilado y al día: no ejecutes `npm run build` (los tres revisores lo compartís). Capturas en `<scratchpad>/<agente>/`. Revisa solo esta obra y su tarjeta en la home; los problemas globales ya conocidos están en `specs/agents_in_portfolio.md` (sección 6b): no los repitas.

Si los agentes no están registrados en la sesión, lanza agentes genéricos indicándoles que lean y sigan `.claude/agents/<agente>.md`.

Con los resultados:
- **Aplica** lo que sea de datos de esta obra en `works.js`: longitudes SEO, erratas, alt incompleto, palabra clave que falta. Si cambia el sentido de un texto aprobado, propónlo en vez de aplicarlo.
- **No toques** código global ni otras obras: lista esos hallazgos para el autor.
- Si cambiaste algo, repite `npm run check` y `npm run build`.

## 6. Entregar

1. **Commit.** Si la rama actual es `main`, crea antes `obra/<slug>`; si no, commitea en la rama actual. Incluye `src/assets/images/portfolio/<Carpeta>/`, `public/og/<slug>.jpg`, `works.js`, `public/sitemap.xml` y, si cambió, `public/_redirects`. Los informes de `docs/audits/` de la obra también. Mensaje: `Add work: <título>` + atribución.
2. **Archiva el original:** mueve la carpeta de `inbox/` a `originals/<slug>/` (crea `originals/` si no existe). Solo si el commit salió bien.
3. **Resumen al autor** (breve):
   - URL local: `npm run serve` (con Node 16) → `http://localhost:8080/portfolio/<slug>`. Si el dev server ya estaba arrancado, **hay que reiniciarlo** (no ve carpetas de imágenes nuevas).
   - Peso: original → variante de 960 px.
   - Avisos de imagen (transparencia, tamaño, color) y si conviene revisarla a ojo (línea fina, tramas, degradados).
   - Lo que corrigieron los revisores y lo que queda pendiente fuera de la obra.
   - Siguiente paso: subir la rama cuando quiera publicarlo.

## Otras peticiones

- **Añadir imágenes a una obra:** `npm run images` con `--folder` de la obra y su `--slug` (regenera la OG: pasa `--og` con la principal de siempre), añade los `blocks`, verifica y commitea.
- **Archivar:** `status: 'archived'`. La URL deja de existir: añade un 301 en `public/_redirects` hacia `/portfolio` o hacia una obra relacionada. No borres imágenes.
- **Destacar o reordenar:** cambia `status` y `order`; muestra el orden resultante de la home antes de commitear.
- **Corregir textos:** edita la entrada, `check` + `build`, y commit. Sin revisores salvo que cambie el alt o el SEO.
