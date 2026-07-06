/* GM chrome unificado — Gestión + Flujo de Producción
   Expone window.GM_NAV y window.GMChrome.{Masthead, Sidebar, FlowBar, SubBar} */
(function () {
  const I = window.GMIcon;
  const e = React.createElement;

  function GridIcon({ size, color }) {
    return e("svg", { width: size || 16, height: size || 16, viewBox: "0 0 24 24", fill: "none", stroke: color || "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" },
      e("rect", { x: 3, y: 3, width: 7, height: 7 }),
      e("rect", { x: 14, y: 3, width: 7, height: 7 }),
      e("rect", { x: 14, y: 14, width: 7, height: 7 }),
      e("rect", { x: 3, y: 14, width: 7, height: 7 })
    );
  }

  // ---- Flujo de producción (pasos) ----
  const NAV = {
    phases: [
      { no: 1, label: "Investigación", steps: [
        { id: "tendencias", label: "Tendencias", icon: "trend",  screen: "tendencias" },
        { id: "viaje",      label: "Viaje",      icon: "plane",  screen: "viaje" },
      ]},
      { no: 2, label: "Diseño", steps: [
        { id: "coleccion",  label: "Colección",  icon: "layers", screen: "coleccion" },
        { id: "muestras",   label: "Muestras",   icon: "box",    screen: "muestras" },
        { id: "fichas",     label: "Fichas",     icon: "doc",    screen: "fichas" },
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

  // ---- Categorías top-nav ----
  const CATS = [
    { id: "moda", label: "Moda", live: true, subs: [
      { label: "Moda Mujer", live: true },
      { label: "Moda Hombre", soon: true },
      { label: "Moda Infantil", soon: true },
      { label: "Moda Baby", soon: true },
      { label: "Calzado", soon: true },
      { label: "Ropa Interior", soon: true },
    ]},
    { id: "casa", label: "Casa", subs: [
      { label: "Decoración", soon: true },
      { label: "Muebles", soon: true },
      { label: "Mesa y cocina", soon: true },
      { label: "Textil hogar", soon: true },
    ]},
    { id: "electro", label: "Electro", subs: [
      { label: "Línea blanca", soon: true },
      { label: "TV y audio", soon: true },
      { label: "Computación", soon: true },
      { label: "Celulares", soon: true },
    ]},
    { id: "hardlines", label: "Hardlines", subs: [
      { label: "Deportes", soon: true },
      { label: "Herramientas", soon: true },
      { label: "Juguetes", soon: true },
      { label: "Automotriz", soon: true },
      { label: "Mascotas", soon: true },
    ]},
  ];

  // ---- Global tools (sidebar) ----
  const TOOLS = [
    { id: "correo",     label: "Correo",     icon: "mail",     badge: 4 },
    { id: "calendario", label: "Calendario", icon: "calendar" },
    { id: "documentos", label: "Documentos", icon: "doc" },
    { id: "historial",  label: "Historial",  icon: "clock" },
  ];
  const TOOL_IDS = TOOLS.map((t) => t.id);

  // ---- Clasificación de pantallas por modo ----
  const SCREEN_MODE = {
    splash: "bare", login: "bare",
    panel: "gestion", comms: "gestion",
    moda: "gestion", "moda-mujer": "gestion",
    colecciones: "gestion", kpis: "gestion",
    inicio: "flow",
    tendencias: "flow", viaje: "flow", coleccion: "flow",
    muestras: "flow", fichas: "flow",
    contramuestras: "flow", manuales: "flow",
    negociacion: "flow", fichas_revisadas: "flow", validacion: "flow",
    correo: "gestion", calendario: "gestion", documentos: "gestion", historial: "gestion",
  };

  // ---- Breadcrumbs por pantalla de gestión ----
  const BREADCRUMB = {
    panel:            [{ label: "Inicio" }],
    comms:            [{ label: "Inicio", screen: "panel" }, { label: "Comunicaciones" }],
    moda:        [{ label: "Inicio", screen: "panel" }, { label: "Moda" }],
    "moda-mujer":[{ label: "Inicio", screen: "panel" }, { label: "Moda", screen: "moda" }, { label: "Moda Mujer" }],
    colecciones:      [{ label: "Inicio", screen: "panel" }, { label: "Colecciones pasadas" }],
    kpis:             [{ label: "Inicio", screen: "panel" }, { label: "Reportes y KPIs" }],
    correo:           [{ label: "Inicio", screen: "panel" }, { label: "Correo" }],
    calendario:       [{ label: "Inicio", screen: "panel" }, { label: "Calendario" }],
    documentos:       [{ label: "Inicio", screen: "panel" }, { label: "Documentos" }],
    historial:        [{ label: "Inicio", screen: "panel" }, { label: "Historial" }],
  };

  const screenPhase = {};
  NAV.phases.forEach((p) => p.steps.forEach((s) => { screenPhase[s.screen] = p.no; }));
  const isWorkflow = (screen) => !!screenPhase[screen];
  const stepStatus = (id) => GM.steps.find((s) => s.id === id)?.status;
  const statusColor = {
    completado: "var(--wm-success-500)", curso: "var(--wm-sb-400)",
    pendiente: "var(--wm-ns-200)", bloqueado: "var(--wm-error-500)",
  };

  NAV.phaseOf = (screen) => {
    if (TOOL_IDS.includes(screen)) return GM.steps.find((s) => s.status === "curso")?.phase || 1;
    return screenPhase[screen] || 1;
  };
  NAV.isWorkflow = isWorkflow;
  NAV.TOOL_IDS = TOOL_IDS;
  NAV.screenMode = (screen) => SCREEN_MODE[screen] || "gestion";
  window.GM_NAV = NAV;

  // ---- Spark SVG ----
  const SPARK_PATH = "M 62.785 48.529 L 59.162 7.407 C 59.162 3.34 63.905 0 69.874 0 C 75.843 0 80.604 3.34 80.604 7.407 L 76.972 48.529 C 76.564 51.006 73.546 52.916 69.87 52.916 C 66.194 52.916 63.185 51.006 62.785 48.529 Z M 47.689 65.754 C 49.525 62.563 49.384 58.994 47.443 57.405 L 13.706 33.698 C 10.201 31.665 4.939 34.111 1.953 39.296 C -1.043 44.476 -0.511 50.263 2.994 52.296 L 40.345 69.724 C 42.686 70.595 45.858 68.936 47.689 65.754 Z M 92.073 65.754 C 93.909 68.94 97.075 70.595 99.412 69.724 L 136.768 52.296 C 140.286 50.267 140.791 44.476 137.818 39.296 C 134.818 34.111 129.552 31.665 126.051 33.698 L 92.314 57.405 C 90.386 58.994 90.237 62.568 92.073 65.754 Z M 62.785 108.658 L 59.162 149.78 C 59.162 153.851 63.905 157.183 69.874 157.183 C 75.843 157.183 80.604 153.851 80.604 149.78 L 76.972 108.658 C 76.564 106.185 73.546 104.279 69.87 104.279 C 66.194 104.279 63.185 106.181 62.785 108.658 Z M 92.314 99.804 L 126.051 123.494 C 129.547 125.523 134.818 123.067 137.818 117.896 C 140.791 112.712 140.286 106.92 136.768 104.882 L 99.412 87.477 C 97.075 86.597 93.913 88.247 92.073 91.438 C 90.237 94.619 90.386 98.197 92.314 99.804 Z M 40.345 87.472 L 2.994 104.878 C -0.511 106.916 -1.043 112.707 1.953 117.891 C 4.939 123.058 10.201 125.518 13.706 123.489 L 47.443 99.799 C 49.384 98.193 49.525 94.619 47.689 91.433 C 45.853 88.243 42.682 86.588 40.345 87.472 Z";

  function Brand({ go }) {
    const isApp4 = window.location.pathname.toLowerCase().indexOf('/app 4/app/') !== -1 || window.location.pathname.toLowerCase().indexOf('/app%204/app/') !== -1;
    const isFicha = window.location.pathname.toLowerCase().indexOf('/ficha/') !== -1 || window.location.pathname.toLowerCase().indexOf('/uploads/') !== -1;
    const isProd = window.location.pathname.toLowerCase().indexOf('/producción copy/') !== -1 || window.location.pathname.toLowerCase().indexOf('/producci%c3%b3n%20copy/') !== -1;
    let logoPath = "Img/Logo walmart chile.png";
    if (isApp4 || isFicha) {
      logoPath = "../../Img/Logo walmart chile.png";
    } else if (isProd) {
      logoPath = "../Img/Logo walmart chile.png";
    }
    return e("div", { className: "gm-mast__brand", onClick: () => go("panel"), style: { cursor: "pointer" } },
      e("img", { src: logoPath, alt: "Walmart Chile", style: { height: "40px", display: "block" } }));
  }

  // Flyout con flujo de trabajo (dentro de Moda Mujer)
  function FlowFlyout({ screen, go }) {
    return e("div", { className: "gm-mega__sub" },
      e("div", { className: "gm-mega__head" }, "Flujo de trabajo"),
      NAV.phases.map((p) => e(React.Fragment, { key: p.no },
        e("div", { style: { fontSize: 10, fontWeight: 700, color: "var(--wm-sb-400)", padding: "8px 12px 3px", letterSpacing: ".02em" } },
          "Fase " + p.no + " · " + p.label),
        p.steps.map((s) => {
          const st = stepStatus(s.id);
          return e("button", { key: s.id, className: "gm-flow-item" + (screen === s.screen ? " is-active" : ""), onClick: () => go(s.screen) },
            e("span", { className: "gm-flow-item__dot", style: { background: statusColor[st] || "var(--wm-ns-200)" } }),
            e(I[s.icon], { size: 16, style: { color: "var(--wm-ns-400)", flex: "0 0 auto" } }),
            e("span", { className: "gm-flow-item__label" }, s.label),
            e("span", { className: "gm-flow-item__step" }, "Paso " + s.stepNo));
        }))));
  }

  // ---- Masthead ----
  function Masthead({ screen, go, profile }) {
    const inFlow     = SCREEN_MODE[screen] === "flow";
    const inModa = inFlow || screen === "moda" || screen === "moda-mujer";

    const showCatNav  = true;
    const canAccessCat = (screenId) => !profile || !profile.allowed || profile.allowed.has(screenId);

    const avatarColor = profile ? profile.color : "var(--wm-sb-400)";
    const initials    = profile ? profile.initials : "GM";
    const fullName    = profile ? profile.name + " · " + profile.role : "Diseño GM";

    const [catMenuOpen, setCatMenuOpen] = React.useState(false);
    const [hoveredCat, setHoveredCat]   = React.useState("moda");
    const catWrapRef = React.useRef(null);

    React.useEffect(() => {
      if (!catMenuOpen) return;
      const handler = (ev) => {
        if (catWrapRef.current && !catWrapRef.current.contains(ev.target)) {
          setCatMenuOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [catMenuOpen]);

    return e("header", { className: "gm-mast" },
      e(Brand, { go }),

      showCatNav && e("nav", { className: "gm-mast__nav" },
        e("div", { className: "gm-mast__nav-wrap", ref: catWrapRef },
          e("button", {
            type: "button",
            style: {
              display: "flex", alignItems: "center", gap: "8px",
              padding: "8px 18px", borderRadius: "9999px",
              border: catMenuOpen ? "2px solid #ffffff" : "2px solid rgba(255, 255, 255, 0.7)",
              background: catMenuOpen ? "#ffffff" : "rgba(255, 255, 255, 0.08)",
              color: catMenuOpen ? "var(--wm-sb-400)" : "#ffffff",
              fontWeight: "700", fontSize: "14px", cursor: "pointer", height: "38px",
              transition: "background 0.15s, color 0.15s, border-color 0.15s",
              fontFamily: "var(--font-sans)"
            },
            onClick: () => setCatMenuOpen(!catMenuOpen)
          },
            e(GridIcon, { size: 16, color: catMenuOpen ? "var(--wm-sb-400)" : "#ffffff" }),
            e("span", null, "Categorías")
          ),
          catMenuOpen && e("div", {
            className: "gm-mast__submenu",
            style: {
              position: "absolute", top: "calc(100% + 6px)", left: 0,
              display: "flex", padding: 0, background: "#ffffff",
              borderRadius: "12px", border: "1px solid var(--wm-ns-200)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.16)",
              zIndex: 300, overflow: "hidden", minWidth: "520px",
              opacity: 1, visibility: "visible", transform: "translateY(0)"
            }
          },
            e("div", { style: { width: "200px", borderRight: "1px solid var(--wm-ns-100)", background: "#fcfcfd", padding: "8px 0" } },
              CATS.map((area) => {
                const isActive = hoveredCat === area.id;
                return e("div", {
                  key: area.id,
                  onMouseEnter: () => setHoveredCat(area.id),
                  onClick: () => { if (area.id === "moda") { setCatMenuOpen(false); go("inicio"); } },
                  style: {
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "10px 16px", cursor: "pointer",
                    background: isActive ? "var(--wm-sb-200)" : "transparent",
                    color: isActive ? "var(--wm-sb-500)" : "var(--wm-ns-600)",
                    fontWeight: isActive ? "700" : "500", fontSize: "13.5px",
                    transition: "background 0.1s, color 0.1s"
                  }
                },
                  e("span", null, area.label),
                  e("span", { style: { fontSize: "12px", opacity: isActive ? 1 : 0.4 } }, "›")
                );
              })
            ),
            e("div", { style: { flex: 1, padding: "12px 16px", minWidth: "300px", display: "flex", flexDirection: "column", gap: "4px" } },
              e("div", { style: { fontSize: "10.5px", fontWeight: "700", color: "var(--wm-ns-400)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: "6px", paddingLeft: "8px" } }, hoveredCat.toUpperCase()),
              ((CATS.find((c) => c.id === hoveredCat) || {}).subs || []).map((sub, idx) => {
                const isSubAllowed = canAccessCat(sub.live ? "moda-mujer" : hoveredCat);
                const isSubDisabled = sub.soon || !isSubAllowed;
                return e("a", {
                  key: idx, href: "#",
                  style: {
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "8px 12px", borderRadius: "6px", textDecoration: "none",
                    color: isSubDisabled ? "var(--wm-ns-300)" : "var(--wm-ns-600)",
                    fontSize: "13px", fontWeight: "500", background: "transparent",
                    pointerEvents: isSubDisabled ? "none" : "auto",
                    transition: "background 0.1s, color 0.1s"
                  },
                  onClick: (ev) => { ev.preventDefault(); setCatMenuOpen(false); if (sub.live) go("inicio"); }
                },
                  e("span", null, sub.label, !isSubAllowed && " 🔒"),
                  sub.soon
                    ? e("span", { style: { fontSize: "9.5px", fontWeight: "700", padding: "2px 7px", borderRadius: "20px", background: "var(--wm-ns-100)", color: "var(--wm-ns-400)", lineHeight: 1 } }, "próximamente")
                    : e("span", { style: { color: "var(--wm-sb-400)", fontSize: "14px" } }, "›")
                );
              })
            )
          )
        )
      ),

      e("div", { className: "gm-mast__search" },
        e(I.search, null),
        e("input", { placeholder: "Buscar prendas, tareas, colecciones…" })),

      e("div", { className: "gm-mast__actions" },
        e("div", {
          className: "gm-mast__avatar",
          title: fullName,
          style: { background: avatarColor, cursor: "pointer" },
          onClick: () => go("login"),
        }, initials)));
  }

  // ---- Sidebar (global tools) ----
  function Sidebar({ screen, go, profile }) {
    const canSee = (id) => !profile || !profile.allowed || profile.allowed.has(id);
    return e("aside", { className: "gm-navsidebar" },
      TOOLS.map((t) => {
        const accessible = canSee(t.id);
        return e("button", { key: t.id,
          className: "gm-side-item" + (screen === t.id ? " is-active" : "") + (!accessible ? " is-disabled" : ""),
          style: accessible ? null : { opacity: 0.4, pointerEvents: "none" },
          onClick: () => accessible && go(t.id) },
          e(I[t.icon], { size: 22 }),
          e("span", null, t.label),
          t.badge && accessible ? e("span", { className: "gm-side-item__badge" }, t.badge) : null);
      }));
  }

  // ---- SubBar (breadcrumb, solo en pantallas de gestión) ----
  function SubBar({ screen, go }) {
    const crumbs = BREADCRUMB[screen] || [{ label: screen }];
    return e("div", { className: "gm-bar" },
      crumbs.map((c, i) => e(React.Fragment, { key: i },
        i > 0 && e("span", { className: "gm-bar__sep" }, "/"),
        c.screen
          ? e("button", { className: "gm-bar__crumb", onClick: () => go(c.screen),
              style: { background: "none", border: "none", font: "inherit", cursor: "pointer" } }, c.label)
          : e("span", { className: "gm-bar__crumb is-active" }, c.label))),
      e("div", { className: "gm-bar__spacer" }),
      e("div", { className: "gm-bar__meta" },
        e(I.calendar, { size: 14 }),
        GM.season.name + " · Semana " + GM.season.weekNo + "/" + GM.season.weekTotal));
  }

  // ---- FlowBar (barra de pasos del flujo de producción) ----
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

  function FlowBar({ screen, go, profile }) {
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
    return e("div", {
      style: {
        display: "flex", alignItems: "center", gap: 0,
        padding: "0 24px", height: 38,
        background: "var(--wm-ns-050)",
        borderBottom: "1px solid var(--wm-ns-100)",
        overflowX: "auto", flexShrink: 0,
        fontFamily: "var(--font-sans)",
      }
    },
      steps.map((s, i) => [
        i > 0 && e("span", { key: "sep-" + s.id, style: { color: "var(--wm-ns-200)", fontSize: 13, padding: "0 6px", userSelect: "none" } }, "/"),
        e("button", {
          key: s.id,
          onClick: () => go(s.screen),
          style: {
            background: "none", border: "none", cursor: "pointer",
            fontSize: 13,
            fontWeight: s.screen === screen ? 700 : 500,
            color: s.screen === screen ? "var(--wm-sb-500)" : "var(--wm-ns-400)",
            padding: "0 4px", whiteSpace: "nowrap",
            textDecoration: s.screen === screen ? "underline" : "none",
            textUnderlineOffset: "3px",
            transition: "color 0.12s",
          },
          onMouseEnter: (ev) => { if (s.screen !== screen) ev.currentTarget.style.color = "var(--wm-ns-600)"; },
          onMouseLeave: (ev) => { if (s.screen !== screen) ev.currentTarget.style.color = "var(--wm-ns-400)"; },
        }, s.label)
      ])
    );
  }
  window.GMChrome = { Masthead, Sidebar, FlowBar, SubBar, FlowTimelineCard };
})();
