/* GM — Fichas revisadas (Paso 9, Fase 4) · Revisión post-negociación
   Compradores revisan fichas con alertas de ajuste y las aprueban o devuelven.
   → window.GMScreens.FichasRevisadas */
(function () {
  const e = React.createElement;
  const I = window.GMIcon;
  const { Chip, Btn, ProdImg, PageHead, AdvanceBar } = window.GMUI;

  // Alertas de ajuste por ficha (vienen de la negociación en origen)
  const ALERTAS = {
    "MJ-3122": [
      "Acortar largo 3 cm para ventana 1",
      "Confirmar firmeza del estampado floral",
    ],
    "MJ-3187": [
      "Cambiar a mezcla lino-viscosa 70/30",
      "Ajustar caído de solapa",
    ],
  };

  // Estado inicial de revisión (independiente de s.ficha para no mutar data.js)
  const INITIAL_STATE = () => {
    const map = {};
    GM.skus.forEach((s) => {
      if (s.ficha === "en_revision") map[s.id] = "en_revision";
      else if (s.ficha === "aprobada") map[s.id] = "aprobada";
      else map[s.id] = s.ficha;
    });
    return map;
  };

  function FichaRevCard({ sku, estado, onAprobar, onDevolver }) {
    const alertas = ALERTAS[sku.id] || [];
    const isRevision = estado === "en_revision";
    const isAprobada = estado === "aprobada";

    return e("div", { className: "gm-card", style: {
      padding: 0, overflow: "hidden",
      border: isRevision ? "1.5px solid var(--wm-warn-300)" : isAprobada ? "1.5px solid var(--wm-success-200)" : "1.5px solid var(--wm-ns-100)" } },

      // header con color strip
      e("div", { style: {
        display: "flex", gap: 12, padding: "12px 14px",
        background: isRevision ? "var(--wm-warn-050, #fffbeb)" : isAprobada ? "var(--wm-success-050, #f0fdf4)" : "var(--wm-ns-050)" } },
        e(ProdImg, { swatch: sku.swatch, style: { width: 48, height: 48, borderRadius: 8, flex: "0 0 auto" } }),
        e("div", { style: { flex: 1, minWidth: 0 } },
          e("div", { style: { fontSize: 10.5, fontWeight: 700, color: "var(--wm-ns-300)", letterSpacing: ".03em" } }, sku.id),
          e("div", { style: { fontWeight: 700, fontSize: 13.5, color: "var(--wm-ns-600)", lineHeight: 1.25, marginTop: 1 } }, sku.name)),
        e("div", { style: { flex: "0 0 auto" } },
          isAprobada
            ? e(Chip, { k: "aprobada" })
            : isRevision
              ? e(Chip, { k: "en_revision" })
              : e(Chip, { k: estado }))),

      // alertas (solo si en revisión)
      isRevision && e("div", { style: { padding: "10px 14px", borderTop: "1px solid var(--wm-warn-200, #fde68a)" } },
        e("div", { style: { fontSize: 10.5, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", color: "var(--wm-warn-500, #d97706)", marginBottom: 6 } },
          alertas.length + " ajuste" + (alertas.length > 1 ? "s" : "") + " pendiente" + (alertas.length > 1 ? "s" : "")),
        alertas.map((a, i) =>
          e("div", { key: i, style: { display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 4 } },
            e(I.alert, { size: 13, style: { color: "var(--wm-warn-500, #d97706)", flex: "0 0 auto", marginTop: 1 } }),
            e("span", { style: { fontSize: 12.5, color: "var(--wm-ns-500)", lineHeight: 1.4 } }, a))),
        e("div", { style: { display: "flex", gap: 8, marginTop: 10 } },
          e(Btn, { variant: "primary", size: "sm", icon: "check", onClick: () => onAprobar(sku.id) }, "Aprobar con ajuste"),
          e(Btn, { variant: "ghost", size: "sm", onClick: () => onDevolver(sku.id) }, "Devolver a diseño"))));
  }

  function FichasRevisadas({ go }) {
    const [estados, setEstados] = React.useState(INITIAL_STATE);
    const [approved, setApproved] = React.useState(false);

    function aprobar(id) {
      setEstados((prev) => ({ ...prev, [id]: "aprobada" }));
    }
    function devolver(id) {
      setEstados((prev) => ({ ...prev, [id]: "en_progreso" }));
    }

    const enRevision = GM.skus.filter((s) => estados[s.id] === "en_revision");
    const aprobadas  = GM.skus.filter((s) => estados[s.id] === "aprobada");
    const devueltas  = GM.skus.filter((s) => estados[s.id] === "en_progreso" && ALERTAS[s.id]);
    const todasListas = enRevision.length === 0;

    return e("div", { className: "gm-page gm-fade", style: { paddingBottom: 80 } },
      PageHead({
        title: "Fichas revisadas",
        subtitle: "Fase 4 · Producción — revisión post-negociación · compradores aprueban ajustes de origen",
      }),

      // resumen
      e("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 } },
        e("div", { className: "gm-card", style: { padding: "16px 20px", display: "flex", gap: 12, alignItems: "center" } },
          e("div", { style: { width: 40, height: 40, borderRadius: 11, background: "var(--wm-success-100, #dcfce7)", color: "var(--wm-success-500)", display: "grid", placeItems: "center", flex: "0 0 auto" } },
            e(I.checkCircle, { size: 20 })),
          e("div", null,
            e("div", { style: { fontSize: 24, fontWeight: 800, lineHeight: 1 } }, aprobadas.length),
            e("div", { style: { fontSize: 12, color: "var(--wm-ns-300)", marginTop: 3 } }, "Fichas aprobadas"))),
        e("div", { className: "gm-card", style: { padding: "16px 20px", display: "flex", gap: 12, alignItems: "center" } },
          e("div", { style: { width: 40, height: 40, borderRadius: 11, background: "var(--wm-warn-100, #fef3c7)", color: "var(--wm-warn-500, #d97706)", display: "grid", placeItems: "center", flex: "0 0 auto" } },
            e(I.alert, { size: 20 })),
          e("div", null,
            e("div", { style: { fontSize: 24, fontWeight: 800, lineHeight: 1 } }, enRevision.length),
            e("div", { style: { fontSize: 12, color: "var(--wm-ns-300)", marginTop: 3 } }, "Requieren revisión"))),
        e("div", { className: "gm-card", style: { padding: "16px 20px", display: "flex", gap: 12, alignItems: "center" } },
          e("div", { style: { width: 40, height: 40, borderRadius: 11, background: "var(--wm-ns-100)", color: "var(--wm-ns-400)", display: "grid", placeItems: "center", flex: "0 0 auto" } },
            e(I.doc, { size: 20 })),
          e("div", null,
            e("div", { style: { fontSize: 24, fontWeight: 800, lineHeight: 1 } }, GM.skus.length),
            e("div", { style: { fontSize: 12, color: "var(--wm-ns-300)", marginTop: 3 } }, "Fichas totales")))),

      // alerta: pendientes de revisión
      enRevision.length > 0 && e("div", { style: { background: "var(--wm-warn-050, #fffbeb)", border: "1.5px solid var(--wm-warn-200, #fde68a)", borderRadius: 12, padding: "12px 16px", marginBottom: 16, display: "flex", gap: 10, alignItems: "center" } },
        e(I.alert, { size: 18, style: { color: "var(--wm-warn-500, #d97706)", flex: "0 0 auto" } }),
        e("div", null,
          e("div", { style: { fontWeight: 700, fontSize: 14, color: "var(--wm-warn-700, #92400e)" } },
            enRevision.length + " ficha" + (enRevision.length > 1 ? "s" : "") + " con ajustes pendientes"),
          e("div", { style: { fontSize: 12.5, color: "var(--wm-warn-600, #b45309)", marginTop: 2 } },
            "Revisa los cambios solicitados en origen y aprueba o devuelve a diseño."))),

      // si todo aprobado, éxito
      todasListas && e("div", { style: { background: "var(--wm-success-050, #f0fdf4)", border: "1.5px solid var(--wm-success-200)", borderRadius: 12, padding: "12px 16px", marginBottom: 16, display: "flex", gap: 10, alignItems: "center" } },
        e(I.checkCircle, { size: 18, style: { color: "var(--wm-success-500)", flex: "0 0 auto" } }),
        e("div", null,
          e("div", { style: { fontWeight: 700, fontSize: 14, color: "var(--wm-success-700, #15803d)" } }, "¡Todas las fichas revisadas!"),
          e("div", { style: { fontSize: 12.5, color: "var(--wm-success-600, #16a34a)", marginTop: 2 } }, "Puedes avanzar a la Validación final."))),

      // fichas en revisión primero
      enRevision.length > 0 && e("div", { style: { marginBottom: 20 } },
        e("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--wm-warn-500, #d97706)", marginBottom: 10 } },
          "Pendiente de revisión"),
        e("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
          enRevision.map((s) => e(FichaRevCard, { key: s.id, sku: s, estado: estados[s.id], onAprobar: aprobar, onDevolver: devolver })))),

      // fichas aprobadas
      aprobadas.length > 0 && e("div", { style: { marginBottom: 20 } },
        e("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--wm-success-500)", marginBottom: 10 } },
          "Aprobadas"),
        e("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 8 } },
          aprobadas.map((s) => e(FichaRevCard, { key: s.id, sku: s, estado: estados[s.id], onAprobar: aprobar, onDevolver: devolver })))),

      // fichas restantes (sin_iniciar, en_progreso, etc.)
      GM.skus.filter((s) => !["aprobada", "en_revision"].includes(estados[s.id])).length > 0 &&
        e("div", { style: { marginBottom: 20 } },
          e("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--wm-ns-300)", marginBottom: 10 } },
            "Resto del line plan"),
          e("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 8 } },
            GM.skus
              .filter((s) => !["aprobada", "en_revision"].includes(estados[s.id]))
              .map((s) => e("div", { key: s.id, className: "gm-card", style: { padding: "10px 14px", display: "flex", gap: 10, alignItems: "center" } },
                e(ProdImg, { swatch: s.swatch, style: { width: 36, height: 36, borderRadius: 7, flex: "0 0 auto" } }),
                e("div", { style: { flex: 1, minWidth: 0 } },
                  e("div", { style: { fontSize: 10.5, fontWeight: 700, color: "var(--wm-ns-300)" } }, s.id),
                  e("div", { style: { fontSize: 12.5, fontWeight: 600, color: "var(--wm-ns-500)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, s.name)),
                e(Chip, { k: estados[s.id] || s.ficha }))))),

      e(AdvanceBar, { stepId: "fichas_revisadas", onComplete: () => setApproved(true), go, completed: approved || todasListas }));
  }

  window.GMScreens = Object.assign(window.GMScreens || {}, { FichasRevisadas });
})();
