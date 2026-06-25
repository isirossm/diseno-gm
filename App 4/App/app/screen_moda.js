/* Moda (ModaGeneral) → window.GMScreens.Moda */
(function () {
  const e = React.createElement;
  const I = window.GMIcon;
  const { Btn, AlertList, CategoryCard } = window.GMUI;

  const MODA_ALERTS = [
    { level: "crit", title: "Primavera–Verano 26 — aprobaciones pendientes", desc: "8 prendas sin aprobación de muestra final. Vence en 3 días.", scope: "Moda Mujer" },
    { level: "warn", title: "Retraso en Blusas", desc: "Proveedor Trends Co. solicita extensión de 2 días.", scope: "Moda Mujer" },
    { level: "warn", title: "Manuales bloqueados", desc: "Esperando KV de campaña de Marketing (8 días).", scope: "Manuales" },
  ];

  function Moda({ go }) {
    const MODA_SUBCATS = [
      {
        id: "mujer", name: "Moda Mujer", progress: 64,
        currentStep: 3, currentPhase: "Contramuestra",
        sub: "4 colecciones activas",
        status: { kind: "warn", label: "Atención" },
        alerts: { crit: 2, warn: 3 },
        nextMilestone: { date: "15 feb", text: "Cierre Primavera–Verano 26" },
        onClick: () => go("moda-mujer"),
      },
      { id: "hombre",   name: "Moda Hombre",   sub: "Próximamente · Q1 2027", launch: "Q1 2027", disabled: true },
      { id: "infantil", name: "Moda Infantil",  sub: "Próximamente · Q1 2027", launch: "Q1 2027", disabled: true },
      { id: "baby",     name: "Moda Baby",      sub: "Próximamente · Q2 2027", launch: "Q2 2027", disabled: true },
      { id: "calzado",  name: "Calzado",             sub: "Próximamente · Q2 2027", launch: "Q2 2027", disabled: true },
      { id: "interior", name: "Ropa Interior",       sub: "Próximamente · Q3 2027", launch: "Q3 2027", disabled: true },
    ];

    return e("div", { className: "gm-page gm-fade" },
      e("div", { className: "gm-page__head" },
        e("div", null,
          e("h1", { className: "gm-page__title" }, "Moda"),
          e("p", { className: "gm-page__subtitle" }, "6 subcategorías · Estado consolidado de procesos"))),

      e("div", { style: { display: "flex", flexDirection: "column", gap: 24 } },

        // Subcategorías
        e("div", null,
          e("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 } },
            e("div", { style: { fontWeight: 700, fontSize: 16 } }, "Subcategorías y avance"),
            e("span", { style: { fontSize: 13, color: "var(--wm-ns-400)" } }, "5 de 6 desactivadas en esta versión")),
          e("div", { style: { display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 12 } },
            MODA_SUBCATS.map((s) => e(CategoryCard, { key: s.id, ...s })))),

        // Alertas
        e("div", { style: { maxWidth: 560 } },
          e(AlertList, { items: MODA_ALERTS, title: "Alertas de Moda", link: "Ver todas" }))));
  }

  window.GMScreens = window.GMScreens || {};
  window.GMScreens.Moda = Moda;
})();
