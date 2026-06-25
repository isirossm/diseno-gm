/* GM — Cierre · Entrega final de colección (Fase 4). Percheros finales (IA),
   lineamiento de seguimiento (IA desde pendientes de P8) e imágenes CATEX.
   → window.GMScreens.Cierre */
(function () {
  const e = React.createElement;
  const I = window.GMIcon;
  const { Chip, Btn, ProdImg, PageHead, CLP } = window.GMUI;

  const provName = (p) => GM.providers[p].name;
  const FINAL = GM.skus.filter((s) => s.id !== "MJ-3162"); // descartada en negociación

  // ---------- Percheros finales ----------
  function FinalPercha({ s }) {
    return e("div", { className: "gm-card gm-card--hover", style: { padding: 0, overflow: "hidden" } },
      e("div", { style: { position: "relative" } },
        e(ProdImg, { swatch: s.swatch, style: { height: 130 } }),
        e("div", { style: { position: "absolute", top: 8, left: 8, background: "rgba(255,255,255,.92)", borderRadius: 6, padding: "2px 7px", fontSize: 10.5, fontWeight: 700, color: "var(--wm-sb-400)" } }, s.id)),
      e("div", { style: { padding: 11 } },
        e("div", { style: { fontWeight: 700, fontSize: 13, lineHeight: 1.2 } }, s.name),
        e("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 7 } },
          e("span", { style: { fontSize: 11, color: "var(--wm-ns-300)", display: "flex", alignItems: "center", gap: 4 } }, e(I.truck, { size: 12 }), provName(s.prov).split(" ")[0]),
          e("span", { style: { fontSize: 13.5, fontWeight: 700, color: "var(--wm-sb-500)", fontVariantNumeric: "tabular-nums" } }, CLP(s.price)))));
  }

  function PercherosFinales() {
    const wins = [["w1", "1ª ventana"], ["w2", "2ª ventana"], ["w3", "3ª ventana"], ["perm", "Permanente"]];
    return e("div", { className: "gm-fade", style: { display: "flex", flexDirection: "column", gap: 18 } },
      e("div", { style: { display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 10, background: "var(--wm-sb-200)", border: "1px solid #bcdcfb" } },
        e(I.sparkles, { size: 18, style: { color: "var(--wm-sb-400)", flex: "0 0 auto" } }),
        e("div", { style: { fontSize: 13, color: "var(--wm-ns-500)", flex: 1 } }, e("b", null, "Percheros generados por IA"), " desde las fichas actualizadas post-negociación. Mismo formato que el draft (P7a), con los datos ya corregidos."),
        e(Btn, { variant: "ghost", size: "sm", icon: "refresh" }, "Regenerar")),
      wins.map(([wk, wl]) => {
        const list = FINAL.filter((s) => s.win === wk);
        if (!list.length) return null;
        return e("div", { key: wk },
          e("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 11 } },
            e("h3", { style: { fontSize: 15, fontWeight: 700, margin: 0 } }, wl),
            e("span", { className: "gm-chip gm-chip--neutral" }, list.length, " perchas")),
          e("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 14 } },
            list.map((s) => e(FinalPercha, { key: s.id, s }))));
      }));
  }

  // ---------- Lineamiento de seguimiento ----------
  const SEG = [
    { tipo: "pendiente", tema: "MOQ short lino (MJ-3155)", detalle: "Definir MOQ final con Hangzhou antes del PP sample." },
    { tipo: "cambio", tema: "Composición blazer (MJ-3187)", detalle: "Confirmar lino-viscosa 70/30 en ficha y comunicar a comercial." },
    { tipo: "confirmacion", tema: "Recepción de contramuestras", detalle: "2 proveedores con confirmación de recepción pendiente." },
    { tipo: "pendiente", tema: "Volumen de manga (MJ-3140)", detalle: "Validar con proveedor el caído de la manga abullonada." },
    { tipo: "cambio", tema: "Descarte MJ-3162", detalle: "Bikini tropical descartado por MOQ sobre presupuesto; reasignar ventana." },
  ];
  const SEGT = { pendiente: ["neutral", "Pendiente"], cambio: ["active", "Cambio"], confirmacion: ["warning", "Confirmación"] };

  function Seguimiento() {
    const [done, setDone] = React.useState({});
    return e("div", { className: "gm-fade", style: { display: "flex", flexDirection: "column", gap: 14 } },
      e("div", { style: { display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 10, background: "var(--wm-sb-200)", border: "1px solid #bcdcfb" } },
        e(I.sparkles, { size: 18, style: { color: "var(--wm-sb-400)", flex: "0 0 auto" } }),
        e("div", { style: { fontSize: 13, color: "var(--wm-ns-500)", flex: 1 } }, e("b", null, "Síntesis generada por IA"), " desde los pendientes abiertos al cierre de la negociación (P8). Revisá, ajustá y confirmá — no requiere redacción desde cero.")),
      e("div", { className: "gm-card gm-card--pad-lg" },
        e("div", { style: { display: "flex", alignItems: "center", marginBottom: 14 } },
          e("h3", { className: "gm-card__title" }, "Lineamiento de seguimiento"),
          e("span", { style: { marginLeft: "auto", fontSize: 12.5, color: "var(--wm-ns-300)" } }, Object.values(done).filter(Boolean).length + " de " + SEG.length + " confirmados")),
        e("div", { style: { display: "flex", flexDirection: "column", gap: 8 } },
          SEG.map((it, i) => {
            const [v, lbl] = SEGT[it.tipo];
            const ok = done[i];
            return e("div", { key: i, style: { display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 14px", border: "1px solid var(--wm-ns-100)", borderRadius: 8, background: ok ? "var(--wm-success-100)44" : "#fff" } },
              e("button", { onClick: () => setDone((d) => ({ ...d, [i]: !d[i] })), title: "Confirmar", style: {
                width: 22, height: 22, borderRadius: 6, flex: "0 0 auto", marginTop: 1, cursor: "pointer", display: "grid", placeItems: "center",
                border: "1.5px solid " + (ok ? "var(--wm-success-500)" : "var(--wm-ns-200)"), background: ok ? "var(--wm-success-500)" : "#fff", color: "#fff" } },
                ok && e(I.check, { size: 13 })),
              e("div", { style: { flex: 1 } },
                e("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
                  e("span", { style: { fontWeight: 700, fontSize: 13.5 } }, it.tema),
                  e(Chip, { variant: v, label: lbl })),
                e("div", { style: { fontSize: 12.5, color: "var(--wm-ns-400)", marginTop: 3, lineHeight: 1.45 } }, it.detalle)),
              e("button", { className: "gm-btn gm-btn--icon", style: { width: 30, height: 30, flex: "0 0 auto" }, title: "Editar" }, e(I.edit, { size: 13 })));
          }))));
  }

  // ---------- Imágenes CATEX ----------
  function Catex() {
    const [st, setSt] = React.useState(() => Object.fromEntries(FINAL.map((s, i) => [s.id, i % 3 === 2 ? "generada" : "aprobada"])));
    const set = (id, v) => setSt((x) => ({ ...x, [id]: v }));
    const aprobadas = FINAL.filter((s) => st[s.id] === "aprobada").length;
    return e("div", { className: "gm-fade", style: { display: "flex", flexDirection: "column", gap: 16 } },
      e("div", { style: { display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 10, background: "var(--wm-sb-200)", border: "1px solid #bcdcfb" } },
        e(I.sparkles, { size: 18, style: { color: "var(--wm-sb-400)", flex: "0 0 auto" } }),
        e("div", { style: { fontSize: 13, color: "var(--wm-ns-500)", flex: 1 } }, e("b", null, "Imágenes CATEX generadas por IA"), " — aplica los assets de producto (contramuestras P7c + viaje P2) sobre modelos predefinidos."),
        e(Chip, { variant: aprobadas === FINAL.length ? "success" : "active", label: aprobadas + " de " + FINAL.length + " aprobadas" })),
      e("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: 14 } },
        FINAL.map((s) => {
          const ap = st[s.id] === "aprobada";
          return e("div", { key: s.id, className: "gm-card", style: { padding: 0, overflow: "hidden" } },
            e("div", { style: { position: "relative", height: 200, background: "linear-gradient(160deg," + s.swatch + "22," + s.swatch + "55)", display: "grid", placeItems: "center" } },
              e(I.user, { size: 64, style: { color: s.swatch, opacity: .55 } }),
              e("span", { style: { position: "absolute", top: 8, left: 8, fontSize: 10, fontWeight: 700, color: "#fff", background: "rgba(0,0,0,.35)", borderRadius: 5, padding: "2px 7px" } }, "Modelo · CATEX"),
              e("div", { style: { position: "absolute", top: 8, right: 8 } }, e(Chip, { variant: ap ? "success" : "active", label: ap ? "Aprobada" : "Generada" }))),
            e("div", { style: { padding: 11 } },
              e("div", { style: { fontSize: 10.5, fontWeight: 700, color: "var(--wm-sb-400)" } }, s.id),
              e("div", { style: { fontWeight: 700, fontSize: 13, lineHeight: 1.2, margin: "2px 0 9px" } }, s.name),
              e("div", { style: { display: "flex", gap: 7 } },
                ap
                  ? e(Btn, { variant: "ghost", size: "sm", icon: "refresh", onClick: () => set(s.id, "generada") }, "Regenerar")
                  : e(React.Fragment, null,
                      e(Btn, { variant: "primary", size: "sm", icon: "check", onClick: () => set(s.id, "aprobada") }, "Aprobar"),
                      e(Btn, { variant: "ghost", size: "sm", icon: "refresh", onClick: () => set(s.id, "generada") }, "")))));
        })));
  }

  function Cierre({ go }) {
    const [tab, setTab] = React.useState("percheros");
    const [sent, setSent] = React.useState(false);
    const TABS = [["percheros", "Percheros finales"], ["seguimiento", "Lineamiento de seguimiento"], ["catex", "Imágenes CATEX"]];

    return e("div", { className: "gm-page gm-fade" },
      PageHead({
        title: "Entrega final de colección",
        subtitle: "Fase 4 · Producción — consolidación y envío al equipo comercial al cierre del viaje de China",
        actions: sent
          ? e(Chip, { variant: "success", label: "Enviado al comercial", lg: true })
          : e(Btn, { variant: "primary", icon: "send", onClick: () => setSent(true) }, "Aprobar y enviar al comercial"),
      }),

      sent && e("div", { className: "gm-fade", style: { display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 10, background: "linear-gradient(100deg,var(--wm-success-100)66,#fff 70%)", border: "1px solid #bce5a8", marginBottom: 16 } },
        e(I.checkCircle, { size: 20, style: { color: "var(--wm-success-500)", flex: "0 0 auto" } }),
        e("div", { style: { fontSize: 13, color: "var(--wm-ns-500)", flex: 1 } }, e("b", null, "Percheros finales y lineamiento de seguimiento enviados."), " Colección cerrada · las imágenes CATEX quedan listas para carga.")),

      e("div", { className: "gm-tabs" },
        TABS.map(([k, l]) => e("button", { key: k, className: "gm-tab" + (tab === k ? " is-active" : ""), onClick: () => setTab(k) }, l))),

      tab === "percheros" ? e(PercherosFinales, null)
        : tab === "seguimiento" ? e(Seguimiento, null)
        : e(Catex, null));
  }

  window.GMScreens = Object.assign(window.GMScreens || {}, { Cierre });
})();
