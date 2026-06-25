/* GM — Muestras (Fase 2). SKU cards + hilo de correo + confirmación recepción
   Layout via tweaks.skucard: "expanded" | "compact"
   → window.GMScreens.Muestras */
(function () {
  const e = React.createElement;
  const I = window.GMIcon;
  const { Chip, Btn, ProdImg, EmailThread, PageHead, AdvanceBar } = window.GMUI;

  const provName = (p) => GM.providers[p].name;
  const MUE = { pendiente_envio: "pendiente_envio", enviado: "enviado", en_revision: "en_revision", recibido: "recibido" };

  function StateMarker({ st }) {
    return e(Chip, { k: st });
  }

  function ExpandedCard({ s, onMark, go }) {
    return e("div", { className: "gm-card", style: { display: "flex", gap: 16 } },
      e(ProdImg, { swatch: s.swatch, style: { width: 96, height: 96, borderRadius: 8, flex: "0 0 auto" } }),
      e("div", { style: { flex: 1, minWidth: 0 } },
        e("div", { style: { display: "flex", alignItems: "flex-start", gap: 10 } },
          e("div", { style: { flex: 1 } },
            e("div", { style: { fontSize: 11, fontWeight: 700, color: "var(--wm-sb-400)" } }, s.id),
            e("div", { style: { fontWeight: 700, fontSize: 15, margin: "1px 0 3px" } }, s.name),
            e("div", { style: { fontSize: 12.5, color: "var(--wm-ns-400)", display: "flex", alignItems: "center", gap: 5 } }, e(I.truck, { size: 13 }), provName(s.prov))),
          e(StateMarker, { st: s.muestra })),
        // notas
        e("div", { style: { display: "flex", alignItems: "flex-start", gap: 6, marginTop: 8, fontSize: 12, color: "var(--wm-ns-400)", background: "var(--wm-ns-050)", borderRadius: 7, padding: "7px 9px" } },
          e(I.chat, { size: 13, style: { marginTop: 1, color: "var(--wm-ns-300)", flex: "0 0 auto" } }),
          e("span", null, s.muestra === "recibido" ? "Auto-anotación del chat: «contramuestra en desarrollo»." : "Notas de la prenda — agregadas manual o desde el chat.")),
        // actions
        e("div", { style: { display: "flex", gap: 8, marginTop: 10 } },
          s.muestra === "pendiente_envio" && e(Btn, { variant: "primary", size: "sm", icon: "send", onClick: () => onMark(s.id, "enviado") }, "Marcar enviado"),
          s.muestra === "enviado" && e(Btn, { variant: "secondary", size: "sm", icon: "eye", onClick: () => onMark(s.id, "en_revision") }, "Marcar en revisión"),
          s.muestra === "en_revision" && e(Btn, { variant: "secondary", size: "sm", icon: "check", onClick: () => onMark(s.id, "recibido") }, "Confirmar recepción")),
        e(EmailThread, { skuId: s.id, onOpen: () => go("correo") })));
  }

  function CompactCard({ s, selected, onClick }) {
    return e("button", { onClick, className: "gm-card gm-card--hover", style: {
      padding: 0, overflow: "hidden", textAlign: "left", border: selected ? "1.5px solid var(--wm-sb-400)" : "1px solid #f0f0f0", cursor: "pointer", background: "#fff" } },
      e("div", { style: { position: "relative" } },
        e(ProdImg, { swatch: s.swatch, style: { height: 120 } }),
        e("div", { style: { position: "absolute", top: 8, right: 8 } }, e(StateMarker, { st: s.muestra }))),
      e("div", { style: { padding: 12 } },
        e("div", { style: { fontSize: 10.5, fontWeight: 700, color: "var(--wm-sb-400)" } }, s.id),
        e("div", { style: { fontWeight: 700, fontSize: 13, lineHeight: 1.2, margin: "2px 0 4px" } }, s.name),
        e("div", { style: { fontSize: 11.5, color: "var(--wm-ns-300)" } }, provName(s.prov))));
  }

  function DetailPanel({ s, onMark, go }) {
    if (!s) return e("div", { className: "gm-card gm-card--pad-lg", style: { position: "sticky", top: 0 } },
      e(window.GMUI.Empty, { icon: "box", title: "Seleccioná una muestra", body: "Elegí una card para ver el detalle y el hilo de correo del proveedor." }));
    return e("div", { className: "gm-card gm-card--pad-lg", style: { position: "sticky", top: 0, display: "flex", flexDirection: "column", gap: 12 } },
      e("div", { style: { display: "flex", gap: 14 } },
        e(ProdImg, { swatch: s.swatch, style: { width: 96, height: 96, borderRadius: 8, flex: "0 0 auto" } }),
        e("div", { style: { flex: 1 } },
          e("div", { style: { fontSize: 11, fontWeight: 700, color: "var(--wm-sb-400)" } }, s.id),
          e("div", { style: { fontWeight: 700, fontSize: 16, margin: "2px 0 6px" } }, s.name),
          e(StateMarker, { st: s.muestra }))),
      e("div", { style: { fontSize: 12.5, color: "var(--wm-ns-400)", display: "flex", alignItems: "center", gap: 6 } }, e(I.truck, { size: 14 }), provName(s.prov)),
      e("div", { style: { display: "flex", gap: 8 } },
        s.muestra === "pendiente_envio" && e(Btn, { variant: "primary", size: "sm", icon: "send", onClick: () => onMark(s.id, "enviado") }, "Marcar enviado"),
        s.muestra === "enviado" && e(Btn, { variant: "secondary", size: "sm", icon: "eye", onClick: () => onMark(s.id, "en_revision") }, "Marcar en revisión"),
        s.muestra === "en_revision" && e(Btn, { variant: "secondary", size: "sm", icon: "check", onClick: () => onMark(s.id, "recibido") }, "Confirmar recepción"),
        s.muestra === "recibido" && e(Chip, { variant: "success", label: "Recepción confirmada", lg: true })),
      e(EmailThread, { skuId: s.id, onOpen: () => go("correo") }));
  }

  function Muestras({ go, tweaks }) {
    const layout = (tweaks && tweaks.skucard) || "expanded";
    const [skus, setSkus] = React.useState(GM.skus.map((s) => ({ ...s })));
    const [filter, setFilter] = React.useState("todas");
    const [sel, setSel] = React.useState(skus[2].id);
    const [approved, setApproved] = React.useState(false);
    const onMark = (id, st) => setSkus((x) => x.map((s) => (s.id === id ? { ...s, muestra: st } : s)));

    const counts = { enviadas: skus.filter((s) => s.muestra !== "pendiente_envio").length, total: skus.length, recibidas: skus.filter((s) => s.muestra === "recibido").length, enRevision: skus.filter((s) => s.muestra === "en_revision").length };
    const filtered = skus.filter((s) => filter === "todas" || s.muestra === filter);
    const pendientesRecepcion = skus.filter((s) => s.muestra === "enviado" || s.muestra === "en_revision").length;

    const filters = [["todas", "Todas"], ["pendiente_envio", "Pendiente envío"], ["enviado", "Enviado"], ["en_revision", "En revisión"], ["recibido", "Recibido"]];

    return e("div", { className: "gm-page gm-fade", style: { paddingBottom: 80 } },
      PageHead({
        title: "Envío de muestras a proveedores",
        subtitle: "Fase 2 · Diseño — " + counts.enviadas + " de " + counts.total + " muestras enviadas · " + counts.recibidas + " recibidas",
        actions: e(Btn, { variant: "ghost", size: "sm", icon: "filter" }, "Distribuir pendientes"),
      }),

      pendientesRecepcion > 0 && e("div", { style: { display: "flex", gap: 10, alignItems: "center", padding: "11px 14px", borderRadius: 10, background: "var(--wm-warn-100)", border: "1px solid #f2dca0", marginBottom: 16 } },
        e(I.clock, { size: 16, style: { color: "var(--wm-warn-500)" } }),
        e("div", { style: { fontSize: 13, color: "var(--wm-ns-500)", flex: 1 } }, e("b", null, pendientesRecepcion, " muestras"), " en tránsito o en revisión con el proveedor. El correo entrante se vincula automáticamente a la card."),
        e(Chip, { variant: "warning", label: "Pendiente crítico" })),

      e("div", { style: { display: "flex", gap: 7, marginBottom: 18, flexWrap: "wrap" } },
        filters.map(([k, l]) => e("button", { key: k, onClick: () => setFilter(k),
          className: "gm-chip gm-chip--" + (filter === k ? "active" : "neutral"), style: { cursor: "pointer", height: 30, fontSize: 12.5 } },
          l, e("span", { style: { opacity: .6 } }, k === "todas" ? skus.length : skus.filter((s) => s.muestra === k).length)))),

      layout === "expanded"
        ? e("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 } }, filtered.map((s) => e(ExpandedCard, { key: s.id, s, onMark, go })))
        : e("div", { style: { display: "grid", gridTemplateColumns: "1fr 360px", gap: 16, alignItems: "start" } },
            e("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 12 } },
              filtered.map((s) => e(CompactCard, { key: s.id, s, selected: sel === s.id, onClick: () => setSel(s.id) }))),
            e(DetailPanel, { s: skus.find((x) => x.id === sel), onMark, go })),

      e(AdvanceBar, { stepId: "muestras", onComplete: () => setApproved(true), go, completed: approved }));
  }

  window.GMScreens = Object.assign(window.GMScreens || {}, { Muestras });
})();
