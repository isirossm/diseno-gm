/* GM shared components → window.GMUI
   Incluye componentes de producción + componentes de gestión (AlertList, SeasonIcon, etc.) */
(function () {
  const I = window.GMIcon;
  const e = React.createElement;

  // ---- status maps ----
  const CHIP = {
    completado: ["success", "Completado"], curso: ["active", "En curso"], pendiente: ["neutral", "Pendiente"], bloqueado: ["error", "Bloqueado"],
    pendiente_envio: ["neutral", "Pendiente envío"], enviado: ["active", "Enviado"], en_revision: ["warning", "En revisión"], recibido: ["success", "Recibido"],
    sin_iniciar: ["neutral", "Sin iniciar"], en_progreso: ["active", "En progreso"], progreso: ["active", "En progreso"],
    completa: ["success", "Completa"], aprobada: ["success", "Aprobada"], rechazada: ["error", "Rechazada"],
    sin: ["neutral", "Sin revisión"], feedback: ["warning", "Con feedback"], ajuste: ["warning", "Requiere ajuste"], aprobado: ["success", "Aprobado"],
    apr: ["success", "Aprobado"], aj: ["warning", "Requiere ajuste"], pend: ["neutral", "Pendiente"], go: ["success", "GO"],
    // gestión estados
    enCurso: ["active", "En curso"], bloqueada: ["error", "Bloqueada"], completada: ["success", "Completada"],
    warn: ["warning", "Atención"], neutral: ["neutral", "Pendiente"],
  };
  const DOT = { success: "var(--wm-success-500)", active: "var(--wm-sb-400)", warning: "var(--wm-warn-500)", error: "var(--wm-error-500)", neutral: "var(--wm-ns-300)" };

  function Chip({ k, label, variant, dot = true, lg }) {
    const [v, lbl] = k ? (CHIP[k] || ["neutral", k]) : [variant, label];
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

  function Progress({ value, total, color, pct: pctProp }) {
    const pct = pctProp !== undefined ? pctProp : (total ? Math.round((value / total) * 100) : value);
    return e("div", { className: "gm-progress" },
      e("div", { className: "gm-progress__fill", style: { width: pct + "%", background: color || "var(--wm-sb-400)" } }));
  }

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

  // =========================================================================
  // DATOS COMERCIALES POR PASO (para ApprovalPanel)
  // =========================================================================
  const STEP_COMMERCIAL = {
    tendencias:       { kpis: [{ label: "Margen obj.", value: "34%", ok: true }, { label: "Vol. proyectado", value: "12.400 u.", ok: null }, { label: "Ref. anterior", value: "PV24 · 31%", ok: null }], note: "PV24 cerró con 31% de margen real. La proyección actual es conservadora." },
    viaje:            { kpis: [{ label: "Presupuesto", value: "$3.200.000", ok: null }, { label: "Ejecutado", value: "$941.160", ok: true }, { label: "Wishlist", value: "4 / 6 ítems", ok: null }, { label: "Proveedores", value: "5 contactados", ok: null }], note: "Punto seamless no encontrado. Solicitar alternativa local antes de definir colección." },
    coleccion:        { kpis: [{ label: "SKUs prop.", value: "42", ok: null }, { label: "Precio prom. obj.", value: "$18.990", ok: true }, { label: "Margen obj.", value: "34%", ok: true }, { label: "Vol. mínimo", value: "800 u.", ok: false }], note: "Vol. mínimo bajo el umbral de 1.000 u. Evaluar ajuste o negociar condición especial." },
    muestras:         { kpis: [{ label: "Muestras sol.", value: "24", ok: null }, { label: "Costo estimado", value: "$480.000", ok: true }, { label: "Plazo", value: "21 días", ok: null }], note: "Costo dentro del presupuesto de muestras para la temporada." },
    fichas:           { kpis: [{ label: "Fichas totales", value: "24", ok: null }, { label: "Completadas", value: "15 / 24", ok: null }, { label: "Con precio def.", value: "12 / 15", ok: true }], note: "Revisar fichas sin precio objetivo definido antes de avanzar." },
    contramuestras:   { kpis: [{ label: "Conformidad esp.", value: "85%", ok: true }, { label: "Costo prod. est.", value: "$4.200.000", ok: null }, { label: "Margen en prod.", value: "31%", ok: true }], note: "Margen en producción dentro del rango aceptable (≥30%)." },
    manuales:         { kpis: [{ label: "Manuales", value: "3", ok: null }, { label: "Costo material.", value: "$320.000", ok: true }, { label: "Plazo marketing", value: "30 jun", ok: null }], note: "Sin bloqueo comercial. Revisión de contenido a cargo de Marketing." },
    negociacion:      { kpis: [{ label: "Precio neg. prom.", value: "$16.800", ok: true }, { label: "Ahorro vs. inicial", value: "11,5%", ok: true }, { label: "Margen final est.", value: "38%", ok: true }], note: "Negociación superó el objetivo. Margen final 38% (obj. 34%)." },
    fichas_revisadas: { kpis: [{ label: "Fichas actualizadas", value: "24 / 24", ok: true }, { label: "SKUs confirmados", value: "40 / 42", ok: true }, { label: "Precio final prom.", value: "$16.800", ok: true }], note: "2 SKUs eliminados por margen insuficiente. Colección final: 40 prendas." },
    validacion:       { kpis: [{ label: "Margen final conf.", value: "38%", ok: true }, { label: "Vol. confirmado", value: "800 u.", ok: false }, { label: "Fecha despacho", value: "22 oct", ok: null }], note: "Vol. 800 u. confirmado. Excepción comercial aprobada por gerencia." },
  };

  // =========================================================================
  // APPROVAL PANEL — aparece sobre cada pantalla de flujo cuando el perfil es compradores
  // =========================================================================
  function ApprovalPanel({ stepId }) {
    const approval  = (GM.stepApprovals || {})[stepId] || { status: "sin_acceso", comments: [] };
    const commercial = STEP_COMMERCIAL[stepId] || { kpis: [], note: "" };

    const [localStatus,   setLocalStatus]   = React.useState(null);
    const [commentText,   setCommentText]   = React.useState("");
    const [localComments, setLocalComments] = React.useState(approval.comments || []);

    const status = localStatus || approval.status;

    const STATUS = {
      sin_acceso:  { icon: I.lock,        iconBg: "var(--wm-ns-100)",        iconColor: "var(--wm-ns-300)",       chipVariant: "neutral",  chipLabel: "Sin acceso",         desc: "Valentina aún no ha enviado este paso para revisión." },
      en_revision: { icon: I.clock,       iconBg: "var(--wm-sb-200)",        iconColor: "var(--wm-sb-400)",       chipVariant: "warning",  chipLabel: "En revisión",        desc: "Enviado por Valentina · " + (approval.sentAt || "") },
      cambios:     { icon: I.alert,       iconBg: "var(--wm-warn-100)",      iconColor: "var(--wm-warn-500)",     chipVariant: "warning",  chipLabel: "Cambios solicitados", desc: "Valentina está incorporando el feedback." },
      rechazado:   { icon: I.x,           iconBg: "var(--wm-error-100)",     iconColor: "var(--wm-error-500)",    chipVariant: "error",    chipLabel: "Rechazado",          desc: "Paso cancelado — requiere reinicio." },
      aprobado:    { icon: I.checkCircle, iconBg: "var(--wm-success-100)",   iconColor: "var(--wm-success-500)",  chipVariant: "success",  chipLabel: "Aprobado",           desc: approval.resolvedAt ? "Aprobado el " + approval.resolvedAt : "Aprobado" },
    };
    const cfg = STATUS[status] || STATUS.sin_acceso;

    const submitAction = (action) => {
      if (localComments !== approval.comments || commentText.trim()) {
        const next = commentText.trim()
          ? [...localComments, { author: "CP", role: "compradores", text: commentText.trim(), date: "hoy" }]
          : localComments;
        setLocalComments(next);
      }
      setCommentText("");
      setLocalStatus(action);
    };

    return e("div", { style: { padding: "16px 32px 0", maxWidth: 1340, margin: "0 auto", width: "100%", boxSizing: "border-box" } },
      e("div", { className: "gm-card", style: { borderTop: "3px solid var(--wm-spark-400)", padding: 0, overflow: "hidden", marginBottom: 0, borderColor: "#f2dca0", borderTopColor: "var(--wm-spark-400)" } },

        // Header
        e("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", background: "var(--wm-warn-100)", borderBottom: status !== "sin_acceso" ? "1px solid #f2dca0" : "none" } },
          e("div", { style: { width: 28, height: 28, borderRadius: 7, background: cfg.iconBg, color: cfg.iconColor, display: "grid", placeItems: "center", flex: "0 0 auto" } },
            e(cfg.icon, { size: 14 })),
          e("div", { style: { flex: 1, minWidth: 0 } },
            e("div", { style: { fontSize: 12, fontWeight: 700, color: "var(--wm-ns-500)" } }, "Revisión comercial"),
            e("div", { style: { fontSize: 11, color: "var(--wm-ns-300)" } }, cfg.desc)),
          e(Chip, { variant: cfg.chipVariant, label: cfg.chipLabel })),

        // Body — hidden for sin_acceso
        status !== "sin_acceso" && e("div", { style: { padding: "14px 16px", display: "flex", flexDirection: "column", gap: 12 } },

          // KPIs comerciales
          commercial.kpis.length > 0 && e("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } },
            commercial.kpis.map((kpi, i) => e("div", { key: i, style: {
              background: "var(--wm-ns-050)", border: "1px solid var(--wm-ns-100)", borderRadius: 8,
              borderTop: "2px solid " + (kpi.ok === true ? "var(--wm-success-500)" : kpi.ok === false ? "var(--wm-error-500)" : "var(--wm-ns-200)"),
              padding: "8px 14px", minWidth: 110,
            } },
              e("div", { style: { fontSize: 16, fontWeight: 800, color: kpi.ok === true ? "var(--wm-success-500)" : kpi.ok === false ? "var(--wm-error-500)" : "var(--wm-ns-600)" } }, kpi.value),
              e("div", { style: { fontSize: 10, color: "var(--wm-ns-300)", marginTop: 2 } }, kpi.label)))),

          // Nota comercial
          commercial.note && e("div", { style: { fontSize: 12, color: "var(--wm-ns-400)", background: "var(--wm-warn-100)", borderRadius: 7, padding: "8px 12px", lineHeight: 1.5 } },
            commercial.note),

          // Hilo de comentarios
          localComments.length > 0 && e("div", { style: { display: "flex", flexDirection: "column", gap: 6 } },
            e("div", { style: { fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--wm-ns-300)", marginBottom: 2 } }, "Comentarios"),
            localComments.map((c, i) => e("div", { key: i, style: { display: "flex", gap: 8, padding: "8px 10px", borderRadius: 7, background: c.role === "compradores" ? "#fffbeb" : "var(--wm-sb-200)" } },
              e("div", { style: { width: 26, height: 26, borderRadius: "50%", background: c.role === "compradores" ? "var(--wm-spark-400)" : "var(--wm-sb-400)", color: "#fff", display: "grid", placeItems: "center", fontSize: 10, fontWeight: 800, flex: "0 0 auto" } }, c.author),
              e("div", { style: { flex: 1 } },
                e("div", { style: { fontSize: 12, color: "var(--wm-ns-500)", lineHeight: 1.4 } }, c.text),
                e("div", { style: { fontSize: 10, color: "var(--wm-ns-300)", marginTop: 3 } }, c.date))))),

          // Acciones — solo cuando en_revision
          status === "en_revision" && e("div", { style: { display: "flex", flexDirection: "column", gap: 8, paddingTop: 4 } },
            e("textarea", {
              value: commentText,
              onChange: (ev) => setCommentText(ev.target.value),
              placeholder: "Escribe un comentario (opcional para aprobar, requerido para cambios o rechazo)…",
              style: { width: "100%", minHeight: 64, padding: "9px 12px", borderRadius: 8, border: "1.5px solid var(--wm-ns-200)", fontSize: 13, fontFamily: "inherit", resize: "vertical", color: "var(--wm-ns-500)", lineHeight: 1.5, outline: "none", boxSizing: "border-box", transition: "border-color .12s" },
              onFocus: (ev) => { ev.target.style.borderColor = "var(--wm-sb-400)"; },
              onBlur: (ev) => { ev.target.style.borderColor = "var(--wm-ns-200)"; },
            }),
            e("div", { style: { display: "flex", gap: 8, alignItems: "center" } },
              e(Btn, { variant: "primary", icon: "check", onClick: () => submitAction("aprobado"), style: { background: "var(--wm-success-500)", flex: "1 1 auto" } }, "Aprobar este paso"),
              e("div", { style: { width: 1, height: 24, background: "var(--wm-ns-200)", flex: "0 0 auto" } }),
              e(Btn, { variant: "ghost", size: "sm", icon: "chat", onClick: () => submitAction("cambios") }, "Cambios"),
              e(Btn, { variant: "ghost", size: "sm", icon: "x", onClick: () => submitAction("rechazado"), style: { color: "var(--wm-error-500)" } }, "Rechazar"))))));
  }

  // =========================================================================
  // ADVANCE BAR — barra inferior de navegación entre pasos
  // =========================================================================
  function AdvanceBar({ stepId, onComplete, go, completed }) {
    const pid = localStorage.getItem("gm_profile") || "default";

    // Compradores usan ApprovalPanel — no tienen AdvanceBar
    if (pid === "compradores") return null;

    const [localSent, setLocalSent] = React.useState(false);

    const allSteps = window.GM_NAV.phases.flatMap((p) => p.steps);
    const idx  = allSteps.findIndex((s) => s.id === stepId);
    const prev = idx > 0 ? allSteps[idx - 1] : null;
    const next = idx >= 0 && idx < allSteps.length - 1 ? allSteps[idx + 1] : null;

    const isValentina    = pid === "valentina";
    const approvalData   = isValentina ? ((GM.stepApprovals || {})[stepId] || { status: "sin_acceso" }) : null;
    const approvalStatus = isValentina ? (localSent ? "en_revision" : approvalData.status) : "aprobado";

    // Si compras ya recibió el paso, Valentina necesariamente lo había completado
    const effectiveCompleted = completed || (isValentina && approvalStatus !== "sin_acceso");

    const canAdvance = isValentina ? approvalStatus === "aprobado" : effectiveCompleted;

    // Centro de la barra: acción o estado
    let center;
    if (!effectiveCompleted) {
      center = e(Btn, { variant: "primary", icon: "check", onClick: onComplete }, "Marcar como completado");
    } else if (!isValentina) {
      center = e("div", { className: "gm-advance-bar__done" }, e(I.check, { size: 15 }), e("span", null, "Paso completado"));
    } else if (approvalStatus === "sin_acceso") {
      center = e(Btn, { variant: "primary", icon: "send", onClick: () => setLocalSent(true) }, "Enviar a Compras");
    } else if (approvalStatus === "en_revision") {
      center = e("div", { style: { display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--wm-ns-400)", background: "var(--wm-sb-200)", borderRadius: 100, padding: "6px 14px", border: "1px solid var(--wm-sb-300)" } },
        e("span", { className: "gm-pulse", style: { width: 8, height: 8, borderRadius: "50%", background: "var(--wm-sb-400)", display: "inline-block", flexShrink: 0 } }),
        "En revisión por Compras");
    } else if (approvalStatus === "aprobado") {
      center = e("div", { className: "gm-advance-bar__done", style: { background: "var(--wm-success-100)", borderRadius: 100, padding: "6px 14px", border: "1px solid #bce5a8" } }, e(I.checkCircle, { size: 15 }), e("span", null, "Aprobado por Compras"));
    } else {
      // cambios | rechazado
      const isRechazado = approvalStatus === "rechazado";
      center = e("div", { style: { display: "flex", alignItems: "center", gap: 8, fontSize: 13,
        color: isRechazado ? "var(--wm-error-500)" : "var(--wm-warn-500)",
        background: isRechazado ? "var(--wm-error-100)" : "var(--wm-warn-100)",
        borderRadius: 100, padding: "6px 14px",
        border: "1px solid " + (isRechazado ? "#f6c0c3" : "#f2dca0") } },
        e(I.alert, { size: 14 }),
        isRechazado ? "Paso rechazado por Compras" : "Compras solicitó cambios · Revisa los comentarios");
    }

    const lockedTitle = isValentina ? "Esperando aprobación de Compras" : "Completa este paso para continuar";

    return e("div", { className: "gm-advance-bar" },
      e("div", { className: "gm-advance-bar__nav" },
        prev
          ? e("button", { className: "gm-advance-bar__prev-btn", onClick: () => go(prev.screen) },
              e(I.chevronLeft, { size: 14 }), prev.label)
          : e("div", { style: { width: 1 } })),
      e("div", { style: { display: "flex", alignItems: "center", gap: 12 } },
        center,
        next && (canAdvance
          ? e("button", { className: "gm-advance-bar__next-btn", onClick: () => go(next.screen) },
              next.label, e(I.chevronRight, { size: 14 }))
          : e("div", { className: "gm-advance-bar__locked",
              title: !effectiveCompleted ? "Completa este paso para continuar" : lockedTitle },
              e(I.lock, { size: 13 }), next.label))));
  }

  // =========================================================================
  // COMPONENTES DE GESTIÓN
  // =========================================================================

  // Icono de temporada (sol / nieve / hoja)
  function SeasonIcon({ name, size = 32 }) {
    const attrs = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
      strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" };
    const paths = {
      sun: e("g", null,
        e("circle", { cx: 12, cy: 12, r: 4 }),
        e("path", { d: "M12 2v3M12 19v3M4 12H1M23 12h-3M5.6 5.6L3.5 3.5M20.5 20.5l-2.1-2.1M5.6 18.4l-2.1 2.1M20.5 3.5l-2.1 2.1" })),
      leaf: e("g", null,
        e("path", { d: "M11 20A7 7 0 0 1 4 13c0-4 3-9 9-11 0 4 0 11-2 18z" }),
        e("path", { d: "M11 20c-1-4-1-9 2-13" })),
      snow: e("g", null,
        e("path", { d: "M12 2v20M2 12h20M5 5l14 14M19 5L5 19M12 5l-2-2M12 5l2-2M12 19l-2 2M12 19l2 2M5 12l-2-2M5 12l-2 2M19 12l2-2M19 12l2 2" })),
    };
    return e("svg", attrs, paths[name] || paths.sun);
  }

  const SEASON_THEME = {
    "Primavera–Verano 26": { bg: "linear-gradient(135deg,#ffc220 0%,#ff8a3d 65%,#e8542e 100%)", icon: "sun",  fg: "#fff" },
    "Verano 26":   { bg: "linear-gradient(135deg,#ffc220 0%,#ff8a3d 65%,#e8542e 100%)", icon: "sun",  fg: "#fff" },
    "Otoño 26":    { bg: "linear-gradient(135deg,#e8a23a 0%,#c46a25 65%,#6e3b1a 100%)", icon: "leaf", fg: "#fff" },
    "Invierno 26": { bg: "linear-gradient(135deg,#b4d4f0 0%,#4a86c4 55%,#1e4d8b 100%)", icon: "snow", fg: "#fff" },
  };

  // Lista de alertas (card con ícono y descripción)
  const ALERT_ICON_COLOR = {
    crit:   { bg: "var(--wm-error-100)",   color: "var(--wm-error-500)", icon: "alert" },
    warn:   { bg: "var(--wm-warn-100)",    color: "var(--wm-warn-500)", icon: "clock" },
    normal: { bg: "var(--wm-sb-200)",      color: "var(--wm-sb-400)",  icon: "flag" },
  };

  function AlertList({ items = [], title = "Alertas activas", link, onLinkClick }) {
    return e("div", { className: "gm-card" },
      e("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 } },
        e("div", { style: { fontWeight: 700, fontSize: 15 } }, title),
        link && e("button", { onClick: onLinkClick, style: { fontSize: 12.5, color: "var(--wm-sb-400)", background: "none", border: "none", fontFamily: "inherit", cursor: "pointer", fontWeight: 600 } }, link)),
      e("div", { style: { display: "flex", flexDirection: "column" } },
        items.map((a, i) => {
          const c = ALERT_ICON_COLOR[a.level] || ALERT_ICON_COLOR.normal;
          return e("div", { key: i, style: { display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 0", borderBottom: i < items.length - 1 ? "1px solid var(--wm-ns-100)" : "none" } },
            e("div", { style: { width: 32, height: 32, borderRadius: 8, flex: "0 0 auto", display: "grid", placeItems: "center",
              background: c.bg, color: c.color } },
              e(I[c.icon], { size: 15 })),
            e("div", { style: { flex: 1, minWidth: 0 } },
              e("div", { style: { fontWeight: 700, fontSize: 13, lineHeight: 1.3 } }, a.title),
              a.desc && e("div", { style: { fontSize: 12, color: "var(--wm-ns-400)", marginTop: 2, lineHeight: 1.4 } }, a.desc)),
            a.scope && e(Chip, { k: "neutral", label: a.scope, dot: false }));
        })));
  }

  function TodoList() {
    const [tasks, setTasks] = React.useState([
      { id: 1, title: "Confirmar muestras Vestidos REF-038", due: "Hoy", completed: false, isToday: true },
      { id: 2, title: "Revisar tech pack Blusas REF-019", due: "Mañana", completed: false },
      { id: 3, title: "Sign-off tabla de tallas Verano 25", due: "15 feb", completed: false },
      { id: 4, title: "Entregar brief Otoño 25", due: "01 mar", completed: false },
      { id: 5, title: "Aprobar fichas técnicas Faldas", due: "Completado", completed: true }
    ]);

    const toggleTask = (id) => {
      setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed, due: t.completed ? t.originalDue || t.due : "Completado" } : t));
    };

    return e("div", { className: "gm-card" },
      e("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 } },
        e("div", { style: { fontWeight: 700, fontSize: 15 } }, "Tareas pendientes"),
        e("button", { style: { fontSize: 12.5, color: "var(--wm-sb-400)", background: "none", border: "none", fontFamily: "inherit", cursor: "pointer", fontWeight: 600 } }, "Ver todas")),
      e("div", { style: { display: "flex", flexDirection: "column" } },
        tasks.map((t, i) => {
          const showCompleted = t.completed;
          const dueText = showCompleted ? "Completado" : t.due;
          const dueColor = showCompleted ? "var(--wm-ns-300)" : t.isToday ? "var(--wm-error-500)" : "var(--wm-ns-400)";
          
          return e("div", { key: t.id, style: {
            display: "flex",
            gap: 14,
            alignItems: "flex-start",
            padding: "12px 0",
            borderBottom: i < tasks.length - 1 ? "1px solid var(--wm-ns-100)" : "none"
          } },
            // Checkbox
            e("div", {
              onClick: () => toggleTask(t.id),
              style: {
                width: 20,
                height: 20,
                borderRadius: 5,
                border: showCompleted ? "none" : "2px solid var(--wm-ns-200)",
                background: showCompleted ? "#8cc37f" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
                marginTop: 2,
                transition: "background 0.15s, border-color 0.15s",
              }
            },
              showCompleted && e("svg", { width: 12, height: 12, viewBox: "0 0 24 24", fill: "none", stroke: "white", strokeWidth: 4, strokeLinecap: "round", strokeLinejoin: "round" },
                e("polyline", { points: "20 6 9 17 4 12" })
              )
            ),
            // Details
            e("div", { style: { flex: 1, minWidth: 0 } },
              e("div", {
                onClick: () => toggleTask(t.id),
                style: {
                  fontWeight: 700,
                  fontSize: "13.5px",
                  lineHeight: 1.35,
                  color: showCompleted ? "var(--wm-ns-300)" : "var(--wm-ns-600)",
                  textDecoration: showCompleted ? "line-through" : "none",
                  cursor: "pointer",
                  transition: "color 0.15s"
                }
              }, t.title),
              e("div", {
                style: {
                  fontSize: "12px",
                  color: dueColor,
                  marginTop: 3,
                  fontFamily: "var(--font-sans)",
                  fontWeight: t.isToday && !showCompleted ? "600" : "normal"
                }
              }, dueText)
            )
          );
        })
      )
    );
  }

  // Barra de progreso horizontal con % y barra
  function ProgressBar({ pct, disabled }) {
    return e("div", { style: { display: "flex", flexDirection: "column", gap: 4 } },
      e("div", { className: "gm-progress" },
        e("div", { className: "gm-progress__fill", style: {
          width: pct + "%",
          background: disabled ? "var(--wm-ns-200)" : "var(--wm-sb-400)" } })));
  }

  // ---- CategoryCard helpers (matching Renata.html design) ----
  const CAT_SPARK_PATH = "M 62.785 48.529 L 59.162 7.407 C 59.162 3.34 63.905 0 69.874 0 C 75.843 0 80.604 3.34 80.604 7.407 L 76.972 48.529 C 76.564 51.006 73.546 52.916 69.87 52.916 C 66.194 52.916 63.185 51.006 62.785 48.529 Z M 47.689 65.754 C 49.525 62.563 49.384 58.994 47.443 57.405 L 13.706 33.698 C 10.201 31.665 4.939 34.111 1.953 39.296 C -1.043 44.476 -0.511 50.263 2.994 52.296 L 40.345 69.724 C 42.686 70.595 45.858 68.936 47.689 65.754 Z M 92.073 65.754 C 93.909 68.94 97.075 70.595 99.412 69.724 L 136.768 52.296 C 140.286 50.267 140.791 44.476 137.818 39.296 C 134.818 34.111 129.552 31.665 126.051 33.698 L 92.314 57.405 C 90.386 58.994 90.237 62.568 92.073 65.754 Z M 62.785 108.658 L 59.162 149.78 C 59.162 153.851 63.905 157.183 69.874 157.183 C 75.843 157.183 80.604 153.851 80.604 149.78 L 76.972 108.658 C 76.564 106.185 73.546 104.279 69.87 104.279 C 66.194 104.279 63.185 106.181 62.785 108.658 Z M 92.314 99.804 L 126.051 123.494 C 129.547 125.523 134.818 123.067 137.818 117.896 C 140.791 112.712 140.286 106.92 136.768 104.882 L 99.412 87.477 C 97.075 86.597 93.913 88.247 92.073 91.438 C 90.237 94.619 90.386 98.197 92.314 99.804 Z M 40.345 87.472 L 2.994 104.878 C -0.511 106.916 -1.043 112.707 1.953 117.891 C 4.939 123.058 10.201 125.518 13.706 123.489 L 47.443 99.799 C 49.384 98.193 49.525 94.619 47.689 91.433 C 45.853 88.243 42.682 86.588 40.345 87.472 Z";

  function CatSparkMark() {
    return e("svg", { viewBox: "0 0 139.762 157.183", fill: "currentColor", style: { width: "100%", height: "100%" } },
      e("path", { d: CAT_SPARK_PATH }));
  }

  const CAT_ICON_PATHS = {
    moda:      e("path", { d: "M4 7l4-3 2 2h4l2-2 4 3-2 4h-2v9H8v-9H6L4 7z" }),
    casa:      e("path", { d: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9z" }),
    electro:   e("g", null, e("rect", { x:3, y:6, width:18, height:12, rx:2 }), e("path", { d: "M8 21h8M12 18v3" })),
    hardlines: e("g", null, e("path", { d: "M14 4l6 6-2 2-2-2-6 6-3-3 6-6-2-2 3-3z" }), e("path", { d: "M8 14l-5 5 2 2 5-5" })),
    mujer:     e("g", null, e("path", { d: "M9 4l1 2 2-2 2 2 1-2 2 3-1 3 2 11H6l2-11-1-3z" }), e("path", { d: "M11 6h2" })),
    hombre:    e("g", null, e("path", { d: "M7 4l3-1 2 3 2-3 3 1 3 3-2 2-1 12H7L6 9 4 7z" }), e("path", { d: "M12 6v12" })),
    infantil:  e("path", { d: "M9 4q3 3 6 0l3 1 3 4-3 2v10H6V11L3 9l3-4z" }),
    baby:      e("g", null, e("circle", { cx:12, cy:5.5, r:2 }), e("path", { d: "M9 10h6l2 4-2 2v4h-2v-3h-2v3H9v-4l-2-2z" })),
    calzado:   e("g", null, e("path", { d: "M3 14l2-3 5-1 3 2 7 1 1 2v3H3z" }), e("path", { d: "M9 13l2 2M14 14l1 1.5" })),
    interior:  e("path", { d: "M5 8h14l-1 6-4 5-1-6h-2l-1 6-4-5z" }),
  };

  function CategoryIcon({ id, size = 32 }) {
    const paths = CAT_ICON_PATHS[id] || CAT_ICON_PATHS.moda;
    return e("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
      strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }, paths);
  }

  function CatStepBar({ currentStep = 0, currentPhase, total = 6 }) {
    return e("div", { style: { display: "flex", flexDirection: "column", gap: 5, marginTop: 4 } },
      e("div", { style: { display: "flex", gap: 3 } },
        Array.from({ length: total }, (_, i) =>
          e("div", { key: i, style: {
            height: 4, flex: 1, borderRadius: 2,
            background: i < currentStep ? "var(--wm-sb-300)" : i === currentStep ? "var(--wm-sb-400)" : "var(--wm-ns-100)",
            transition: "background .2s",
          }}))),
      e("div", { style: { fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--wm-ns-500)", fontWeight: 500 } },
        "Paso " + (currentStep + 1) + "/" + total + (currentPhase ? " · " + currentPhase : "")));
  }

  // CategoryCard — hero-strip design matching Renata.html
  function CategoryCard({ id, name, sub, progress, currentStep, currentPhase, disabled, launch, status, alerts, nextMilestone, onClick }) {
    const heroSlug = id || "moda";

    if (disabled) {
      return e("div", { className: "gm-cat gm-cat--disabled" },
        e("div", { className: "gm-cat__hero gm-cat__hero--disabled" },
          e("div", { className: "gm-cat__hero-spark" }, e(CatSparkMark)),
          e("div", { className: "gm-cat__hero-icon" }, e(CategoryIcon, { id: heroSlug, size: 32 })),
          e("span", { className: "gm-cat__hero-chip gm-cat__hero-chip--muted" }, "próximamente")),
        e("div", { className: "gm-cat__body" },
          e("div", { className: "gm-cat__title-row" },
            e("div", { className: "gm-cat__name" }, name)),
          e("div", { className: "gm-cat__sub" }, sub || ""),
          launch && e("div", { className: "gm-cat__milestone" },
            e("span", { className: "gm-cat__milestone-icon" }, e(I.calendar, { size: 12 })),
            e("span", null, e("b", null, "Lanzamiento"), " · " + launch))));
    }

    const chipKind = status ? status.kind : null;

    return e("div", { className: "gm-cat", onClick },
      e("div", { className: "gm-cat__hero" },
        e("div", { className: "gm-cat__hero-spark" }, e(CatSparkMark)),
        e("div", { className: "gm-cat__hero-icon" }, e(CategoryIcon, { id: heroSlug, size: 32 })),
        status && e("span", { className: "gm-cat__hero-chip gm-cat__hero-chip--" + chipKind },
          e("span", { className: "gm-cat__hero-chip-dot" }),
          status.label)),
      e("div", { className: "gm-cat__body" },
        e("div", { className: "gm-cat__title-row" },
          e("div", { className: "gm-cat__name" }, name),
          currentStep === undefined && progress !== undefined
            ? e("span", { className: "gm-cat__progress-pct" }, progress + "%")
            : null),
        e("div", { className: "gm-cat__sub" }, sub || ""),
        currentStep !== undefined
          ? e(CatStepBar, { currentStep, currentPhase })
          : progress !== undefined && e(ProgressBar, { pct: progress }),
        nextMilestone && e("div", { className: "gm-cat__milestone" },
          e("span", { className: "gm-cat__milestone-icon" }, e(I.calendar, { size: 12 })),
          e("span", null, e("b", null, nextMilestone.date), " · " + nextMilestone.text)),
        alerts && (alerts.crit || alerts.warn || alerts.tasks)
          ? e("div", { className: "gm-cat__meta-row" },
              alerts.crit ? e("span", { className: "gm-cat__meta-pill gm-cat__meta-pill--crit" },
                e("span", { className: "gm-cat__meta-dot" }), alerts.crit + " críticas") : null,
              alerts.warn ? e("span", { className: "gm-cat__meta-pill gm-cat__meta-pill--warn" },
                e("span", { className: "gm-cat__meta-dot" }), alerts.warn + " alertas") : null,
              alerts.tasks ? e("span", { className: "gm-cat__meta-pill" }, alerts.tasks + " tareas") : null)
          : null),
      e("span", { className: "gm-cat__chev" }, e(I.chevronRight, { size: 16 })));
  }

  window.GMUI = {
    Chip, Btn, IconBtn, ProdImg, Swatch, PageHead, Metric, Progress, ProgressBar,
    EmailThread, AIPanel, Editable, Empty, CLP, CHIP, DOT,
    AdvanceBar, ApprovalPanel, AlertList, SeasonIcon, SEASON_THEME, CategoryCard, TodoList
  };
})();
