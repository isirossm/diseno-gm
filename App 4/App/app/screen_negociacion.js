/* GM — Negociación en origen (Fase 4) · Plataforma + App iPad
   → window.GMScreens.Negociacion */
(function () {
  const e = React.createElement;
  const I = window.GMIcon;
  const { Chip, Progress, PageHead, AdvanceBar } = window.GMUI;

  const provName = (p) => GM.providers[p].name;

  // Proveedores con presencia en China (viaje de negociación)
  const CHINA_PROVS = ["p1", "p2", "p3", "p5"];

  // Resultados ficticios por proveedor
  const PROV_STATUS = {
    p1: { skus: 3, revisados: 3, cambios: 2, fobDelta: -0.40, status: "cerrado" },
    p2: { skus: 2, revisados: 2, cambios: 1, fobDelta: -0.20, status: "cerrado" },
    p3: { skus: 3, revisados: 2, cambios: 0, fobDelta:  0,    status: "en_curso" },
    p5: { skus: 2, revisados: 0, cambios: 0, fobDelta:  0,    status: "pendiente" },
  };

  const STATUS_META = {
    cerrado:   { variant: "success", label: "Negociación cerrada" },
    en_curso:  { variant: "active",  label: "En revisión"         },
    pendiente: { variant: "neutral", label: "Pendiente"           },
  };

  function NegRow({ provId }) {
    const p  = GM.providers[provId];
    const ps = PROV_STATUS[provId];
    const { variant, label } = STATUS_META[ps.status];

    return e("div", { className: "gm-card", style: { padding: "14px 18px", display: "flex", alignItems: "center", gap: 16 } },
      e("div", { style: { width: 40, height: 40, borderRadius: 11, background: "var(--wm-sb-200)", color: "var(--wm-sb-400)", display: "grid", placeItems: "center", flex: "0 0 auto" } },
        e(I.handshake, { size: 20 })),
      e("div", { style: { flex: 1, minWidth: 0 } },
        e("div", { style: { fontWeight: 700, fontSize: 14 } }, p.name),
        e("div", { style: { fontSize: 12, color: "var(--wm-ns-300)", marginTop: 2 } },
          ps.revisados + " / " + ps.skus + " SKUs revisados",
          ps.cambios > 0 && e("span", { style: { marginLeft: 10, color: "var(--wm-warn-500)" } }, "· " + ps.cambios + " cambio" + (ps.cambios > 1 ? "s" : "")))),
      ps.fobDelta !== 0 && e("div", { style: { textAlign: "right", flex: "0 0 auto" } },
        e("div", { style: { fontSize: 11, color: "var(--wm-ns-300)", marginBottom: 2 } }, "FOB promedio"),
        e("div", { style: { fontWeight: 700, fontSize: 14,
          color: ps.fobDelta < 0 ? "var(--wm-success-500)" : "var(--wm-error-500)" } },
          (ps.fobDelta < 0 ? "−$" : "+$") + Math.abs(ps.fobDelta).toFixed(2))),
      e(Chip, { variant, label }));
  }

  function Negociacion({ go }) {
    const [approved, setApproved] = React.useState(false);

    const totalSkus     = CHINA_PROVS.reduce((a, p) => a + PROV_STATUS[p].skus, 0);
    const revisados     = CHINA_PROVS.reduce((a, p) => a + PROV_STATUS[p].revisados, 0);
    const cerrados      = CHINA_PROVS.filter((p) => PROV_STATUS[p].status === "cerrado").length;

    return e("div", { className: "gm-page gm-fade", style: { paddingBottom: 80 } },
      PageHead({
        title: "Validación y negociación en origen",
        subtitle: "Fase 4 · Producción — revisión física con proveedores en China · ajuste de fichas en tiempo real",
      }),

      // overview
      e("div", { className: "gm-card", style: { padding: "18px 22px", marginBottom: 16, display: "flex", gap: 24, alignItems: "center" } },
        e("div", { style: { width: 52, height: 52, borderRadius: 14, background: "var(--wm-sb-200)", color: "var(--wm-sb-400)", display: "grid", placeItems: "center", flex: "0 0 auto" } },
          e(I.handshake, { size: 26 })),
        e("div", { style: { flex: 1 } },
          e("div", { style: { fontWeight: 700, fontSize: 16 } }, "Negociación China · " + GM.season.name),
          e("div", { style: { fontSize: 13, color: "var(--wm-ns-300)", marginTop: 3 } },
            revisados + " de " + totalSkus + " SKUs revisados · " + cerrados + " de " + CHINA_PROVS.length + " proveedores cerrados"),
          e("div", { style: { marginTop: 8 } },
            e(Progress, { value: revisados, total: totalSkus, color: "var(--wm-success-500)" }))),
        e(Chip, { variant: "active", label: "En curso · Ningbo" })),

      // por proveedor
      e("div", { style: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 } },
        e("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--wm-ns-300)", marginBottom: 4 } },
          "Proveedores · China"),
        CHINA_PROVS.map((p) => e(NegRow, { key: p, provId: p }))),


      e(AdvanceBar, { stepId: "negociacion", onComplete: () => setApproved(true), go, completed: approved }));
  }

  window.GMScreens = Object.assign(window.GMScreens || {}, { Negociacion });
})();
