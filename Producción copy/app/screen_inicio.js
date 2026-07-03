/* GM Dashboard (Inicio) → window.GMScreens.Inicio */
(function () {
  const e = React.createElement;
  const I = window.GMIcon;
  const { Chip } = window.GMUI;

  const OWNER = {
    diseno:    { label: "Diseño",    color: "#0071dc", bg: "var(--wm-sb-200)",      icon: "palette" },
    comprador: { label: "Comprador", color: "#9a6700", bg: "var(--wm-warn-100)",    icon: "dollar" },
    proveedor: { label: "Proveedor", color: "#2a8703", bg: "var(--wm-success-100)", icon: "truck" },
    marketing: { label: "Marketing", color: "#5f4b8b", bg: "#efe9f8",              icon: "image" },
    externo:   { label: "Externo",   color: "#46474a", bg: "var(--wm-ns-100)",      icon: "user" },
  };
  const STEPC = {
    completado: "var(--wm-success-500)", curso: "var(--wm-sb-400)",
    pendiente:  "var(--wm-ns-200)",      bloqueado: "var(--wm-error-500)",
  };
  const ALERT = {
    retraso:   { color: "#9a6700", bg: "var(--wm-warn-100)",  bd: "#f2dca0", icon: "clock", tag: "Retraso" },
    rechazo:   { color: "#de1c24", bg: "var(--wm-error-100)", bd: "#f6c0c3", icon: "alert", tag: "Rechazo" },
    pendiente: { color: "#0071dc", bg: "var(--wm-sb-200)",    bd: "#bcdcfb", icon: "flag",  tag: "Pendiente crítico" },
  };
  const MUESTRA_ST = {
    recibido:        { label: "Recibida",  color: "var(--wm-success-500)" },
    enviado:         { label: "Enviada",   color: "var(--wm-sb-400)" },
    pendiente_envio: { label: "Pendiente", color: "var(--wm-warn-500)" },
  };
  const FICHA_ST = {
    aprobada:    { label: "Aprobada",    color: "var(--wm-success-500)" },
    en_revision: { label: "En revisión", color: "var(--wm-warn-500)" },
    en_progreso: { label: "En progreso", color: "var(--wm-sb-400)" },
    sin_iniciar: { label: "Sin iniciar", color: "var(--wm-ns-300)" },
    completa:    { label: "Completa",    color: "var(--wm-success-500)" },
  };

  // ---- KPI pill ----
  function KPI({ icon, label, value, sub, urgent }) {
    return e("div", { style: {
      display: "flex", flexDirection: "column", gap: 4,
      padding: "11px 13px", borderRadius: 10,
      background: urgent ? "var(--wm-warn-100)" : "var(--wm-ns-050)",
      border: "1px solid " + (urgent ? "#f2dca0" : "var(--wm-ns-100)"),
    } },
      e("div", { style: { display: "flex", alignItems: "center", gap: 5, color: urgent ? "#9a6700" : "var(--wm-ns-400)" } },
        e(I[icon], { size: 12 }),
        e("span", { style: { fontSize: 10, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase" } }, label)),
      e("div", { style: { fontSize: 21, fontWeight: 800, color: urgent ? "#9a6700" : "var(--wm-ns-600)", lineHeight: 1, fontVariantNumeric: "tabular-nums" } }, value),
      sub && e("div", { style: { fontSize: 10.5, color: urgent ? "#9a6700" : "var(--wm-ns-300)" } }, sub));
  }

  // ---- Paso activo expandido ----
  function StepPreview({ go }) {
    const m = GM.metrics;
    const b = GM.ball;
    const o = OWNER[b.role];
    const primary = GM.steps.find((s) => s.status === "curso");
    const secondary = GM.steps.filter((s) => s.status === "curso").slice(1);

    const critical = GM.skus.filter((s) =>
      s.muestra === "pendiente_envio" || s.ficha === "en_revision" || s.review === "ajuste"
    ).slice(0, 5);

    const daysLeft = 7; // días al cierre (2026-06-19 - 2026-06-12)
    const ms = GM.season.nextMilestone;

    return e("div", { className: "gm-card gm-card--pad-lg", style: { display: "flex", flexDirection: "column", gap: 18 } },

      // ── Header: título + responsable ──
      e("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 } },
        e("div", null,
          e("div", { style: { fontSize: 10.5, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--wm-ns-300)", marginBottom: 4 } }, "Paso en curso"),
          e("div", { style: { fontSize: 24, fontWeight: 800, color: "var(--wm-ns-600)", lineHeight: 1.1 } }, primary.label),
          e("div", { style: { fontSize: 12.5, color: "var(--wm-ns-400)", marginTop: 4 } },
            "Paso " + primary.no + " · Fase 2 · Diseño",
            secondary.length > 0 && e("button", {
              onClick: () => go(secondary[0].screen),
              style: {
                marginLeft: 10,
                color: "var(--wm-sb-400)",
                fontWeight: 600,
                background: "none",
                border: "none",
                padding: 0,
                fontFamily: "inherit",
                fontSize: "inherit",
                cursor: "pointer"
              }
            }, "+ " + secondary.map((s) => s.label).join(", ") + " también en curso"))),

        // Responsable — avatar circular removed
        null,

        e(Chip, { variant: "active", label: "En curso" })),

      // ── KPIs ──
      e("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 } },
        e(KPI, { icon: "box",    label: "Muestras",      value: m.muestras.done + "/" + m.muestras.total,             sub: "recibidas" }),
        e(KPI, { icon: "doc",    label: "Fichas",         value: m.fichas.done + "/" + m.fichas.total,                 sub: "completadas" }),
        e(KPI, { icon: "image",  label: "Contramuestras", value: m.contramuestras.done + "/" + m.contramuestras.total, sub: "aprobadas" }),
        e(KPI, { icon: "target", label: "Días al cierre", value: daysLeft, sub: "hasta " + ms.name, urgent: true })),

      // ── SKUs críticos ──
      e("div", null,
        e("div", { style: { fontSize: 11.5, fontWeight: 700, color: "var(--wm-ns-400)", letterSpacing: ".04em", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 } },
          e(I.alert, { size: 13 }), "SKUs que requieren atención · " + critical.length + " de " + GM.skus.length),
        e("div", { style: { display: "flex", flexDirection: "column", gap: 3 } },
          critical.map((sku) => {
            const ms2 = MUESTRA_ST[sku.muestra];
            const fs = FICHA_ST[sku.ficha];
            const urgent = sku.review === "ajuste" || sku.muestra === "pendiente_envio";
            const prov = GM.providers[sku.prov];
            return e("div", { key: sku.id, style: {
              display: "flex", alignItems: "center", gap: 12,
              padding: "9px 12px", borderRadius: 8,
              background: urgent ? "var(--wm-warn-100)" : "var(--wm-ns-050)",
              border: "1px solid " + (urgent ? "#f2dca0" : "var(--wm-ns-100)"),
            } },
              e("div", { style: { width: 8, height: 8, borderRadius: "50%", background: ms2.color, flex: "0 0 auto" } }),
              e("div", { style: { flex: 1, minWidth: 0 } },
                e("div", { style: { fontSize: 13, fontWeight: 600, color: "var(--wm-ns-600)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, sku.name),
                e("div", { style: { fontSize: 11, color: "var(--wm-ns-300)" } }, sku.id + (prov ? " · " + prov.name : ""))),
              e("span", { style: { fontSize: 11.5, fontWeight: 600, color: ms2.color, whiteSpace: "nowrap" } }, ms2.label),
              e("span", { style: { fontSize: 11.5, fontWeight: 600, color: fs.color, whiteSpace: "nowrap", minWidth: 78, textAlign: "right" } }, fs.label));
          }))),

      // ── Próximo hito ──
      e("div", { style: {
        display: "flex", alignItems: "center", gap: 12,
        padding: "12px 14px", borderRadius: 10,
        background: "var(--wm-warn-100)", border: "1px solid #f2dca0",
      } },
        e("div", { style: { width: 36, height: 36, borderRadius: 9, background: "#9a6700", color: "#fff", display: "grid", placeItems: "center", flex: "0 0 auto" } },
          e(I.target, { size: 18 })),
        e("div", { style: { flex: 1 } },
          e("div", { style: { fontSize: 10, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "#9a6700" } }, "Próximo hito"),
          e("div", { style: { fontWeight: 700, fontSize: 14, color: "#9a6700", margin: "1px 0" } }, ms.name),
          e("div", { style: { fontSize: 12, color: "#9a6700" } }, ms.date)),
        e("div", { style: { background: "#9a6700", color: "#fff", borderRadius: 100, fontSize: 12, fontWeight: 700, padding: "4px 12px", whiteSpace: "nowrap" } }, daysLeft + " días")),

      // ── CTA ──
      e("button", { onClick: () => go(primary.screen), className: "gm-btn gm-btn--lg",
        style: { background: "var(--wm-spark-400)", color: "var(--wm-sb-500)", alignSelf: "start", fontWeight: 700 } },
        "Ir a ", primary.label, e(I.arrowRight, { size: 18 })));
  }

  // ---- Alertas (columna derecha) ----
  function Alerts({ go }) {
    const [items, setItems] = React.useState(GM.alerts);
    const remove = (id) => setItems((x) => x.filter((a) => a.id !== id));
    return e("div", { className: "gm-card gm-card--pad-lg", style: { display: "flex", flexDirection: "column", height: "100%" } },
      e("div", { style: { display: "flex", alignItems: "center", marginBottom: 14 } },
        e("h2", { className: "gm-card__title" }, "Alertas"),
        e("span", { className: "gm-chip gm-chip--error", style: { marginLeft: 9 } }, items.length, " activas")),
      items.length === 0
        ? e("div", { style: { textAlign: "center", padding: "26px 0", color: "var(--wm-success-500)", fontWeight: 600, fontSize: 14, display: "flex", flexDirection: "column", gap: 8, alignItems: "center" } },
            e(I.checkCircle, { size: 30 }), "Sin alertas pendientes")
        : e("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
            items.map((a) => {
              const cf = ALERT[a.type];
              return e("div", { key: a.id, className: "gm-fade", style: { border: "1px solid " + cf.bd, background: cf.bg, borderRadius: 10, padding: "12px 14px" } },
                e("div", { style: { display: "flex", gap: 10, alignItems: "flex-start" } },
                  e("div", { style: { width: 28, height: 28, borderRadius: 8, flex: "0 0 auto", background: "#fff", color: cf.color, display: "grid", placeItems: "center" } }, e(I[cf.icon], { size: 16 })),
                  e("div", { style: { flex: 1, minWidth: 0 } },
                    e("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
                      e("span", { style: { fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: cf.color } }, cf.tag),
                      e("span", { style: { fontSize: 11, color: "var(--wm-ns-300)", marginLeft: "auto" } }, "hace " + a.age)),
                    e("div", { style: { fontWeight: 700, fontSize: 13, margin: "2px 0 3px" } }, a.title),
                    e("div", { style: { fontSize: 12, color: "var(--wm-ns-400)", lineHeight: 1.45 } }, a.body),
                    e("div", { style: { display: "flex", gap: 8, marginTop: 9, alignItems: "center" } },
                      e("button", { className: "gm-btn gm-btn--sm gm-btn--primary", onClick: () => go(a.screen) }, "Resolver"),
                      e("button", { className: "gm-btn gm-btn--sm gm-btn--ghost", onClick: () => remove(a.id) }, "Descartar"),
                      e("span", { style: { marginLeft: "auto", fontSize: 11, color: "var(--wm-ns-300)", display: "flex", alignItems: "center", gap: 4, minWidth: 0, flexShrink: 1, maxWidth: "90px" } },
                        e(I.box, { size: 12 }),
                        e("span", { style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, a.step))))));
            })));
  }



  // ---- Shell ----
  function Inicio({ go }) {
    const season = GM.season;
    return e("div", { className: "gm-page gm-fade", style: { paddingBottom: 32 } },

      // Header
      e("div", { style: { display: "flex", alignItems: "flex-end", gap: 14, flexWrap: "wrap", marginBottom: 20 } },
        e("h1", { className: "gm-page__title", style: { fontSize: 32 } }, season.name),
        e("span", { className: "gm-chip gm-chip--active gm-chip--lg" }, season.division),
        e("div", { style: { marginLeft: "auto", textAlign: "right", fontSize: 12.5, color: "var(--wm-ns-300)" } },
          e("div", null, "Semana ", e("b", { style: { color: "var(--wm-ns-600)" } }, season.weekNo), " de ", season.weekTotal),
          e("div", null, "Inicio: ", season.startDate))),

      // 2 columnas: paso activo (izquierda) + alertas (derecha)
      e("div", { style: { display: "grid", gridTemplateColumns: "1fr 340px", gap: 16, marginBottom: 16, alignItems: "start" } },
        e(StepPreview, { go }),
        e(Alerts, { go })));
  }

  window.GMScreens = Object.assign(window.GMScreens || {}, { Inicio });
})();
