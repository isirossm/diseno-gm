/* GM — Percheros · Draft de colección (Fase 3). Propuesta visual IA para la
   negociación en origen. Agrupación vía tweaks.percheros: "categoria" | "ventana"
   → window.GMScreens.Percheros */
(function () {
  const e = React.createElement;
  const I = window.GMIcon;
  const { Chip, Btn, ProdImg, PageHead, CLP } = window.GMUI;

  const provName = (p) => GM.providers[p].name;
  const pantone = (code) => { for (const g of Object.values(GM.palettes)) { const f = g.colors.find((c) => c.code === code); if (f) return f; } return { hex: "#ccc", code }; };

  function ColorDots({ codes }) {
    return e("div", { style: { display: "flex", gap: 4 } },
      codes.map((code) => { const c = pantone(code); return e("span", { key: code, title: c.code, style: { width: 15, height: 15, borderRadius: "50%", background: c.hex, border: "1px solid rgba(0,0,0,.14)" } }); }));
  }

  // a single garment "percha"
  function Percha({ s }) {
    return e("div", { className: "gm-card gm-card--hover", style: { padding: 0, overflow: "hidden", cursor: "grab", display: "flex", flexDirection: "column" } },
      // hanger rail cue
      e("div", { style: { height: 26, background: "var(--wm-ns-050)", borderBottom: "1px solid var(--wm-ns-100)", display: "grid", placeItems: "center", position: "relative" } },
        e(I.hanger, { size: 16, style: { color: "var(--wm-ns-300)" } }),
        e(I.move, { size: 14, style: { position: "absolute", right: 8, color: "var(--wm-ns-200)" } })),
      e("div", { style: { position: "relative" } },
        e(ProdImg, { swatch: s.swatch, style: { height: 168 } }),
        e("div", { style: { position: "absolute", top: 8, left: 8, background: "rgba(255,255,255,.92)", borderRadius: 6, padding: "2px 7px", fontSize: 10.5, fontWeight: 700, color: "var(--wm-sb-400)", fontVariantNumeric: "tabular-nums" } }, s.id)),
      e("div", { style: { padding: 12, display: "flex", flexDirection: "column", gap: 8 } },
        e("div", { style: { fontWeight: 700, fontSize: 13.5, lineHeight: 1.25 } }, s.name),
        e("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } },
          e("span", { style: { fontSize: 11.5, color: "var(--wm-ns-300)", display: "flex", alignItems: "center", gap: 4, minWidth: 0 } }, e(I.truck, { size: 12, style: { flex: "0 0 auto" } }), e("span", { style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, provName(s.prov).split(" ")[0])),
          e(ColorDots, { codes: s.colors })),
        e("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--wm-ns-100)", paddingTop: 8 } },
          e("span", { style: { fontSize: 10.5, fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--wm-ns-300)" } }, "Precio target"),
          e("span", { style: { fontSize: 15, fontWeight: 700, color: "var(--wm-sb-500)", fontVariantNumeric: "tabular-nums" } }, CLP(s.price)))));
  }

  function Rack({ title, sub, dots, list }) {
    return e("div", null,
      e("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 12 } },
        e("h3", { style: { fontSize: 16, fontWeight: 700, margin: 0 } }, title),
        e("span", { className: "gm-chip gm-chip--neutral" }, list.length, " perchas"),
        sub && e("span", { style: { fontSize: 12, color: "var(--wm-ns-300)" } }, sub),
        dots && e("div", { style: { display: "flex", gap: 5, marginLeft: "auto" } },
          dots.map((c) => e("span", { key: c.code, title: c.code, style: { width: 14, height: 14, borderRadius: "50%", background: c.hex, border: "1px solid rgba(0,0,0,.1)" } })))),
      e("div", { style: { background: "var(--wm-ns-050)", border: "1px dashed var(--wm-ns-200)", borderRadius: 12, padding: 14 } },
        e("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(178px,1fr))", gap: 14 } },
          list.map((s) => e(Percha, { key: s.id, s })))));
  }

  function Percheros({ go, tweaks }) {
    const grouping = (tweaks && tweaks.percheros) || "categoria";
    const [approved, setApproved] = React.useState(false);

    let racks;
    if (grouping === "ventana") {
      const wins = [["w1", "1ª ventana"], ["w2", "2ª ventana"], ["w3", "3ª ventana"], ["perm", "Permanente"]];
      racks = wins.map(([wk, wl]) => ({ key: wk, title: wl, list: GM.skus.filter((s) => s.win === wk) }));
    } else {
      const CATKEY = { basicos: "basicos", temporada: "temporada", innovacion: "innovacion" };
      racks = Object.keys(GM.cat).map((g) => ({ key: g, title: GM.cat[g], dots: GM.palettes[CATKEY[g]].colors.slice(0, 5), list: GM.skus.filter((s) => s.cat === g) }));
    }
    racks = racks.filter((r) => r.list.length);

    return e("div", { className: "gm-page gm-fade" },
      PageHead({
        title: "Draft de colección · Percheros",
        subtitle: "Fase 3 · Materiales — propuesta visual para la negociación en origen (pre-viaje China)",
        actions: e(React.Fragment, null,
          e(Btn, { variant: "ghost", size: "sm", icon: "download" }, "Exportar draft"),
          approved ? e(Chip, { variant: "success", label: "Draft aprobado", lg: true })
            : e(Btn, { variant: "primary", icon: "check", onClick: () => setApproved(true) }, "Aprobar draft")),
      }),

      // AI provenance banner
      e("div", { style: { display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 10, background: "var(--wm-sb-200)", border: "1px solid #bcdcfb", marginBottom: 18 } },
        e(I.sparkles, { size: 18, style: { color: "var(--wm-sb-400)", flex: "0 0 auto" } }),
        e("div", { style: { fontSize: 13, color: "var(--wm-ns-500)", flex: 1 } }, e("b", null, "Organización propuesta por IA"), " desde el line plan y las fichas técnicas. Reordená prendas y curá los datos antes de exportar para el viaje."),
        !approved && e(Btn, { variant: "ghost", size: "sm", icon: "refresh" }, "Regenerar")),

      e("div", { style: { display: "flex", flexDirection: "column", gap: 24 } },
        racks.map((r) => e(Rack, { key: r.key, title: r.title, dots: r.dots, list: r.list, sub: grouping === "categoria" ? null : null }))),

      // footer note
      e("div", { style: { fontSize: 11.5, color: "var(--wm-ns-300)", marginTop: 18, display: "flex", alignItems: "center", gap: 6 } },
        e(I.move, { size: 13 }), "Arrastrá las perchas para reordenar dentro de un rack o moverlas entre racks. El draft exportado se comparte con el equipo comercial y se lleva como referencia al viaje."));
  }

  window.GMScreens = Object.assign(window.GMScreens || {}, { Percheros });
})();
