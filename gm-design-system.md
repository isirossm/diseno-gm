# Design System — Plataforma Diseño GM · Walmart Chile
**Referencia rápida para Claude** · Última actualización: junio 2026

Archivo CSS completo: `gm-design-system.css`
Figma: https://www.figma.com/design/U5i9dduyhrWluXYl5Q5Pxp/Plataforma---Taller-V---Claudita

---

## Fuente

**Inter** (400 / 500 / 600 / 700) — vía Google Fonts.
⚠️ Bogle es la fuente de Walmart en producción, pero requiere archivos locales. En este prototipo usar siempre Inter.
Variable: `--font-sans: 'Inter', 'Helvetica Neue', Arial, sans-serif`

---

## Paleta de colores

### Walmart Blue (primario)
| Token | Hex | Uso |
|-------|-----|-----|
| `--wm-sb-400` | `#0071dc` | **Walmart Blue** — masthead, botones primarios, links |
| `--wm-sb-500` | `#004f9a` | Hover/pressed de botón primario |
| `--wm-sb-600` | `#002d58` | Navy — títulos sobre fondo claro |
| `--wm-sb-300` | `#e6f1fc` | SubBar (barra tier 2), hover secundario |
| `--wm-sb-200` | `#f2f8fd` | Fondo wash azulado — selected row, hover chip |

### Spark Yellow (acento)
| Token | Hex | Uso |
|-------|-----|-----|
| `--wm-spark-400` | `#ffc220` | **Spark Yellow** — logo, badge sobre navy, estado activo |
| `--wm-spark-500` | `#f3a800` | Hover de spark |
| `--wm-spark-300` | `#ffd569` | Tint suave |

### Neutral
| Token | Hex | Uso |
|-------|-----|-----|
| `--wm-ns-600` | `#030303` | Texto principal (casi-negro) |
| `--wm-ns-500` | `#2e2f32` | Cuerpo de texto |
| `--wm-ns-400` | `#46474a` | Texto terciario, labels |
| `--wm-ns-300` | `#74767c` | Texto deshabilitado, placeholder |
| `--wm-ns-200` | `#c6c7c9` | Bordes, líneas divisorias |
| `--wm-ns-100` | `#f1f1f2` | Fondo de página |
| `--wm-ns-050` | `#fafafa` | Fondo de columna Kanban, cabezal tabla |

### Status
| Token | Hex | Uso |
|-------|-----|-----|
| `--wm-success-500` | `#2a8703` | Verde OK |
| `--wm-success-100` | `#e7f5df` | Fondo verde claro |
| `--wm-error-500`   | `#de1c24` | Rojo error/crítico |
| `--wm-error-100`   | `#fde8e9` | Fondo rojo claro |
| `--wm-warning-500` | `#f5a800` | Amarillo warning |
| `--wm-warning-100` | `#fff9e6` | Fondo warning claro |

### IA (exclusivo)
| Token | Hex | Uso |
|-------|-----|-----|
| `--wm-ia-violet` | `#5c6ac4` | **SOLO para elementos de IA** — nunca reutilizar |

### Módulos (acento por módulo del sistema)
| Módulo | Color | Token |
|--------|-------|-------|
| Tendencias | `#3a78b3` | `--mod-tendencias` |
| Desarrollo Técnico | `#578cbf` | `--mod-dt` |
| Fichas Técnicas | `#73a0cb` | `--mod-fichas` |
| Gestión y Registro | `#adc9e4` | `--mod-gestion` |

---

## Escala tipográfica

| Clase CSS | Tamaño | Peso | Uso |
|-----------|--------|------|-----|
| `.wm-display`   | 32px | Bold (700) | Título principal de sección |
| `.wm-title`     | 24px | Bold | Título de card/panel |
| `.wm-heading`   | 22px | Bold | Header de sección de módulo |
| `.wm-label-lg`  | 16px | SemiBold (600) | KPIs, valores estadísticos |
| `.wm-body-em`   | 14px | SemiBold | Botones primarios, CTAs |
| `.wm-body-ui`   | 13px | SemiBold | Navegación, labels de input |
| `.wm-body`      | 12px | Regular (400) | Contenido de tabla, texto cuerpo |
| `.wm-caption`   | 11px | Regular | Breadcrumbs, subtítulos |
| `.wm-micro`     | 10px | Regular | Badges, tags, anotaciones |
| `.wm-label-xs`  |  9px | SemiBold | Labels de sección ALL CAPS |

> La escala empieza en 32px (no existe Display de 40px en esta versión).

---

## Espaciado

| Token | Valor |
|-------|-------|
| `--space-3xs` | 2px |
| `--space-2xs` | 4px |
| `--space-xs`  | 8px |
| `--space-sm`  | 12px |
| `--space-md`  | 16px |
| `--space-lg`  | 24px |
| `--space-xl`  | 40px |
| `--space-2xl` | 48px |
| `--space-3xl` | 56px |
| `--space-4xl` | 80px |

---

## Border radius

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-xs`    | 4px | Chips pequeños, tags |
| `--radius-sm`    | 6px | Inputs, selects |
| `--radius-md`    | 8px | Badges secundarios |
| `--radius-btn`   | 10px | Botones primarios |
| `--radius-card`  | 12px | Cards |
| `--radius-panel` | 14px | Paneles laterales |
| `--radius-lg`    | 16px | Paneles grandes |
| `--radius-modal` | 20px | Modales |
| `--radius-pill`  | 100px | Chips de filtro, botones pill, nav items |

---

## Sombras

| Token | Valor | Uso |
|-------|-------|-----|
| `--shadow-card`  | `0 2px 8px rgba(0,0,0,0.08)` | Card en reposo |
| `--shadow-hover` | `0 4px 16px rgba(0,0,0,0.14)` | Card en hover |
| `--shadow-focus` | `0 0 0 3px rgba(0,113,220,0.30)` | Input en foco |
| `--shadow-press` | `0 1px 2px rgba(0,0,0,0.15)` | Botón pressed |

---

## Componentes — inventario de clases CSS

### Masthead (topbar, tier 1)
```
.gm-mast             — contenedor, fondo Walmart Blue, 76px
.gm-mast__logo       — logo + "Chile / Diseño GM"
.gm-mast__nav        — contenedor de nav items
.gm-mast__nav-wrap   — wrapper relativo de cada nav item (hover target)
.gm-mast__nav-item   — botón de nav (pill blanco transparente)
  .is-active         — fondo blanco, texto azul, barra spark abajo
  .is-disabled       — 50% opacidad, no clickeable
.gm-mast__nav-caret  — flecha ▾ de dropdown
.gm-mast__submenu    — dropdown de categorías (hover-based + .is-open para Herramientas)
  .gm-mast__submenu-head  — label "CATEGORÍA" en uppercase
  .gm-mast__sub-item      — fila de subcategoría
  .gm-mast__sub-chev      — chevron › derecho
  .gm-mast__sub-chip      — badge "próximamente"
.gm-mast__subflyout  — segundo nivel de dropdown (fases de Moda Mujer)
.gm-mast__actions    — grupo de botones lado derecho
.gm-mast__btn        — botón de acción (Comunicaciones, etc.)
  .gm-mast__btn-icon — ícono del botón
  .gm-mast__btn-badge — contador de notificaciones (spark yellow)
.gm-mast__avatar     — avatar circular del usuario (spark yellow bg)
```

### SubBar (tier 2, breadcrumb)
```
.gm-bar              — barra azul pálido (wm-sb-200), 44px
  .crumb             — migas de pan
  .crumb.is-current  — miga activa (bold)
  .sep               — separador /
  .gm-bar__spacer    — flex-1 para empujar acciones a la derecha
```

### Page shell
```
.gm-page             — contenedor scrollable (flex:1, overflow-y:auto)
  .gm-page__head     — fila título + acciones
  .gm-page__title    — H1 de pantalla (28px bold)
  .gm-page__sub      — subtítulo de pantalla (14px, muted)
```

### Cards
```
.gm-card             — card base (blanco, border 1px, radius 12px)
  .gm-card--hover    — añade hover con sombra y translateY(-1px)
  .gm-card--p0       — sin padding
  .gm-card--p12      — padding 12px
  .gm-card__head     — fila título + "ver todo"
  .gm-card__title    — título de la card
  .gm-card__see      — link "Ver todo →"
```

### Botones
```
.gm-btn              — base (font Inter 700, 14px, pill, 10px 20px)
  .gm-btn--primary   — azul Walmart (#0071dc) / hover (#004f9a)
  .gm-btn--secondary — outline negro / hover bg gris
  .gm-btn--text      — sin fondo, subrayado
  .gm-btn--sm        — 8px 16px, 13px
  .gm-btn--lg        — 14px 28px, 16px
  .gm-btn--icon      — circular 36px, sin fondo, border neutro
```

### Formularios
```
.gm-field            — input grande (48px, pill, border 1.5px)
  .gm-field-label    — label sobre el input
  .gm-field__toggle  — "Mostrar/ocultar" dentro del input
.gm-search           — search compacto (36px, pill, border 1px)
```

### Chips / Badges / Semáforos
```
.gm-chip             — chip base (24px, pill, border)
  .gm-chip--active   — azul
  .gm-chip--success  — verde
  .gm-chip--warning  — amarillo
  .gm-chip--error    — rojo
  .gm-chip--neutral  — gris
  .gm-chip__dot      — punto de color
.gm-badge            — badge numérico (circular, rojo)
.gm-sev              — severity con punto de color (alertas)
  .gm-sev--normal / --warn / --crit / --ok
.gm-sem              — semáforo circular de tabla (18px)
  .gm-sem--v (verde) / --a (amarillo) / --r (rojo) / --g (gris dashed)
```

### Progress bar
```
.gm-progress         — barra de progreso (8px, gris fondo)
  .gm-progress__fill — relleno animado
  .gm-progress--success / --warning / --disabled
```

### Avatar
```
.gm-avatar           — 32px circular, azul claro / texto azul
  .gm-avatar--sm     — 24px
  .gm-avatar--lg     — 40px
```

### Tabla
```
.gm-table            — tabla estándar (font 13px)
  .gm-table--trace   — variante densa (trazabilidad por prenda)
  .gm-table__muted   — texto secundario en celda
  .gm-table__note    — texto con clamp a 2 líneas
  .gm-table__action  — botón ghost que aparece en hover de fila
.gm-fase__label / .gm-fase__counter   — celda "Fase actual"
.gm-owner__name / .gm-owner__role     — celda "Responsable"
  .gm-owner__role--int (azul) / --ext (marrón)
  .gm-owner__ext-marker  — badge "EXT" navy/spark
```

### Filtros
```
.gm-filters          — fila de filtros (bg ns-050, wrap)
  .gm-filters__label — "FILTROS" en uppercase
  .gm-filters__clear — "Limpiar" link
.gm-filter           — chip de filtro base
  .gm-filter--active — chip activo (azul)
  .gm-filter--dropdown — con caret ▾
  .gm-filter--add    — "+ Agregar" dashed
  .gm-filter__x      — botón × de quitar filtro
  .gm-filter__caret  — caret del dropdown
```

### Kanban
```
.gm-kanban           — grid 4 columnas (gap 16px)
.gm-kanban__col      — columna (bg ns-050, border, radius)
  .gm-kanban__head   — header uppercase + count badge
  .gm-kanban__count  — badge circular con número
.gm-task             — tarjeta de tarea
  .gm-task__title    — título de la tarea
  .gm-task__meta     — fila meta (fecha, categoría)
  .gm-task--compact  — variante compacta
```

### Category card
```
.gm-cat              — card de categoría (Moda, Casa, etc.)
  .gm-cat__hero      — franja azul superior (64px)
    .gm-cat__hero-icon    — ícono en cuadrado blanco
    .gm-cat__hero-chip    — estado (Atención / próximamente)
    .gm-cat__hero--disabled — variante deshabilitada (gris)
  .gm-cat__body      — cuerpo de la card
    .gm-cat__name    — nombre de categoría (16px bold)
    .gm-cat__sub     — subtítulo
    .gm-cat__progress-pct — porcentaje (16px bold azul)
    .gm-cat__milestone — próximo hito (fondo ns-050)
    .gm-cat__meta-row — fila de pills de alertas
      .gm-cat__meta-pill--crit / --warn
  .gm-cat--disabled  — estado deshabilitado
```

### Alertas
```
.gm-alert            — alerta inline (padding 12px 0, border-bottom)
  .gm-alert__title / .gm-alert__desc
.gm-alert-card       — alerta con borde lateral de color
  .gm-alert-card__rail--crit / --warn / --normal
  .gm-alert-card__body
```

### Quick links
```
.gm-quick            — link de acceso rápido (fila con chevron)
  .gm-quick__name / .gm-quick__chev
```

### Collection card
```
.gm-coll             — card de colección (Verano 25, etc.)
  .gm-coll__img      — header de imagen (96px, con gradient)
  .gm-coll__body     — cuerpo
    .gm-coll__name   — nombre (18px bold)
    .gm-coll__dates  — fechas (12px muted)
    .gm-coll__pct    — porcentaje grande (24px bold azul)
```

### Comunicaciones
```
.gm-comms            — grid 360px | 1fr
.gm-comms__list      — panel izquierdo (lista conversaciones)
  .gm-comms__tabs    — segmented: Interno | Externo
  .gm-comms__tab.is-active (--int: azul | --ext: marrón)
  .gm-comms__group   — separador de sección (bg ns-050)
.gm-conv             — fila de conversación
  .gm-conv--int / .gm-conv--ext
  .is-active         — borde izquierdo de color + bg tintado
  .gm-conv__avatar--int (azul circular) / --ext (spark square)
  .gm-conv__ext-marker — badge "EXT" navy
.gm-thread           — panel derecho (thread activo)
  .gm-thread--ext    — fondo cálido para externos
  .gm-thread__rail   — borde de color en header
  .gm-thread__day    — separador de fecha (centered)
.gm-bubble-row       — fila de burbuja + avatar
.gm-bubble           — burbuja de mensaje
  .gm-bubble--rx     — recibido (blanco)
  .gm-bubble--tx     — enviado (azul)
  .gm-bubble--ext    — externo (con borde spark)
  .gm-bubble__file   — adjunto dentro de burbuja
.gm-mention          — chip @mention dentro de texto
  .gm-mention--crit / --warn / --ok
.gm-ref-card         — referencia a prenda dentro de mensaje
  .gm-ref-card--crit / --warn / --ok
  .gm-ref-card__sev / __btn--ghost / __btn--primary
.gm-thread__composer — barra de texto inferior
```

### Splash + Login
```
.gm-splash           — pantalla de carga (fondo azul)
  .gm-splash__progress — barra animada spark
.gm-login            — grid 1fr | 480px
  .gm-login__brand   — panel izquierdo azul
  .gm-login__form    — panel derecho blanco
```

---

## Layout helpers

```css
.row      → flex row, gap 12px
.col      → flex col, gap 12px
.stack-sm → flex col, gap 6px
.stack    → flex col, gap 12px
.stack-md → flex col, gap 16px
.stack-lg → flex col, gap 24px
.between  → flex row, space-between
.grid     → display grid, gap 16px
.flex-1   → flex: 1, min-height: 0
```

---

## Arquitectura del prototipo

```
wf-primitives.jsx   → componentes React base (SparkMark, WalmartWord, 
                       Progress, Btn, Chip, Kanban, NavMasthead, SubBar…)
screens.jsx         → pantallas (PanelControl, ModaGeneral, ModaMujer, 
                       Comunicaciones, CalendarioScreen, ColeccionesPasadas,
                       DocumentosScreen, KPIsScreen)
prototipo-app.jsx   → router (RouterCtx, ProtoApp, NavMasthead override)
gm-design-system.css → este archivo (tokens + todos los componentes)
app-styles.css      → versión legacy (sigue en uso en Prototipo.html)
Prototipo.html      → entrada para servidor dev (carga los 3 jsx)
```

## RouterCtx — estado global
```js
{ navigate, screen, selectedStep, toolCtx, setToolCtx, showToast, openModal, openFilters }
window.__app → { navigate, showToast, openModal, openFilters, setStep, setToolCtx }
```

## Pantallas disponibles
| screen | Componente | Nav activo |
|--------|-----------|-----------|
| `splash` | SplashScreen | — |
| `panel` | PanelControl | Inicio |
| `moda` | ModaGeneral | Moda |
| `moda-mujer` | ModaMujer | Moda |
| `comunicaciones` | CommsScreen | — |
| `calendario` | CalendarioScreen | Herramientas |
| `colecciones` | ColeccionesPasadas | Herramientas |
| `documentos` | DocumentosScreen | Herramientas |
| `kpis` | KPIsScreen | Herramientas |

---

## Reglas de uso de color

1. **Walmart Blue (`--wm-sb-400`)** — masthead, botones primarios, links activos. Nunca en backgrounds de página.
2. **Spark Yellow (`--wm-spark-400`)** — solo sobre fondos oscuros (navy, azul), o como badge de notificación. Nunca como texto principal sobre blanco.
3. **IA Violet (`--wm-ia-violet: #5c6ac4`)** — EXCLUSIVO para elementos de IA. Ningún otro componente debe usar este color.
4. **Status colors** — rojo/verde/amarillo solo para estados reales, nunca decorativos.
5. **Texto sobre fondos azules** — usar `#fff` (100%) o `rgba(255,255,255,0.85)` para secundario.
6. **Sin gradientes en backgrounds de página** — solo planos. Gradientes permitidos en hero strips de cards y splash.
7. **Sin emojis en la UI** — el copy es en español chileno, profesional y conciso.

---

## Convenciones de copy

- **Idioma**: Español chileno. Sin anglicismos innecesarios.
- **Tono**: Profesional, conciso, operacional.
- **Casing**: Title Case para nombres de módulo/sección. Sentence case para labels y body. ALL CAPS para divisores de sección.
- **IA prefix**: "IA propone ·" (en violeta `#5c6ac4`)
- **Sin emoji**, sin exclamaciones, sin jerga casual.
- **Status labels**: Aprobado · Pendiente · En revisión · Rechazado · Borrador · Bloqueado
- **Botones**: Verbos en infinitivo — Guardar · Exportar · Filtrar · Ver detalle · Agregar
