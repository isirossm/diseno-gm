/* GM shared components → window.GMUI */
(function () {
  const I = window.GMIcon;
  const e = React.createElement;

  // ---- status maps ----
  const CHIP = {
    // step
    completado: ["success", "Completado"], curso: ["active", "En curso"], pendiente: ["neutral", "Pendiente"], bloqueado: ["error", "Bloqueado"],
    // muestra
    pendiente_envio: ["neutral", "Pendiente envío"], enviado: ["active", "Enviado"], en_revision: ["warning", "En revisión"], recibido: ["success", "Recibido"],
    // ficha
    sin_iniciar: ["neutral", "Sin iniciar"], en_progreso: ["active", "En progreso"], progreso: ["active", "En progreso"],
    completa: ["success", "Completa"], en_revision: ["warning", "En revisión"], aprobada: ["success", "Aprobada"],
    rechazada: ["error", "Rechazada"],
    // review
    sin: ["neutral", "Sin revisión"], feedback: ["warning", "Con feedback"], ajuste: ["warning", "Requiere ajuste"], aprobado: ["success", "Aprobado"],
    // validation
    apr: ["success", "Aprobado"], aj: ["warning", "Requiere ajuste"], pend: ["neutral", "Pendiente"], go: ["success", "GO"],
  };
  const DOT = { success: "var(--wm-success-500)", active: "var(--wm-sb-400)", warning: "var(--wm-warn-500)", error: "var(--wm-error-500)", neutral: "var(--wm-ns-300)" };

  function Chip({ k, label, variant, dot = true, lg }) {
    const [v, lbl] = k ? CHIP[k] : [variant, label];
    return e("span", { className: "gm-chip gm-chip--" + v + (lg ? " gm-chip--lg" : "") },
      dot && e("span", { className: "dot", style: { background: DOT[v] } }), label || lbl);
  }

  function Btn({ variant = "secondary", size, icon, iconRight, children, block, ...p }) {
    const cls = ["gm-btn", "gm-btn--" + variant, size && "gm-btn--" + size, block && "gm-btn--block"].filter(Boolean).join(" ");
    return e("button", { className: cls, ...p },
      icon && e(I[icon], { size: size === "lg" ? 18 : 16 }),
      children,
      iconRight && e(I[iconRight], { size: 16 }));
  }

  function IconBtn({ icon, title, onClick }) {
    return e("button", { className: "gm-btn gm-btn--icon", title, onClick }, e(I[icon], { size: 17 }));
  }

  // product image placeholder driven by swatch color
  function ProdImg({ swatch = "#e6e6e6", style, label }) {
    const isApp4 = window.location.pathname.toLowerCase().indexOf('/app 4/app/') !== -1 || window.location.pathname.toLowerCase().indexOf('/app%204/app/') !== -1;
    const isFicha = window.location.pathname.toLowerCase().indexOf('/ficha/') !== -1 || window.location.pathname.toLowerCase().indexOf('/uploads/') !== -1;
    const isProd = window.location.pathname.toLowerCase().indexOf('/producción copy/') !== -1 || window.location.pathname.toLowerCase().indexOf('/producci%c3%b3n%20copy/') !== -1;

    let imgPrefix = "Img/16 prendas/";
    if (isApp4 || isFicha) {
      imgPrefix = "../../Img/16 prendas/";
    } else if (isProd) {
      imgPrefix = "../Img/16 prendas/";
    }

    const SWATCH_TO_IMG = {
      "#f4f3ee": "Polera básica algodón pima.png",
      "#2a3b59": "Jeans skinny tiro alto.png",
      "#ffbe98": "Vestido midi floral viscosa.png",
      "#92a8d1": "Blusa manga abullonada.png",
      "#f4d35e": "Short lino cintura paperbag.png",
      "#f88379": "Bikini estampado tropica.png",
      "#46b4a0": "Falda plisada satinada.png",
      "#9a9893": "Blazer lino oversize.png",
      "#5f4b8b": "Maxi vestido tie-dye.png",
      "#c7e000": "Top crop metalizado.png",
      "#f96714": "Pantalón cargo utility.png",
      "#26262a": "Calza deportiva seamless.png"
    };

    const fileName = SWATCH_TO_IMG[swatch.toLowerCase()];

    if (fileName) {
      const imgUrl = imgPrefix + fileName;
      return e("div", { className: "gm-prod", style: {
        backgroundImage: "url('" + imgUrl + "')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...style
      } },
        label && e("div", { style: { position: "absolute", bottom: 6, left: 8, fontSize: 10, fontWeight: 700, background: "rgba(255,255,255,0.7)", padding: "2px 6px", borderRadius: 4, color: "#000" } }, label)
      );
    }

    return e("div", { className: "gm-prod", style: {
      background: "linear-gradient(150deg," + swatch + "22," + swatch + "55)", ...style } },
      e("div", { style: { position: "absolute", inset: 0, display: "grid", placeItems: "center" } },
        e(I.image, { size: 26, style: { color: swatch, opacity: .5 } })),
      label && e("div", { style: { position: "absolute", bottom: 6, left: 8, fontSize: 10, fontWeight: 700, color: swatch, opacity: .8 } }, label));
  }

  function Swatch({ hex, code, name, size = 44, onRemove }) {
    return e("div", { style: { display: "flex", flexDirection: "column", gap: 5, width: size + 16 } },
      e("div", { style: { position: "relative" } },
        e("div", { style: { width: size, height: size, borderRadius: 10, background: hex, border: "1px solid rgba(0,0,0,0.08)" } }),
        onRemove && e("button", { onClick: onRemove, title: "Quitar",
          style: { position: "absolute", top: -6, right: 2, width: 18, height: 18, borderRadius: "50%", border: "none", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,.2)", display: "grid", placeItems: "center", color: "var(--wm-ns-400)" } },
          e(I.x, { size: 11 }))),
      code && e("div", null,
        e("div", { style: { fontSize: 10, fontWeight: 700, color: "var(--wm-ns-500)" } }, code),
        name && e("div", { style: { fontSize: 9.5, color: "var(--wm-ns-300)", lineHeight: 1.2 } }, name)));
  }

  function PageHead({ title, subtitle, actions }) {
    return e("div", { className: "gm-page__head" },
      e("div", null,
        e("h1", { className: "gm-page__title" }, title),
        subtitle && e("p", { className: "gm-page__subtitle" }, subtitle)),
      actions && e("div", { className: "gm-page__head-actions" }, actions));
  }

  function Metric({ icon, label, value, sub, accent }) {
    return e("div", { className: "gm-card", style: { display: "flex", gap: 14, alignItems: "center" } },
      e("div", { style: { width: 44, height: 44, borderRadius: 12, flex: "0 0 auto", display: "grid", placeItems: "center",
        background: accent ? "var(--wm-sb-200)" : "var(--wm-ns-100)", color: accent ? "var(--wm-sb-400)" : "var(--wm-ns-400)" } },
        e(I[icon], { size: 22 })),
      e("div", { style: { minWidth: 0 } },
        e("div", { style: { fontSize: 22, fontWeight: 700, lineHeight: 1, fontVariantNumeric: "tabular-nums" } }, value),
        e("div", { style: { fontSize: 12.5, color: "var(--wm-ns-300)", marginTop: 5 } }, label),
        sub && e("div", { style: { fontSize: 11.5, color: "var(--wm-ns-400)", marginTop: 2 } }, sub)));
  }

  function Progress({ value, total, color }) {
    const pct = Math.round((value / total) * 100);
    return e("div", { className: "gm-progress" }, e("div", { className: "gm-progress__fill", style: { width: pct + "%", background: color || "var(--wm-sb-400)" } }));
  }

  // Email thread inline. Pass onOpen to redirect header click to another screen.
  function EmailThread({ skuId, compact, onOpen }) {
    const thread = GM.emailThreads[skuId];
    const [open, setOpen] = React.useState(false);
    if (!thread) return e("button", { onClick: onOpen,
      style: { fontSize: 12, color: onOpen ? "var(--wm-sb-400)" : "var(--wm-ns-300)", display: "flex", alignItems: "center", gap: 6, padding: "8px 0", background: "none", border: "none", fontFamily: "inherit", cursor: onOpen ? "pointer" : "default" } },
      e(I.mail, { size: 14 }), onOpen ? "Ver bandeja de correo →" : "Sin correos vinculados aún");
    return e("div", { style: { borderTop: "1px solid var(--wm-ns-100)", marginTop: 4 } },
      e("button", { onClick: onOpen ? onOpen : () => setOpen(!open),
        style: { width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "10px 0 8px", border: "none", background: "none", color: "var(--wm-ns-500)", fontSize: 12.5, fontWeight: 600, fontFamily: "inherit", cursor: "pointer" } },
        e(I.mailOpen, { size: 15, style: { color: "var(--wm-sb-400)" } }),
        "Hilo de correo · " + thread.length,
        e(I.chevron, { size: 14, style: { marginLeft: "auto", transform: open ? "rotate(180deg)" : "none", transition: "transform .15s" } })),
      open && e("div", { className: "gm-fade", style: { display: "flex", flexDirection: "column", gap: 8, paddingBottom: 6 } },
        thread.map((m, i) => e("div", { key: i, style: {
          background: m.dir === "in" ? "var(--wm-sb-200)" : "var(--wm-ns-050)",
          border: "1px solid " + (m.dir === "in" ? "#cfe5fb" : "var(--wm-ns-100)"),
          borderRadius: 8, padding: "9px 11px", fontSize: 12 } },
          e("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 3 } },
            e("span", { style: { fontWeight: 700, color: m.dir === "in" ? "var(--wm-sb-500)" : "var(--wm-ns-500)" } }, m.from),
            e("span", { style: { color: "var(--wm-ns-300)", fontSize: 11 } }, m.date)),
          e("div", { style: { color: "var(--wm-ns-400)", lineHeight: 1.45 } }, m.body)))));
  }

  // AI generation panel wrapper: loading → content
  function AIPanel({ title, note, children, onRegenerate, regenLabel = "Regenerar" }) {
    return e("div", { style: { border: "1.5px solid #cfe5fb", borderRadius: 12, overflow: "hidden", background: "#fff" } },
      e("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: "linear-gradient(90deg,var(--wm-sb-200),#fff)", borderBottom: "1px solid var(--wm-sb-300)" } },
        e("div", { style: { width: 28, height: 28, borderRadius: 8, background: "var(--wm-sb-400)", color: "#fff", display: "grid", placeItems: "center" } }, e(I.sparkles, { size: 16 })),
        e("div", { style: { flex: 1 } },
          e("div", { style: { fontWeight: 700, fontSize: 14 } }, title),
          note && e("div", { style: { fontSize: 11.5, color: "var(--wm-ns-300)" } }, note)),
        onRegenerate && e(Btn, { variant: "ghost", size: "sm", icon: "refresh", onClick: onRegenerate }, regenLabel)),
      e("div", { style: { padding: 16 } }, children));
  }

  // Editable inline text
  function Editable({ value, onChange, style, multiline }) {
    return e(multiline ? "textarea" : "input", {
      value, onChange: (ev) => onChange(ev.target.value),
      style: { font: "inherit", border: "1px solid transparent", borderRadius: 6, padding: "3px 6px", margin: "-3px -6px",
        background: "transparent", width: "100%", resize: "vertical", color: "inherit", ...style },
      onFocus: (ev) => { ev.target.style.borderColor = "var(--wm-sb-400)"; ev.target.style.background = "#fff"; },
      onBlur: (ev) => { ev.target.style.borderColor = "transparent"; ev.target.style.background = "transparent"; },
    });
  }

  function Empty({ icon = "box", title, body }) {
    return e("div", { style: { textAlign: "center", padding: "60px 20px", color: "var(--wm-ns-300)" } },
      e("div", { style: { width: 56, height: 56, margin: "0 auto 14px", borderRadius: 16, background: "var(--wm-ns-100)", display: "grid", placeItems: "center", color: "var(--wm-ns-300)" } }, e(I[icon], { size: 26 })),
      e("div", { style: { fontWeight: 700, fontSize: 16, color: "var(--wm-ns-500)" } }, title),
      body && e("div", { style: { fontSize: 13.5, marginTop: 6, maxWidth: 380, marginInline: "auto", lineHeight: 1.5 } }, body));
  }

  const CLP = (n) => "$" + n.toLocaleString("es-CL");

  // AdvanceBar — barra sticky bottom. Navegación izq + acción completar derecha.
  // Props: stepId (string), onComplete (fn), go (fn), completed (bool)
  function AdvanceBar({ stepId, onComplete, go, completed }) {
    const allSteps = window.GM_NAV.phases.flatMap((p) => p.steps);
    const idx = allSteps.findIndex((s) => s.id === stepId);
    const prev = idx > 0 ? allSteps[idx - 1] : null;
    const next = idx >= 0 && idx < allSteps.length - 1 ? allSteps[idx + 1] : null;

    return e("div", { className: "gm-advance-bar" },
      // — Navegación: izquierda —
      e("div", { className: "gm-advance-bar__nav" },
        prev
          ? e("button", { className: "gm-advance-bar__prev-btn", onClick: () => go(prev.screen) },
              e(I.chevronLeft, { size: 14 }),
              prev.label)
          : e("div", { style: { width: 1 } })),

      // — Acción completar + siguiente: derecha —
      e("div", { style: { display: "flex", alignItems: "center", gap: 12 } },
        completed
          ? e("div", { className: "gm-advance-bar__done" },
              e(I.check, { size: 15 }),
              e("span", null, "Paso completado"))
          : e(Btn, { variant: "primary", icon: "check", onClick: onComplete }, "Marcar como completado"),
        next && (completed
          ? e("button", { className: "gm-advance-bar__next-btn", onClick: () => go(next.screen) },
              next.label,
              e(I.chevronRight, { size: 14 }))
          : e("div", { className: "gm-advance-bar__locked", title: "Completa este paso para continuar" },
              e(I.lock, { size: 13 }),
              next.label))));
  }

  window.GMUI = { Chip, Btn, IconBtn, ProdImg, Swatch, PageHead, Metric, Progress, EmailThread, AIPanel, Editable, Empty, CLP, CHIP, DOT, AdvanceBar };
})();
