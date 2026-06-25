/* GM — KV de campaña (Fase 3). Coordinación con Marketing: recepción del Key
   Visual + lineamientos gráficos. Confirmar lineamientos desbloquea Manuales (P7d).
   → window.GMScreens.KV */
(function () {
  const e = React.createElement;
  const I = window.GMIcon;
  const { Chip, Btn, PageHead } = window.GMUI;

  const CAMPAIGN = {
    name: "Verano que se siente",
    season: "Primavera–Verano 26",
    base: "#f4d35e",
    accent: "#46b4a0",
    ink: "#2a3b59",
  };
  const PALETTE = [
    { hex: "#f4d35e", name: "Sol" }, { hex: "#46b4a0", name: "Pool" },
    { hex: "#f88379", name: "Coral" }, { hex: "#2a3b59", name: "Noche" }, { hex: "#f4f3ee", name: "Arena" },
  ];
  const ASSETS = [
    { name: "Logo campaña · lockup", fmt: "SVG · PNG", icon: "spark" },
    { name: "Key Visual · master", fmt: "PSD · JPG", icon: "image" },
    { name: "Fondos y texturas", fmt: "PNG ×6", icon: "grid" },
    { name: "Tipografías campaña", fmt: "OTF", icon: "doc" },
  ];
  const THREAD = [
    { from: "Marketing", dir: "in", date: "2 jun", body: "Hola Valentina, les compartimos el KV aprobado de «Verano que se siente» para PV26. Adjuntamos master y paleta de campaña." },
    { from: "Diseño GM", dir: "out", date: "3 jun", body: "Gracias. Confirmamos tipografías y estilo gráfico antes de armar los manuales de pallets/PDQ y packaging." },
  ];

  function KVPreview() {
    return e("div", { className: "gm-card", style: { padding: 0, overflow: "hidden", position: "sticky", top: 0 } },
      e("div", { style: { position: "relative", height: 360, background: CAMPAIGN.base, display: "grid", placeItems: "center" } },
        e("div", { style: { position: "absolute", inset: 0, display: "grid", placeItems: "center", opacity: .12 } }, e(I.spark, { size: 280, style: { color: CAMPAIGN.ink } })),
        e("div", { style: { position: "relative", textAlign: "center", padding: 24 } },
          e("div", { style: { fontSize: 12, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: CAMPAIGN.ink, opacity: .7 } }, "Campaña " + CAMPAIGN.season),
          e("div", { style: { fontSize: 40, fontWeight: 800, lineHeight: 1.05, color: CAMPAIGN.ink, margin: "8px 0", maxWidth: 360 } }, CAMPAIGN.name),
          e("div", { style: { display: "inline-flex", gap: 7, marginTop: 6 } }, PALETTE.slice(0, 4).map((c) => e("span", { key: c.hex, style: { width: 22, height: 22, borderRadius: "50%", background: c.hex, border: "2px solid rgba(255,255,255,.7)" } })))),
        e("div", { style: { position: "absolute", bottom: 10, right: 12, fontSize: 10.5, fontWeight: 700, color: CAMPAIGN.ink, opacity: .55 } }, "KV master · Marketing")),
      e("div", { style: { padding: "12px 16px", display: "flex", alignItems: "center", gap: 8, borderTop: "1px solid var(--wm-ns-100)" } },
        e(I.image, { size: 16, style: { color: "var(--wm-ns-400)" } }),
        e("span", { style: { fontSize: 12.5, fontWeight: 600 } }, "Key Visual · «" + CAMPAIGN.name + "»"),
        e(Btn, { variant: "ghost", size: "sm", icon: "download", style: { marginLeft: "auto" } }, "Descargar")));
  }

  function StatusStepper({ stage }) {
    const steps = [["esperando", "Esperando KV"], ["recibido", "KV recibido"], ["confirmado", "Lineamientos confirmados"]];
    const idx = steps.findIndex(([k]) => k === stage);
    return e("div", { style: { display: "flex", alignItems: "center", gap: 0, marginBottom: 16 } },
      steps.map(([k, l], i) => e(React.Fragment, { key: k },
        i > 0 && e("div", { style: { flex: 1, height: 2.5, background: i <= idx ? "var(--wm-success-500)" : "var(--wm-ns-100)" } }),
        e("div", { style: { display: "flex", alignItems: "center", gap: 8, flex: "0 0 auto" } },
          e("div", { style: { width: 26, height: 26, borderRadius: "50%", display: "grid", placeItems: "center", flex: "0 0 auto",
            background: i < idx ? "var(--wm-success-500)" : i === idx ? "var(--wm-sb-400)" : "#fff", color: i <= idx ? "#fff" : "var(--wm-ns-300)", border: i > idx ? "2px solid var(--wm-ns-200)" : "none" } },
            i < idx ? e(I.check, { size: 14 }) : i + 1),
          e("span", { style: { fontSize: 13, fontWeight: i === idx ? 700 : 500, color: i <= idx ? "var(--wm-ns-600)" : "var(--wm-ns-300)" } }, l))) ));
  }

  function Block({ title, icon, children, action }) {
    return e("div", { className: "gm-card gm-card--pad-lg" },
      e("div", { style: { display: "flex", alignItems: "center", gap: 9, marginBottom: 14 } },
        e("div", { style: { width: 28, height: 28, borderRadius: 8, background: "var(--wm-ns-100)", color: "var(--wm-ns-400)", display: "grid", placeItems: "center" } }, e(I[icon], { size: 16 })),
        e("h3", { className: "gm-card__title" }, title),
        action && e("div", { style: { marginLeft: "auto" } }, action)),
      children);
  }

  function KV({ go }) {
    const [stage, setStage] = React.useState("recibido");
    const confirmed = stage === "confirmado";

    return e("div", { className: "gm-page gm-fade" },
      PageHead({
        title: "KV de campaña",
        subtitle: "Fase 3 · Materiales — coordinación con Marketing · base gráfica para los manuales de P7d",
        actions: confirmed
          ? e(Chip, { variant: "success", label: "Lineamientos confirmados", lg: true })
          : e(Btn, { variant: "primary", icon: "check", onClick: () => setStage("confirmado") }, "Confirmar lineamientos"),
      }),

      StatusStepper({ stage }),

      // unblock / dependency banner
      confirmed
        ? e("div", { style: { display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 10, background: "linear-gradient(100deg,var(--wm-success-100)66,#fff 70%)", border: "1px solid #bce5a8", marginBottom: 18 } },
            e(I.checkCircle, { size: 20, style: { color: "var(--wm-success-500)", flex: "0 0 auto" } }),
            e("div", { style: { fontSize: 13, color: "var(--wm-ns-500)", flex: 1 } }, e("b", null, "KV y lineamientos confirmados."), " Se desbloquea el desarrollo de Manuales pallets/PDQ y packaging."),
            e(Btn, { variant: "primary", size: "sm", iconRight: "arrowRight", onClick: () => go("manuales") }, "Ir a Manuales"))
        : e("div", { style: { display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 10, background: "var(--wm-warn-100)", border: "1px solid #f2dca0", marginBottom: 18 } },
            e(I.lock, { size: 18, style: { color: "var(--wm-warn-500)", flex: "0 0 auto" } }),
            e("div", { style: { fontSize: 13, color: "var(--wm-ns-500)", flex: 1 } }, "Los manuales ", e("b", null, "no pueden desarrollarse"), " hasta confirmar el KV y sus lineamientos gráficos."),
            e(Chip, { variant: "warning", label: "Bloquea P7d" })),

      e("div", { style: { display: "grid", gridTemplateColumns: "minmax(0,440px) 1fr", gap: 16, alignItems: "start" } },
        // KV preview
        KVPreview(),

        // guidelines column
        e("div", { style: { display: "flex", flexDirection: "column", gap: 16 } },
          // palette
          e(Block, { title: "Paleta de campaña", icon: "palette" },
            e("div", { style: { display: "flex", gap: 14, flexWrap: "wrap" } },
              PALETTE.map((c) => e("div", { key: c.hex, style: { textAlign: "center" } },
                e("div", { style: { width: 52, height: 52, borderRadius: 10, background: c.hex, border: "1px solid rgba(0,0,0,.08)" } }),
                e("div", { style: { fontSize: 11, fontWeight: 700, marginTop: 5 } }, c.name),
                e("div", { style: { fontSize: 10, color: "var(--wm-ns-300)", fontVariantNumeric: "tabular-nums" } }, c.hex))))),

          // typography + style
          e("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 } },
            e(Block, { title: "Tipografía", icon: "doc" },
              e("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
                e("div", null, e("div", { style: { fontSize: 26, fontWeight: 800, color: CAMPAIGN.ink, lineHeight: 1 } }, "Bogle Black"), e("div", { style: { fontSize: 11.5, color: "var(--wm-ns-300)", marginTop: 2 } }, "Titulares y precios")),
                e("div", { style: { borderTop: "1px solid var(--wm-ns-100)", paddingTop: 10 } }, e("div", { style: { fontSize: 17, fontWeight: 400 } }, "Bogle Regular"), e("div", { style: { fontSize: 11.5, color: "var(--wm-ns-300)", marginTop: 2 } }, "Texto corrido y bajadas")))),
            e(Block, { title: "Estilo gráfico", icon: "image" },
              e("ul", { style: { margin: 0, paddingLeft: 18, fontSize: 12.5, color: "var(--wm-ns-500)", lineHeight: 1.7 } },
                ["Fotografía cálida, luz natural de verano", "Spark como elemento de energía", "Fondos planos en tonos de paleta", "Sin filtros ni texturas"].map((x, i) => e("li", { key: i }, x))))),

          // assets
          e(Block, { title: "Assets base descargables", icon: "download", action: e(Btn, { variant: "ghost", size: "sm", icon: "download" }, "Descargar todo") },
            e("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 } },
              ASSETS.map((a) => e("div", { key: a.name, style: { display: "flex", alignItems: "center", gap: 11, padding: "10px 12px", border: "1px solid var(--wm-ns-100)", borderRadius: 8 } },
                e("div", { style: { width: 32, height: 32, borderRadius: 8, background: "var(--wm-sb-200)", color: "var(--wm-sb-400)", display: "grid", placeItems: "center", flex: "0 0 auto" } }, e(I[a.icon], { size: 17 })),
                e("div", { style: { flex: 1, minWidth: 0 } },
                  e("div", { style: { fontWeight: 700, fontSize: 12.5 } }, a.name),
                  e("div", { style: { fontSize: 11, color: "var(--wm-ns-300)" } }, a.fmt)),
                e("button", { className: "gm-btn gm-btn--icon", style: { width: 30, height: 30 }, title: "Descargar" }, e(I.download, { size: 14 })))))),

          // marketing email thread
          e(Block, { title: "Comunicación con Marketing", icon: "mail", action: e(Btn, { variant: "ghost", size: "sm", icon: "send" }, "Responder") },
            e("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
              THREAD.map((m, i) => e("div", { key: i, style: {
                background: m.dir === "in" ? "var(--wm-sb-200)" : "var(--wm-ns-050)",
                border: "1px solid " + (m.dir === "in" ? "#cfe5fb" : "var(--wm-ns-100)"), borderRadius: 10, padding: "11px 13px" } },
                e("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 4 } },
                  e("span", { style: { fontWeight: 700, fontSize: 13, color: m.dir === "in" ? "var(--wm-sb-500)" : "var(--wm-ns-500)" } }, m.from),
                  e("span", { style: { fontSize: 11.5, color: "var(--wm-ns-300)" } }, m.date)),
                e("div", { style: { fontSize: 13, color: "var(--wm-ns-500)", lineHeight: 1.5 } }, m.body))))))));
  }

  window.GMScreens = Object.assign(window.GMScreens || {}, { KV });
})();
