/* GM chrome — navigation config + Masthead, Sidebar, FlowBar.
   Exposes window.GM_NAV and window.GMChrome.{Masthead,Sidebar,FlowBar} */
(function () {
  const I = window.GMIcon;
  const e = React.createElement;

  // ---- Workflow (lives under Moda → Moda Mujer) ----
  const NAV = {
    phases: [
      { no: 1, label: "Investigación", steps: [
        { id: "tendencias", label: "Tendencias", icon: "trend", screen: "tendencias" },
        { id: "viaje", label: "Viaje", icon: "plane", screen: "viaje" },
      ]},
      { no: 2, label: "Diseño", steps: [
        { id: "coleccion", label: "Colección", icon: "layers", screen: "coleccion" },
        { id: "muestras", label: "Muestras", icon: "box", screen: "muestras" },
        { id: "fichas", label: "Fichas", icon: "doc", screen: "fichas" },
      ]},
      { no: 3, label: "Materiales", steps: [
        { id: "contramuestras", label: "Contramuestras", icon: "image", screen: "contramuestras" },
        { id: "manuales",       label: "Manuales",       icon: "doc",   screen: "manuales" },
      ]},
      { no: 4, label: "Producción", steps: [
        { id: "negociacion",      label: "Negociación",      icon: "handshake",     screen: "negociacion" },
        { id: "fichas_revisadas", label: "Fichas revisadas", icon: "doc",           screen: "fichas_revisadas" },
        { id: "validacion",       label: "Validación",       icon: "clipboardCheck", screen: "validacion" },
      ]},
    ],
  };

  const stepNoOf = (id) => (GM.steps.find((s) => s.id === id) || {}).no;
  NAV.phases.forEach((p) => p.steps.forEach((s) => { s.stepNo = stepNoOf(s.id); }));
  const TOTAL_STEPS = GM.steps.length;

  // ---- Product categories (top-nav) ----
  const CATS = [
    { id: "moda", label: "Moda", live: true, subs: [
      { label: "Moda Mujer", live: true, flow: true },
      { label: "Moda Hombre", soon: true },
      { label: "Moda Infantil", soon: true },
      { label: "Moda Baby", soon: true },
      { label: "Calzado", soon: true },
      { label: "Ropa Interior", soon: true },
    ]},
    { id: "casa", label: "Casa", soon: "Q2 2025" },
    { id: "electro", label: "Electro", soon: "Q3 2025" },
    { id: "hardlines", label: "Hardlines", soon: "Q4 2025" },
  ];

  // ---- Global tools (left rail) ----
  const TOOLS = [
    { id: "correo", label: "Correo", icon: "mail", badge: 4 },
    { id: "calendario", label: "Calendario", icon: "calendar" },
    { id: "documentos", label: "Documentos", icon: "doc" },
    { id: "historial", label: "Historial", icon: "clock" },
  ];

  const TOOL_IDS = TOOLS.map((t) => t.id);
  const screenPhase = {};
  NAV.phases.forEach((p) => p.steps.forEach((s) => { screenPhase[s.screen] = p.no; }));
  function phaseOf(screen) {
    if (screen === "inicio" || TOOL_IDS.includes(screen)) return GM.steps.find((s) => s.status === "curso")?.phase || 1;
    return screenPhase[screen] || 1;
  }
  const isWorkflow = (screen) => !!screenPhase[screen];
  const stepStatus = (id) => GM.steps.find((s) => s.id === id)?.status;
  const statusColor = { completado: "var(--wm-success-500)", curso: "var(--wm-sb-400)", pendiente: "var(--wm-ns-200)", bloqueado: "var(--wm-error-500)" };

  NAV.phaseOf = phaseOf;
  NAV.isWorkflow = isWorkflow;
  NAV.TOOL_IDS = TOOL_IDS;
  window.GM_NAV = NAV;

  function Brand() {
    const isApp4 = window.location.pathname.toLowerCase().indexOf('/app 4/app/') !== -1 || window.location.pathname.toLowerCase().indexOf('/app%204/app/') !== -1;
    const isFicha = window.location.pathname.toLowerCase().indexOf('/ficha/') !== -1 || window.location.pathname.toLowerCase().indexOf('/uploads/') !== -1;
    const isProd = window.location.pathname.toLowerCase().indexOf('/producción copy/') !== -1 || window.location.pathname.toLowerCase().indexOf('/producci%c3%b3n%20copy/') !== -1;
    let logoPath = "Img/Logo walmart chile.png";
    if (isApp4 || isFicha) { logoPath = "../../Img/Logo walmart chile.png"; }
    else if (isProd) { logoPath = "../Img/Logo walmart chile.png"; }
    return e("div", { className: "gm-mast__brand" },
      e("img", { src: logoPath, alt: "Walmart Chile", style: { height: "40px", display: "block" } }));
  }

  function FlowFlyout({ screen, go }) {
    return e("div", { className: "gm-mega__sub" },
      e("div", { className: "gm-mega__head" }, "Flujo de trabajo"),
      NAV.phases.map((p) => e(React.Fragment, { key: p.no },
        e("div", { style: { fontSize: 10, fontWeight: 700, color: "var(--wm-sb-400)", padding: "8px 12px 3px", letterSpacing: ".02em" } }, "Fase " + p.no + " · " + p.label),
        p.steps.map((s) => {
          const st = stepStatus(s.id);
          return e("button", { key: s.id, className: "gm-flow-item" + (screen === s.screen ? " is-active" : ""), onClick: () => go(s.screen) },
            e("span", { className: "gm-flow-item__dot", style: { background: statusColor[st] || "var(--wm-ns-200)" } }),
            e(I[s.icon], { size: 16, style: { color: "var(--wm-ns-400)", flex: "0 0 auto" } }),
            e("span", { className: "gm-flow-item__label" }, s.label),
            e("span", { className: "gm-flow-item__step" }, "Paso " + s.stepNo));
        }))));
  }

  // ---------- Masthead ----------
  function Masthead({ screen, go }) {
    const inModa = isWorkflow(screen);
    return e("header", { className: "gm-mast" },
      e(Brand),
      e("nav", { className: "gm-mast__nav" },
        CATS.map((cat) => e("div", { className: "gm-mast__nav-group", key: cat.id },
          e("button", { className: "gm-mast__nav-item" + (cat.id === "moda" && inModa ? " is-active" : "") + (cat.soon ? " is-disabled" : ""),
            onClick: () => { if (cat.live) go("inicio"); } },
            cat.label, e(I.chevron, { size: 14, className: "caret" })),
          e("div", { className: "gm-mega" },
            e("div", { className: "gm-mega__head" }, cat.label),
            cat.subs
              ? cat.subs.map((sub, i) => e("div", { key: i, className: "gm-mega__item" + (sub.live ? " is-active" : "") + (sub.soon ? " is-disabled" : ""),
                  onClick: () => { if (sub.live && !sub.flow) go("inicio"); } },
                  e(I.hanger, { size: 17, style: { flex: "0 0 auto" } }),
                  e("span", { style: { flex: 1 } }, sub.label),
                  sub.soon ? e("span", { className: "gm-mast__soon" }, "próximamente")
                    : sub.flow ? e(I.chevronRight, { size: 16, className: "arr" }) : null,
                  sub.flow && e(FlowFlyout, { screen, go })))
              : e("div", { style: { padding: "6px 12px 10px" } },
                  e("div", { style: { fontSize: 13.5, fontWeight: 600, color: "var(--wm-ns-500)" } }, "Próximamente"),
                  e("div", { style: { fontSize: 12.5, color: "var(--wm-ns-300)", marginTop: 3 } }, "Lanzamiento · " + cat.soon)))))),
      e("div", { className: "gm-mast__search" },
        e(I.search, null),
        e("input", { placeholder: "Buscar prendas, tareas, colecciones…" })),
      e("div", { className: "gm-mast__actions" },
        e("div", { className: "gm-mast__avatar", title: "Renata González · Diseño GM" }, "RG")));
  }

  // ---------- Sidebar (global tools) ----------
  function Sidebar({ screen, go }) {
    return e("aside", { className: "gm-navsidebar" },
      TOOLS.map((t) => e("button", { key: t.id,
        className: "gm-side-item" + (screen === t.id ? " is-active" : ""), onClick: () => go(t.id) },
        e(I[t.icon], { size: 22 }),
        e("span", null, t.label),
        t.badge ? e("span", { className: "gm-side-item__badge" }, t.badge) : null)));
  }

  // ---------- FlowBar — step tracker visible en todo el flujo ----------
  const ALL_STEPS = NAV.phases.flatMap((p) => p.steps);
  const statusColor2 = {
    completado: "var(--wm-success-500)", alerta: "var(--wm-warn-500)",
    bloqueado: "var(--wm-error-500)", curso: "var(--wm-sb-400)", pendiente: "var(--wm-ns-200)",
  };

  function effectiveStatus(stepId, currentScreen) {
    const currentIdx = ALL_STEPS.findIndex((s) => s.screen === currentScreen);
    const thisIdx    = ALL_STEPS.findIndex((s) => s.id === stepId);
    if (currentIdx < 0 || thisIdx < 0) return stepStatus(stepId) || "pendiente";
    if (thisIdx === currentIdx) return "curso";
    if (thisIdx > currentIdx) return "pendiente";
    const thisScreen = ALL_STEPS[thisIdx].screen;
    const screenAlerts = GM.alerts.filter((a) => a.screen === thisScreen);
    if (screenAlerts.some((a) => a.type === "rechazo" || a.type === "retraso")) return "bloqueado";
    if (screenAlerts.length > 0) return "alerta";
    return "completado";
  }

  function FlowBar({ screen, go }) {
    const isHome = screen === "inicio";

    const crumbs = [
      { label: "Inicio", screen: "panel" },
      { label: "Moda", screen: "moda" },
      { label: "Moda Mujer", screen: "moda-mujer" }
    ];

    if (isHome) {
      crumbs.push({ label: GM.season.name });
    } else {
      crumbs.push({ label: GM.season.name, screen: "inicio" });
      const currentStep = ALL_STEPS.find((s) => s.screen === screen);
      if (currentStep) {
        crumbs.push({ label: currentStep.label });
      } else {
        crumbs.push({ label: screen });
      }
    }

    return e("div", { className: "gm-bar" },
      crumbs.map((c, i) => e(React.Fragment, { key: i },
        i > 0 && e("span", { className: "gm-bar__sep" }, "/"),
        c.screen
          ? e("button", { className: "gm-bar__crumb", onClick: () => go(c.screen),
              style: { background: "none", border: "none", font: "inherit", cursor: "pointer", padding: 0 } }, c.label)
          : e("span", { className: "gm-bar__crumb is-active" }, c.label)
      ))
    );
  }

  function FlowTimelineCard({ screen, go }) {
    const steps = GM.steps;
    return e("div", { className: "gm-card", style: { padding: "20px 24px", margin: "16px 24px 0 24px", flexShrink: 0 } },
      e("div", { style: { display: "flex", alignItems: "center", marginBottom: 18 } },
        e("h2", { className: "gm-card__title", style: { margin: 0, fontSize: 15 } }, "Flujo de la temporada"),
        e("span", { style: { marginLeft: 10, fontSize: 12.5, color: "var(--wm-ns-300)" } }, steps.length + " pasos"),
        e("div", { style: { marginLeft: "auto", display: "flex", gap: 14, fontSize: 11.5, color: "var(--wm-ns-400)" } },
          [["Completado", "var(--wm-success-500)"], ["En curso", "var(--wm-sb-400)"], ["Pendiente", "var(--wm-ns-200)"], ["Bloqueado", "var(--wm-error-500)"]].map(([l, c]) =>
            e("span", { key: l, style: { display: "flex", alignItems: "center", gap: 5 } },
              e("span", { style: { width: 8, height: 8, borderRadius: "50%", background: c, display: "inline-block" } }),
              l
            )
          )
        )
      ),
      e("div", { style: { display: "flex", gap: 0, overflowX: "auto", paddingBottom: 6 } },
        steps.map((s, i) => {
          const c = statusColor2[s.status] || "var(--wm-ns-200)";
          const done = s.status === "completado";
          const isActive = s.screen === screen;
          return e("div", { key: s.id, style: { flex: "1 1 0", minWidth: 88, position: "relative", display: "flex", flexDirection: "column", alignItems: "center" } },
            i < steps.length - 1 && e("div", { style: { position: "absolute", top: 17, left: "50%", width: "100%", height: 3, background: done ? "var(--wm-success-500)" : "var(--wm-ns-100)", zIndex: 0 } }),
            e("button", { onClick: () => go(s.screen), title: s.label, style: {
              width: 36, height: 36, borderRadius: "50%", border: "2.5px solid " + (isActive ? "var(--wm-sb-400)" : c), zIndex: 1,
              background: done ? c : "#fff", color: done ? "#fff" : (isActive ? "var(--wm-sb-400)" : c),
              display: "grid", placeItems: "center", fontWeight: 700, fontSize: 13, cursor: "pointer",
              boxShadow: (s.status === "curso" || isActive) ? "0 0 0 4px rgba(0,113,220,.18)" : "none",
              transition: "all 0.15s"
            } },
              done ? "✓" : s.no
            ),
            e("div", { style: { marginTop: 8, fontSize: 11.5, fontWeight: isActive ? 700 : 600, textAlign: "center", color: isActive ? "var(--wm-sb-500)" : (s.status === "pendiente" ? "var(--wm-ns-300)" : "var(--wm-ns-600)"), lineHeight: 1.2 } }, s.label),
            s.status === "curso" && e("span", { className: "gm-chip gm-chip--active", style: { marginTop: 4, fontSize: 9 } }, "En curso"),
            s.status === "bloqueado" && e("span", { className: "gm-chip gm-chip--error", style: { marginTop: 4, fontSize: 9, borderColor: "var(--wm-error-500)", color: "var(--wm-error-500)" } }, "Bloqueado")
          );
        })
      )
    );
  }

  window.GMChrome = { Masthead, Sidebar, FlowBar, FlowTimelineCard };
})();
