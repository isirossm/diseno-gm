/* GM — Tendencias (Fase 1). Tabs: Análisis · Moodboard
   Análisis = dos estados: procesando | resultados (editable → aprobar)
   Distribución: Colores (full) · [Prendas · Telas · Licencias] · Fuentes (full)
   Moodboard = 3 categorías (segmented) con tablero + paleta
   IA panel variation via tweaks.aipanel: "steps" | "bar"
   → window.GMScreens.Tendencias */
(function () {
  const e = React.createElement;
  const I = window.GMIcon;
  const { Chip, Btn, AIPanel, Swatch, Editable, PageHead, CLP, AdvanceBar } = window.GMUI;

  const PROC_STAGES = [
    { label: "Recopilando datos", src: "WGSN API · scraping de tendencias · ventas internas" },
    { label: "Analizando", src: "Cruce con histórico de temporadas anteriores" },
    { label: "Generando reporte", src: "Colores, telas, siluetas, patrones, licencias" },
    { label: "Generando moodboards", src: "3 categorías · básicos / temporada / innovación" },
  ];

  function Processing({ variant, onDone }) {
    const [stage, setStage] = React.useState(0);
    const [pct, setPct] = React.useState(8);
    React.useEffect(() => {
      const t = setInterval(() => setPct((p) => Math.min(100, p + 4)), 120);
      return () => clearInterval(t);
    }, []);
    React.useEffect(() => { setStage(Math.min(PROC_STAGES.length - 1, Math.floor((pct / 100) * PROC_STAGES.length))); if (pct >= 100) { const t = setTimeout(onDone, 500); return () => clearTimeout(t); } }, [pct]);

    return e("div", { className: "gm-card gm-card--pad-lg gm-fade", style: { maxWidth: 720, margin: "10px auto" } },
      e("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 6 } },
        e("div", { style: { width: 40, height: 40, borderRadius: 11, background: "var(--wm-sb-400)", color: "#fff", display: "grid", placeItems: "center" } }, e(I.sparkles, { size: 22 })),
        e("div", null,
          e("div", { style: { fontWeight: 700, fontSize: 17 } }, "Analizando tendencias PV26"),
          e("div", { style: { fontSize: 12.5, color: "var(--wm-ns-300)" } }, "Tiempo estimado restante · " + Math.max(0, Math.round((100 - pct) / 12)) + " min"))),
      e("div", { style: { margin: "18px 0 8px" } },
        e("div", { className: "gm-progress", style: { height: 10 } }, e("div", { className: "gm-progress__fill", style: { width: pct + "%" } })),
        e("div", { style: { textAlign: "right", fontSize: 12, color: "var(--wm-ns-300)", marginTop: 6 } }, pct + "%")),
      variant === "bar"
        ? e("div", { style: { fontSize: 13.5, color: "var(--wm-ns-500)", display: "flex", alignItems: "center", gap: 8, marginTop: 8 } },
            e("span", { className: "gm-spin", style: { width: 14, height: 14, border: "2px solid var(--wm-sb-300)", borderTopColor: "var(--wm-sb-400)", borderRadius: "50%", display: "inline-block" } }),
            PROC_STAGES[stage].label, " — ", e("span", { style: { color: "var(--wm-ns-300)" } }, PROC_STAGES[stage].src))
        : e("div", { style: { display: "flex", flexDirection: "column", gap: 2, marginTop: 14 } },
            PROC_STAGES.map((s, i) => {
              const done = i < stage, active = i === stage;
              return e("div", { key: i, style: { display: "flex", gap: 12, alignItems: "flex-start", padding: "9px 0", opacity: i > stage ? .45 : 1 } },
                e("div", { style: { width: 26, height: 26, flex: "0 0 auto", borderRadius: "50%", display: "grid", placeItems: "center",
                  background: done ? "var(--wm-success-500)" : active ? "var(--wm-sb-400)" : "var(--wm-ns-100)", color: done || active ? "#fff" : "var(--wm-ns-300)" } },
                  done ? e(I.check, { size: 15 }) : active ? e("span", { className: "gm-spin", style: { width: 12, height: 12, border: "2px solid rgba(255,255,255,.5)", borderTopColor: "#fff", borderRadius: "50%" } }) : i + 1),
                e("div", null,
                  e("div", { style: { fontWeight: 600, fontSize: 14 } }, s.label),
                  e("div", { style: { fontSize: 12, color: "var(--wm-ns-300)" } }, s.src)));
            })));
  }

  function Section({ title, count, children, onAdd, style }) {
    return e("div", { className: "gm-card gm-card--pad-lg", style: Object.assign({ display: "flex", flexDirection: "column" }, style) },
      e("div", { style: { display: "flex", alignItems: "center", marginBottom: 14 } },
        e("h3", { className: "gm-card__title" }, title),
        count != null && e("span", { style: { marginLeft: 9, fontSize: 12.5, color: "var(--wm-ns-300)" } }, count),
        onAdd && e("button", { className: "gm-btn gm-btn--text gm-btn--sm", style: { marginLeft: "auto" }, onClick: onAdd }, e(I.plus, { size: 14 }), "Agregar")),
      children);
  }

  // Mini card with image slot (user adds image later), % value tag + justification
  function MiniCard({ name, pct, reason, icon, accent, chip, img }) {
    const ac = accent || "var(--wm-sb-400)";
    const isApp4 = window.location.pathname.toLowerCase().indexOf('/app 4/app/') !== -1 || window.location.pathname.toLowerCase().indexOf('/app%204/app/') !== -1;
    const imgPath = (isApp4 ? "../../Img/" : "Img/") + (img || (name + ".png"));

    return e("div", { style: { border: "1px solid var(--wm-ns-100)", borderRadius: 9, overflow: "hidden", display: "flex", flexDirection: "column", background: "#fff" } },
      // image placeholder — user drops a real image here later
      e("div", { style: { position: "relative", aspectRatio: "4 / 3", background: "var(--wm-ns-050)", overflow: "hidden", display: "grid", placeItems: "center" } },
        e("img", {
          src: imgPath,
          alt: name,
          style: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
          onError: (ev) => {
            ev.target.style.display = "none";
            const parent = ev.target.parentNode;
            const iconPlaceholder = parent.querySelector(".gm-trend-placeholder-icon");
            if (iconPlaceholder) iconPlaceholder.style.display = "block";
            parent.style.background = "repeating-linear-gradient(135deg,var(--wm-ns-050) 0 10px,#fff 10px 20px)";
          }
        }),
        e(I[icon] || I.image, {
          className: "gm-trend-placeholder-icon",
          size: 24,
          style: { color: "var(--wm-ns-300)", display: "none" }
        }),
        // % value tag
        pct != null && e("div", { style: { position: "absolute", top: 8, left: 8, display: "inline-flex", alignItems: "baseline", gap: 2, padding: "4px 9px", borderRadius: 100, background: ac, color: "#fff", fontWeight: 800, fontSize: 13, lineHeight: 1, fontVariantNumeric: "tabular-nums", boxShadow: "0 1px 3px rgba(0,0,0,.18)" } },
          pct, e("span", { style: { fontSize: 9.5, fontWeight: 700, opacity: .85 } }, "%")),
        chip && e("div", { style: { position: "absolute", top: 8, right: 8 } }, e(Chip, { variant: chip[0], label: chip[1] }))),
      // body
      e("div", { style: { padding: "9px 11px 11px", display: "flex", flexDirection: "column", gap: 4 } },
        e("div", { style: { fontWeight: 700, fontSize: 13, lineHeight: 1.25 } }, name),
        reason && e("div", { style: { fontSize: 11, color: "var(--wm-ns-300)", lineHeight: 1.4 } }, reason)));
  }

  const cardGrid = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 };

  /* ===================== ANÁLISIS ===================== */
  function Results({ approved }) {
    const t = GM.trends;
    const [colors, setColors] = React.useState(t.colors);

    const fabricChip = (tr) => tr === "Alta" ? "success" : tr === "Emergente" ? "active" : "neutral";

    return e("div", { className: "gm-fade", style: { display: "flex", flexDirection: "column", gap: 16 } },
      // COLORES — full width
      e(Section, { title: "Colores recomendados", count: colors.length + " colores", onAdd: approved ? null : () => {} },
        e("div", { style: { display: "flex", flexWrap: "wrap", gap: 18 } },
          colors.map((c) => e("div", { key: c.code, style: { display: "flex", flexDirection: "column", gap: 8, width: 150 } },
            e(Swatch, { hex: c.hex, code: c.code, name: c.name, size: 56, onRemove: approved ? null : () => setColors((x) => x.filter((y) => y.code !== c.code)) }),
            e("div", { style: { fontSize: 11.5, color: "var(--wm-ns-400)", lineHeight: 1.4 } }, c.reason))))),

      // PRENDAS · ESTAMPADOS · TELAS · LICENCIAS — four columns, equal height
      e("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16, alignItems: "stretch" } },

        // Prendas
        e(Section, { title: "Prendas a priorizar", count: t.garments.length, style: { height: "100%" } },
          e("div", { style: cardGrid },
            t.garments.map((g) => e(MiniCard, { key: g.name, name: g.name, pct: g.pct, reason: g.reason, icon: "hanger", img: g.img })))),

        // Estampados
        e(Section, { title: "Estampados sugeridos", count: t.patterns.length, style: { height: "100%" } },
          e("div", { style: cardGrid },
            t.patterns.map((p) => e(MiniCard, { key: p.name, name: p.name, pct: p.pct, reason: p.reason, icon: "image", accent: "#5f4b8b", img: p.img })))),

        // Telas / materiales
        e(Section, { title: "Telas / materiales", count: t.fabrics.length, style: { height: "100%" } },
          e("div", { style: cardGrid },
            t.fabrics.map((f) => e(MiniCard, { key: f.name, name: f.name, reason: f.note, icon: "layers", pct: null, img: f.img,
              chip: [fabricChip(f.trend), f.trend] }))),
          e("div", { style: { marginTop: 12, fontSize: 11, color: "var(--wm-ns-400)" } }, "El badge indica nivel de tendencia · performance histórica en cada ficha.")),

        // Licencias / IPs
        e(Section, { title: "Licencias / IPs", count: t.licenses.length, style: { height: "100%" } },
          e("div", { style: cardGrid },
            t.licenses.map((l) => e(MiniCard, { key: l.name, name: l.name, pct: l.pct, reason: l.reason, icon: "sparkles", accent: "#5f4b8b", img: l.img,
              chip: [l.potential === "Alto" ? "success" : "active", l.window] }))))),

      // FUENTES DE INFORMACIÓN — full width
      e(Section, { title: "Fuentes de información", count: t.sources.length + " fuentes · análisis automático" },
        e("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 } },
          t.sources.map((s) => e("div", { key: s.name, style: { border: "1px solid var(--wm-ns-100)", borderRadius: 8, padding: "14px 15px", display: "flex", flexDirection: "column", gap: 9 } },
            e("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
              e("div", { style: { width: 36, height: 36, borderRadius: 9, background: "var(--wm-sb-200)", color: "var(--wm-sb-400)", display: "grid", placeItems: "center", flex: "0 0 auto" } }, e(I[s.icon], { size: 19 })),
              e("div", { style: { fontWeight: 700, fontSize: 14 } }, s.name)),
            e("div", { style: { fontSize: 11.5, color: "var(--wm-ns-300)", lineHeight: 1.45, flex: 1 } }, s.desc),
            e("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginTop: 2 } },
              e(Chip, { variant: s.chip[0], label: s.chip[1] }),
              e("span", { style: { fontSize: 11.5, color: "var(--wm-ns-400)", fontWeight: 600 } }, s.meta))))),
        e("div", { style: { fontSize: 11.5, color: "var(--wm-ns-300)", marginTop: 12, display: "flex", alignItems: "center", gap: 6 } },
          e(I.refresh, { size: 13 }), "Última ejecución hace 3 días · el análisis se reprocesa al actualizar las fuentes.")));
  }

  /* ===================== MOODBOARD ===================== */
  function lum(hex) {
    const c = hex.replace("#", "");
    const r = parseInt(c.substr(0, 2), 16), g = parseInt(c.substr(2, 2), 16), b = parseInt(c.substr(4, 2), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  }
  const labelColor = (hex) => lum(hex) > 0.62 ? "rgba(0,0,0,.55)" : "rgba(255,255,255,.9)";

  const MOODBOARD_IMAGES = {
    mb1: [
      "Básicos Permanente1.jpg",
      "Básicos Permanente2.webp",
      "Básicos Permanente3.webp",
      "Básicos Permanente4.webp",
      "Básicos Permanente5.jpg",
      "Básicos Permanente6.jpg",
      "Básicos Permanente7.jpg"
    ],
    mb2: [
      "Básicos Temporada1.jpg",
      "Básicos Temporada2.jpg",
      "Básicos Temporada3.jpg",
      "Básicos Temporada4.jpg",
      "Básicos Temporada5.jpg",
      "Básicos Temporada6.jpg",
      "Básicos Temporada7.jpg"
    ],
    mb3: [
      "Innovación1.jpg",
      "Innovación2.jpg",
      "Innovación3.jpg",
      "Innovación4.jpg",
      "Innovación5.jpg",
      "Innovación6.jpg",
      "Innovación7.jpg"
    ]
  };

  function Tile({ t, hero, gridArea, imgSrc }) {
    const lc = imgSrc ? "rgba(255, 255, 255, 0.95)" : labelColor(t.c);
    const shadow = imgSrc ? "0 1px 4px rgba(0,0,0,0.8)" : "none";
    return e("div", { style: { gridArea, position: "relative", background: t.c, overflow: "hidden", minHeight: 0 } },
      imgSrc && e("img", {
        src: imgSrc,
        alt: t.label,
        style: { width: "100%", height: "100%", objectFit: "cover", display: "block" }
      }),
      imgSrc && e("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 100%)" } }),
      !imgSrc && e("div", { style: { position: "absolute", inset: 0, display: "grid", placeItems: "center" } },
        e(I.image, { size: hero ? 38 : 22, style: { color: lc, opacity: .18 } })),
      hero && e("div", { style: { position: "absolute", left: 16, bottom: 16, textShadow: shadow } },
        e("div", { style: { fontSize: 9, fontWeight: 800, letterSpacing: ".12em", color: lc, textTransform: "uppercase", opacity: .75, marginBottom: 4 } }, "Hero"),
        e("div", { style: { fontSize: 13, fontWeight: 700, color: lc } }, t.label)),
      !hero && e("div", { style: { position: "absolute", left: 10, bottom: 9, fontSize: 9.5, fontWeight: 700, letterSpacing: ".07em", color: lc, textTransform: "uppercase", opacity: .85, textShadow: shadow } }, t.label));
  }

  function Moodboard({ approved }) {
    const boards = GM.trends.moodboards;
    const [sel, setSel] = React.useState(1);
    const b = boards[sel];

    const [selectedImages, setSelectedImages] = React.useState({
      mb1: MOODBOARD_IMAGES.mb1.slice(0, 5),
      mb2: MOODBOARD_IMAGES.mb2.slice(0, 5),
      mb3: MOODBOARD_IMAGES.mb3.slice(0, 5)
    });

    const isApp4 = window.location.pathname.toLowerCase().indexOf('/app 4/app/') !== -1 || window.location.pathname.toLowerCase().indexOf('/app%204/app/') !== -1;
    const pathPrefix = isApp4 ? "../../Img/Moodboard/" : "Img/Moodboard/";

    const handleRegenerate = () => {
      const allForCat = MOODBOARD_IMAGES[b.id] || [];
      const shuffled = [...allForCat].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 5);
      setSelectedImages(prev => ({
        ...prev,
        [b.id]: selected
      }));
    };

    const currentImages = selectedImages[b.id] || [];

    return e("div", { className: "gm-fade", style: { display: "flex", flexDirection: "column", gap: 20 } },

      // selector de categoría — usa gm-tabs del DS
      e("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 } },
        e("div", { className: "gm-tabs", style: { marginBottom: 0 } },
          boards.map((bd, i) => e("button", { key: bd.id, className: "gm-tab" + (i === sel ? " is-active" : ""), onClick: () => setSel(i) },
            bd.label,
            e("span", { style: { marginLeft: 7, fontSize: 11, fontWeight: 700, color: i === sel ? "var(--wm-sb-400)" : "var(--wm-ns-300)", fontVariantNumeric: "tabular-nums" } }, bd.pct + "%")))),
        !approved && e(Btn, { variant: "ghost", size: "sm", icon: "refresh", onClick: handleRegenerate }, "Regenerar")),

      // board card
      e("div", { className: "gm-card", style: { overflow: "hidden", padding: 0 } },

        // tiles grid
        e("div", { style: {
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)", gridTemplateRows: "180px 140px",
          gridTemplateAreas: "'hero hero b c' 'hero hero d e'",
          gap: 3, background: "var(--wm-ns-100)" } },
          e(Tile, { t: b.tiles[0], hero: true, gridArea: "hero", imgSrc: currentImages[0] ? pathPrefix + currentImages[0] : null }),
          e(Tile, { t: b.tiles[1], gridArea: "b", imgSrc: currentImages[1] ? pathPrefix + currentImages[1] : null }),
          e(Tile, { t: b.tiles[2], gridArea: "c", imgSrc: currentImages[2] ? pathPrefix + currentImages[2] : null }),
          e(Tile, { t: b.tiles[3], gridArea: "d", imgSrc: currentImages[3] ? pathPrefix + currentImages[3] : null }),
          // 5th tile from palette if available, else repeat first non-hero
          e(Tile, {
            t: b.palette[4] ? { c: b.palette[4].hex, label: b.palette[4].name } : b.tiles[1],
            gridArea: "e",
            imgSrc: currentImages[4] ? pathPrefix + currentImages[4] : null
          })),

        // footer dentro de la card
        e("div", { style: { padding: "16px 20px", display: "flex", alignItems: "center", gap: 16, borderTop: "1px solid var(--wm-ns-100)" } },
          e("div", { style: { flex: 1 } },
            e("div", { style: { fontWeight: 800, fontSize: 20, letterSpacing: "-.01em", lineHeight: 1, color: "var(--wm-ns-600)" } }, b.title),
            e("div", { style: { fontSize: 12, fontWeight: 600, letterSpacing: ".08em", color: "var(--wm-ns-300)", textTransform: "uppercase", marginTop: 4 } }, b.tagline)),
          e("div", { style: { display: "flex", alignItems: "center", gap: 6 } },
            e(I.sparkles, { size: 14, style: { color: "var(--wm-sb-400)" } }),
            e("span", { style: { fontSize: 12, color: "var(--wm-ns-300)" } }, b.code + " · generado por IA")))),

      // paleta — usa Swatch del DS
      e("div", { className: "gm-card gm-card--pad-lg" },
        e("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 14 } },
          e("h3", { className: "gm-card__title" }, "Paleta de color"),
          e("span", { style: { fontSize: 12.5, color: "var(--wm-ns-300)" } }, b.palette.length + " colores · referencia para el flujo")),
        e("div", { style: { display: "flex", flexWrap: "wrap", gap: 16 } },
          b.palette.map((p, i) => e(Swatch, { key: i, hex: p.hex, code: p.hex.toUpperCase(), name: p.name, size: 48 })))));
  }

  /* ===================== SHELL ===================== */
  function Tendencias({ go, tab, tweaks }) {
    const t = tab === "Moodboard" ? "Moodboard" : "Análisis";
    const [view, setView] = React.useState("results");
    const [approved, setApproved] = React.useState(false);
    const aiVariant = (tweaks && tweaks.aipanel) || "steps";

    let actions = null;
    if (view !== "processing") {
      if (t === "Análisis") {
        actions = approved
          ? e(Chip, { variant: "success", label: "Informe aprobado", lg: true })
          : e(Btn, { variant: "primary", icon: "check", onClick: () => setApproved(true) }, "Aprobar informe");
      } else {
        actions = e(Btn, { variant: "ghost", size: "sm", icon: "refresh", onClick: () => { go("tendencias", "Análisis"); setView("processing"); } }, "Ver procesamiento");
      }
    }

    return e("div", { className: "gm-page gm-fade", style: { paddingBottom: 80 } },
      PageHead({
        title: "Tendencias",
        subtitle: "Fase 1 · Investigación — análisis automático de tendencias para PV26",
        actions,
      }),
      e("div", { className: "gm-tabs" },
        ["Análisis", "Moodboard"].map((x) => e("button", { key: x, className: "gm-tab" + (t === x ? " is-active" : ""), onClick: () => go("tendencias", x) }, x))),
      view === "processing"
        ? e(Processing, { variant: aiVariant, onDone: () => setView("results") })
        : (t === "Análisis" ? e(Results, { approved }) : e(Moodboard, { approved })),
      e(AdvanceBar, { stepId: "tendencias", onComplete: () => setApproved(true), go, completed: approved }));
  }

  window.GMScreens = Object.assign(window.GMScreens || {}, { Tendencias });
})();
