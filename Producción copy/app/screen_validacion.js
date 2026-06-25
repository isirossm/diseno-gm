/* GM — Validación (Fase 4). 7 gates secuenciales por SKU.
   → window.GMScreens.Validacion */
(function () {
  const e = React.createElement;
  const I = window.GMIcon;
  const { Chip, Btn, ProdImg, Progress, PageHead, AdvanceBar } = window.GMUI;
  const provName = (p) => GM.providers[p].name;

  // ── 7 Gates ──────────────────────────────────────────────────────────────
  const GATES = [
    {
      id: "fit",
      label: "Fit 1 & Fit 2",
      icon: "hanger",
      desc: "Prueba de fit en talla base, dos iteraciones hasta aprobación.",
      items: ["Fit 1 aprobado", "Fit 2 aprobado", "Comentarios enviados al proveedor", "Ajustes definidos y confirmados"],
    },
    {
      id: "materiales",
      label: "Materiales y colores",
      icon: "layers",
      desc: "Verificación de materiales, calidades, acabados y estándar de color.",
      items: ["Materiales revisados vs. especificación", "Colores aprobados (vs. estándar Pantone)", "Calidades y acabados OK", "OK para producción"],
    },
    {
      id: "graficos",
      label: "Gráficos",
      icon: "image",
      desc: "Aprobación de todos los elementos gráficos aplicados a la prenda.",
      items: ["Gráficos aprobados", "Estampados OK", "Rapports verificados", "Bordados OK", "Validación para producción"],
    },
    {
      id: "trims",
      label: "Trims y accesorios",
      icon: "sparkles",
      desc: "Revisión física de todos los trims, apliques y accesorios.",
      items: ["Trims aprobados", "Accesorios revisados", "Apliques y etiquetas OK", "OK para producción"],
    },
    {
      id: "packaging",
      label: "Packaging y labels",
      icon: "box",
      desc: "Aprobación de packaging, etiquetado y cumplimiento normativo.",
      items: ["Packaging aprobado", "Labels y etiquetas OK", "Cumplimiento normativo verificado", "OK para producción"],
    },
    {
      id: "pp_sample",
      label: "PP Sample",
      icon: "clipboardCheck",
      desc: "Gate de pre-producción: todos los atributos ejecutados antes de iniciar masiva.",
      items: ["Todos los atributos correctamente ejecutados", "Calidad y acabados alineados al estándar", "GO producción o ajustes antes de bulk definidos"],
      gate: true,
      gateLabel: "GO producción",
      gateColor: "var(--wm-sb-400)",
    },
    {
      id: "shipment",
      label: "Shipment Sample",
      icon: "truck",
      desc: "Validación final de la muestra de producción como estándar de referencia.",
      items: ["Muestra final aprobada", "OK despacho confirmado", "Estándar de referencia definido", "Muestra enviada a showroom y tiendas"],
      gate: true,
      gateLabel: "OK despacho",
      gateColor: "var(--wm-success-500)",
    },
  ];

  // ── Seed state ────────────────────────────────────────────────────────────
  const SEED_PROGRESS = [5, 7, 3, 2, 1, 4, 6, 3, 0, 5, 7, 2];

  function makeSkuState(idx) {
    const prog = SEED_PROGRESS[idx % SEED_PROGRESS.length];
    const gates = {};
    GATES.forEach((g, i) => {
      if (i < prog) {
        gates[g.id] = { status: "aprobado", items: Object.fromEntries(g.items.map((it) => [it, true])), notes: "" };
      } else if (i === prog && idx % 3 === 1) {
        gates[g.id] = { status: "con_obs", items: Object.fromEntries(g.items.map((it, j) => [it, j < 2])), notes: "Requiere ajuste antes de avanzar." };
      } else {
        gates[g.id] = { status: "pendiente", items: Object.fromEntries(g.items.map((it) => [it, false])), notes: "" };
      }
    });
    return gates;
  }

  // gate is unlocked if all previous gates are "aprobado"
  function isUnlocked(gateIdx, skuGates) {
    if (gateIdx === 0) return true;
    return GATES.slice(0, gateIdx).every((g) => skuGates[g.id].status === "aprobado");
  }

  function gatesApproved(skuGates) {
    return GATES.filter((g) => skuGates[g.id].status === "aprobado").length;
  }

  function overallStatus(skuGates) {
    if (GATES.every((g) => skuGates[g.id].status === "aprobado")) return "go";
    if (GATES.some((g) => skuGates[g.id].status === "con_obs"))   return "obs";
    return "proc";
  }

  const OVERALL_META = {
    go:   { variant: "success", label: "GO · OK despacho" },
    obs:  { variant: "warning", label: "Con observaciones" },
    proc: { variant: "active",  label: "En validación" },
  };

  const GATE_STATUS_META = {
    aprobado: { color: "var(--wm-success-500)", bg: "var(--wm-success-100)", dot: "var(--wm-success-500)" },
    con_obs:  { color: "var(--wm-warn-500)",    bg: "#fff9e6",               dot: "var(--wm-warn-500)" },
    pendiente:{ color: "var(--wm-ns-300)",      bg: "var(--wm-ns-050)",      dot: "var(--wm-ns-200)" },
  };

  // ── Dashboard card ─────────────────────────────────────────────────────────
  function SkuCard({ s, skuGates, onOpen }) {
    const approved = gatesApproved(skuGates);
    const os       = overallStatus(skuGates);
    const { variant, label } = OVERALL_META[os];

    return e("button", { onClick: () => onOpen(s.id), className: "gm-card gm-card--hover",
      style: { padding: 0, overflow: "hidden", textAlign: "left", cursor: "pointer", display: "flex", flexDirection: "column" } },

      // color top-bar
      e("div", { style: { height: 4, background: os === "go" ? "var(--wm-success-500)" : os === "obs" ? "var(--wm-warn-500)" : "var(--wm-sb-400)" } }),

      e("div", { style: { padding: "12px 14px" } },
        e("div", { style: { display: "flex", gap: 10, alignItems: "center", marginBottom: 12 } },
          e(ProdImg, { swatch: s.swatch, style: { width: 34, height: 34, borderRadius: 8, flex: "0 0 auto" } }),
          e("div", { style: { flex: 1, minWidth: 0 } },
            e("div", { style: { fontSize: 10.5, fontWeight: 700, color: "var(--wm-sb-400)" } }, s.id),
            e("div", { style: { fontWeight: 700, fontSize: 13, lineHeight: 1.2 } }, s.name)),
          e(Chip, { variant, label })),

        // 7-segment bar
        e("div", { style: { display: "flex", gap: 3, marginBottom: 8 } },
          GATES.map((g, i) => {
            const st = skuGates[g.id].status;
            const meta = GATE_STATUS_META[st];
            return e("div", { key: g.id, title: g.label,
              style: { flex: 1, height: 6, borderRadius: 3, background: meta.dot, transition: "background .3s" } });
          })),

        e("div", { style: { fontSize: 11.5, color: "var(--wm-ns-300)" } },
          e("b", { style: { color: "var(--wm-ns-500)" } }, approved), " / 7 gates · ",
          os === "go" ? "Completo" : "Gate " + (approved + 1) + ": " + GATES[Math.min(approved, 6)].label)));
  }

  // ── Dashboard overview ─────────────────────────────────────────────────────
  function Dashboard({ allStates, onOpen }) {
    const totalGo = Object.values(allStates).filter((sg) => overallStatus(sg) === "go").length;
    const total   = GM.skus.length;
    const pct     = Math.round((totalGo / total) * 100);

    // per-gate coverage
    const coverage = GATES.map((g) =>
      Object.values(allStates).filter((sg) => sg[g.id].status === "aprobado").length);

    return e("div", { style: { display: "flex", flexDirection: "column", gap: 20 } },
      // hero progress
      e("div", { className: "gm-card", style: { padding: "20px 24px", display: "flex", gap: 24, alignItems: "center",
        background: totalGo === total ? "linear-gradient(100deg,var(--wm-success-100),#fff 60%)" : "#fff",
        border: "1.5px solid " + (totalGo === total ? "var(--wm-success-500)" : "var(--wm-ns-100)"),
        transition: "all .4s" } },
        e("div", { style: { textAlign: "center", flex: "0 0 auto", width: 72 } },
          e("div", { style: { fontSize: 40, fontWeight: 900, lineHeight: 1, color: totalGo === total ? "var(--wm-success-500)" : "var(--wm-ns-600)" } }, pct + "%"),
          e("div", { style: { fontSize: 11, color: "var(--wm-ns-300)", marginTop: 2 } }, "GO despacho")),
        e("div", { style: { flex: 1 } },
          e("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--wm-ns-300)", marginBottom: 8 } },
            "Progreso global · " + total + " SKUs"),
          e("div", { style: { height: 10, borderRadius: 99, background: "var(--wm-ns-100)", overflow: "hidden", marginBottom: 10 } },
            e("div", { style: { height: "100%", width: pct + "%", background: totalGo === total ? "var(--wm-success-500)" : "var(--wm-sb-400)", borderRadius: 99, transition: "width .5s" } })),
          e("div", { style: { display: "flex", gap: 16, flexWrap: "wrap" } },
            e("span", { style: { fontSize: 12.5, color: "var(--wm-success-500)", fontWeight: 700 } }, "✓ " + totalGo + " GO"),
            e("span", { style: { fontSize: 12.5, color: "var(--wm-warn-500)", fontWeight: 700 } },
              "⚠ " + Object.values(allStates).filter((sg) => overallStatus(sg) === "obs").length + " con obs."),
            e("span", { style: { fontSize: 12.5, color: "var(--wm-ns-300)" } },
              "○ " + Object.values(allStates).filter((sg) => overallStatus(sg) === "proc").length + " en proceso")))),

      // SKU grid
      e("div", { style: { fontSize: 11.5, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--wm-ns-300)" } },
        "Fichas · " + total),
      e("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 12 } },
        GM.skus.map((s) => e(SkuCard, { key: s.id, s, skuGates: allStates[s.id], onOpen }))));
  }

  // ── Gate row (expandable) ──────────────────────────────────────────────────
  function GateRow({ gate, gIdx, gateState, unlocked, onApprove, onSetObs, onToggleItem, onNote, onClear }) {
    const [open, setOpen] = React.useState(gateState.status !== "pendiente");
    const st   = gateState.status;
    const meta = GATE_STATUS_META[st];
    const allChecked = gate.items.every((it) => gateState.items[it]);
    const canApprove = unlocked && allChecked && st !== "aprobado";

    return e("div", { style: {
      border: "1.5px solid",
      borderColor: st === "aprobado" ? "var(--wm-success-500)" : st === "con_obs" ? "var(--wm-warn-500)" : unlocked ? "var(--wm-ns-200)" : "var(--wm-ns-100)",
      borderRadius: 12, overflow: "hidden", opacity: !unlocked ? .55 : 1, transition: "opacity .2s" } },

      // gate header
      e("button", { onClick: () => unlocked && setOpen(!open), style: {
        width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "13px 16px",
        background: st === "aprobado" ? "var(--wm-success-100)" : st === "con_obs" ? "#fff9e6" : unlocked ? "#fff" : "var(--wm-ns-050)",
        border: "none", cursor: unlocked ? "pointer" : "default", textAlign: "left", fontFamily: "inherit",
        borderBottom: open ? "1px solid var(--wm-ns-100)" : "none" } },

        // step number / icon
        e("div", { style: { width: 32, height: 32, borderRadius: "50%", flex: "0 0 auto", display: "grid", placeItems: "center",
          background: st === "aprobado" ? "var(--wm-success-500)" : st === "con_obs" ? "var(--wm-warn-500)" : unlocked ? "var(--wm-sb-400)" : "var(--wm-ns-200)",
          color: "#fff" } },
          st === "aprobado" ? e(I.check, { size: 16 }) : !unlocked ? e(I.lock, { size: 14 }) : e(I[gate.icon], { size: 16 })),

        e("div", { style: { flex: 1 } },
          e("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
            e("span", { style: { fontWeight: 700, fontSize: 14.5, color: "var(--wm-ns-700)" } }, gate.label),
            gate.gate && e("span", { style: { fontSize: 10.5, fontWeight: 700, padding: "2px 7px", borderRadius: 6, background: gate.gateColor, color: "#fff" } }, "GATE"),
            e("span", { style: { fontSize: 11.5, color: "var(--wm-ns-300)", marginLeft: "auto" } },
              gate.items.filter((it) => gateState.items[it]).length + "/" + gate.items.length)),
          e("div", { style: { fontSize: 12, color: "var(--wm-ns-400)", marginTop: 2 } }, gate.desc)),

        e(I.chevron, { size: 16, style: { color: "var(--wm-ns-300)", flex: "0 0 auto", transform: open ? "rotate(180deg)" : "none", transition: "transform .15s" } })),

      // gate body
      open && e("div", { className: "gm-fade", style: { padding: "14px 16px 16px", display: "flex", flexDirection: "column", gap: 14 } },

        // checklist
        e("div", { style: { display: "flex", flexDirection: "column", gap: 1 } },
          gate.items.map((it) => e("label", { key: it, style: {
            display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8,
            cursor: st === "aprobado" || !unlocked ? "default" : "pointer",
            background: gateState.items[it] ? "var(--wm-success-100)" : "transparent",
            transition: "background .15s" } },
            e("input", { type: "checkbox", checked: gateState.items[it], disabled: st === "aprobado" || !unlocked,
              onChange: () => onToggleItem(it),
              style: { width: 16, height: 16, accentColor: "var(--wm-success-500)", flex: "0 0 auto" } }),
            e("span", { style: { fontSize: 13.5, color: gateState.items[it] ? "var(--wm-success-600, var(--wm-success-500))" : "var(--wm-ns-500)", fontWeight: gateState.items[it] ? 600 : 400 } }, it)))),

        // observations
        st === "con_obs" && e("div", { style: { background: "#fff9e6", border: "1px solid #f2dca0", borderRadius: 8, padding: "10px 12px" } },
          e("div", { style: { fontSize: 11, fontWeight: 700, color: "var(--wm-warn-500)", marginBottom: 6, display: "flex", alignItems: "center", gap: 5 } },
            e(I.alert, { size: 13 }), "Observaciones"),
          e("div", { style: { fontSize: 13, color: "var(--wm-ns-500)" } }, gateState.notes)),

        // notes textarea (if unlocked and not yet approved)
        st !== "aprobado" && unlocked && e("textarea", { value: gateState.notes, onChange: (ev) => onNote(ev.target.value),
          placeholder: "Notas técnicas, observaciones, ajustes requeridos…",
          style: { width: "100%", minHeight: 68, fontFamily: "inherit", fontSize: 13, border: "1px solid var(--wm-ns-100)", borderRadius: 8, padding: "8px 10px", resize: "vertical", boxSizing: "border-box", color: "var(--wm-ns-600)" } }),

        // actions
        st !== "aprobado" && unlocked && e("div", { style: { display: "flex", gap: 8 } },
          e("button", { onClick: onApprove, disabled: !canApprove, style: {
            flex: 1, padding: "10px 0", borderRadius: 10, border: "none",
            background: canApprove ? (gate.gate ? gate.gateColor : "var(--wm-success-500)") : "var(--wm-ns-100)",
            color: canApprove ? "#fff" : "var(--wm-ns-300)", fontWeight: 700, fontSize: 14, cursor: canApprove ? "pointer" : "default",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "inherit", transition: "all .2s" } },
            e(I.check, { size: 16 }), gate.gate ? gate.gateLabel : "Aprobar gate"),
          e("button", { onClick: onSetObs, style: {
            padding: "10px 14px", borderRadius: 10, border: "1.5px solid var(--wm-warn-500)",
            background: "#fff", color: "var(--wm-warn-500)", fontWeight: 700, fontSize: 13.5, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit" } },
            e(I.alert, { size: 14 }), "Con obs.")),

        st === "aprobado" && e("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 10, background: "var(--wm-success-100)", border: "1px solid var(--wm-success-500)" } },
          e(I.checkCircle, { size: 18, style: { color: "var(--wm-success-500)", flex: "0 0 auto" } }),
          e("span", { style: { fontSize: 13, fontWeight: 700, color: "var(--wm-success-600, var(--wm-success-500))" } }, "Gate aprobado"),
          st === "aprobado" && gateState.notes && e("span", { style: { fontSize: 12, color: "var(--wm-ns-400)", marginLeft: 8 } }, "· " + gateState.notes),
          e("button", { onClick: onClear, style: { marginLeft: "auto", fontSize: 11.5, color: "var(--wm-ns-300)", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", textDecoration: "underline" } }, "Reabrir"))));
  }

  // ── Detail view ───────────────────────────────────────────────────────────
  function DetailView({ s, skuGates, onUpdate, onBack }) {
    const approved = gatesApproved(skuGates);
    const os       = overallStatus(skuGates);
    const { variant, label } = OVERALL_META[os];

    function updateGate(gId, patch) {
      onUpdate({ ...skuGates, [gId]: { ...skuGates[gId], ...patch } });
    }
    function toggleItem(gId, item) {
      const items = { ...skuGates[gId].items, [item]: !skuGates[gId].items[item] };
      updateGate(gId, { items });
    }

    return e("div", { className: "gm-fade", style: { display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, alignItems: "start" } },

      // left: 7 gates
      e("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
        e("button", { onClick: onBack, className: "gm-btn gm-btn--ghost gm-btn--sm", style: { alignSelf: "flex-start", marginBottom: 4 } },
          e(I.chevronLeft, { size: 14 }), "Todos los SKUs"),

        GATES.map((gate, gIdx) => {
          const gId = gate.id;
          const unlocked = isUnlocked(gIdx, skuGates);
          return e(GateRow, {
            key: gId, gate, gIdx, gateState: skuGates[gId], unlocked,
            onApprove: () => updateGate(gId, { status: "aprobado", items: Object.fromEntries(gate.items.map((it) => [it, true])) }),
            onSetObs:  () => updateGate(gId, { status: "con_obs" }),
            onClear:   () => updateGate(gId, { status: "pendiente" }),
            onToggleItem: (item) => toggleItem(gId, item),
            onNote:    (notes) => updateGate(gId, { notes }),
          });
        })),

      // right: sticky summary
      e("div", { style: { position: "sticky", top: 0, display: "flex", flexDirection: "column", gap: 12 } },

        // SKU card
        e("div", { className: "gm-card", style: { padding: 16 } },
          e("div", { style: { display: "flex", gap: 12, alignItems: "center", marginBottom: 14 } },
            e(ProdImg, { swatch: s.swatch, style: { width: 44, height: 44, borderRadius: 10, flex: "0 0 auto" } }),
            e("div", { style: { flex: 1 } },
              e("div", { style: { fontSize: 11, fontWeight: 700, color: "var(--wm-sb-400)" } }, s.id),
              e("div", { style: { fontSize: 16, fontWeight: 700 } }, s.name),
              e("div", { style: { fontSize: 12, color: "var(--wm-ns-300)", marginTop: 2 } }, provName(s.prov))),
            e(Chip, { variant, label })),
          e(Progress, { value: approved, total: 7 }),
          e("div", { style: { fontSize: 12, color: "var(--wm-ns-300)", marginTop: 8 } }, approved + " de 7 gates aprobados")),

        // gates summary list
        e("div", { className: "gm-card", style: { padding: "12px 14px" } },
          GATES.map((gate, gIdx) => {
            const st   = skuGates[gate.id].status;
            const meta = GATE_STATUS_META[st];
            const unlocked = isUnlocked(gIdx, skuGates);
            return e("div", { key: gate.id, style: { display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: gIdx < 6 ? "1px solid var(--wm-ns-050)" : "none", opacity: unlocked ? 1 : .45 } },
              e("span", { style: { width: 8, height: 8, borderRadius: "50%", flex: "0 0 auto", background: meta.dot } }),
              e("span", { style: { flex: 1, fontSize: 13, fontWeight: st === "aprobado" ? 600 : 400, color: st === "aprobado" ? "var(--wm-success-600,var(--wm-success-500))" : "var(--wm-ns-500)" } }, gate.label),
              gate.gate && e("span", { style: { fontSize: 10, fontWeight: 700, padding: "1px 5px", borderRadius: 4, background: gate.gateColor, color: "#fff" } }, "GATE"),
              st === "con_obs" && e(I.alert, { size: 13, style: { color: "var(--wm-warn-500)" } }));
          })),

        // final GO banner
        os === "go" && e("div", { style: {
          background: "linear-gradient(120deg,#d1fae5,#ecfdf5)", border: "1.5px solid var(--wm-success-500)",
          borderRadius: 12, padding: "16px 18px", textAlign: "center" } },
          e("div", { style: { fontSize: 28, fontWeight: 900, color: "var(--wm-success-500)", lineHeight: 1, marginBottom: 4 } }, "GO ✓"),
          e("div", { style: { fontSize: 13, fontWeight: 700, color: "var(--wm-success-600, var(--wm-success-500))" } }, "OK despacho"),
          e("div", { style: { fontSize: 12, color: "var(--wm-ns-400)", marginTop: 4 } }, "Estándar de referencia aprobado"))));
  }

  // ── Shell ─────────────────────────────────────────────────────────────────
  function Validacion({ go }) {
    const [states,   setStates]   = React.useState(() => Object.fromEntries(GM.skus.map((s, i) => [s.id, makeSkuState(i)])));
    const [openSku,  setOpenSku]  = React.useState(null);
    const [approved, setApproved] = React.useState(false);

    const totalGo = Object.values(states).filter((sg) => overallStatus(sg) === "go").length;

    return e("div", { className: "gm-page gm-fade", style: { paddingBottom: 80 } },
      PageHead({
        title: "Validación",
        subtitle: "Fase 4 · Producción — 7 gates por SKU: fits, materiales, gráficos, trims, packaging, PP sample y shipment",
      }),

      openSku
        ? e(DetailView, {
            s:         GM.skus.find((x) => x.id === openSku),
            skuGates:  states[openSku],
            onUpdate:  (newGates) => setStates((st) => ({ ...st, [openSku]: newGates })),
            onBack:    () => setOpenSku(null),
          })
        : e(Dashboard, { allStates: states, onOpen: setOpenSku }),

      e(AdvanceBar, { stepId: "validacion", onComplete: () => setApproved(true), go, completed: approved || totalGo === GM.skus.length }));
  }

  window.GMScreens = Object.assign(window.GMScreens || {}, { Validacion });
})();
