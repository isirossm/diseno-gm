/* GM — Viaje de tendencias (Fase 1) · Plataforma + App iPhone
   → window.GMScreens.Viaje */
(function () {
  const e = React.createElement;
  const I = window.GMIcon;
  const { Chip, Progress, PageHead, AdvanceBar } = window.GMUI;

  // Itinerario Mar 2026 — cada día del 3 al 9
  const CALENDAR = [
    { day: 3, dow: "Mar", city: "Shanghai",  done: true },
    { day: 4, dow: "Mié", city: "Shanghai",  done: true },
    { day: 5, dow: "Jue", city: "Shanghai",  done: true },
    { day: 6, dow: "Vie", city: "Cantón",    done: true },
    { day: 7, dow: "Sáb", city: "Cantón",    done: true },
    { day: 8, dow: "Dom", city: "Cantón",    done: true },
    { day: 9, dow: "Lun", city: "Ningbo",    done: false },
  ];

  const CITY_COLOR = {
    Shanghai: "var(--wm-sb-400)",
    Cantón:   "var(--wm-success-500)",
    Ningbo:   "#f59e0b",
  };

  const WISHLIST = [
    { cat: "Telas y materiales", items: [
      { name: "Lino-viscosa 70/30",       found: true },
      { name: "Viscosa fluida estampada", found: true },
      { name: "Punto seamless",           found: false },
    ]},
    { cat: "Licencias", items: [
      { name: "Disney — live action",     found: true },
    ]},
    { cat: "Prendas referencia", items: [
      { name: "Vestido midi floral",      found: true },
      { name: "Set coordinado",           found: false },
    ]},
  ];

  // Registro de compras generado por escaneo de boletas en la app
  const COMPRAS = [
    { id: "RC-001", desc: "Tela lino-viscosa 70/30 (2 m)",         ciudad: "Shanghai", fecha: "4 mar", monto: 240,  categoria: "Telas" },
    { id: "RC-002", desc: "Muestras textiles variadas (pack 8)",    ciudad: "Shanghai", fecha: "5 mar", monto: 180,  categoria: "Telas" },
    { id: "RC-003", desc: "Guía de temporada Canton Trade Fair",    ciudad: "Cantón",   fecha: "6 mar", monto:  45,  categoria: "Documentación" },
    { id: "RC-004", desc: "Referencia vestido midi floral",         ciudad: "Cantón",   fecha: "7 mar", monto: 320,  categoria: "Prendas ref." },
    { id: "RC-005", desc: "Tejido punto seamless (muestra 50 cm)", ciudad: "Ningbo",   fecha: "9 mar", monto: 156,  categoria: "Telas" },
  ];
  const CNY_TO_CLP = 87.4; // tasa aprox

  function Viaje({ go }) {
    const [approved, setApproved] = React.useState(false);

    const totalWish  = WISHLIST.reduce((a, c) => a + c.items.length, 0);
    const foundWish  = WISHLIST.reduce((a, c) => a + c.items.filter((x) => x.found).length, 0);
    const totalCNY   = COMPRAS.reduce((a, c) => a + c.monto, 0);
    const totalCLP   = Math.round(totalCNY * CNY_TO_CLP);

    return e("div", { className: "gm-page gm-fade", style: { paddingBottom: 80 } },
      PageHead({
        title: "Viaje de tendencias",
        subtitle: "Fase 1 · Investigación — recorrido de mercados y proveedores en Asia",
      }),

      // resumen viaje
      e("div", { className: "gm-card", style: { padding: "18px 22px", marginBottom: 16, display: "flex", gap: 20, alignItems: "center" } },
        e("div", { style: { width: 52, height: 52, borderRadius: 14, background: "var(--wm-sb-200)", color: "var(--wm-sb-400)", display: "grid", placeItems: "center", flex: "0 0 auto" } },
          e(I.plane, { size: 26 })),
        e("div", { style: { flex: 1 } },
          e("div", { style: { fontWeight: 700, fontSize: 16 } }, "Viaje Asia · " + GM.season.name),
          e("div", { style: { fontSize: 13, color: "var(--wm-ns-300)", marginTop: 3 } },
            "3 – 9 mar 2026 · Shanghai · Cantón · Ningbo · Valentina Ríos")),
        e(Chip, { variant: "active", label: "En curso" })),

      // calendario de itinerario
      e("div", { className: "gm-card", style: { marginBottom: 14, padding: "18px 20px" } },
        e("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--wm-ns-300)", marginBottom: 14 } }, "Itinerario · Marzo 2026"),
        // encabezado de mes mini
        e("div", { style: { display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 6 } },
          CALENDAR.map((d) => {
            const color = CITY_COLOR[d.city];
            const isToday = !d.done;
            return e("div", { key: d.day,
              style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4 } },
              // día de semana
              e("div", { style: { fontSize: 10, fontWeight: 600, color: "var(--wm-ns-300)", textTransform: "uppercase" } }, d.dow),
              // número con fondo
              e("div", { style: {
                width: 34, height: 34, borderRadius: "50%", display: "grid", placeItems: "center",
                background: isToday ? color : d.done ? color + "22" : "var(--wm-ns-100)",
                border: isToday ? "2px solid " + color : "2px solid " + (d.done ? color : "transparent"),
                color: isToday ? "#fff" : d.done ? color : "var(--wm-ns-300)",
                fontWeight: 700, fontSize: 14 } }, d.day),
              // ciudad
              e("div", { style: { fontSize: 10, fontWeight: 600, color: d.done || isToday ? color : "var(--wm-ns-200)", textAlign: "center", lineHeight: 1.2 } }, d.city));
          })),
        // leyenda
        e("div", { style: { display: "flex", gap: 14, marginTop: 14, flexWrap: "wrap" } },
          Object.entries(CITY_COLOR).map(([city, color]) =>
            e("div", { key: city, style: { display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--wm-ns-400)" } },
              e("div", { style: { width: 8, height: 8, borderRadius: "50%", background: color, flex: "0 0 auto" } }),
              city)))),

      // wishlist + registro de compras
      e("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 } },

        // wishlist
        e("div", { className: "gm-card" },
          e("div", { style: { display: "flex", alignItems: "center", marginBottom: 10 } },
            e("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--wm-ns-300)" } }, "Wishlist"),
            e("div", { style: { marginLeft: "auto", fontWeight: 700, fontSize: 13,
              color: foundWish === totalWish ? "var(--wm-success-500)" : "var(--wm-ns-500)" } },
              foundWish + " / " + totalWish + " encontrados")),
          e(Progress, { value: foundWish, total: totalWish, color: "var(--wm-success-500)" }),
          e("div", { style: { marginTop: 12, display: "flex", flexDirection: "column", gap: 10 } },
            WISHLIST.map((cat) =>
              e("div", { key: cat.cat },
                e("div", { style: { fontSize: 11, fontWeight: 700, color: "var(--wm-ns-400)", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 5 } }, cat.cat),
                cat.items.map((item) =>
                  e("div", { key: item.name, style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 4 } },
                    e(I[item.found ? "checkCircle" : "clock"], { size: 14, style: { color: item.found ? "var(--wm-success-500)" : "var(--wm-ns-200)", flex: "0 0 auto" } }),
                    e("span", { style: { fontSize: 13, color: item.found ? "var(--wm-ns-600)" : "var(--wm-ns-300)" } }, item.name))))))),

        // registro de compras
        e("div", { className: "gm-card" },
          e("div", { style: { display: "flex", alignItems: "center", marginBottom: 10 } },
            e("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--wm-ns-300)" } },
              e(I.dollar, { size: 12, style: { marginRight: 5 } }), "Registro de compras"),
            e("div", { style: { marginLeft: "auto", fontSize: 11, color: "var(--wm-ns-400)", fontWeight: 600 } },
              "¥" + totalCNY.toLocaleString("es-CL") + " CNY")),
          e("div", { style: { display: "flex", flexDirection: "column", gap: 6 } },
            COMPRAS.map((c) =>
              e("div", { key: c.id, style: { display: "flex", gap: 10, padding: "8px 10px", borderRadius: 8, background: "var(--wm-ns-050)", border: "1px solid var(--wm-ns-100)" } },
                e("div", { style: { width: 28, height: 28, borderRadius: 7, background: "var(--wm-sb-200)", color: "var(--wm-sb-400)", display: "grid", placeItems: "center", flex: "0 0 auto" } },
                  e(I.doc, { size: 13 })),
                e("div", { style: { flex: 1, minWidth: 0 } },
                  e("div", { style: { fontSize: 12.5, fontWeight: 600, color: "var(--wm-ns-600)", lineHeight: 1.3 } }, c.desc),
                  e("div", { style: { fontSize: 11, color: "var(--wm-ns-300)", marginTop: 2 } },
                    c.ciudad + " · " + c.fecha + " · ", e("span", { style: { fontStyle: "italic" } }, c.categoria))),
                e("div", { style: { textAlign: "right", flex: "0 0 auto" } },
                  e("div", { style: { fontWeight: 700, fontSize: 13, color: "var(--wm-ns-600)" } }, "¥" + c.monto),
                  e("div", { style: { fontSize: 10.5, color: "var(--wm-ns-300)" } }, "$" + Math.round(c.monto * CNY_TO_CLP).toLocaleString("es-CL")))))),
          e("div", { style: { borderTop: "1px solid var(--wm-ns-100)", marginTop: 10, paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" } },
            e("div", { style: { fontSize: 11.5, color: "var(--wm-ns-400)" } }, COMPRAS.length + " boletas escaneadas"),
            e("div", { style: { fontWeight: 800, fontSize: 14, color: "var(--wm-ns-600)" } },
              "$" + totalCLP.toLocaleString("es-CL") + " CLP")))),

      e(AdvanceBar, { stepId: "viaje", onComplete: () => setApproved(true), go, completed: approved }));
  }

  window.GMScreens = Object.assign(window.GMScreens || {}, { Viaje });
})();
