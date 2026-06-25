/* Panel de Control (Gestión) → window.GMScreens.Panel */
(function () {
  const e = React.createElement;
  const I = window.GMIcon;
  const { Btn, AlertList, CategoryCard, PageHead } = window.GMUI;

  const PANEL_ALERTS = [
    { level: "crit",   title: "Colección Primavera–Verano 26 vence en 3 días",  desc: "Faltan aprobaciones de muestras finales para 8 prendas.", scope: "Moda Mujer" },
    { level: "warn",   title: "Retraso en tech pack Blusas",          desc: "Proveedor Trends Co. solicita extensión de 2 días.",      scope: "Moda Mujer" },
    { level: "normal", title: "Inicia revisión Otoño 27",             desc: "Kick-off agendado para el 18 de diciembre.",             scope: "Calendario" },
    { level: "warn",   title: "Pendiente reporte semanal",            desc: "Equipo de compras no ha cargado avance de la semana.",   scope: "General" },
  ];

  function Panel({ go }) {
    const PANEL_CATEGORIES = [
      {
        id: "moda", name: "Moda", progress: 64,
        currentStep: 3, currentPhase: "Contramuestra",
        sub: "6 subcategorías · 12 colecciones",
        status: { kind: "warn", label: "Atención" },
        alerts: { crit: 3, warn: 5, tasks: 28 },
        nextMilestone: { date: "15 feb", text: "Cierre Primavera–Verano 26" },
        onClick: () => go("moda"),
      },
      { id: "casa",      name: "Casa",      sub: "Próximamente · Q2 2027", launch: "Q2 2027", disabled: true },
      { id: "electro",   name: "Electro",   sub: "Próximamente · Q3 2027", launch: "Q3 2027", disabled: true },
      { id: "hardlines", name: "Hardlines", sub: "Próximamente · Q4 2027", launch: "Q4 2027", disabled: true },
    ];

    return e("div", { className: "gm-page gm-fade" },
      e("div", { className: "gm-page__head" },
        e("div", null,
          e("h1", { className: "gm-page__title" }, "Inicio"),
          e("p", { className: "gm-page__subtitle" }, "Estado consolidado de todos los procesos activos · " + GM.season.name))),

      e("div", { style: { display: "flex", flexDirection: "column", gap: 24 } },

        // Categorías de producto
        e("div", null,
          e("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 } },
            e("div", { style: { fontWeight: 700, fontSize: 16 } }, "Categorías de producto"),
            e("span", { style: { fontSize: 13, color: "var(--wm-ns-400)" } }, "Selecciona una categoría para entrar al detalle")),
          e("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 } },
            PANEL_CATEGORIES.map((c) => e(CategoryCard, { key: c.id, ...c })))),

        // Alertas + resumen
        e("div", { style: { display: "grid", gridTemplateColumns: "1fr 420px", gap: 20, alignItems: "start" } },

          // Resumen de actividad
          e("div", { className: "gm-card" },
            e("div", { style: { fontWeight: 700, fontSize: 15, marginBottom: 16 } }, "Actividad reciente"),
            e("div", { style: { display: "flex", flexDirection: "column" } },
              [
                { icon: "check", color: "var(--wm-success-500)", bg: "var(--wm-success-100)", text: "Fichas de Vestidos aprobadas por Compras", time: "hoy 10:42" },
                { icon: "alert", color: "var(--wm-warn-500)",    bg: "var(--wm-warn-100)",    text: "Blusas: cambio de tela solicitado por Trends Co.", time: "hace 1 día" },
                { icon: "mail",  color: "var(--wm-sb-400)",      bg: "var(--wm-sb-200)",      text: "Confirmación pendiente de 2 proveedores", time: "hace 6 días" },
                { icon: "clock", color: "var(--wm-ns-400)",      bg: "var(--wm-ns-100)",      text: "Manuales sin actividad — bloqueado 8 días", time: "hace 8 días" },
              ].map((row, i) => e("div", { key: i, style: { display: "flex", gap: 12, alignItems: "center", padding: "12px 0", borderBottom: i < 3 ? "1px solid var(--wm-ns-100)" : "none" } },
                e("div", { style: { width: 32, height: 32, borderRadius: 8, display: "grid", placeItems: "center", flex: "0 0 auto",
                  background: row.bg, color: row.color } }, e(I[row.icon], { size: 15 })),
                e("div", { style: { flex: 1, fontSize: 13.5, lineHeight: 1.3 } }, row.text),
                e("div", { style: { fontSize: 12, color: "var(--wm-ns-300)", flex: "0 0 auto" } }, row.time))))),

          // Alertas
          e(AlertList, { items: PANEL_ALERTS, title: "Alertas activas", link: "Ver todas" }))));
  }

  window.GMScreens = window.GMScreens || {};
  window.GMScreens.Panel = Panel;
})();
