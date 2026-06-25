/* GM — Contramuestras · Galería de imágenes HQ por SKU (Fase 3).
   Estado por SKU: pendiente | recibida | aprobada · llegan por email auto-vinculado.
   Vista vía tweaks.contramuestras: "galeria" | "lista"
   → window.GMScreens.Contramuestras */
(function () {
  const e = React.createElement;
  const I = window.GMIcon;
  const { Chip, Btn, ProdImg, Progress, PageHead, AdvanceBar } = window.GMUI;

  const provName = (p) => GM.providers[p].name;
  // deterministic seed of image states across the 12 SKUs
  const SEED = ["aprobada", "aprobada", "recibida", "pendiente", "recibida", "aprobada", "pendiente", "recibida", "pendiente", "aprobada", "aprobada", "recibida"];
  const LABEL = { pendiente: ["neutral", "Imagen pendiente"], recibida: ["active", "Imagen recibida"], aprobada: ["success", "Imagen aprobada"] };

  function Slot({ s, st, big }) {
    if (st === "pendiente")
      return e("div", { style: { height: big ? 220 : 150, border: "1.5px dashed var(--wm-ns-200)", borderRadius: 8, background: "var(--wm-ns-050)", display: "grid", placeItems: "center", color: "var(--wm-ns-300)" } },
        e("div", { style: { textAlign: "center" } }, e(I.image, { size: 26, style: { opacity: .6 } }), e("div", { style: { fontSize: 11.5, marginTop: 6 } }, "Sin imagen recibida")));
    return e("div", { style: { position: "relative" } },
      e(ProdImg, { swatch: s.swatch, style: { height: big ? 220 : 150 } }),
      st === "aprobada" && e("div", { style: { position: "absolute", bottom: 8, left: 8, display: "flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,.94)", borderRadius: 6, padding: "3px 8px", fontSize: 10.5, fontWeight: 700, color: "var(--wm-success-500)" } }, e(I.check, { size: 12 }), "HQ · lista para manuales"));
  }

  function PenaltyBadge({ penalty }) {
    if (!penalty) return null;
    const color = penalty.penalty === "penalty" ? "var(--wm-error-500)" : "var(--wm-warn-500)";
    const label = penalty.penalty === "penalty" ? "Penalty aplicado" : "Advertencia formal";
    return e("div", { title: "Motivo: " + penalty.reason,
      style: { display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, color, background: penalty.penalty === "penalty" ? "#fff0f0" : "#fff9e6", border: "1px solid " + color, borderRadius: 6, padding: "3px 8px" } },
      e(I.alert, { size: 12 }), label);
  }

  function Card({ s, st, penalty, onApprove, onResend, onRequest }) {
    const [v, lbl] = LABEL[st];
    return e("div", { className: "gm-card", style: { padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" } },
      e("div", { style: { position: "relative" } },
        e(Slot, { s, st }),
        e("div", { style: { position: "absolute", top: 8, right: 8 } }, e(Chip, { variant: v, label: lbl }))),
      e("div", { style: { padding: 12, display: "flex", flexDirection: "column", gap: 9, flex: 1 } },
        e("div", null,
          e("div", { style: { fontSize: 10.5, fontWeight: 700, color: "var(--wm-sb-400)" } }, s.id),
          e("div", { style: { fontWeight: 700, fontSize: 13.5, lineHeight: 1.2, margin: "2px 0 4px" } }, s.name),
          e("div", { style: { fontSize: 11.5, color: "var(--wm-ns-300)", display: "flex", alignItems: "center", gap: 5 } }, e(I.truck, { size: 12 }), provName(s.prov))),
        // email auto-link note
        st !== "pendiente" && e("div", { style: { fontSize: 11, color: "var(--wm-ns-400)", display: "flex", alignItems: "flex-start", gap: 6, background: "var(--wm-ns-050)", borderRadius: 7, padding: "6px 8px" } },
          e(I.mailOpen, { size: 13, style: { color: "var(--wm-sb-400)", flex: "0 0 auto", marginTop: 1 } }),
          e("span", null, "Recibida por correo y vinculada automáticamente al SKU.")),
        penalty && e("div", { style: { marginBottom: 4 } }, e(PenaltyBadge, { penalty })),
        e("div", { style: { marginTop: "auto", display: "flex", gap: 7, flexWrap: "wrap" } },
          st === "pendiente" && e(Btn, { variant: "primary", size: "sm", icon: "send", onClick: onRequest }, "Solicitar a proveedor"),
          st === "recibida" && e(React.Fragment, null,
            e(Btn, { variant: "primary", size: "sm", icon: "check", onClick: onApprove }, "Aprobar"),
            e(Btn, { variant: "ghost", size: "sm", icon: "refresh", onClick: onResend }, "Solicitar reenvío")),
          st === "aprobada" && e(Chip, { variant: "success", label: "Lista para manuales", lg: true }))));
  }

  function Row({ s, st, penalty, onApprove, onResend, onRequest }) {
    const [v, lbl] = LABEL[st];
    return e("div", { className: "gm-card", style: { display: "flex", gap: 14, alignItems: "center", padding: 12 } },
      e("div", { style: { width: 70, flex: "0 0 auto" } }, e(Slot, { s, st, big: false })),
      e("div", { style: { flex: 1, minWidth: 0 } },
        e("div", { style: { fontSize: 10.5, fontWeight: 700, color: "var(--wm-sb-400)" } }, s.id),
        e("div", { style: { fontWeight: 700, fontSize: 14 } }, s.name),
        e("div", { style: { fontSize: 11.5, color: "var(--wm-ns-300)", display: "flex", alignItems: "center", gap: 5 } }, e(I.truck, { size: 12 }), provName(s.prov))),
      e(Chip, { variant: v, label: lbl }),
      penalty && e(PenaltyBadge, { penalty }),
      e("div", { style: { display: "flex", gap: 7 } },
        st === "pendiente" && e(Btn, { variant: "secondary", size: "sm", icon: "send", onClick: onRequest }, "Solicitar"),
        st === "recibida" && e(React.Fragment, null,
          e(Btn, { variant: "primary", size: "sm", icon: "check", onClick: onApprove }, "Aprobar"),
          e(Btn, { variant: "ghost", size: "sm", icon: "refresh", onClick: onResend }, "Reenvío")),
        st === "aprobada" && e(Btn, { variant: "ghost", size: "sm", icon: "eye" }, "Ver")));
  }

  const RESEND_REASONS = [
    "Imagen borrosa o fuera de foco",
    "Color no corresponde al estándar aprobado",
    "Muestra dañada o incompleta",
    "Ángulo / encuadre incorrecto",
    "Fondo o iluminación inadecuada",
    "Otro motivo",
  ];

  const PENALTY_OPTS = [
    { value: "no",      label: "Sin penalty",            sub: "Error menor, primera vez" },
    { value: "warning", label: "Advertencia formal",     sub: "Queda en el historial del proveedor" },
    { value: "penalty", label: "Aplicar penalty",        sub: "Descuento según contrato" },
  ];

  function ResendModal({ sku, onConfirm, onCancel }) {
    const [reason,  setReason]  = React.useState("");
    const [custom,  setCustom]  = React.useState("");
    const [penalty, setPenalty] = React.useState("no");
    const ok = reason !== "";

    return e("div", { style: { position: "fixed", inset: 0, background: "rgba(0,0,0,.45)", display: "grid", placeItems: "center", zIndex: 200 } },
      e("div", { className: "gm-card", style: { width: 480, maxWidth: "95vw", padding: 24, display: "flex", flexDirection: "column", gap: 20 } },

        // header
        e("div", { style: { display: "flex", alignItems: "flex-start", gap: 12 } },
          e("div", { style: { width: 40, height: 40, borderRadius: 10, background: "var(--wm-warn-100)", color: "var(--wm-warn-500)", display: "grid", placeItems: "center", flex: "0 0 auto" } },
            e(I.refresh, { size: 20 })),
          e("div", { style: { flex: 1 } },
            e("div", { style: { fontSize: 16, fontWeight: 800 } }, "Solicitar reenvío"),
            e("div", { style: { fontSize: 12.5, color: "var(--wm-ns-400)", marginTop: 2 } },
              e("b", { style: { color: "var(--wm-sb-400)" } }, sku.id), " · " + sku.name)),
          e("button", { onClick: onCancel, style: { background: "none", border: "none", cursor: "pointer", color: "var(--wm-ns-300)", padding: 4 } },
            e(I.x, { size: 18 }))),

        // motivo
        e("div", null,
          e("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--wm-ns-400)", marginBottom: 8 } }, "Motivo del reenvío"),
          e("div", { style: { display: "flex", flexDirection: "column", gap: 6 } },
            RESEND_REASONS.map((r) => e("label", { key: r, style: { display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 8, border: "1.5px solid", borderColor: reason === r ? "var(--wm-sb-400)" : "var(--wm-ns-100)", background: reason === r ? "var(--wm-sb-100)" : "#fff", cursor: "pointer", transition: "all .15s" } },
              e("input", { type: "radio", name: "reason", value: r, checked: reason === r, onChange: () => setReason(r),
                style: { accentColor: "var(--wm-sb-400)", width: 15, height: 15, flex: "0 0 auto" } }),
              e("span", { style: { fontSize: 13, color: "var(--wm-ns-600)" } }, r)))),
          reason === "Otro motivo" && e("textarea", { value: custom, onChange: (ev) => setCustom(ev.target.value),
            placeholder: "Describe el problema con más detalle…",
            style: { marginTop: 8, width: "100%", minHeight: 68, fontFamily: "inherit", fontSize: 13, border: "1px solid var(--wm-ns-100)", borderRadius: 8, padding: "8px 10px", resize: "vertical", boxSizing: "border-box", color: "var(--wm-ns-600)" } })),

        // penalty
        e("div", null,
          e("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--wm-ns-400)", marginBottom: 8 } }, "¿Aplica penalty al proveedor?"),
          e("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 } },
            PENALTY_OPTS.map(({ value, label, sub }) => {
              const active = penalty === value;
              const accent = value === "penalty" ? "var(--wm-error-500)" : value === "warning" ? "var(--wm-warn-500)" : "var(--wm-success-500)";
              return e("button", { key: value, onClick: () => setPenalty(value),
                style: { padding: "10px 10px 11px", borderRadius: 10, border: "2px solid", borderColor: active ? accent : "var(--wm-ns-100)", background: active ? (value === "penalty" ? "#fff0f0" : value === "warning" ? "#fff9e6" : "var(--wm-success-100)") : "#fff", cursor: "pointer", textAlign: "left", transition: "all .15s", fontFamily: "inherit" } },
                e("div", { style: { fontSize: 12.5, fontWeight: 700, color: active ? accent : "var(--wm-ns-500)", marginBottom: 2 } }, label),
                e("div", { style: { fontSize: 11, color: "var(--wm-ns-300)", lineHeight: 1.3 } }, sub));
            }))),

        // actions
        e("div", { style: { display: "flex", gap: 10, justifyContent: "flex-end", borderTop: "1px solid var(--wm-ns-100)", paddingTop: 16 } },
          e(Btn, { variant: "ghost", onClick: onCancel }, "Cancelar"),
          e(Btn, { variant: ok ? "primary" : "secondary", onClick: ok ? () => onConfirm({ reason: reason === "Otro motivo" ? custom || reason : reason, penalty }) : undefined,
            style: ok ? {} : { opacity: .5, pointerEvents: "none" } },
            "Confirmar reenvío"))));
  }

  function Contramuestras({ go, tweaks }) {
    const view = (tweaks && tweaks.contramuestras) || "galeria";
    const [st, setSt] = React.useState(() => Object.fromEntries(GM.skus.map((s, i) => [s.id, SEED[i % SEED.length]])));
    const [filter, setFilter] = React.useState("todas");
    const [resendSku, setResendSku] = React.useState(null);
    const [penalties, setPenalties] = React.useState({});
    const [approved, setApproved] = React.useState(false);
    const setOne = (id, v) => setSt((x) => ({ ...x, [id]: v }));

    function handleResendConfirm({ reason, penalty }) {
      setOne(resendSku.id, "pendiente");
      if (penalty !== "no") setPenalties((p) => ({ ...p, [resendSku.id]: { reason, penalty } }));
      setResendSku(null);
    }

    const counts = {
      total: GM.skus.length,
      aprobada: GM.skus.filter((s) => st[s.id] === "aprobada").length,
      recibida: GM.skus.filter((s) => st[s.id] === "recibida").length,
      pendiente: GM.skus.filter((s) => st[s.id] === "pendiente").length,
    };
    const filtered = GM.skus.filter((s) => filter === "todas" || st[s.id] === filter);
    const filters = [["todas", "Todas", counts.total], ["pendiente", "Pendiente", counts.pendiente], ["recibida", "Recibida", counts.recibida], ["aprobada", "Aprobada", counts.aprobada]];

    return e("div", { className: "gm-page gm-fade", style: { paddingBottom: 80 } },
      resendSku && e(ResendModal, { sku: resendSku, onConfirm: handleResendConfirm, onCancel: () => setResendSku(null) }),
      PageHead({
        title: "Galería de contramuestras",
        subtitle: "Fase 3 · Materiales — imágenes HQ por SKU, insumo visual para los manuales de exhibición",
        actions: counts.pendiente > 0 && e(Btn, { variant: "primary", size: "sm", icon: "send", onClick: () => setSt((x) => Object.fromEntries(Object.entries(x).map(([k, v]) => [k, v === "pendiente" ? "recibida" : v])) ) }, "Solicitar " + counts.pendiente + " pendientes"),
      }),

      // coverage
      e("div", { className: "gm-card gm-card--pad-lg", style: { marginBottom: 16 } },
        e("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 12 } },
          e("div", { style: { width: 40, height: 40, borderRadius: 11, background: "var(--wm-sb-200)", color: "var(--wm-sb-400)", display: "grid", placeItems: "center", flex: "0 0 auto" } }, e(I.image, { size: 22 })),
          e("div", { style: { flex: 1 } },
            e("div", { style: { fontWeight: 700, fontSize: 15 } }, "Cobertura de imágenes"),
            e("div", { style: { fontSize: 12.5, color: "var(--wm-ns-300)" } }, e("b", { style: { color: "var(--wm-success-500)" } }, counts.aprobada), " de ", counts.total, " SKUs con imagen HQ aprobada y lista para manuales")),
          e("div", { style: { display: "flex", gap: 8 } },
            e(Chip, { variant: "neutral", label: counts.pendiente + " pendientes" }),
            e(Chip, { variant: "active", label: counts.recibida + " por revisar" }),
            e(Chip, { variant: "success", label: counts.aprobada + " aprobadas" }))),
        e(Progress, { value: counts.aprobada, total: counts.total, color: "var(--wm-success-500)" })),

      // filters
      e("div", { style: { display: "flex", gap: 7, marginBottom: 18, flexWrap: "wrap" } },
        filters.map(([k, l, n]) => e("button", { key: k, onClick: () => setFilter(k),
          className: "gm-chip gm-chip--" + (filter === k ? "active" : "neutral"), style: { cursor: "pointer", height: 30, fontSize: 12.5 } },
          l, e("span", { style: { opacity: .6 } }, n)))),

      // grid / list
      view === "galeria"
        ? e("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 14 } },
            filtered.map((s) => e(Card, { key: s.id, s, st: st[s.id], penalty: penalties[s.id], onApprove: () => setOne(s.id, "aprobada"), onResend: () => setResendSku(s), onRequest: () => setOne(s.id, "recibida") })))
        : e("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
            filtered.map((s) => e(Row, { key: s.id, s, st: st[s.id], penalty: penalties[s.id], onApprove: () => setOne(s.id, "aprobada"), onResend: () => setResendSku(s), onRequest: () => setOne(s.id, "recibida") }))),

      e("div", { style: { fontSize: 11.5, color: "var(--wm-ns-300)", marginTop: 16, display: "flex", alignItems: "center", gap: 6 } },
        e(I.alert, { size: 13 }), "Los SKUs sin imagen HQ generan una alerta en el dashboard — bloquean el armado de los manuales de exhibición."),

      e(AdvanceBar, { stepId: "contramuestras", onComplete: () => setApproved(true), go, completed: approved }));
  }

  window.GMScreens = Object.assign(window.GMScreens || {}, { Contramuestras });
})();
