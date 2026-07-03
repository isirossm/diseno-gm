/* Moda Mujer — pantalla de gestión con colecciones y trazabilidad
   El clic en "Verano 25" → go("inicio") entra al flujo de producción
   window.GMScreens.ModaMujer */
(function () {
  const e = React.createElement;
  const I = window.GMIcon;
  const { Btn, AlertList, SeasonIcon, SEASON_THEME, ProgressBar, Chip, TodoList } = window.GMUI;

  const COLLECTIONS = [
    { name: "Primavera–Verano 26", from: "01 nov 25", to: "15 feb 26", pct: 72, active: true,  disabled: false },
    { name: "Invierno 26",         from: "01 feb 26", to: "15 jun 26", pct: 8,  active: false, disabled: true  },
  ];

  const PRENDAS = [
    { name: "Vestidos",   fase: { label: "Contramuestra · Fit 2",  step: 4, total: 6 }, responsable: { name: "Luisa Vera",  role: "DISEÑO",     kind: "int" }, estado: "enCurso",   updated: "hoy 10:42",   note: "Esperando aprobación d… fit final." },
    { name: "Blusas",     fase: { label: "Producción · PP",        step: 5, total: 6 }, responsable: { name: "Trends Co.", role: "PROVEEDOR",  kind: "ext" }, estado: "bloqueada", updated: "hace 1 día", note: "Cambio de tela solicitad… — falta REF-T-" },
    { name: "Pantalones", fase: { label: "Calidad · QA",           step: 5, total: 6 }, responsable: { name: "Pablo Lara",  role: "CALIDAD",    kind: "int" }, estado: "enCurso",   updated: "hoy 09:15",   note: "QA en curso, sin observaciones." },
    { name: "Faldas",     fase: { label: "Calidad · Aprobado",     step: 6, total: 6 }, responsable: { name: "Pablo Lara",  role: "CALIDAD",    kind: "int" }, estado: "completada",updated: "ayer",        note: "Aprobada sin observaciones." },
    { name: "Tops",       fase: { label: "Negociación · Proveedor",step: 3, total: 6 }, responsable: { name: "Jiangsu",    role: "PROVEEDOR",  kind: "ext" }, estado: "enCurso",   updated: "hace 2 días", note: "Tech pack en revisión." },
    { name: "Trajes",     fase: { label: "Diseño · Sketch",        step: 2, total: 6 }, responsable: { name: "Ana Soto",   role: "DISEÑO",     kind: "int" }, estado: "enCurso",   updated: "hace 3 días", note: "Propuestas en revisión interna." },
    { name: "Bikinis",    fase: { label: "Muestras · Enviado",     step: 4, total: 6 }, responsable: { name: "Shantou",    role: "PROVEEDOR",  kind: "ext" }, estado: "enCurso",   updated: "hace 4 días", note: "Muestra en camino, ETA 5 días." },
  ];

  const ESTADO_META = {
    enCurso:    { k: "curso",      dot: true  },
    bloqueada:  { k: "bloqueado",  dot: true  },
    completada: { k: "completado", dot: true  },
  };

  const COL_ALERTS = [
    { level: "crit", title: "Blusas — producción detenida",    desc: "Falta confirmación de telas REF-T-201",  scope: "Blusas" },
    { level: "warn", title: "Vestidos — aprobar muestra final", desc: "Pendiente sign-off de Calidad",         scope: "Vestidos" },
    { level: "warn", title: "Tops — atraso 2 días",            desc: "Tech pack en revisión",                  scope: "Tops" },
  ];

  // -- Fila de prenda en la tabla --
  function PrendaRow({ p, onDetalle }) {
    const m = ESTADO_META[p.estado] || ESTADO_META.enCurso;
    const isExt = p.responsable.kind === "ext";
    return e("tr", null,
      e("td", { style: { fontWeight: 700, paddingLeft: 20 } }, p.name),
      e("td", null,
        e("div", { style: { fontWeight: 700, fontSize: 13, lineHeight: 1.3 } }, p.fase.label),
        e("div", { style: { fontSize: 11, fontWeight: 700, color: "var(--wm-ns-400)", textTransform: "uppercase", letterSpacing: ".04em", marginTop: 2 } },
          "PASO " + p.fase.step + " DE " + p.fase.total)),
      e("td", null,
        e("div", { style: { fontWeight: 700, fontSize: 13 } }, p.responsable.name),
        e("div", { style: { display: "flex", alignItems: "center", gap: 4, marginTop: 2 } },
          isExt && e("span", { style: { fontSize: 10, fontWeight: 700, padding: "1px 5px", borderRadius: 4, background: "var(--wm-warn-100)", color: "var(--wm-warn-500)", letterSpacing: ".03em" } }, "EXT"),
          e("span", { style: { fontSize: 11, fontWeight: 700, color: "var(--wm-sb-400)", textTransform: "uppercase", letterSpacing: ".04em" } }, p.responsable.role))),
      e("td", null, e(Chip, { k: m.k, dot: m.dot })),
      e("td", { style: { color: "var(--wm-ns-400)", fontSize: 12 } }, p.updated),
      e("td", { style: { fontSize: 13, color: "var(--wm-ns-500)", lineHeight: 1.4, maxWidth: 280 } }, p.note),
      e("td", { style: { paddingRight: 20 } },
        e("button", {
          className: "gm-table__action",
          onClick: onDetalle,
          style: { opacity: 1 },
        }, "Ver detalle →")));
  }

  // -- Tarjeta de colección --
  function CollectionCard({ col, onClick }) {
    const theme = SEASON_THEME[col.name] || SEASON_THEME["Primavera–Verano 26"] || SEASON_THEME["Verano 26"];
    return e("div", {
      className: "gm-coll" + (col.disabled ? "" : " gm-coll--clickable"),
      onClick: col.disabled ? undefined : onClick,
      style: col.disabled ? { opacity: 0.6, filter: "grayscale(100%)", cursor: "not-allowed" } : { cursor: "pointer" },
    },
      // Imagen de colección
      e("div", { className: "gm-coll__img", style: (col.name === "Primavera–Verano 26" || col.name === "Verano 26")
        ? { backgroundImage: "url('../../Img/Banner/B_I.png')", backgroundSize: "cover", backgroundPosition: "center center", position: "relative" }
        : col.name === "Invierno 26"
          ? { backgroundImage: "url('../../Img/Banner/B_V.png')", backgroundSize: "cover", backgroundPosition: "center center", position: "relative" }
          : { background: theme.bg, color: theme.fg } },
        col.active && e("span", { className: "gm-coll__img-chip gm-coll__img-chip--active" }, e("span", { className: "gm-coll__img-chip-dot" }), "activa"),
        col.disabled && e("span", { className: "gm-coll__img-chip gm-coll__img-chip--inactive",
          style: { color: "var(--wm-ns-500)", background: "rgba(255,255,255,0.85)" } }, "no activa")),
      // Cuerpo
      e("div", { className: "gm-coll__body" },
        e("div", { className: "gm-coll__head" },
          e("div", null,
            e("h4", { className: "gm-coll__name" }, col.name),
            e("div", { className: "gm-coll__dates" }, col.from + " → " + col.to)),
          e("div", { className: "gm-coll__pct", style: col.disabled ? { color: "var(--wm-ns-400)" } : {} }, col.pct + "%")),
        e(ProgressBar, { pct: col.pct, disabled: col.disabled })));
  }

  function ModaMujer({ go }) {
    const [search, setSearch] = React.useState("");
    const filtered = PRENDAS.filter((p) =>
      !search || p.name.toLowerCase().includes(search.toLowerCase()));

    return e("div", { className: "gm-page gm-fade" },
      // Encabezado
      e("div", { className: "gm-page__head" },
        e("div", null,
          e("h1", { className: "gm-page__title" }, "Moda Mujer"),
          e("p", { className: "gm-page__subtitle" }, "Estado granular de colecciones activas — trazabilidad por prenda")),
        e("div", { className: "gm-page__head-actions" },
          e(Btn, { variant: "secondary", size: "sm" }, "Filtros"),
          e(Btn, { variant: "secondary", size: "sm" }, "Exportar"),
          e(Btn, { variant: "primary",   size: "sm" }, "+ Nueva prenda"))),

      e("div", { style: { display: "flex", flexDirection: "column", gap: 24 } },

        // Colecciones activas
        e("div", null,
          e("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 } },
            e("div", { style: { fontWeight: 700, fontSize: 16 } }, "Colecciones activas"),
            e("button", { onClick: () => go("colecciones"),
              style: { fontSize: 13, color: "var(--wm-sb-400)", background: "none", border: "none", fontFamily: "inherit", cursor: "pointer", fontWeight: 600 } },
              "Ver todas las colecciones")),
          e("div", { style: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 } },
            COLLECTIONS.map((col, i) =>
              e(CollectionCard, { key: i, col,
                onClick: () => go("inicio") })))),  // ← CONEXIÓN CON PRODUCCIÓN

        // Trazabilidad + Alertas
        e("div", { style: { display: "grid", gridTemplateColumns: "1fr 360px", gap: 20, alignItems: "start" } },

          // Tabla de trazabilidad
          e("div", { className: "gm-card", style: { padding: 0 } },
            e("div", { style: { padding: "18px 20px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 } },
              e("div", { style: { display: "flex", alignItems: "center", gap: 12 } },
                e("div", { style: { fontWeight: 700, fontSize: 15 } }, "Trazabilidad por prenda"),
                e("span", { style: { fontSize: 13, color: "var(--wm-ns-400)" } }, filtered.length + " de " + PRENDAS.length + " prendas")),
              e("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
                e("div", { className: "gm-search" },
                  e(I.search, { size: 15 }),
                  e("input", { placeholder: "Buscar prenda…", value: search, onChange: (ev) => setSearch(ev.target.value) })),
                e("button", { style: { fontSize: 13, color: "var(--wm-sb-400)", background: "none", border: "none", fontFamily: "inherit", cursor: "pointer", fontWeight: 600 } }, "Ver todas"))),

            // Filtros activos
            e("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderTop: "1px solid var(--wm-ns-100)", flexWrap: "wrap" } },
              e("span", { style: { fontSize: 12, fontWeight: 700, color: "var(--wm-ns-400)", textTransform: "uppercase", letterSpacing: ".05em" } }, "FILTROS"),
              e("span", { style: { display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 100, fontSize: 12.5, fontWeight: 600, background: "var(--wm-sb-200)", color: "var(--wm-sb-500)", border: "1px solid #bcdcfb" } },
                "Colección: ", e("b", null, "Primavera–Verano 26"),
                e("button", { style: { border: "none", background: "none", cursor: "pointer", color: "inherit", lineHeight: 1, padding: 0, marginLeft: 3 } }, "×")),
              e("span", { style: { display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 100, fontSize: 12.5, fontWeight: 600, background: "var(--wm-sb-200)", color: "var(--wm-sb-500)", border: "1px solid #bcdcfb" } },
                "Estado: ", e("b", null, "3 seleccionados"),
                e("button", { style: { border: "none", background: "none", cursor: "pointer", color: "inherit", lineHeight: 1, padding: 0, marginLeft: 3 } }, "×")),
              e("button", { style: { padding: "3px 10px", borderRadius: 100, fontSize: 12.5, fontWeight: 600, background: "none", border: "1px dashed var(--wm-ns-200)", color: "var(--wm-ns-400)", cursor: "pointer" } }, "+ Agregar"),
              e("button", { style: { fontSize: 12.5, fontWeight: 600, background: "none", border: "none", color: "var(--wm-ns-400)", cursor: "pointer", marginLeft: 4 } }, "Limpiar")),

            // Tabla
            e("div", { style: { overflowX: "auto" } },
              e("table", { className: "gm-table gm-table--trace" },
                e("thead", null,
                  e("tr", null,
                    e("th", { style: { paddingLeft: 20 } }, "Prenda"),
                    e("th", null, "Fase actual"),
                    e("th", null, "Responsable"),
                    e("th", null, "Estado"),
                    e("th", null, "Última act."),
                    e("th", null, "Notas"),
                    e("th", { style: { paddingRight: 20 } }))),
                e("tbody", null,
                  filtered.map((p, i) =>
                    e(PrendaRow, { key: i, p, onDetalle: () => go("inicio") })))))),

          // Alertas de la colección + Tareas pendientes (columna derecha)
          e("div", { style: { display: "flex", flexDirection: "column", gap: 20 } },
            e(AlertList, { items: COL_ALERTS, title: "Alertas de la colección", link: "Ver todas" }),
            e(TodoList, {})
          ))));
  }

  window.GMScreens = window.GMScreens || {};
  window.GMScreens.ModaMujer = ModaMujer;
})();
