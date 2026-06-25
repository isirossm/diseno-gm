/* GM — Herramientas globales (rail "Sidecar"): Correo · Calendario · Documentos · Historial
   → window.GMScreens.{Correo,Calendario,Documentos,Historial} */
(function () {
  const e = React.createElement;
  const I = window.GMIcon;
  const { Chip, Btn, PageHead, ProdImg } = window.GMUI;
  const provName = (p) => GM.providers[p].name;

  // ---------------- Correo ----------------
  function Correo({ go }) {
    // flatten threads → inbox rows
    const rows = [];
    Object.entries(GM.emailThreads).forEach(([sku, msgs]) => {
      const last = msgs[msgs.length - 1];
      rows.push({ sku, subject: last.subject, from: last.dir === "in" ? last.from : last.to, date: last.date, dir: last.dir, count: msgs.length, body: last.body });
    });
    // a couple of extra inbox items for realism
    rows.push({ sku: null, subject: "Confirmación de recepción pendiente · 2 proveedores", from: "Sistema GM", date: "hoy", dir: "in", count: 1, body: "2 proveedores no han confirmado recepción de muestras enviadas hace 6 días." });
    rows.push({ sku: null, subject: "KV de campaña — esperando aprobación de Marketing", from: "Marketing", date: "ayer", dir: "in", count: 1, body: "El Key Visual de la campaña sigue pendiente; bloquea el inicio de Manuales." });
    const [sel, setSel] = React.useState(0);
    const cur = rows[sel];
    const thread = cur.sku ? GM.emailThreads[cur.sku] : [{ from: cur.from, dir: "in", date: cur.date, subject: cur.subject, body: cur.body }];

    return e("div", { className: "gm-page gm-fade" },
      PageHead({ title: "Correo", subtitle: "Bandeja vinculada · los correos se asocian automáticamente al SKU, paso o proveedor",
        actions: e(Btn, { variant: "primary", icon: "send" }, "Redactar") }),
      e("div", { style: { display: "grid", gridTemplateColumns: "minmax(0,380px) 1fr", gap: 16, alignItems: "start" } },
        // inbox
        e("div", { className: "gm-card", style: { padding: 6 } },
          rows.map((r, i) => e("button", { key: i, onClick: () => setSel(i), style: {
            width: "100%", textAlign: "left", border: "none", background: sel === i ? "var(--gm-side-active)" : "transparent",
            borderRadius: 8, padding: "11px 12px", cursor: "pointer", display: "flex", gap: 11, alignItems: "flex-start", marginBottom: 2 } },
            e("div", { style: { width: 34, height: 34, borderRadius: "50%", flex: "0 0 auto", display: "grid", placeItems: "center",
              background: r.dir === "in" ? "var(--wm-sb-200)" : "var(--wm-ns-100)", color: r.dir === "in" ? "var(--wm-sb-400)" : "var(--wm-ns-400)", fontWeight: 700, fontSize: 12 } },
              r.from.split(" ").map((w) => w[0]).slice(0, 2).join("")),
            e("div", { style: { flex: 1, minWidth: 0 } },
              e("div", { style: { display: "flex", justifyContent: "space-between", gap: 8 } },
                e("span", { style: { fontWeight: 700, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, r.from),
                e("span", { style: { fontSize: 11, color: "var(--wm-ns-300)", flex: "0 0 auto" } }, r.date)),
              e("div", { style: { fontSize: 12.5, color: "var(--wm-ns-500)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: 1 } }, r.subject),
              e("div", { style: { display: "flex", gap: 6, marginTop: 5, alignItems: "center" } },
                r.sku && e("span", { className: "gm-tag", style: { fontSize: 10.5 } }, r.sku),
                r.count > 1 && e("span", { style: { fontSize: 11, color: "var(--wm-ns-300)" } }, r.count + " mensajes"))))) ),
        // reading pane
        e("div", { className: "gm-card gm-card--pad-lg" },
          e("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid var(--wm-ns-100)" } },
            e("h3", { className: "gm-card__title", style: { flex: 1 } }, cur.subject),
            cur.sku && e(Btn, { variant: "ghost", size: "sm", icon: "box", onClick: () => go("muestras") }, "Ver " + cur.sku)),
          e("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
            thread.map((m, i) => e("div", { key: i, style: {
              background: m.dir === "in" ? "var(--wm-sb-200)" : "var(--wm-ns-050)",
              border: "1px solid " + (m.dir === "in" ? "#cfe5fb" : "var(--wm-ns-100)"), borderRadius: 10, padding: "12px 14px" } },
              e("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 4 } },
                e("span", { style: { fontWeight: 700, fontSize: 13, color: m.dir === "in" ? "var(--wm-sb-500)" : "var(--wm-ns-500)" } }, m.from),
                e("span", { style: { fontSize: 11.5, color: "var(--wm-ns-300)" } }, m.date)),
              e("div", { style: { fontSize: 13.5, color: "var(--wm-ns-500)", lineHeight: 1.55 } }, m.body)))),
          e("div", { style: { display: "flex", gap: 8, marginTop: 14 } },
            e(Btn, { variant: "primary", size: "sm", icon: "send" }, "Responder"),
            e(Btn, { variant: "ghost", size: "sm" }, "Reenviar")))));
  }

  // ---------------- Calendario ----------------
  function Calendario({ go }) {
    const hitos = GM.trends.calendar;
    const stepC = { completado: "var(--wm-success-500)", curso: "var(--wm-sb-400)", pendiente: "var(--wm-ns-300)", bloqueado: "var(--wm-error-500)" };
    return e("div", { className: "gm-page gm-fade" },
      PageHead({ title: "Calendario", subtitle: "Hitos de la temporada " + GM.season.name + " · sincronizado con el flujo de trabajo",
        actions: e(Btn, { variant: "ghost", size: "sm", icon: "download" }, "Exportar .ics") }),
      e("div", { style: { display: "grid", gridTemplateColumns: "1fr 320px", gap: 16, alignItems: "start" } },
        e("div", { className: "gm-card gm-card--pad-lg" },
          e("h3", { className: "gm-card__title", style: { marginBottom: 16 } }, "Línea de tiempo de hitos"),
          e("div", { style: { position: "relative", paddingLeft: 26 } },
            e("div", { style: { position: "absolute", left: 7, top: 6, bottom: 6, width: 2, background: "var(--wm-ns-100)" } }),
            hitos.map((h, i) => e("div", { key: i, style: { position: "relative", paddingBottom: i < hitos.length - 1 ? 20 : 0 } },
              e("div", { style: { position: "absolute", left: -26, top: 2, width: 16, height: 16, borderRadius: "50%", background: i < 2 ? "var(--wm-success-500)" : i === 2 ? "var(--wm-sb-400)" : "#fff", border: "2.5px solid " + (i < 2 ? "var(--wm-success-500)" : i === 2 ? "var(--wm-sb-400)" : "var(--wm-ns-200)") } }),
              e("div", { style: { display: "flex", alignItems: "baseline", gap: 10 } },
                e("span", { style: { fontWeight: 700, fontSize: 15 } }, h.name),
                i === 2 && e(Chip, { variant: "active", label: "Próximo" })),
              e("div", { style: { fontSize: 13, color: "var(--wm-ns-300)", marginTop: 2, fontVariantNumeric: "tabular-nums" } }, h.date))))),
        e("div", { style: { display: "flex", flexDirection: "column", gap: 16 } },
          e("div", { className: "gm-card gm-card--pad-lg" },
            e("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--wm-ns-300)" } }, "Estado del flujo"),
            e("div", { style: { display: "flex", flexDirection: "column", gap: 9, marginTop: 12 } },
              GM.steps.map((s) => e("button", { key: s.id, onClick: () => go(s.screen), style: { display: "flex", alignItems: "center", gap: 9, border: "none", background: "none", cursor: "pointer", padding: 0, textAlign: "left" } },
                e("span", { style: { width: 8, height: 8, borderRadius: "50%", background: stepC[s.status] } }),
                e("span", { style: { fontSize: 13, flex: 1 } }, s.no + ". " + s.label),
                s.status === "curso" && e("span", { style: { fontSize: 10.5, fontWeight: 700, color: "var(--wm-sb-400)" } }, "EN CURSO"))))))));
  }

  // ---------------- Documentos ----------------
  function Documentos({ go }) {
    const fichaLabel = { completa: ["success", "Aprobada"], progreso: ["active", "En progreso"], rechazada: ["error", "Rechazada"], sin_iniciar: ["neutral", "Sin iniciar"] };
    return e("div", { className: "gm-page gm-fade" },
      PageHead({ title: "Documentos", subtitle: "Fichas técnicas, manuales y archivos de la temporada",
        actions: e(window.GMUI.Btn, { variant: "primary", icon: "download" }, "Descargar todo (.zip)") }),
      e("div", { className: "gm-card", style: { padding: 0, overflow: "hidden" } },
        e("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13.5 } },
          e("thead", null, e("tr", { style: { background: "var(--wm-ns-050)", textAlign: "left" } },
            ["Documento", "SKU", "Tipo", "Estado", ""].map((h, i) => e("th", { key: i, style: { padding: "12px 16px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em", color: "var(--wm-ns-300)", borderBottom: "1px solid var(--wm-ns-100)" } }, h)))),
          e("tbody", null, GM.skus.map((s, i) => {
            const fl = fichaLabel[s.ficha];
            return e("tr", { key: s.id, style: { borderBottom: i < GM.skus.length - 1 ? "1px solid var(--wm-ns-100)" : "none" } },
              e("td", { style: { padding: "11px 16px" } }, e("div", { style: { display: "flex", alignItems: "center", gap: 11 } },
                e("div", { style: { width: 30, height: 38, borderRadius: 4, background: "var(--wm-error-100)", color: "var(--wm-error-500)", display: "grid", placeItems: "center", flex: "0 0 auto" } }, e(I.doc, { size: 16 })),
                e("span", { style: { fontWeight: 600 } }, "Ficha " + s.id + ".pdf"))),
              e("td", { style: { padding: "11px 16px", fontWeight: 700, color: "var(--wm-sb-400)" } }, s.id),
              e("td", { style: { padding: "11px 16px", color: "var(--wm-ns-400)" } }, "Libro Base"),
              e("td", { style: { padding: "11px 16px" } }, e(Chip, { variant: fl[0], label: fl[1] })),
              e("td", { style: { padding: "11px 16px", textAlign: "right" } }, e("div", { style: { display: "inline-flex", gap: 6 } },
                e("button", { className: "gm-btn gm-btn--icon", style: { width: 32, height: 32 }, title: "Abrir", onClick: () => go("fichas", "Libro Base") }, e(I.eye, { size: 14 })),
                e("button", { className: "gm-btn gm-btn--icon", style: { width: 32, height: 32 }, title: "Descargar" }, e(I.download, { size: 14 })))));
          })))));
  }

  // ---------------- Historial ----------------
  function Historial() {
    const log = [
      { who: "Renata González", act: "aprobó la ficha", obj: "MJ-3104 · Jeans skinny tiro alto", when: "hace 2 h", icon: "checkCircle", c: "var(--wm-success-500)", bg: "var(--wm-success-100)" },
      { who: "Comprador", act: "devolvió feedback en", obj: "MJ-3122 · Vestido midi floral", when: "hace 5 h", icon: "chat", c: "var(--wm-warn-500)", bg: "var(--wm-warn-100)" },
      { who: "Ningbo Garments", act: "confirmó recepción de muestra", obj: "MJ-3104", when: "ayer", icon: "truck", c: "var(--wm-sb-400)", bg: "var(--wm-sb-200)" },
      { who: "Comercial", act: "rechazó la ficha", obj: "MJ-3187 · Blazer lino oversize", when: "ayer", icon: "x", c: "var(--wm-error-500)", bg: "var(--wm-error-100)" },
      { who: "IA · Diseño GM", act: "generó el informe de tendencias", obj: "PV26", when: "hace 3 d", icon: "sparkles", c: "var(--wm-sb-400)", bg: "var(--wm-sb-200)" },
      { who: "Renata González", act: "envió muestras a", obj: "5 proveedores", when: "hace 4 d", icon: "send", c: "var(--wm-ns-400)", bg: "var(--wm-ns-100)" },
      { who: "Marketing", act: "agendó kick-off de", obj: "revisión Otoño 25", when: "hace 6 d", icon: "calendar", c: "#5f4b8b", bg: "#efe9f8" },
    ];
    return e("div", { className: "gm-page gm-fade" },
      PageHead({ title: "Historial", subtitle: "Bitácora de actividad de la temporada · cada cambio queda registrado" }),
      e("div", { className: "gm-card gm-card--pad-lg", style: { maxWidth: 760 } },
        e("div", { style: { display: "flex", flexDirection: "column", gap: 0 } },
          log.map((l, i) => e("div", { key: i, style: { display: "flex", gap: 13, alignItems: "flex-start", padding: "14px 0", borderBottom: i < log.length - 1 ? "1px solid var(--wm-ns-100)" : "none" } },
            e("div", { style: { width: 36, height: 36, borderRadius: "50%", flex: "0 0 auto", background: l.bg, color: l.c, display: "grid", placeItems: "center" } }, e(I[l.icon], { size: 18 })),
            e("div", { style: { flex: 1 } },
              e("div", { style: { fontSize: 14, lineHeight: 1.4 } },
                e("b", null, l.who), " ", l.act, " ", e("span", { style: { fontWeight: 600, color: "var(--wm-sb-500)" } }, l.obj)),
              e("div", { style: { fontSize: 12, color: "var(--wm-ns-300)", marginTop: 2 } }, l.when)))))));
  }

  window.GMScreens = Object.assign(window.GMScreens || {}, { Correo, Calendario, Documentos, Historial });
})();
