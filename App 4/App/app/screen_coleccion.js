/* GM — Colección (Fase 2). Tabs: Básicos permanentes · De temporada · Innovación
   Layout: sidebar izquierdo con stats/filtros + grid de cards
   → window.GMScreens.Coleccion */
(function () {
  const e = React.createElement;
  const I = window.GMIcon;
  const { Chip, Btn, ProdImg, PageHead, AdvanceBar, CHIP, CLP } = window.GMUI;

  // Tipo y grupo por SKU — grupo = categoría principal, tipo = subcategoría
  const TIPO = {
    "MJ-3101": { tipo: "Polera",       grupo: "Tops" },
    "MJ-3104": { tipo: "Jeans",        grupo: "Bottoms" },
    "MJ-3122": { tipo: "Vestido midi", grupo: "Vestidos" },
    "MJ-3140": { tipo: "Blusa",        grupo: "Tops" },
    "MJ-3155": { tipo: "Short",        grupo: "Bottoms" },
    "MJ-3162": { tipo: "Bikini",       grupo: "Swimwear" },
    "MJ-3170": { tipo: "Falda",        grupo: "Bottoms" },
    "MJ-3187": { tipo: "Blazer",       grupo: "Tops" },
    "MJ-3201": { tipo: "Maxi vestido", grupo: "Vestidos" },
    "MJ-3210": { tipo: "Top crop",     grupo: "Tops" },
    "MJ-3218": { tipo: "Pantalón",     grupo: "Bottoms" },
    "MJ-3099": { tipo: "Calza",        grupo: "Deportiva" },
  };

  // Taxonomía: categorías principales → subcategorías
  const TAXONOMY = {
    "Tops":      ["Polera", "Blusa", "Blazer", "Top crop"],
    "Bottoms":   ["Jeans", "Pantalón", "Short", "Falda", "Calza"],
    "Vestidos":  ["Vestido midi", "Maxi vestido"],
    "Swimwear":  ["Bikini"],
    "Deportiva": ["Calza"],
  };
  const GRUPOS = Object.keys(TAXONOMY);

  const GRUPO_COLOR = {
    "Tops":      "var(--wm-sb-400)",
    "Bottoms":   "var(--wm-success-500)",
    "Vestidos":  "#a78bfa",
    "Swimwear":  "#22d3ee",
    "Deportiva": "#f472b6",
  };

  const PROV_SHORT = { p1: "Ningbo", p2: "Jiangsu", p3: "Hangzhou", p4: "Tex. Andina", p5: "Shantou" };

  const pantoneHex = (code) => {
    for (const g of Object.values(GM.palettes)) {
      const f = g.colors.find((c) => c.code === code);
      if (f) return f.hex;
    }
    return "#ccc";
  };

  // mini progress bar used in sidebar
  function StatBar({ pct, color }) {
    return e("div", { style: { height: 5, borderRadius: 4, background: "var(--wm-ns-100)", overflow: "hidden", flex: 1 } },
      e("div", { style: { height: "100%", width: pct + "%", background: color || "var(--wm-sb-400)", borderRadius: 4, transition: "width .4s" } }));
  }

  // filter pill button
  function FPill({ active, onClick, children }) {
    return e("button", {
      onClick,
      style: {
        padding: "3px 10px", borderRadius: 20, fontSize: 11.5,
        fontWeight: active ? 700 : 500, border: "none",
        background: active ? "var(--wm-sb-400)" : "var(--wm-ns-100)",
        color: active ? "#fff" : "var(--wm-ns-500)",
        cursor: "pointer", fontFamily: "inherit",
      },
    }, children);
  }

  // ---- Product card ----
  function SkuCard({ sku }) {
    const t = TIPO[sku.id] || { tipo: "Prenda", grupo: "Otros" };
    const prov = GM.providers[sku.prov];
    const [fichaV, fichaL]   = CHIP[sku.ficha]   || ["neutral", sku.ficha];
    const [muestraV, muestraL] = CHIP[sku.muestra] || ["neutral", sku.muestra];

    return e("div", { className: "gm-card gm-col-card" },
      // color strip
      e("div", { className: "gm-col-card__strip" },
        sku.colors.map((code) =>
          e("div", { key: code, title: code, className: "gm-col-card__strip-dot", style: { background: pantoneHex(code) } }))),

      // product image placeholder
      e(ProdImg, { swatch: sku.swatch, style: { width: "100%", height: 148, borderRadius: 0 } }),

      // card meta
      e("div", { className: "gm-col-card__meta" },
        e("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 } },
          e("div", { style: { flex: 1, minWidth: 0 } },
            e("div", { style: { fontSize: 10.5, fontWeight: 700, color: "var(--wm-ns-300)", letterSpacing: ".03em", textTransform: "uppercase" } }, sku.id),
            e("div", { style: { fontSize: 13.5, fontWeight: 700, color: "var(--wm-ns-600)", lineHeight: 1.25, marginTop: 2 } }, sku.name)),
          e("div", { style: { fontSize: 15, fontWeight: 800, color: "var(--wm-sb-500)", fontVariantNumeric: "tabular-nums", flex: "0 0 auto" } }, CLP(sku.price))),
        e("div", { style: { fontSize: 11.5, color: "var(--wm-ns-300)", display: "flex", alignItems: "center", gap: 4, marginTop: 5 } },
          e(I.truck, { size: 12 }), prov ? prov.name : sku.prov),
        e("div", { style: { display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8 } },
          e(Chip, { variant: fichaV, label: "Ficha: " + fichaL }),
          e(Chip, { variant: muestraV, label: muestraL }),
          e("span", { className: "gm-tag", style: { fontSize: 10.5 } }, t.tipo))));
  }

  // ---- Left sidebar ----
  function Sidebar({ t, allSkus, tabSkus, grupoF, tipoF, ventanaF, provF, setGrupo, setTipo, setVentana, setProv }) {
    const total = allSkus.length;
    const catData = [
      { key: "basicos",    label: "Básicos",   color: "var(--wm-sb-400)" },
      { key: "temporada",  label: "Temporada", color: "var(--wm-success-500)" },
      { key: "innovacion", label: "Innovación",color: "#a78bfa" },
    ];

    const grupoBreak = GRUPOS
      .map((g) => ({ g, n: tabSkus.filter((s) => TIPO[s.id]?.grupo === g).length }))
      .filter((x) => x.n > 0);

    const tabProvs = [...new Set(tabSkus.map((s) => s.prov))];

    // subcategorías disponibles en tab actual (para el grupo seleccionado si hay)
    const subtypes = grupoF
      ? TAXONOMY[grupoF].filter((sub) => tabSkus.some((s) => TIPO[s.id]?.grupo === grupoF && TIPO[s.id]?.tipo === sub))
      : [];

    return e("aside", { className: "gm-col-sidebar" },
      // ── Line plan global ──
      e("div", { className: "gm-col-sidebar__section" },
        e("div", { className: "gm-col-sidebar__label" }, "Line plan · Total"),
        e("div", { style: { fontSize: 26, fontWeight: 800, lineHeight: 1, marginBottom: 12 } }, total + " SKUs"),
        catData.map((c) => {
          const n   = allSkus.filter((s) => s.cat === c.key).length;
          const pct = Math.round((n / total) * 100);
          return e("div", { key: c.key, style: { marginBottom: 9 } },
            e("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 11.5, marginBottom: 3 } },
              e("span", { style: { color: "var(--wm-ns-400)", fontWeight: 600 } }, c.label),
              e("span", { style: { fontWeight: 700, color: "var(--wm-ns-500)", fontVariantNumeric: "tabular-nums" } }, n + " · " + pct + "%")),
            e(StatBar, { pct, color: c.color }));
        })),

      // ── Pestaña activa ──
      e("div", { className: "gm-col-sidebar__section" },
        e("div", { className: "gm-col-sidebar__label" }, "Esta pestaña · " + tabSkus.length + " SKUs"),
        e("div", { style: { display: "flex", flexDirection: "column", gap: 7 } },
          grupoBreak.map(({ g, n }) => {
            const pct2 = Math.round((n / tabSkus.length) * 100);
            return e("div", { key: g },
              e("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 11.5, marginBottom: 3 } },
                e("span", { style: { color: "var(--wm-ns-400)", fontWeight: 600 } }, g),
                e("span", { style: { fontWeight: 700, color: "var(--wm-ns-500)", fontVariantNumeric: "tabular-nums" } }, n + " · " + pct2 + "%")),
              e(StatBar, { pct: pct2, color: GRUPO_COLOR[g] }));
          }))),

      // ── Filtro: categoría de prenda ──
      e("div", { className: "gm-col-sidebar__section" },
        e("div", { className: "gm-col-sidebar__label" }, "Categoría"),
        e("div", { style: { display: "flex", flexWrap: "wrap", gap: 5 } },
          e(FPill, { active: grupoF === null, onClick: () => { setGrupo(null); setTipo(null); } }, "Todas"),
          GRUPOS.map((g) => {
            if (!tabSkus.some((s) => TIPO[s.id]?.grupo === g)) return null;
            return e(FPill, { key: g, active: grupoF === g,
              onClick: () => { setGrupo(grupoF === g ? null : g); setTipo(null); } }, g);
          })),
        // subcategorías (solo si hay grupo seleccionado y hay más de 1 subtipo)
        grupoF && subtypes.length > 1 && e("div", { style: { marginTop: 8, paddingTop: 8, borderTop: "1px solid var(--wm-ns-100)" } },
          e("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--wm-ns-300)", marginBottom: 6 } },
            "Tipo de prenda"),
          e("div", { style: { display: "flex", flexWrap: "wrap", gap: 5 } },
            e(FPill, { active: tipoF === null, onClick: () => setTipo(null) }, "Todos"),
            subtypes.map((sub) =>
              e(FPill, { key: sub, active: tipoF === sub, onClick: () => setTipo(tipoF === sub ? null : sub) }, sub))))),

      // ── Filtro: ventana ──
      e("div", { className: "gm-col-sidebar__section" },
        e("div", { className: "gm-col-sidebar__label" }, "Ventana"),
        e("div", { style: { display: "flex", flexWrap: "wrap", gap: 5 } },
          e(FPill, { active: ventanaF === null, onClick: () => setVentana(null) }, "Todas"),
          Object.entries(GM.win).map(([k, label]) => {
            if (!tabSkus.some((s) => s.win === k)) return null;
            return e(FPill, { key: k, active: ventanaF === k, onClick: () => setVentana(ventanaF === k ? null : k) }, label);
          }))),

      // ── Filtro: proveedor ──
      e("div", { className: "gm-col-sidebar__section" },
        e("div", { className: "gm-col-sidebar__label" }, "Proveedor"),
        e("div", { style: { display: "flex", flexWrap: "wrap", gap: 5 } },
          e(FPill, { active: provF === null, onClick: () => setProv(null) }, "Todos"),
          tabProvs.map((p) =>
            e(FPill, { key: p, active: provF === p, onClick: () => setProv(provF === p ? null : p) }, PROV_SHORT[p] || p)))));
  }

  // ---- Line plan summary banner ----
  // Muestra la composición del line plan: total SKUs + desglose por categoría + barra de composición por tipo de prenda
  function LinePlanBanner({ allSkus }) {
    const total = allSkus.length;

    const grupoData = GRUPOS
      .map((g) => ({ g, n: allSkus.filter((s) => TIPO[s.id]?.grupo === g).length, color: GRUPO_COLOR[g] }))
      .filter((x) => x.n > 0);

    const cats = [
      { label: "Básicos permanentes", n: allSkus.filter((s) => s.cat === "basicos").length,    color: "var(--wm-sb-400)" },
      { label: "De temporada",        n: allSkus.filter((s) => s.cat === "temporada").length,  color: "var(--wm-success-500)" },
      { label: "Innovación",          n: allSkus.filter((s) => s.cat === "innovacion").length, color: "#a78bfa" },
    ].map((c) => ({ ...c, pct: Math.round((c.n / total) * 100) }));

    return e("div", { className: "gm-card", style: { padding: "16px 20px", marginBottom: 16, display: "flex", alignItems: "stretch", gap: 0 } },

      // bloque: total
      e("div", { style: { display: "flex", flexDirection: "column", justifyContent: "center", paddingRight: 22, flex: "0 0 auto" } },
        e("div", { style: { fontSize: 32, fontWeight: 800, lineHeight: 1, fontVariantNumeric: "tabular-nums", color: "var(--wm-ns-600)" } }, total),
        e("div", { style: { fontSize: 11.5, fontWeight: 700, color: "var(--wm-ns-400)", marginTop: 4 } }, "SKUs totales")),

      // divisor
      e("div", { style: { width: 1, alignSelf: "stretch", background: "var(--wm-ns-100)", margin: "0 4px" } }),

      // bloque: tipo de prenda + barra
      e("div", { style: { flex: 1, paddingInline: 20, display: "flex", flexDirection: "column", gap: 8, justifyContent: "center" } },
        e("div", { style: { fontSize: 10, fontWeight: 700, color: "var(--wm-ns-300)", letterSpacing: ".05em", textTransform: "uppercase" } }, "Por tipo de prenda"),
        e("div", { style: { display: "flex", flexWrap: "wrap", gap: "4px 16px" } },
          grupoData.map(({ g, n, color }) =>
            e("div", { key: g, style: { display: "flex", alignItems: "center", gap: 6 } },
              e("div", { style: { width: 8, height: 8, borderRadius: "50%", background: color, flex: "0 0 auto" } }),
              e("span", { style: { fontSize: 12.5, fontWeight: 700, color: "var(--wm-ns-600)", fontVariantNumeric: "tabular-nums" } }, n),
              e("span", { style: { fontSize: 12, color: "var(--wm-ns-400)" } }, g)))),
        // barra de composición
        e("div", { style: { display: "flex", height: 8, borderRadius: 8, overflow: "hidden", gap: 1 } },
          grupoData.map(({ g, n, color }) =>
            e("div", { key: g, title: g + ": " + n, style: { flex: n, background: color, minWidth: n ? 2 : 0 } })))),

      // divisor
      e("div", { style: { width: 1, alignSelf: "stretch", background: "var(--wm-ns-100)", margin: "0 4px" } }),

      // bloque: por categoría
      e("div", { style: { paddingLeft: 20, flex: "0 0 auto", minWidth: 200, display: "flex", flexDirection: "column", gap: 6, justifyContent: "center" } },
        e("div", { style: { fontSize: 10, fontWeight: 700, color: "var(--wm-ns-300)", letterSpacing: ".05em", textTransform: "uppercase", marginBottom: 2 } }, "Por categoría"),
        cats.map((c) =>
          e("div", { key: c.label, style: { display: "flex", alignItems: "center", gap: 8 } },
            e("div", { style: { display: "flex", alignItems: "center", gap: 4, width: 120 } },
              e("div", { style: { width: 7, height: 7, borderRadius: "50%", background: c.color, flex: "0 0 auto" } }),
              e("span", { style: { fontSize: 11.5, fontWeight: 600, color: "var(--wm-ns-400)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, c.label)),
            e("div", { style: { flex: 1, height: 5, borderRadius: 4, background: "var(--wm-ns-100)", overflow: "hidden", minWidth: 40 } },
              e("div", { style: { height: "100%", width: c.pct + "%", background: c.color, borderRadius: 4 } })),
            e("div", { style: { fontSize: 11.5, fontWeight: 800, color: "var(--wm-ns-500)", fontVariantNumeric: "tabular-nums", width: 34, textAlign: "right" } }, c.pct + "%")))));
  }

  // ---- Main ----
  function Coleccion({ go, tab }) {
    const t = (tab === "temporada" || tab === "innovacion") ? tab : "basicos";
    const [grupoF,   setGrupo]   = React.useState(null);
    const [tipoF,    setTipo]    = React.useState(null);
    const [ventanaF, setVentana] = React.useState(null);
    const [provF,    setProv]    = React.useState(null);
    const [approved, setApproved] = React.useState(false);

    // reset filters on tab switch
    const prevTab = React.useRef(t);
    React.useEffect(() => {
      if (prevTab.current !== t) { prevTab.current = t; setGrupo(null); setTipo(null); setVentana(null); setProv(null); }
    }, [t]);

    const allSkus = GM.skus;
    const tabSkus = allSkus.filter((s) => s.cat === t);
    let filtered  = tabSkus;
    if (grupoF)   filtered = filtered.filter((s) => TIPO[s.id]?.grupo === grupoF);
    if (tipoF)    filtered = filtered.filter((s) => TIPO[s.id]?.tipo === tipoF);
    if (ventanaF) filtered = filtered.filter((s) => s.win === ventanaF);
    if (provF)    filtered = filtered.filter((s) => s.prov === provF);

    const TABS = [
      { key: "basicos",    label: "Básicos permanentes" },
      { key: "temporada",  label: "De temporada" },
      { key: "innovacion", label: "Innovación" },
    ];
    const hasFilter = grupoF || tipoF || ventanaF || provF;

    return e("div", { className: "gm-page gm-fade", style: { paddingBottom: 80 } },
      PageHead({
        title: "Colección",
        subtitle: "Fase 2 · Diseño — line plan PV26 · " + allSkus.length + " SKUs",
        actions: e("div", { style: { display: "flex", gap: 8 } },
          e(Btn, { variant: "ghost", icon: "download" }, "Exportar"),
          e(Btn, { variant: "secondary", icon: "plus" }, "Nuevo SKU")),
      }),

      e(LinePlanBanner, { allSkus }),

      e("div", { className: "gm-tabs" },
        TABS.map((tb) =>
          e("button", { key: tb.key, className: "gm-tab" + (t === tb.key ? " is-active" : ""), onClick: () => go("coleccion", tb.key) },
            tb.label,
            e("span", { style: { marginLeft: 6, fontSize: 11, fontWeight: 600, color: t === tb.key ? "var(--wm-sb-400)" : "var(--wm-ns-300)" } },
              allSkus.filter((s) => s.cat === tb.key).length)))),

      e("div", { className: "gm-col-layout" },
        e(Sidebar, { t, allSkus, tabSkus, grupoF, tipoF, ventanaF, provF, setGrupo, setTipo, setVentana, setProv }),

        e("div", { style: { flex: 1, minWidth: 0 } },
          hasFilter && e("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 12 } },
            e("span", { style: { fontSize: 12.5, color: "var(--wm-ns-400)" } }, filtered.length + " resultado" + (filtered.length !== 1 ? "s" : "")),
            e("button", { onClick: () => { setGrupo(null); setTipo(null); setVentana(null); setProv(null); },
              style: { fontSize: 12, color: "var(--wm-sb-500)", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, padding: 0 } },
              "Limpiar filtros ×")),

          filtered.length > 0
            ? e("div", { className: "gm-col-grid" },
                filtered.map((sku) => e(SkuCard, { key: sku.id, sku })))
            : e("div", { style: { padding: "60px 0", textAlign: "center", color: "var(--wm-ns-300)" } },
                e("div", { style: { fontSize: 15 } }, "Sin SKUs con los filtros actuales"),
                e("button", { onClick: () => { setGrupo(null); setTipo(null); setVentana(null); setProv(null); },
                  style: { marginTop: 10, fontSize: 13, color: "var(--wm-sb-400)", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" } },
                  "Limpiar filtros")))),

      e(AdvanceBar, { stepId: "coleccion", onComplete: () => setApproved(true), go, completed: approved }));
  }

  window.GMScreens = Object.assign(window.GMScreens || {}, { Coleccion });
})();
