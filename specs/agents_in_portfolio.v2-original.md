# Plan: actualización del portfolio con subagentes de Claude Code (v2)

> Documento de arranque para el repositorio. Borrador sólido sobre el que iterar.
> Los marcadores `<<…>>` son huecos a rellenar con datos reales.

**Contexto:** portfolio propio en **Vue**, escrito a mano, sin `CLAUDE.md`.
**Foco del portfolio:** **ilustración infantil** y **diseño de carteles**.
**Problema principal:** obra muy dispar; hay que decidir qué se muestra, qué se archiva y qué falta.

---

## 1. Objetivo y criterios de éxito

- Mostrar una selección **coherente con el foco**, no todo lo hecho.
- Que añadir una obra nueva sea un flujo sencillo y repetible.
- Accesible (WCAG 2.2 AA) y rápido pese a ser muy visual.
- Preparado para una tienda en fase 2.

| Métrica | Antes | Objetivo |
|---|---|---|
| Lighthouse Performance (móvil) | `<<…>>` | ≥ 90 |
| Lighthouse Accessibility | `<<…>>` | 100 |
| Incidencias axe serias/críticas | `<<…>>` | 0 |
| LCP home (móvil) | `<<…>>` | < 2,5 s |
| Peso total de imágenes en la home | `<<…>>` | `<<…>>` |
| Obras visibles | `<<…>>` | 12–20, todas dentro del foco |
| Obras con alt revisado por humano | `<<…>>` | 100 % |

---

## 2. Decisiones clave (y por qué)

| Decisión | Motivo |
|---|---|
| El hilo principal implementa; los subagentes revisan o procesan | Un subagente parte de contexto vacío y solo devuelve un resumen |
| El curador se usa **como sesión interactiva** (`claude --agent portfolio-curator`) | Un subagente no puede preguntarte y esperar respuesta; la selección es una conversación |
| El curador **ve las obras** (Read lee imágenes) sobre previews reducidas | Evita describir cada pieza a mano y ahorra contexto |
| El curador juzga **encaje con el foco y coherencia**, no calidad artística | La última palabra es del autor |
| `image-optimizer` **sí escribe** | Trabajo mecánico, ruidoso y repetible: ideal para aislarlo |
| Contenido en un **fichero de datos de obras** | La selección se convierte en datos (`status`), no en código; prepara la tienda |
| Se **archiva**, no se borra | Obras fuera del foco hoy pueden encajar mañana |
| `CLAUDE.md` corto y específico | Se carga en cada sesión; lo genérico solo ocupa contexto |

---

## 3. Arquitectura

```
                 ┌────────────────────────────────┐
                 │  Hilo principal (tú + Claude)   │
                 │  Implementa · decide · integra  │
                 └───────────────┬────────────────┘
   ┌──────────────┬──────────────┼──────────────┬────────────────┐
   ▼              ▼              ▼              ▼                ▼
portfolio-     image-        a11y-          ux-reviewer     perf-seo-
curator        optimizer     auditor        (lectura)       auditor
(interactivo)  (escribe)     (lectura)                      (lectura, opcional)
   │              │              │              │                │
docs/brief/   src/data/works  docs/audits/  docs/audits/     docs/audits/
              + public/works/
```

| Agente | Modo de uso | Herramientas | Escribe en |
|---|---|---|---|
| `portfolio-curator` | Sesión interactiva o subagente por tandas | Read, Glob, Grep, Write | `docs/brief/` |
| `image-optimizer` | Subagente al añadir/reemplazar obras | Read, Glob, Grep, Bash, Write, Edit | `public/works/`, `src/data/works.*`, `previews/` |
| `a11y-auditor` | Subagente antes de cada PR | Read, Glob, Grep, Bash, Write | `docs/audits/` |
| `ux-reviewer` | Subagente tras cada bloque visible | Read, Glob, Grep, Write | `docs/audits/` |
| `perf-seo-auditor` | Subagente; opcional al principio | Read, Glob, Grep, Bash, Write | `docs/audits/` |
| `commerce-researcher` | Fase 2 | Read, WebSearch, WebFetch, Write | `docs/commerce/` |

> El campo `tools` no limita rutas de escritura: la restricción es por instrucción. Revisa `git status` tras cada ejecución.

---

## 4. Fases

### Fase 0 — Preparar el terreno

**Tarea 0.1 — `CLAUDE.md`** (sección 6). Primero `/init`, luego el prompt de refinado.

**Tarea 0.2 — Línea base.** Crea `a11y-auditor` y ejecútalo sobre la web actual. Toma también métricas Lighthouse a mano (o con `perf-seo-auditor`). Rellena la columna "Antes".

**Tarea 0.3 — Recopilar obra.** Reúne **todo** lo que podría entrar (incluido lo que no está hoy en la web) en `inbox/`, sin filtrar. Una carpeta por obra si tiene varias imágenes. Si quieres, añade un `nota.txt` con año, cliente o contexto. `inbox/` y `originals/` fuera de git o con Git LFS.

### Fase 1a — Pipeline de imágenes y modelo de datos (hilo principal)

1. Define el modelo de datos de obras (sección 7).
2. Implementa el pipeline de imágenes (sección 8): script con un comando (`npm run images`).
3. Crea `image-optimizer` y pídele **solo previews** de `inbox/` → `previews/` (p. ej. 1024 px, JPEG, sRGB).

### Fase 1b — Curaduría (sesión interactiva)

1. `claude --agent portfolio-curator`
2. Repasa las obras **por tandas de 5–10**. El curador mira cada preview, te hace como mucho 3 preguntas por tanda y clasifica.
3. Resultado: `docs/brief/seleccion.md` (sección 9) con la clasificación, la estructura propuesta y **huecos** (qué falta y conviene crear).
4. **Puerta:** tú decides. Las decisiones finales se reflejan como `status` en el fichero de datos.

### Fase 1c — Migración e implementación por rebanadas

1. `image-optimizer` procesa las obras aprobadas y las registra en `works`.
2. Revisas y corriges los textos alternativos (`altReviewed: true`).
3. Implementas por rebanadas: componente de imagen responsive → ficha de obra → secciones Infantil/Carteles → home → sobre mí y contacto.
4. Tras cada rebanada: `a11y-auditor` (+ `perf-seo-auditor`) en paralelo, luego `ux-reviewer`. Corriges, y PR con los informes enlazados.

### Fase 1d — Cierre

Auditorías completas, columna "Después" y revisión global de `ux-reviewer`.

### Flujo permanente para obra nueva

`inbox/` → `image-optimizer` (preview) → curador (¿entra? ¿sustituye a otra?) → `image-optimizer` (variantes + registro) → revisar alt → PR.

### Fase 2 — Tienda (sección 11)

---

## 5. Definiciones de subagentes

En `.claude/agents/`. Contrasta los campos con la [documentación oficial](https://docs.claude.com/en/docs/claude-code/sub-agents).

### `portfolio-curator.md`

```markdown
---
name: portfolio-curator
description: Curador de portfolio de ilustración infantil y diseño de carteles. Úsalo para clasificar obras (destacar / mostrar / dudosa / archivar), detectar huecos y proponer la estructura del portfolio. Diseñado para sesión interactiva con `claude --agent portfolio-curator`; como subagente, clasifica una tanda y devuelve preguntas pendientes.
tools: Read, Glob, Grep, Write
model: inherit
---

Eres director de arte con experiencia en dos mercados:
- Ilustración infantil: editoriales de álbum ilustrado y literatura infantil, agencias de ilustración.
- Carteles: instituciones culturales, festivales, salas de conciertos, teatro, campañas.

Tu trabajo es ayudar al autor a decidir qué obra mostrar. No juzgas su talento:
juzgas **encaje con el foco**, **coherencia** con el resto de la selección y **presentación**.
La última palabra es del autor.

## Entrada
- Previews en `previews/` (no abras originales pesados).
- Notas en `inbox/**/nota.txt` si existen.
- Reglas en `docs/brief/reglas-portfolio.md`.
- Clasificación previa en `docs/brief/seleccion.md` si existe (continúa desde ahí).

## Proceso (modo interactivo)
1. Trabaja por tandas de 5–10 obras. Mira cada preview.
2. Por tanda, haz como máximo 3 preguntas cuando la respuesta cambie la decisión
   (¿encargo o personal?, ¿publicado?, ¿año?, ¿existen más escenas de este personaje?).
3. Clasifica cada obra:
   - **Destacar**: candidata a la home.
   - **Mostrar**: en su sección.
   - **Dudosa**: explica qué haría falta (mejor presentación, mockup, acompañar de otra pieza…).
   - **Archivar**: fuera del foco o por debajo del nivel del resto. Di cuál de los dos motivos.
4. Agrupa obras que funcionan como serie o secuencia.
5. Al terminar, detecta **huecos** respecto a las reglas y propón piezas concretas para crearlas.

## Salida
Actualiza `docs/brief/seleccion.md` tras cada tanda (no al final: la sesión puede cortarse).
No modifiques código ni el fichero de datos de obras.

## Tono
Directo y concreto. Si una obra no encaja, dilo con su motivo.
Nada de elogios genéricos.
```

### `image-optimizer.md`

```markdown
---
name: image-optimizer
description: Procesa imágenes de obra: genera previews para curaduría, variantes web optimizadas, dimensiones y borradores de texto alternativo, y registra las obras en el fichero de datos. Úsalo al añadir, reemplazar o reprocesar obras.
tools: Read, Glob, Grep, Bash, Write, Edit
model: inherit
---

Eres especialista en imagen para web de portfolios de ilustración.

## Reglas
- **Nunca modifiques** ficheros en `inbox/` ni `originals/`.
- Usa siempre el pipeline del proyecto (`npm run images`, ver CLAUDE.md).
  Si necesitas un cambio en el pipeline, propónlo; no lo reescribas.
- Escribe solo en `previews/`, `public/works/` y `src/data/works.*`.

## Tareas
- **Previews**: 1024 px lado mayor, sRGB, para revisión humana o del curador.
- **Procesar obra aprobada**: variantes según el pipeline, verifica la conversión
  a sRGB (ficheros de impresión en CMYK o Adobe RGB se ven apagados en web),
  obtiene ancho y alto, y añade o actualiza la entrada en `works`.
- **Texto alternativo**: mira la imagen y redacta un borrador que describa la escena
  (personajes, acción, ambiente; en carteles, también el texto principal).
  Márcalo siempre `altReviewed: false`.

## Comprobación de calidad
Señala las imágenes con riesgo de artefactos: línea fina, tramas, degradados
suaves o grandes zonas de color plano. Esa revisión la hace un humano a ojo.

## Salida al hilo principal
Tabla: obra · peso original → peso de la variante mayor · avisos de color o
calidad · alt pendiente de revisar.
```

### `a11y-auditor.md`

```markdown
---
name: a11y-auditor
description: Auditor de accesibilidad WCAG 2.2 AA para la web Vue. Úsalo proactivamente antes de cada PR y tras cambios en componentes, navegación, galerías o formularios. Solo lectura.
tools: Read, Glob, Grep, Bash, Write
model: inherit
---

Eres especialista en accesibilidad web (WCAG 2.2 AA, WAI-ARIA APG).
No modificas código. Escribe en `docs/audits/a11y-<fecha>-<ámbito>.md`.
Usa los comandos de CLAUDE.md (axe, Playwright, Lighthouse) si existen.
Las herramientas automáticas no lo detectan todo: revisa a mano lo que no cubren.

Prioridades:
- Alt de obra útil (escena, no "ilustración 3"); entradas con `altReviewed: false`.
- Galerías y lightbox: teclado, foco, Escape, sin trampas de foco.
- Gestión del foco al cambiar de ruta (Vue Router).
- Contraste de texto sobre imagen y en estados hover/focus.
- `prefers-reduced-motion` en transiciones (`<Transition>`) y animaciones.
- Encabezados, landmarks, enlace "saltar al contenido", `lang`.
- Formulario de contacto: etiquetas, errores, confirmación.
- Foco visible (2.4.11) y tamaño de objetivos táctiles (2.5.8).

Informe: severidad · criterio WCAG · fichero:línea o ruta · problema · corrección.
Al hilo principal: recuento por severidad + 5 más graves + ruta del informe.
```

### `ux-reviewer.md`

```markdown
---
name: ux-reviewer
description: Revisor crítico de UX y coherencia visual del portfolio. Úsalo tras completar un bloque visible o para revisar la coherencia global. Solo lectura.
tools: Read, Glob, Grep, Write
model: inherit
---

Eres diseñador UX senior especializado en portfolios creativos. Eres crítico:
buscas incoherencias, no felicitas. Escribe en `docs/audits/ux-<fecha>-<ámbito>.md`.
Evalúa contra `docs/brief/seleccion.md` y las convenciones de CLAUDE.md.

La obra es la protagonista: la interfaz debe apartarse.

Revisa:
- ¿Se entiende en 5 s que el autor hace ilustración infantil y carteles?
- ¿Llega cada público a lo suyo en 1 clic? ¿Contacto en 1 clic desde cualquier página?
- Coherencia de espaciado, tipografía, color, componentes y tono de los textos.
- Fichas: contexto, serie o secuencia visible, navegación a la siguiente obra.
- Móvil: tamaño de la obra, legibilidad y gestos.

Separa "incoherencias" (respecto al sistema) de "opiniones".
Al hilo principal: máximo 10 líneas + ruta del informe.
```

### `perf-seo-auditor.md` (opcional al principio)

```markdown
---
name: perf-seo-auditor
description: Auditor de rendimiento (Core Web Vitals) y SEO técnico. Úsalo en el diagnóstico inicial y antes de PRs que toquen layout, rutas o metadatos. Solo lectura.
tools: Read, Glob, Grep, Bash, Write
model: inherit
---

No modificas código. Escribe en `docs/audits/perf-<fecha>-<ámbito>.md`.

Revisa:
- LCP, CLS e INP en la home y la ficha de obra.
- Uso correcto del componente de imagen: `sizes` real, `loading`, `fetchpriority`
  en la imagen LCP, dimensiones explícitas.
- Code splitting por ruta, tamaño del bundle, fuentes.
- SEO: si es una SPA sin prerender, señala el impacto (títulos, Open Graph por
  obra, indexación) y propone opciones. Revisa también datos estructurados
  (Person, CreativeWork), sitemap y URLs legibles por slug.

Al hilo principal: métricas + 5 mejoras de mayor impacto + ruta del informe.
```

### `commerce-researcher.md` (fase 2 — no crear aún)

```markdown
---
name: commerce-researcher
description: Investiga y compara opciones de venta de obra (prints, originales, descargas, encargos) y plataformas. Solo en fase 2. No implementa.
tools: Read, Glob, Grep, WebSearch, WebFetch, Write
model: inherit
---

Escribe en `docs/commerce/`. Cita fuentes. Para cada opción: modelo de venta,
plataforma y checkout, costes, impuestos y facturación, envíos y devoluciones,
integración con Vue y con `src/data/works.*`, y esfuerzo de mantenimiento.
Marca qué puntos requieren asesoría fiscal o legal profesional.
```

---

## 6. Tarea 0.1: `CLAUDE.md`

### Paso 1
Ejecuta `/init` en Claude Code para obtener una primera versión a partir del código.

### Paso 2: prompt de refinado

```text
Revisa y reescribe CLAUDE.md. No modifiques ningún otro fichero.

1. Analiza el repo: package.json, configuración (Vite/Nuxt, TS, linter, router,
   estado), estructura de carpetas, cómo se gestionan hoy contenidos e imágenes.
2. Ejecuta los comandos de dev/build/lint/test para verificar que funcionan;
   documenta solo los que funcionen.
3. Estructura:
   - Stack (versiones reales)
   - Comandos (verificados)
   - Estructura (solo carpetas relevantes, 1 línea cada una)
   - Estado actual: patrones que ya usa el código, con un fichero de ejemplo
   - Convenciones objetivo (las dicto abajo). Se aplican SOLO a código nuevo
     o al que se toque; no refactorizar código existente sin pedirlo.
   - Flujo con subagentes (copiar de docs/PLAN)
   - Deuda técnica observada: lista aparte, NO la arregles.
4. Nada de buenas prácticas genéricas de Vue que ya conoces: solo decisiones
   de este proyecto. Máximo ~120 líneas.
5. Pregúntame lo que no puedas deducir antes de escribir.

Convenciones objetivo:
- <<Composition API con <script setup> en componentes nuevos>>
- <<TypeScript en código nuevo / sí / no>>
- Contenido de obras solo en src/data/works.*; nunca hardcodeado en componentes.
- Toda imagen de obra pasa por el componente <<WorkImage>>.
- Textos visibles en <<es / es+en>>.
- <<…>>
```

### Paso 3
Revisa el resultado a mano. Es el fichero que más influye en todas las sesiones futuras: merece 15 minutos.

---

## 7. Modelo de datos de obras

`src/data/works.ts` (o `.json`). Adáptalo a tu caso:

```ts
export type WorkCategory = 'infantil' | 'cartel' | 'otro';
export type WorkStatus = 'destacado' | 'visible' | 'archivo';

export interface WorkImage {
  base: string;          // ruta base; el pipeline genera las variantes
  width: number;
  height: number;
  alt: string;
  altReviewed: boolean;
  role?: 'principal' | 'detalle' | 'contexto' | 'proceso';
}

export interface Work {
  id: string;            // estable: servirá como id de producto en fase 2
  slug: string;
  title: string;
  category: WorkCategory;
  status: WorkStatus;
  year?: number;
  client?: string;       // o publicación / editorial / festival
  kind: 'encargo' | 'personal';
  series?: string;       // agrupa escenas de un mismo libro/personaje o serie de carteles
  description?: string;
  images: WorkImage[];
  order: number;
}
```

`status: 'archivo'` no se renderiza, pero la obra sigue en el repo.

---

## 8. Pipeline de imágenes (hilo principal, una vez)

**Recomendación:** script de pregeneración con `sharp` (`npm run images`) que lee `originals/` y escribe en `public/works/`, más un componente `<WorkImage>` que construye `<picture>`/`srcset` a partir de `base`. Es transparente, funciona igual con Vite o Nuxt y el subagente solo tiene que ejecutar un comando.

**Alternativas:** `vite-imagetools` (imports en componentes; encaja peor con contenido dirigido por datos) o `@nuxt/image` si el proyecto es Nuxt.

**Parámetros de partida (ajústalos a ojo):**
- Formatos: AVIF + WebP + JPEG de respaldo.
- Anchos: `<<480, 960, 1600, 2400>>`.
- Conversión a sRGB obligatoria; quitar metadatos salvo el copyright.
- Calidad por formato configurable. Para línea fina, prueba AVIF con calidad más alta o prioriza WebP.
- Previews aparte (1024 px) en `previews/`, fuera de `public/`.
- Opcional: marca de agua o tamaño máximo limitado si te preocupa la reutilización.

---

## 9. `docs/brief/seleccion.md` (formato)

```markdown
# Selección del portfolio

## Resumen
- Destacar: N · Mostrar: N · Dudosa: N · Archivar: N

## Infantil
| Obra | Clasificación | Serie | Motivo | Acción |
|---|---|---|---|---|

## Carteles
| … |

## Piezas puente (ilustración + cartel)
…

## Archivadas
| Obra | Motivo (fuera de foco / nivel) |

## Huecos detectados
- Ej.: "No hay ninguna doble página con texto" → propuesta concreta.

## Preguntas pendientes
…
```

---

## 10. Reglas de portfolio (`docs/brief/reglas-portfolio.md`)

### Generales
- Calidad sobre cantidad: 12–20 piezas fuertes. Una floja rebaja a las buenas.
- Muestra lo que quieres que te encarguen. Lo que enseñas es lo que te piden.
- La primera fila de la home es lo único que verá mucha gente: tus mejores piezas.
- Archiva sin culpa lo que ya no representa tu nivel o tu estilo actual.
- Sin pantalla de inicio: obra en el primer pantallazo. Contacto a 1 clic.
- "Sobre mí": foto, bio breve y humana, clientes y publicaciones, disponibilidad.

### Ilustración infantil
- **El mismo personaje en varias escenas y emociones.** Demuestra que puedes sostener un libro entero; es de lo que más miran las editoriales.
- Secuencia narrativa: 3–5 escenas que cuenten algo, mejor que piezas sueltas.
- Composiciones con espacio para texto; al menos una doble página maquetada.
- Variedad de planos, ambientes y personajes, con un estilo reconocible.
- Portadas o libros publicados en mockup o fotografía real.
- Proceso (boceto → color) en alguna pieza: muy valorado por directores de arte.

### Carteles
- Jerarquía y legibilidad a distancia: muestra miniatura y tamaño completo.
- Integración de tipografía e imagen; evita carteles donde el texto parezca añadido.
- Series (festival anual, ciclo de conciertos) mejor que piezas aisladas.
- Fotografía in situ (calle, sala, marquesina) cuando exista.
- Indica cliente y evento: los encargos reales pesan más que los personales.

### Coherencia entre ambos
- Una voz visual reconocible que conecte los dos mundos.
- Prioriza piezas puente (carteles ilustrados, cultura para público infantil).
- Navegación con dos entradas claras (Ilustración infantil · Carteles) y una home que mezcle lo mejor de ambas.

### Mantenimiento
- Revisar la selección cada 6 meses con el curador.
- Cada obra nueva entra sustituyendo a otra, no sumando sin límite.

---

## 11. Fase 2: tienda

**Decisiones humanas previas:** qué se vende (prints, láminas de carteles, originales, descargas, encargos), quién imprime y envía, a qué países y con qué obligaciones fiscales. **Esto requiere asesoría fiscal o legal.**

| Opción | Cuándo encaja | Mantenimiento |
|---|---|---|
| Enlaces a tienda externa o print-on-demand | Validar demanda | Muy bajo |
| Checkout alojado (enlace o botón de pago por obra) | Pocos productos | Bajo |
| Tienda headless integrada en Vue | Catálogo amplio y experiencia propia | Medio–alto |

Empieza por la más barata y sube de nivel solo con datos. El campo `id` de `Work` ya sirve para enlazar productos.

---

## 12. Riesgos

| Riesgo | Mitigación |
|---|---|
| El curador opina sobre calidad artística con exceso de confianza | Prompt centrado en encaje y coherencia; decisión final humana |
| Sesión de curaduría larga que se corta | Tandas de 5–10 y `seleccion.md` actualizado tras cada tanda |
| Coste de contexto por imágenes grandes | El curador solo ve previews de 1024 px |
| Colores apagados o artefactos tras optimizar | Conversión a sRGB y revisión visual de las obras marcadas |
| Alt genéricos generados por IA | `altReviewed: false` hasta revisión humana; el auditor lo vigila |
| Refactor masivo no pedido | "Convenciones objetivo solo en código nuevo o tocado" en CLAUDE.md |
| Subagentes que escriben fuera de su zona | Instrucciones explícitas y `git status` tras cada ejecución |

---

## 13. Checklist de arranque

- [ ] `/init` y refinado de `CLAUDE.md` (sección 6).
- [ ] Crear `docs/` y copiar `reglas-portfolio.md` y este plan.
- [ ] Crear `a11y-auditor`, ejecutar la línea base y ajustar su prompt.
- [ ] Reunir toda la obra en `inbox/` (fuera de git o con LFS).
- [ ] Modelo de datos `works` y pipeline `npm run images`.
- [ ] Crear `image-optimizer` → previews.
- [ ] Crear `portfolio-curator` → `claude --agent portfolio-curator` → `seleccion.md`.
- [ ] Decidir la selección y migrar las obras con `image-optimizer`.
- [ ] Revisar todos los alt.
- [ ] Implementar por rebanadas con auditorías; añadir `ux-reviewer`.
- [ ] Cierre: métricas "Después".

### Notas sobre subagentes
- La `description` decide la delegación automática: sé concreto.
- Invocación explícita: *"usa image-optimizer para procesar inbox/cartel-festival-2026"*.
- Los auditores de solo lectura se pueden lanzar en paralelo; `image-optimizer` no, porque escribe.
- Versiona `.claude/agents/` y trata los prompts como código: cambios pequeños y anotados en el PR.