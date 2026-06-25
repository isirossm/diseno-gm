# Flujo de Producción Walmart Chile — Especificación de Pantallas

## Contexto general

Plataforma interna de gestión del proceso de producción de moda para Walmart Chile.

**Usuario actual:** Valentina, encargada de moda mujer. Tiene acceso y permisos completos sobre todas las acciones del flujo. Las vistas de otros usuarios (comprador, otros diseñadores) se desarrollan en una segunda fase.

**Design system:** GM Design System — los tokens de color, tipografía, spacing, radius y sombras ya están definidos en `fichawalmart.html` y se aplican en toda la plataforma.

**Alcance del dashboard:** Este flujo es específico de una temporada activa. No hay selector multi-temporada en esta vista; eso pertenece al flujo de gestión general.

**Vistas de compradores:** Documentadas en `compradores.md`. Se desarrollan en segunda fase. Donde el comprador tiene un rol de aprobación o input, se deja marcado como dependencia bloqueante.

---

## Design system y chrome de la plataforma

Todo el flujo de producción usa el mismo design system documentado en `Renata.html` (Versión 2). Los tokens, componentes y patrones de navegación deben ser exactamente los mismos — no se inventa nada nuevo.

### Tokens de color
```
--wm-sb-400: #0071dc   → Walmart Blue (primario, masthead, botones, links)
--wm-sb-500: #004f9a   → hover/pressed de primario
--wm-sb-600: #002d58   → navy profundo, headings sobre fondo claro
--wm-sb-200: #f2f8fd   → wash pálido, fondo de subbar y hover states
--wm-sb-300: #e6f1fc   → tint pálido, terciary nav, hover states
--wm-spark-400: #ffc220 → Spark Yellow (accento, badges, energía)
--wm-ns-600: #030303   → texto principal (near-black)
--wm-ns-400: #46474a   → texto secundario
--wm-ns-300: #74767c   → texto muted / placeholder
--wm-ns-200: #c6c7c9   → bordes standard
--wm-ns-100: #f1f1f2   → bordes sutiles, fondos de fila
--wm-ns-050: #fafafa   → fondo alternativo de superficie
--wm-success-500: #2a8703 / --wm-success-100: #e7f5df
--wm-error-500: #de1c24   / --wm-error-100: #fde8e9
```

### Tipografía
- **Fuente:** Bogle (fuente corporativa Walmart), fallback Helvetica Neue / Arial
- **Escala relevante para la plataforma:**
  - Page title: 28px bold (`gm-page__title`)
  - Card title: 16px bold (`gm-card__title`)
  - Nav item: 14px
  - Label campo: 13px bold
  - Chip/badge: 12px
  - Sidebar label: 10px 600 weight

### Estructura de layout

```
.app-shell          → contenedor full-page, flex column
  .gm-mast          → topbar (76px, azul Walmart)
  .app-body         → flex row
    .gm-navsidebar  → sidebar izquierdo (72px, blanco)
    .app-main       → flex 1, overflow auto
      .gm-bar       → subbar/breadcrumb (44px, azul pálido --wm-sb-200)
      .gm-page      → área de contenido (padding 24px 32px, max-width 1280px)
```

### Topbar — `.gm-mast`
- Fondo: `--wm-sb-400`, altura 76px, padding 0 28px
- **Logo:** Spark mark SVG + "Diseño GM" + divider + "Walmart Chile"
- **Nav central:** items tipo pill `.gm-mast__nav-item`
  - Default: transparente, texto blanco
  - Hover: `rgba(255,255,255,0.12)`
  - Activo: fondo blanco, texto `--wm-sb-500`, underline `--wm-spark-400`
  - Deshabilitado: texto `rgba(255,255,255,0.5)`, no clickeable
  - Con submenú: caret visible, dropdown `.gm-mast__submenu` aparece en hover (blanco, shadow, border-radius sm)
- **Acciones (derecha):** botones icon con badge de notificaciones + avatar de perfil

Las **4 fases** del flujo de producción van como nav items en el masthead. Al hover de cada fase se despliega el submenú con los pasos que contiene.

### Sidebar — `.gm-navsidebar`
- Ancho: 72px, fondo blanco, border-right 1px `--wm-ns-100`
- Items: icono (20px) + label (10px, 600 weight), centrados verticalmente
- Default: texto `--wm-ns-400`
- Hover: fondo `--wm-ns-050`, texto `--wm-ns-600`
- Activo: fondo `#EEF4FF`, texto `--wm-sb-400`

El sidebar del flujo de producción muestra los pasos de la fase activa. Al cambiar de fase en el masthead, el sidebar actualiza sus ítems.

### Subbar/breadcrumb — `.gm-bar`
- Fondo: `--wm-sb-200`, altura 44px, padding 0 28px, font-size 13px
- Crumbs: texto `--wm-ns-500`, hover subrayado azul, activo `--wm-ns-600` bold
- Separador: `--wm-ns-300`

### Área de contenido — `.gm-page`
- Padding: 24px 32px 40px, max-width 1280px
- Page head: título 28px bold + subtítulo 14px muted + acciones a la derecha

### Cards — `.gm-card`
- Fondo blanco, borde 1px `#f0f0f0`, radius 8px (`--radius-sm`), padding 20px
- Variante hover: `box-shadow: var(--shadow-hover)`, translateY(-1px)
- Card title: 16px bold

### Botones — `.gm-btn`
- Shape: pill (`border-radius: 100px`)
- **Primary:** fondo `--wm-sb-400`, texto blanco → hover `--wm-sb-500`
- **Secondary:** fondo blanco, borde/texto negro → hover `--wm-ns-100`
- **Text:** sin fondo, texto subrayado
- **Icon:** circular 36×36px, borde `--wm-ns-200`
- Tamaños: sm (8px 16px, 13px) · default (10px 20px, 14px) · lg (14px 28px, 16px)

### Campos de formulario — `.gm-field`
- Shape: pill (100px radius), altura 48px, borde 1.5px `--wm-ns-200`
- Focus/hover: borde `--wm-sb-400`
- Búsqueda inline `.gm-search`: altura 36px, más compacto

### Chips de estado — `.gm-chip`
- Altura 24px, pill shape
- `--active`: borde/texto azul, fondo `--wm-sb-200`
- `--success`: borde/texto verde, fondo `--wm-success-100`
- `--warning`: borde/texto amarillo oscuro, fondo `#fff8e6`
- `--error`: borde/texto rojo, fondo `--wm-error-100`
- `--neutral`: borde/texto gris, fondo `--wm-ns-100`

Los chips de estado `completado / en curso / pendiente / bloqueado` del flujo usan estas variantes: success / active / neutral / error respectivamente.

### Sombras
```
--shadow-card:  0 2px 6px rgba(0,0,0,0.10)
--shadow-hover: 0 4px 14px rgba(0,113,220,0.15)
--shadow-focus: 0 0 0 3px rgba(0,113,220,0.30)
```

---

## Componentes reutilizables

Estos componentes aparecen en múltiples pantallas con la misma estructura. Se definen una sola vez y se reutilizan para generar familiaridad y bajar la carga cognitiva.

**1. Tarjeta de SKU con estado**
Card con: imagen del producto, nombre/SKU, proveedor asignado, chip de estado (variable según pantalla), acciones inline, y hilo de email del proveedor integrado. Aparece en: Muestras, Contramuestras, Validación.

**2. Vista de viaje**
Pantalla con dos estados (activo / cerrado): feed en tiempo real desde app móvil, indicador de progreso/cobertura, y botón de cierre manual. Una vez cerrada queda en modo solo lectura como archivo histórico. Aparece en: Viaje, Negociación.

**3. Panel IA → resultado editable → aprobar**
La IA genera una propuesta (con estado de carga visible), el resultado se muestra en modo editable, y Valentina puede curar, ajustar o solicitar regeneración antes de aprobar. La aprobación tiene consecuencias explícitas (desbloquea el siguiente paso o alimenta el dashboard). Aparece en: Tendencias/Análisis, Percheros, Cierre.

**4. Lista de revisión con feedback + GO global**
Lista de ítems (SKUs, fichas o manuales) con estado por ítem, feedback inline editable, decisión individual (aprobado / requiere ajuste / descartado) y un estado global de GO que se activa cuando todos los ítems están resueltos. Aparece en: Fichas/Revisiones, Manuales (validación marketing), Validación.

**5. Distribución por email con confirmación de recepción**
Una vez que un conjunto de ítems está listo, la plataforma genera los archivos y los envía automáticamente por email a los destinatarios según los datos del line plan. Estado de cada envío: enviado / recibido confirmado. Las confirmaciones pendientes generan alerta en el dashboard. Aparece en: Muestras, Fichas/Revisiones, Manuales.

---

## Features sistémicas (aplican a toda la plataforma)

### 1. Chat → Auto-anotación
La plataforma tiene un sistema de chat interno. Cualquier mención de una prenda, SKU, paso o proveedor en el chat queda automáticamente registrada como anotación en el paso y/o item correspondiente, sin acción manual. Esta feature aplica a todas las pantallas del flujo.

### 2. Email de proveedores integrado
Los correos de proveedores se visualizan dentro de la plataforma. Cada correo queda vinculado automáticamente al paso y al SKU/prenda correspondiente. Los proveedores no tienen acceso a la plataforma — toda la comunicación es vía correo externo. La plataforma lee y clasifica los correos entrantes.

### 3. Sistema de alertas accionable
Las alertas son accionables desde cualquier pantalla donde aparezcan: Valentina puede resolver o descartar directamente, sin navegar a otra pantalla. El sistema visual de alertas es consistente con el flujo de gestión existente de la plataforma. Tres tipos de alerta:
- **Retraso:** un paso lleva demasiado tiempo sin actividad
- **Rechazo / modificación requerida:** una ficha, muestra u output fue rechazado o requiere ajuste
- **Pendiente crítico:** item sin resolver que bloquea el avance (ej: confirmación de recepción sin registrar)

### 4. Proveedores internos Walmart
Existe un tipo de proveedor interno de Walmart que podría tener pantallas propias en el futuro. Por ahora se tratan igual que los externos (comunicación por email). Pendiente de desarrollo.

---

## Mapa de pantallas

El flujo se organiza en 4 fases más el dashboard global. La navegación muestra las fases; al expandir una fase se ven los pasos dentro. El **Inicio** (dashboard) queda fuera de las fases — es la vista global de la temporada.

### Navegación

**Inicio** (dashboard global)

**Fase 1 — Investigación**
- Tendencias *(pestañas: Análisis · Wishlist)*
- Viaje

**Fase 2 — Diseño**
- Colección
- Muestras
- Fichas *(pestañas: Libro Base · Revisiones)*

**Fase 3 — Materiales** *(nombre placeholder — pendiente de definir)*
- Percheros
- KV
- Contramuestras
- Manuales

**Fase 4 — Producción**
- Negociación
- Cierre
- Validación

---

### Tabla de referencia

| Nombre en menú | Contenido | Dispositivo |
|---|---|---|
| Inicio | Dashboard de producción | 💻 |
| Tendencias → Análisis | Análisis de tendencias (loading + resultados) | 💻 |
| Tendencias → Wishlist | Lista de referencia de compras | 💻 + 📱 |
| Viaje | Viaje de tendencias | 💻 + 📱 |
| Colección | Line plan + paleta de color | 💻 |
| Muestras | Envío de muestras a proveedores | 💻 |
| Fichas → Libro Base | Fichas técnicas por SKU | 💻 |
| Fichas → Revisiones | Revisión y validación con equipo comercial | 💻 |
| Percheros | Draft de colección para negociación | 💻 |
| KV | Key Visual de campaña (coordinación Marketing) | 💻 |
| Contramuestras | Galería de imágenes de contramuestras | 💻 |
| Manuales | Manuales pallets/PDQ + packaging | 💻 |
| Negociación | Validación y negociación en origen (China) | 💻 + 📱 |
| Cierre | Entrega final + CATEX | 💻 |
| Validación | Validación de muestras (fits → PP sample → Shipment) | 💻 |

---

## Pantallas — Especificación detallada

---

### 0. Dashboard de producción
**Dispositivo:** 💻 Plataforma

**Propósito:** Vista general del estado de la temporada activa. Es el punto de entrada al flujo completo. Valentina llega acá primero y desde acá navega al paso activo.

**Contenido:**

**Header de temporada:**
- Nombre de la temporada activa
- Semana en curso y fecha de inicio

**Indicador "Quién tiene la pelota" (sección prominente):**
- Muestra el responsable bloqueante en este momento exacto del flujo
- Opciones: Diseño / Comprador / Proveedor / Marketing / Externo
- Incluye descripción corta del motivo: "Esperando contramuestras de proveedores", "Comprador en proceso de revisión", "Pendiente de aprobación de marketing", etc.
- Se actualiza automáticamente según el estado de los pasos

**Timeline de los 10 pasos:**
- Representación horizontal de los 10 pasos del flujo
- Cada paso con chip de estado: `completado` / `en curso` / `pendiente` / `bloqueado`
- Click en un paso navega directamente a esa pantalla

**Panel de alertas accionables:**
- Lista de alertas activas del sistema (retrasos, rechazos, pendientes críticos)
- Cada alerta tiene acción inline: resolver o descartar sin salir del dashboard
- Mismo sistema visual que el flujo de gestión existente

**Resumen rápido (métricas clave):**
- Fichas técnicas: X completadas / Y total
- Muestras enviadas: X / Y total
- Próximo hito: nombre + fecha estimada

**CTA al paso activo:**
- Acceso directo al paso que está en curso en este momento

**Datos que necesita:**
- Estado de cada paso (viene del sistema de pasos)
- Responsable bloqueante actual (inferido del estado de cada paso)
- Alertas activas generadas por el sistema
- Contadores de fichas y muestras
- Calendario de hitos (generado y aprobado en P1a)

**Notas:**
- El calendario de la temporada se genera en P1a y desde ahí alimenta este dashboard
- Las alertas deben ser visualmente idénticas a las del flujo de gestión existente de la plataforma

---

### 1a. Análisis de tendencias
**Dispositivo:** 💻 Plataforma

**Propósito:** Visualización del análisis automático de tendencias generado por el sistema a partir de fuentes externas. Valentina revisa, edita y aprueba el resultado. No hay carga manual de datos.

**Dos estados de la misma pantalla:**

**Estado 1 — Procesando:**
Pantalla activa mientras el backend corre el análisis. Informa en tiempo real qué está haciendo el sistema:
- Fuentes consultadas: WGSN API, scraping de tendencias, historial de ventas internas
- Progreso por etapa (barra o steps secuenciales): recopilando datos → analizando → generando reporte → generando moodboards
- Tiempo estimado restante

**Estado 2 — Resultados:**
Informe visual completo. Todas las secciones son editables y curables por Valentina antes de aprobar:

- **Colores recomendados:** paleta visual de swatches con justificación cuantitativa por color (dato de ventas históricas, tendencia de mercado). Valentina puede eliminar colores o agregar variantes
- **Telas / materiales:** tarjetas por material con contexto de tendencia y performance histórico de ventas. Editables
- **Prendas:** siluetas y categorías a priorizar con justificación de datos. Editables
- **Patrones:** los más relevantes para la temporada con referencias visuales. Editables
- **Licencias / IPs:** IPs detectadas con potencial (películas, series, eventos, música) con calendario de lanzamientos relevantes. Editables
- **Moodboards × 3:** uno por categoría — básicos permanentes / de temporada / innovación. Generados por IA. Valentina puede solicitar regeneración por categoría individualmente o curar elementos del moodboard
- **Calendario de lanzamientos y hitos:** generado automáticamente con fechas de la temporada. Valentina ajusta fechas antes de aprobar. Una vez aprobado, este calendario se sincroniza con el dashboard y queda fijo

**Acciones de Valentina:**
- Editar/curar cualquier sección del informe
- Solicitar regeneración de un moodboard individual
- Ajustar fechas del calendario
- Aprobar el informe completo (acción irreversible que fija el calendario en el dashboard y desbloquea P1b)

**Dependencia bloqueante para P1b:**
- Antes de que se genere la wishlist, el comprador debe revisar y aprobar este informe y asignar un presupuesto de compra. Ver `compradores.md`

**Outputs:**
- Informe de tendencias aprobado → alimenta P1b y P3
- Calendario de temporada aprobado → alimenta el dashboard
- Moodboards aprobados → referencia visual para todo el flujo

**Datos que necesita:**
- WGSN API (tendencias globales)
- Scraping de tendencias (configurado en backend)
- Historial de ventas interno de la plataforma
- Resultados de temporadas anteriores (para contexto comparativo)

---

### 1b. Wishlist
**Dispositivo:** 💻 Plataforma

**Propósito:** Lista de referencia de ítems a buscar durante el viaje de tendencias. Se genera automáticamente a partir del informe aprobado de P1a y el presupuesto asignado por el comprador. Funciona como guía, no como lista de compras estricta.

**Contenido:**
- Lista de ítems organizados por categoría: telas, licencias, prendas, accesorios, etc.
- Cada ítem tiene: descripción, referencia visual (imagen o swatch cuando aplica), categoría, nivel de prioridad (must-have / nice-to-have / explorar), presupuesto estimado, notas adicionales
- Vista ordenable por categoría o por prioridad
- Contador de ítems por sección y presupuesto acumulado por categoría
- Presupuesto total asignado por el comprador visible como referencia
- Los ítems se marcan como "cubiertos" automáticamente cuando se registra una compra relacionada en P2 (sin acción manual de Valentina)
- Cuando todos los ítems de una categoría quedan cubiertos, esa sección se cierra automáticamente
- La wishlist queda completamente cerrada cuando el viaje se cierra en P2

**Acciones de Valentina:**
- Curar y ajustar ítems sugeridos por la IA
- Agregar ítems manualmente
- Cambiar prioridades
- Marcar ítems como descartados (no se comprarán)

**Dependencia bloqueante:**
- Requiere que el comprador haya aprobado P1a y asignado presupuesto de compra. Ver `compradores.md`

**Outputs:**
- Wishlist activa → sirve como guía de referencia durante P2

**Datos que necesita:**
- Informe aprobado de P1a (categorías, licencias, materiales, prendas prioritarias)
- Presupuesto total asignado por el comprador (input externo)

---

### 2. Viaje de tendencias
**Dispositivo:** 💻 Plataforma (esta sección); 📱 App móvil (ver sección de pantallas móviles)

**Propósito:** Vista en la plataforma del registro en tiempo real del viaje. Recibe datos de la app móvil. Valentina no opera activamente esta pantalla durante el viaje — el contenido lo genera la app. Al volver, cierra el viaje manualmente.

**Dos estados de la misma pantalla:**

**Estado activo (durante el viaje):**
- Feed en tiempo real de ítems registrados desde la app móvil
- Cada ítem muestra: foto de la compra, atributos de diseño extraídos automáticamente (tipo de tela, colores detectados, patrones, etc.), costo registrado, fecha y lugar, ítem de wishlist correspondiente que cubre (si aplica)
- Indicador de cobertura de la wishlist en tiempo real (qué categorías van cubiertas)
- Acumulado de gasto vs. presupuesto asignado
- Botón "Cerrar viaje" — única acción disponible en plataforma durante el viaje

**Estado cerrado (post-viaje):**
- Misma información en modo solo lectura
- El registro queda como archivo histórico de ese viaje — no editable
- Valentina activa el cierre manualmente con el botón "Cerrar viaje"

**Acciones de Valentina:**
- Ver detalle de ítem individual
- Cerrar el viaje (acción manual, una vez por viaje)

**Outputs:**
- Registro de compras → alimenta P3 y P4
- Wishlist auto-cerrada según cobertura de ítems

**Datos que necesita:**
- Feed en tiempo real desde la app móvil (P2 app)
- Wishlist activa de P1b (para mapear cobertura)
- Presupuesto asignado (para mostrar gasto vs. presupuesto)

**Nota comprador:** La vista del comprador para este paso (registro tipo excel de gastos, presupuesto detallado) se documenta en `compradores.md`

---

### 3. Definición de colección + paleta de color
**Dispositivo:** 💻 Plataforma

**Propósito:** Construcción del line plan de colección incluyendo paleta de color Pantone. El contenido se pre-popula desde P1a y Valentina ajusta. Todo lo más visual posible — evitar tablas salvo cuando la densidad de información lo requiera.

**Contenido:**

**Line plan:**
- Pre-populado desde el informe de tendencias de P1a como propuesta
- Representación visual de la colección: cada prenda/SKU como una unidad visual con imagen o referencia, atributos como chips/tags (categoría, window, proveedor, precio), y paleta de color asignada inline
- *Nota de implementación: evaluar cards vs. tabla según la densidad de información al construir — ambas opciones son válidas para este contenido*
- Organizado por categoría (básicos permanentes / de temporada / innovación) y por ventana de entrada

**Paleta de color integrada:**
- Swatches Pantone por categoría, integrados dentro del line plan (no en sección separada)
- Cada prenda vinculada visualmente a los colores de su categoría
- Códigos Pantone editables con selector de color

**Calendario de ingresos:**
- Timeline visual por ventana de entrada (1st window, 2nd window, 3rd window, permanent)
- Prendas posicionadas en su ventana correspondiente, movibles drag-and-drop

**Lineamientos de exhibición:**
- Notas e imágenes de referencia por formato de exhibición
- Proveedores asignados como chip/tag por prenda

**Acciones de Valentina:**
- Ajustar cualquier campo del line plan
- Agregar o quitar prendas/SKUs
- Asignar o cambiar colores Pantone
- Mover prendas entre ventanas en el calendario
- Aprobar la colección → dispara P4 y P5a

**Dependencia bloqueante:**
- El comprador debe aprobar este paso antes de avanzar. Ver `compradores.md` (la vista del comprador puede incluir más tablas y datos comerciales)

**Outputs:**
- Line plan aprobado → lista de SKUs que alimenta P4, P5a, y P7
- Paleta de color aprobada → pre-llena las fichas técnicas en P5a
- Calendario de ingresos → alimenta el dashboard y P9a

**Datos que necesita:**
- Informe de tendencias aprobado de P1a
- Registro de compras del viaje de P2
- Colores Pantone confirmados

---

### 4. Envío de muestras a proveedores
**Dispositivo:** 💻 Plataforma

**Propósito:** Registro y seguimiento del envío de muestras originales a proveedores para el desarrollo de contramuestras. Proceso principalmente manual, con soporte de registro fotográfico y comunicación por email integrado.

**Contenido:**
- Galería de muestras a enviar, generada automáticamente desde el line plan de P3 (una card por prenda/proveedor)
- Cada card incluye:
  - Foto de la muestra (subida por Valentina)
  - Nombre de la prenda / SKU
  - Proveedor asignado
  - Estado de la muestra: `pendiente envío` / `enviado` / `recibido confirmado`
  - Notas de la prenda (manuales + auto-capturadas desde el chat interno)
  - Hilo de correo del proveedor correspondiente, visible inline en la card

**Cómo se registra la confirmación de recepción:**
- El proveedor responde por correo al recibir la muestra
- El correo entra a la plataforma a través de la integración de email sistémica
- El correo queda vinculado automáticamente a la card de la prenda correspondiente
- Valentina marca la card como "recibido confirmado" o el sistema lo detecta del contenido del correo

**Acciones de Valentina:**
- Subir foto de la muestra a enviar (por card)
- Marcar card como "enviado"
- Agregar notas por prenda
- Ver hilo de correo del proveedor inline

**Outputs:**
- Checklist de envíos completo → habilita avance a P5a y P7

**Datos que necesita:**
- Line plan aprobado de P3 (lista de prendas y proveedores asignados)
- Integración de email de proveedores (sistémica)

---

### 5a. Fichas técnicas
**Dispositivo:** 💻 Plataforma

**Propósito:** Módulo de creación y gestión de fichas técnicas por SKU, integrado al chrome y design system de la plataforma. Las fichas se pre-llenan con IA y Valentina confirma o ajusta.

**Vista principal — Lista de fichas:**
- Lista de todos los SKUs provenientes del line plan de P3
- Estado por ficha: `sin iniciar` / `en progreso` / `completa` / `rechazada`
- Indicador de progreso general: X fichas completadas de Y total
- Backlog de fichas pendientes organizado y visible
- La ficha individual abre desde esta lista

**Vista de ficha individual:**

La ficha se integra al chrome de la plataforma (sin masthead propio). La ficha actual `fichawalmart.html` es la base — se mantiene su estructura y funcionalidad existente, con los siguientes ajustes:

- **Tipos de ficha:** tres tipos con selector visible. Solo **Libro Base** está activo. **DTR** (Disney y otras licencias) y **BTS** (Back to School) aparecen como botones desactivados con etiqueta "en desarrollo".
- **Pre-llenado por IA:** los siguientes campos se pre-llenan automáticamente con datos de pasos anteriores: marca, temporada, diseñadora, window, composición de materiales sugerida (desde P1a), colores (desde paleta de P3), proveedor. Valentina confirma o ajusta cada campo.
- **Sistema de callouts sobre imagen:** funcionalidad ya existente en la ficha — se mantiene.
- **Layout:** la ficha debe ocupar bien el espacio disponible de la pantalla. El espacio lateral se utiliza para el panel de navegación de fichas (lista de SKUs con estados), que permanece visible mientras se edita una ficha individual.
- **Export PDF:** funcionalidad ya existente — se mantiene.

**Acciones de Valentina:**
- Crear o abrir ficha por SKU
- Editar campos pre-llenados
- Agregar callouts sobre imagen de prenda
- Marcar ficha como completa
- Exportar ficha individual a PDF
- Cambiar entre tipo Walmart y Disney

**Outputs:**
- Fichas técnicas completas → alimentan P5b (revisiones), P6 (distribución a proveedores), y P7

**Datos que necesita:**
- Line plan aprobado de P3 (SKUs, atributos, proveedores, ventanas)
- Paleta de color aprobada de P3
- Informe de tendencias de P1a (composición de materiales sugerida)

---

### 5b. Revisiones y validación de fichas
**Dispositivo:** 💻 Plataforma

**Propósito:** Revisión de las fichas Libro Base completadas en P5a con el equipo comercial. Valentina recibe feedback consolidado por SKU, hace los ajustes necesarios, y la colección queda aprobada o con pendientes antes de pasar a producción. DTR y BTS están excluidos de esta pantalla hasta que se activen.

**Dos momentos dentro de la misma pantalla:**

**Primera revisión:**
- Lista de fichas completadas en P5a con el feedback del comprador ya cargado por SKU
- Cada ficha muestra: estado de revisión (`sin revisión` / `con feedback` / `ajustado` / `aprobado`), comentarios del comprador consolidados, lista de ajustes requeridos por ítem, y decisión de continuidad sugerida: `continúa` / `requiere ajuste` / `se descarta`
- Valentina entra a cada ficha a hacer los cambios indicados directamente desde esta vista

**Revisión final:**
- Una vez hechos los ajustes, la colección vuelve al comprador para aprobación final
- Estado por SKU: `aprobado` / `pendiente de ajuste`
- Estado global de la colección: GO (todas las fichas aprobadas) o pendiente
- La aprobación global desbloquea P6 y P7

**Acciones de Valentina:**
- Ver feedback por ficha
- Entrar a editar una ficha con pendientes directamente desde esta pantalla
- Marcar ajuste como resuelto
- Ver estado general de aprobación de la colección

**Distribución integrada (reemplaza P6):**
Una vez que la colección tiene GO global, aparece una acción de distribución: "Distribuir fichas aprobadas". La plataforma genera los PDFs automáticamente y los envía por email a cada proveedor según el proveedor asignado en el line plan. El estado de cada envío queda visible inline: `enviado` / `recibido confirmado`. Las confirmaciones de recepción pendientes generan una alerta en el dashboard. No hay pantalla separada para este proceso.

**Outputs:**
- Fichas técnicas Libro Base validadas y distribuidas → alimentan P7a y P7d

**Datos que necesita:**
- Fichas completadas de P5a
- Feedback del comprador (ver `compradores.md`)
- Emails de proveedores asignados (desde line plan de P3)

---

### 7a. Draft de colección (percheros)
**Dispositivo:** 💻 Plataforma

**Propósito:** Propuesta visual de la colección organizada para preparar la negociación con proveedores en origen, pre-viaje China. La plataforma genera el draft automáticamente desde el line plan y las fichas técnicas. Valentina edita lo que sea necesario.

**Contenido:**
- Vista visual de la colección organizada como percheros: prendas agrupadas por categoría y ventana de entrada, con imagen de referencia de cada SKU
- Cada percha muestra: imagen del producto, SKU, proveedor, precio target, colores disponibles
- Organización ajustable: Valentina puede reordenar prendas, cambiar agrupaciones y modificar cualquier dato
- La IA genera la propuesta inicial de organización basándose en el line plan y las fichas; Valentina curada sobre eso
- Vista exportable para compartir con el equipo comercial y llevar como referencia al viaje

**Acciones de Valentina:**
- Reordenar y reagrupar prendas
- Editar datos de cualquier SKU en la vista
- Exportar el draft (PDF o imagen) para distribución

**Outputs:**
- Draft de colección aprobado → referencia para la negociación en P8

**Datos que necesita:**
- Line plan aprobado de P3
- Fichas técnicas completadas de P5a
- Imágenes de producto disponibles

---

### 7b. KV de campaña
**Dispositivo:** 💻 Plataforma

**Propósito:** Coordinación con Marketing para recibir el Key Visual (KV) de campaña y los lineamientos gráficos que servirán de base para el desarrollo de manuales de pallets, PDQ y packaging en P7d. Es un punto de entrada de un actor externo (Marketing) con su propio momento de alineación.

**Contenido:**
- Espacio para recibir y visualizar el KV de campaña enviado por Marketing
- Registro de lineamientos gráficos derivados del KV: paleta de colores de campaña, tipografía, estilo gráfico, assets disponibles
- Assets base descargables para usar en P7d
- Estado de alineación: `esperando KV` / `KV recibido` / `lineamientos confirmados`
- Hilo de comunicación con Marketing visible inline (email integrado)

**Acciones de Valentina:**
- Cargar o recibir el KV desde Marketing
- Registrar y confirmar los lineamientos gráficos
- Marcar la alineación como confirmada → desbloquea P7d

**Dependencia bloqueante para P7d:**
- Los manuales no pueden desarrollarse sin el KV confirmado

**Outputs:**
- KV y lineamientos gráficos confirmados → alimentan P7d

**Datos que necesita:**
- KV de campaña enviado por Marketing (vía email o carga directa)

---

### 7c. Galería de imágenes de contramuestras
**Dispositivo:** 💻 Plataforma

**Propósito:** Solicitud, seguimiento y organización de imágenes en alta calidad de las contramuestras enviadas por los proveedores. Las imágenes se usan como insumo visual para los manuales de P7d.

**Contenido:**
- Galería organizada por SKU: cada SKU del line plan tiene un slot para su imagen de contramuestra
- Estado por SKU: `imagen pendiente` / `imagen recibida` / `imagen aprobada`
- Las imágenes llegan por email de los proveedores y quedan vinculadas automáticamente al SKU correspondiente (email integration sistémica)
- Valentina puede revisar la calidad de cada imagen y solicitar reenvío si no es apta para los manuales
- Indicador de cobertura general: X de Y SKUs con imagen lista

**Acciones de Valentina:**
- Solicitar imagen a proveedor por SKU (dispara email automático)
- Revisar y aprobar imagen recibida
- Rechazar imagen y solicitar reenvío con indicaciones de calidad
- Marcar imagen como lista para usar en manuales

**Outputs:**
- Galería de imágenes HQ aprobadas por SKU → alimentan P7d

**Datos que necesita:**
- Lista de SKUs del line plan de P3
- Emails de proveedores (integración sistémica)

---

### 7d. Manuales pallets/PDQ + packaging
**Dispositivo:** 💻 Plataforma

**Propósito:** Desarrollo de los manuales de exhibición (pallets y PDQ) y de packaging dentro de la plataforma, con generación de mockups asistida por IA. Incluye validación de Marketing y distribución final a proveedores y merchants.

**Contenido:**

**Manuales de pallets y PDQ:**
- Constructor de manuales dentro de la plataforma
- Tipos de propuesta: productos permanentes, modulares, de temporada y campañas
- La IA genera mockups visuales usando las imágenes de contramuestras de P7c y los lineamientos del KV de P7b: simulación de exhibición en tienda, combinaciones de producto por pallet/PDQ
- Valentina revisa, edita combinaciones, ajusta el orden y la presentación
- El manual generado va a revisión de Marketing antes de distribuirse

**Manuales de packaging:**
- Constructor de manuales de packaging por formato y categoría
- La IA propone estructura de contenido y estandariza formatos basándose en los lineamientos del KV
- Valentina edita y valida

**Flujo de validación y distribución:**
1. Draft de manual generado por IA → revisado y editado por Valentina
2. Enviado a Marketing para aprobación → feedback inline (mismo sistema de revisión que P5b)
3. Manual aprobado por Marketing → se distribuye automáticamente a proveedores y merchants vía email
4. Confirmación de recepción visible inline por destinatario

**Acciones de Valentina:**
- Iniciar generación de manual por tipo
- Editar mockups y combinaciones
- Enviar a revisión de Marketing
- Ajustar según feedback
- Aprobar y distribuir

**Outputs:**
- Manuales de pallets/PDQ validados y distribuidos → referencia para P8 y P9
- Manuales de packaging distribuidos → listos para cotización con proveedores

**Datos que necesita:**
- Imágenes de contramuestras aprobadas de P7c
- KV y lineamientos gráficos de P7b
- Line plan de P3 (combinaciones de producto, categorías, formatos)

---

### 8. Validación y negociación en origen (China)
**Dispositivo:** 💻 Plataforma + 📱 App móvil (ver sección de pantallas móviles)

**Propósito:** Registro de las decisiones y ajustes tomados durante el viaje a proveedores en China. Valentina opera desde el celular en terreno; los cambios se reflejan en tiempo real en la plataforma. No se genera documentación separada — el historial de cambios en las fichas es el registro oficial del viaje.

**Dos estados de la misma pantalla:**

**Estado activo (durante el viaje):**
- Lista de fichas organizadas por sesión de revisión, con estado por ficha: `pendiente revisión` / `revisada con cambios` / `revisada sin cambios` / `descartada`
- Cambios recientes visibles inline por ficha: qué campo se modificó, valor anterior vs. nuevo, hora del cambio
- Indicador de avance: X de Y fichas revisadas
- Lista de pendientes abiertos: ítems que aún no tienen decisión cerrada
- Los cambios entran desde la app móvil; la plataforma los muestra en tiempo real

**Estado cerrado (post-viaje):**
- Valentina cierra el viaje manualmente desde la app o la plataforma
- Vista de solo lectura con historial completo de cambios por ficha
- Funciona como acta implícita del viaje — no requiere documento adicional

**Acciones de Valentina:**
- Ver estado y cambios por ficha
- Cerrar el viaje (acción manual, una vez)

**Outputs:**
- Fichas actualizadas con decisiones de origen → alimentan P9a
- Historial de cambios por ficha → referencia permanente

**Datos que necesita:**
- Fichas técnicas de P5a/P5b (base para edición)
- Feed en tiempo real desde la app móvil

---

### 9a. Entrega final de colección
**Dispositivo:** 💻 Plataforma

**Propósito:** Consolidación y envío de la propuesta final de colección al equipo comercial al cierre del viaje de China. La plataforma genera automáticamente los entregables desde las fichas actualizadas; Valentina confirma antes de enviar.

**Contenido:**

**Percheros finales:**
- Generados automáticamente por la IA desde las fichas actualizadas post-P8
- Mismo formato visual que el draft de P7a, con los datos ya corregidos según las decisiones de China
- Organizados por ventana de entrada, categoría y formato
- Valentina revisa y edita si es necesario antes de aprobar

**Lineamiento de seguimiento:**
- Generado automáticamente por la IA a partir de los pendientes abiertos al cierre de P8: ítems sin resolver, cambios que requieren acción futura, confirmaciones pendientes de proveedores
- Valentina revisa, ajusta y confirma
- No requiere redacción desde cero — es una síntesis estructurada del estado real de la colección

**Acciones de Valentina:**
- Revisar y editar percheros generados
- Revisar y confirmar lineamiento de seguimiento
- Aprobar y enviar ambos al equipo comercial desde la plataforma

**Generación de imágenes CATEX:**
- La IA de la plataforma toma los assets de producto existentes (imágenes de contramuestras de P7c e imágenes del viaje de P2) y los aplica sobre modelos predefinidos
- Valentina revisa las imágenes generadas y aprueba o solicita regeneración por ítem
- Las imágenes aprobadas quedan listas para carga en CATEX

**Acciones de Valentina:**
- Revisar y editar percheros generados
- Revisar y confirmar lineamiento de seguimiento
- Aprobar imágenes CATEX o solicitar regeneración
- Aprobar y enviar percheros + lineamiento al equipo comercial desde la plataforma

**Outputs:**
- Percheros finales + lineamiento de seguimiento → enviados al equipo comercial
- Imágenes CATEX aprobadas → listas para carga
- Colección cerrada → referencia para P10

**Datos que necesita:**
- Fichas actualizadas post-P8
- Lista de pendientes abiertos de P8
- Calendario de ventanas de entrada de P3
- Imágenes de contramuestras de P7c
- Imágenes del viaje de P2
- Modelos predefinidos para CATEX (assets fijos de la plataforma)

---

### 10a. Validación de fits, materiales, trims y packaging
**Dispositivo:** 💻 Plataforma

**Propósito:** Registro de los resultados de validación física de muestras por SKU y por etapa. Valentina tiene la muestra en la mano y registra desde el computador. La plataforma no reemplaza la validación física — la documenta y organiza.

**Contenido:**
- Vista organizada por SKU, con etapas de validación como pasos secuenciales dentro de cada uno
- Etapas por SKU: Fit 1 / Fit 2 / Materiales y colores / Gráficos y estampados / Trims y accesorios / Packaging y etiquetas
- Cada etapa tiene estado: `pendiente` / `aprobado` / `requiere ajuste`
- En caso de ajuste: campo de comentarios, opción de adjuntar foto de referencia, y lista de cambios requeridos
- Estado global por SKU: `en proceso` / `GO` / `pendiente ajuste`
- Vista de progreso general: cuántos SKUs tienen GO en cada etapa

**Acciones de Valentina:**
- Marcar etapa como aprobada o con ajustes
- Agregar comentarios y fotos de referencia por etapa
- Ver historial de iteraciones por SKU (si una etapa tuvo ajustes y se volvió a revisar)

**Etapas de validación por SKU:**
Fit 1 → Fit 2 → Materiales y colores → Gráficos y estampados → Trims y accesorios → Packaging y etiquetas → **PP sample** → **Shipment sample**

Las dos últimas etapas (PP sample y Shipment sample) tienen una confirmación más explícita antes de registrar el GO, dado el peso de la decisión: PP sample habilita el inicio de producción masiva y Shipment sample habilita el despacho.

**Outputs:**
- Registro completo de validaciones por SKU
- GO de PP sample → habilita producción masiva
- OK de Shipment sample → habilita despacho. Muestra aprobada queda como estándar de referencia para showroom y tiendas

**Datos que necesita:**
- Lista de SKUs del line plan de P3
- Fichas técnicas actualizadas post-P8 (referencia de specs a validar)
