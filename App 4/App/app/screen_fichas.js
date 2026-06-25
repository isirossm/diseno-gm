/* GM — Fichas técnicas (Fase 2). Tabs: Fichas · Revisiones
   → window.GMScreens.Fichas */
(function () {
  const e = React.createElement;
  const I = window.GMIcon;
  const { Chip, Btn, ProdImg, Progress, PageHead, AdvanceBar } = window.GMUI;

  const provName = (p) => GM.providers[p].name;

  const TIPO_FICHA = {
    "MJ-3101": "poleras", "MJ-3104": "pantalones", "MJ-3122": "poleras",
    "MJ-3140": "poleras", "MJ-3155": "pantalones", "MJ-3162": "poleras",
    "MJ-3170": "pantalones", "MJ-3187": "poleras",  "MJ-3201": "poleras",
    "MJ-3210": "poleras", "MJ-3218": "pantalones",  "MJ-3099": "pantalones",
  };
  const TIPO_LABEL = { poleras: "Poleras y tops", pantalones: "Pantalones y bottoms" };
  const fichaType  = (s) => TIPO_FICHA[s.id] || "poleras";

  // Alertas de ajuste por ficha en revisión
  const ALERTAS_FB = {
    "MJ-3122": ["Acortar largo 3 cm para ventana 1", "Confirmar firmeza del estampado floral"],
    "MJ-3187": ["Cambiar a mezcla lino-viscosa 70/30", "Ajustar caído de solapa"],
  };

  // ---- Sidebar filter pill ----
  function FPill({ active, onClick, children }) {
    return e("button", { onClick,
      style: { padding: "3px 10px", borderRadius: 20, fontSize: 11.5,
        fontWeight: active ? 700 : 500, border: "none",
        background: active ? "var(--wm-sb-400)" : "var(--wm-ns-100)",
        color: active ? "#fff" : "var(--wm-ns-500)",
        cursor: "pointer", fontFamily: "inherit" } },
      children);
  }

  // ---- LIST SIDEBAR ----
  function ListSidebar({ catF, estadoF, tipoF, setCat, setEstado, setTipo, allSkus }) {
    const total    = allSkus.length;
    const aprobadas = allSkus.filter((s) => s.ficha === "aprobada").length;
    const prog     = allSkus.filter((s) => s.ficha === "en_progreso" || s.ficha === "progreso").length;
    const CATS    = [["basicos","Básicos"],["temporada","Temporada"],["innovacion","Innovación"]];
    const ESTADOS = [
      ["sin_iniciar", "Sin iniciar"],
      ["en_progreso", "En progreso"],
      ["completa",    "Completa"],
      ["en_revision", "En revisión"],
      ["aprobada",    "Aprobada"],
    ];
    const TIPOS   = [["poleras","Poleras y tops"],["pantalones","Pantalones y bottoms"]];
    function Sec({ label, children }) {
      return e("div", { className: "gm-col-sidebar__section" },
        e("div", { className: "gm-col-sidebar__label" }, label),
        e("div", { style: { display: "flex", flexWrap: "wrap", gap: 5 } }, children));
    }
    return e("aside", { className: "gm-col-sidebar" },
      e("div", { className: "gm-col-sidebar__section" },
        e("div", { className: "gm-col-sidebar__label" }, "Progreso general"),
        e("div", { style: { fontSize: 24, fontWeight: 800, lineHeight: 1, marginBottom: 8 } }, aprobadas + "/" + total),
        e(Progress, { value: aprobadas, total }),
        e("div", { style: { fontSize: 11.5, color: "var(--wm-ns-300)", marginTop: 6 } }, prog + " en progreso · " + (total - aprobadas - prog) + " sin iniciar")),
      e(Sec, { label: "Categoría" },
        e(FPill, { active: catF === null, onClick: () => setCat(null) }, "Todas"),
        CATS.map(([k, l]) => e(FPill, { key: k, active: catF === k, onClick: () => setCat(catF === k ? null : k) }, l))),
      e(Sec, { label: "Estado" },
        e(FPill, { active: estadoF === null, onClick: () => setEstado(null) }, "Todos"),
        ESTADOS.map(([k, l]) => {
          if (!allSkus.some((s) => s.ficha === k)) return null;
          return e(FPill, { key: k, active: estadoF === k, onClick: () => setEstado(estadoF === k ? null : k) }, l);
        })),
      e(Sec, { label: "Tipo de prenda" },
        e(FPill, { active: tipoF === null, onClick: () => setTipo(null) }, "Todos"),
        TIPOS.map(([k, l]) => e(FPill, { key: k, active: tipoF === k, onClick: () => setTipo(tipoF === k ? null : k) }, l))));
  }

  // ---- LIST VIEW ----
  function FichaList({ onOpen }) {
    const [catF,    setCat]    = React.useState(null);
    const [estadoF, setEstado] = React.useState(null);
    const [tipoF,   setTipo]   = React.useState(null);
    let filtered = GM.skus;
    if (catF)    filtered = filtered.filter((s) => s.cat === catF);
    if (estadoF) filtered = filtered.filter((s) => s.ficha === estadoF);
    if (tipoF)   filtered = filtered.filter((s) => fichaType(s) === tipoF);
    const hasFilter = catF || estadoF || tipoF;
    return e("div", { className: "gm-fade" },
      e("div", { className: "gm-col-layout" },
        e(ListSidebar, { catF, estadoF, tipoF, setCat, setEstado, setTipo, allSkus: GM.skus }),
        e("div", { style: { flex: 1, minWidth: 0 } },
          hasFilter && e("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 12 } },
            e("span", { style: { fontSize: 12.5, color: "var(--wm-ns-400)" } }, filtered.length + " resultado" + (filtered.length !== 1 ? "s" : "")),
            e("button", { onClick: () => { setCat(null); setEstado(null); setTipo(null); },
              style: { fontSize: 12, color: "var(--wm-sb-500)", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, padding: 0 } },
              "Limpiar filtros ×")),
          e("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12 } },
            filtered.map((s) => e("button", { key: s.id, onClick: () => onOpen(s.id),
              className: "gm-card gm-card--hover",
              style: { padding: 0, overflow: "hidden", textAlign: "left", cursor: "pointer", display: "flex", flexDirection: "column" } },
              e("div", { style: { display: "flex", gap: 12, padding: 12 } },
                e(ProdImg, { swatch: s.swatch, style: { width: 56, height: 56, borderRadius: 8, flex: "0 0 auto" } }),
                e("div", { style: { flex: 1, minWidth: 0 } },
                  e("div", { style: { fontSize: 10.5, fontWeight: 700, color: "var(--wm-sb-400)" } }, s.id),
                  e("div", { style: { fontWeight: 700, fontSize: 13, lineHeight: 1.2, margin: "2px 0 6px" } }, s.name),
                  e("div", { style: { display: "flex", gap: 5, flexWrap: "wrap" } },
                    e(Chip, { k: s.ficha }),
                    ALERTAS_FB[s.id] && e(Chip, { variant: "warning", label: ALERTAS_FB[s.id].length + " ajuste" + (ALERTAS_FB[s.id].length > 1 ? "s" : "") }))))))))));  }

  // ---- EDITOR SIDEBAR ----
  function EditorSidebar({ skuId, setSku, onBack }) {
    const current  = GM.skus.find((x) => x.id === skuId);
    const tipo     = fichaType(current);
    const sameType = GM.skus.filter((s) => fichaType(s) === tipo);
    const [copied, setCopied] = React.useState(null);
    function handleCopy(fromId) { setCopied(fromId); setTimeout(() => setCopied(null), 1800); }
    return e("div", { className: "gm-card", style: { padding: 10, position: "sticky", top: 0, maxHeight: "calc(100vh - 180px)", overflowY: "auto", display: "flex", flexDirection: "column", gap: 0 } },
      e("button", { onClick: onBack, className: "gm-btn gm-btn--text gm-btn--sm", style: { marginBottom: 8 } },
        e(I.chevronLeft, { size: 14 }), "Todas las fichas"),
      e("button", { style: { display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "9px 10px", background: "linear-gradient(100deg,var(--wm-sb-200),#fff)", border: "1px solid #bcdcfb", borderRadius: 8, marginBottom: 10, cursor: "pointer", fontFamily: "inherit" } },
        e("div", { style: { width: 24, height: 24, borderRadius: 6, background: "var(--wm-sb-400)", color: "#fff", display: "grid", placeItems: "center", flex: "0 0 auto" } }, e(I.sparkles, { size: 13 })),
        e("div", { style: { textAlign: "left" } },
          e("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--wm-sb-500)" } }, "Prellenar con IA"),
          e("div", { style: { fontSize: 10.5, color: "var(--wm-ns-300)" } }, "Usa datos del SKU y tendencias"))),
      e("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--wm-ns-300)", padding: "2px 8px 6px" } },
        TIPO_LABEL[tipo] + " · " + sameType.length),
      sameType.map((x) => {
        const isActive = x.id === skuId;
        return e("div", { key: x.id, style: { display: "flex", alignItems: "center", gap: 8, padding: "7px 9px", borderRadius: 8, marginBottom: 2, background: isActive ? "var(--wm-sb-200)" : "transparent" } },
          e("button", { onClick: () => setSku(x.id), style: { flex: 1, display: "flex", alignItems: "center", gap: 8, border: "none", background: "none", cursor: "pointer", textAlign: "left", padding: 0 } },
            e(ProdImg, { swatch: x.swatch, style: { width: 26, height: 26, borderRadius: 6, flex: "0 0 auto" } }),
            e("div", { style: { flex: 1, minWidth: 0 } },
              e("div", { style: { fontSize: 11, fontWeight: 700, color: isActive ? "var(--wm-sb-500)" : "var(--wm-ns-600)" } }, x.id),
              e("div", { style: { fontSize: 10.5, color: "var(--wm-ns-300)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, x.name))),
          !isActive && e("button", { onClick: () => handleCopy(x.id), title: "Copiar ficha de " + x.id,
            style: { flex: "0 0 auto", width: 26, height: 26, border: "1px solid var(--wm-ns-200)", borderRadius: 6, background: copied === x.id ? "var(--wm-success-100)" : "#fff", cursor: "pointer", display: "grid", placeItems: "center", color: copied === x.id ? "var(--wm-success-500)" : "var(--wm-ns-400)", transition: "all .2s" } },
            e(I[copied === x.id ? "check" : "doc"], { size: 12 })),
          e("span", { style: { width: 7, height: 7, borderRadius: "50%", flex: "0 0 auto", background: window.GMUI.DOT[window.GMUI.CHIP[x.ficha][0]] } }));
      }));
  }

  // ---- EDITOR VIEW ----
  function FichaEditor({ skuId, onBack, setSku }) {
    const s = GM.skus.find((x) => x.id === skuId);
    const [complete, setComplete] = React.useState(s.ficha === "completa");
    const isRoot = window.location.pathname.endsWith('Flujo.html');
    const src = (isRoot ? 'App 4/App/ficha/Ficha Técnica.html' : 'ficha/Ficha Técnica.html') + "?embed=1&type=" + fichaType(s);
    return e("div", { className: "gm-fade", style: { display: "grid", gridTemplateColumns: "240px 1fr", gap: 16, alignItems: "start" } },
      e(EditorSidebar, { skuId, setSku, onBack }),
      e("div", { style: { display: "flex", flexDirection: "column", gap: 14 } },
        e("div", { className: "gm-card", style: { padding: 16 } },
          e("div", { style: { display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" } },
            e(ProdImg, { swatch: s.swatch, style: { width: 40, height: 40, borderRadius: 8, flex: "0 0 auto" } }),
            e("div", { style: { flex: 1 } },
              e("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--wm-sb-400)" } }, s.id),
              e("div", { style: { fontSize: 17, fontWeight: 700 } }, s.name),
              e("div", { style: { fontSize: 12, color: "var(--wm-ns-300)", marginTop: 2 } }, TIPO_LABEL[fichaType(s)] + " · " + provName(s.prov))),
            e("div", { style: { display: "flex", gap: 8, alignItems: "center" } },
              e("span", { style: { fontSize: 11.5, color: "var(--wm-ns-300)", display: "flex", alignItems: "center", gap: 5 } }, e(I.sparkles, { size: 13, style: { color: "var(--wm-sb-400)" } }), "Pre-llenada con IA"),
              complete
                ? e(Chip, { variant: "success", label: "Ficha completa", lg: true })
                : e(Btn, { variant: "primary", size: "sm", icon: "check", onClick: () => setComplete(true) }, "Marcar completa")))),
        e("div", { className: "gm-card", style: { padding: 0, overflow: "hidden" } },
          e("iframe", { src, title: "Ficha técnica · " + s.id,
            onLoad: (ev) => { try { const d = ev.target.contentDocument; const h = Math.max(d.body.scrollHeight, d.documentElement.scrollHeight); if (h) ev.target.style.height = (h + 8) + "px"; } catch (_) {} },
            style: { width: "100%", height: 1500, border: "none", display: "block", background: "var(--wm-ns-050)" } }))));
  }

  // ================================================================
  // SHELL
  // ================================================================

  function Fichas({ go }) {
    const [openSku, setOpenSku] = React.useState(null);
    const [approved, setApproved] = React.useState(false);

    return e("div", { className: "gm-page gm-fade", style: { paddingBottom: 80 } },
      PageHead({ title: "Fichas técnicas", subtitle: "Fase 2 · Diseño — pre-llenado con IA, confirmado por Valentina" }),

      openSku
        ? e(FichaEditor, { skuId: openSku, onBack: () => setOpenSku(null), setSku: setOpenSku })
        : e(FichaList, { onOpen: setOpenSku }),

      e(AdvanceBar, { stepId: "fichas", onComplete: () => setApproved(true), go, completed: approved }));
  }

  window.GMScreens = Object.assign(window.GMScreens || {}, { Fichas });
})();
