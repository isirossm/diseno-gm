/* App Viaje (móvil) — Registro + Wishlist. Dos teléfonos que comparten estado:
   guardar un registro en Registro tacha un ítem en Wishlist. window.ViajeField */
(function () {
  const { Chip, Btn } = window.GMUI;
  const I = window.GMIcon;
  const e = React.createElement;
  const BLUE = "var(--wm-sb-400)", SPARK = "var(--wm-spark-400)";

  // ---- wishlist model ----
  const WISH = [
    { cat: "Telas", icon: "layers", items: [
      { id: "f1", name: "Lino-viscosa 70/30", note: "Vestidos y blazers", prio: "must" },
      { id: "f2", name: "Viscosa fluida estampada", note: "Vestidos midi", prio: "must" },
      { id: "f3", name: "Punto seamless", note: "Athleisure femenino", prio: "explorar" },
    ]},
    { cat: "Licencias", icon: "sparkles", items: [
      { id: "l1", name: "Disney — live action", note: "Estreno julio", prio: "nice" },
    ]},
    { cat: "Prendas referencia", icon: "hanger", items: [
      { id: "p1", name: "Vestido midi floral", note: "Silueta líder", prio: "must" },
      { id: "p2", name: "Set coordinado", note: "Venta cruzada", prio: "nice" },
    ]},
  ];
  const PRIO = { must: ["error", "Must-have"], nice: ["active", "Nice-to-have"], explorar: ["neutral", "Explorar"] };
  const TELA_TO_WISH = { "Punto seamless": "f3", "Lino-viscosa 70/30": "f1", "Viscosa fluida estampada": "f2" };
  const TELAS = ["Punto seamless", "Lino-viscosa 70/30", "Viscosa fluida estampada", "Algodón pima", "Gabardina stretch"];
  const PATRONES = ["Liso", "Floral acuarela", "Tie-dye", "Rayas náuticas", "Tropical"];

  const PANTONE = [];
  Object.values(GM.palettes).forEach((g) => g.colors.forEach((c) => PANTONE.push(c)));

  // status-bar clearance + app header
  const TopSpace = () => e("div", { style: { height: 50, flex: "0 0 auto" } });

  // ---------- LOGIN ----------
  function LoginScreen({ onLogin }) {
    const SPARK_PATH = "M 62.785 48.529 L 59.162 7.407 C 59.162 3.34 63.905 0 69.874 0 C 75.843 0 80.604 3.34 80.604 7.407 L 76.972 48.529 C 76.564 51.006 73.546 52.916 69.87 52.916 C 66.194 52.916 63.185 51.006 62.785 48.529 Z M 47.689 65.754 C 49.525 62.563 49.384 58.994 47.443 57.405 L 13.706 33.698 C 10.201 31.665 4.939 34.111 1.953 39.296 C -1.043 44.476 -0.511 50.263 2.994 52.296 L 40.345 69.724 C 42.686 70.595 45.858 68.936 47.689 65.754 Z M 92.073 65.754 C 93.909 68.94 97.075 70.595 99.412 69.724 L 136.768 52.296 C 140.286 50.267 140.791 44.476 137.818 39.296 C 134.818 34.111 129.552 31.665 126.051 33.698 L 92.314 57.405 C 90.386 58.994 90.237 62.568 92.073 65.754 Z M 62.785 108.658 L 59.162 149.78 C 59.162 153.851 63.905 157.183 69.874 157.183 C 75.843 157.183 80.604 153.851 80.604 149.78 L 76.972 108.658 C 76.564 106.185 73.546 104.279 69.87 104.279 C 66.194 104.279 63.185 106.181 62.785 108.658 Z M 92.314 99.804 L 126.051 123.494 C 129.547 125.523 134.818 123.067 137.818 117.896 C 140.791 112.712 140.286 106.92 136.768 104.882 L 99.412 87.477 C 97.075 86.597 93.913 88.247 92.073 91.438 C 90.237 94.619 90.386 98.197 92.314 99.804 Z M 40.345 87.472 L 2.994 104.878 C -0.511 106.916 -1.043 112.707 1.953 117.891 C 4.939 123.058 10.201 125.518 13.706 123.489 L 47.443 99.799 C 49.384 98.193 49.525 94.619 47.689 91.433 C 45.853 88.243 42.682 86.588 40.345 87.472 Z";
    return e("div", { style: { height: "100%", display: "flex", flexDirection: "column", background: "#fff", fontFamily: "var(--font-sans)" } },
      e(TopSpace),
      // blue hero
      e("div", { style: { background: BLUE, padding: "28px 28px 36px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 } },
        e("svg", { width: 40, height: 45, viewBox: "0 0 139.762 157.183", fill: SPARK },
          e("path", { d: SPARK_PATH })),
        e("div", { style: { color: "#fff", fontWeight: 800, fontSize: 22, letterSpacing: "-.02em", marginTop: 2, lineHeight: 1 } }, "Diseño GM"),
        e("div", { style: { color: "rgba(255,255,255,.65)", fontSize: 12.5 } }, "Walmart Chile · " + GM.season.name)),
      // form
      e("div", { style: { flex: 1, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 14 } },
        e("div", { style: { fontSize: 16, fontWeight: 700, marginBottom: 4, color: "var(--wm-ns-600)" } }, "Iniciar sesión"),
        // email
        e("div", null,
          e("div", { style: { fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--wm-ns-400)", marginBottom: 6 } }, "Correo corporativo"),
          e("div", { style: { height: 46, border: "1.5px solid var(--wm-ns-200)", borderRadius: 12, padding: "0 14px", fontSize: 14, display: "flex", alignItems: "center", color: "var(--wm-ns-500)", background: "var(--wm-ns-050)" } }, "valentina@walmart.cl")),
        // password
        e("div", null,
          e("div", { style: { fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--wm-ns-400)", marginBottom: 6 } }, "Contraseña"),
          e("div", { style: { height: 46, border: "1.5px solid " + BLUE, borderRadius: 12, padding: "0 14px", fontSize: 22, display: "flex", alignItems: "center", color: "var(--wm-ns-500)", letterSpacing: 4 } }, "••••••••")),
        // button
        e("button", { onClick: onLogin, style: {
          height: 54, borderRadius: 100, border: "none", background: BLUE, color: "#fff",
          fontSize: 16, fontWeight: 700, fontFamily: "inherit", cursor: "pointer", marginTop: 4 } }, "Iniciar sesión"),
        e("div", { style: { textAlign: "center", fontSize: 11.5, color: "var(--wm-ns-300)", marginTop: "auto", paddingBottom: 8 } }, "Acceso restringido · Equipo de Diseño GM")));
  }
  function AppHeader({ title, sub }) {
    return e("div", { style: { flex: "0 0 auto", background: BLUE, color: "#fff", padding: "10px 18px 14px", display: "flex", alignItems: "center", gap: 11 } },
      e("svg", { width: 26, height: 26, viewBox: "0 0 139.762 157.183", fill: SPARK, style: { flex: "0 0 auto" } },
        e("path", { d: "M 62.785 48.529 L 59.162 7.407 C 59.162 3.34 63.905 0 69.874 0 C 75.843 0 80.604 3.34 80.604 7.407 L 76.972 48.529 C 76.564 51.006 73.546 52.916 69.87 52.916 C 66.194 52.916 63.185 51.006 62.785 48.529 Z M 47.689 65.754 C 49.525 62.563 49.384 58.994 47.443 57.405 L 13.706 33.698 C 10.201 31.665 4.939 34.111 1.953 39.296 C -1.043 44.476 -0.511 50.263 2.994 52.296 L 40.345 69.724 C 42.686 70.595 45.858 68.936 47.689 65.754 Z M 92.073 65.754 C 93.909 68.94 97.075 70.595 99.412 69.724 L 136.768 52.296 C 140.286 50.267 140.791 44.476 137.818 39.296 C 134.818 34.111 129.552 31.665 126.051 33.698 L 92.314 57.405 C 90.386 58.994 90.237 62.568 92.073 65.754 Z M 62.785 108.658 L 59.162 149.78 C 59.162 153.851 63.905 157.183 69.874 157.183 C 75.843 157.183 80.604 153.851 80.604 149.78 L 76.972 108.658 C 76.564 106.185 73.546 104.279 69.87 104.279 C 66.194 104.279 63.185 106.181 62.785 108.658 Z M 92.314 99.804 L 126.051 123.494 C 129.547 125.523 134.818 123.067 137.818 117.896 C 140.791 112.712 140.286 106.92 136.768 104.882 L 99.412 87.477 C 97.075 86.597 93.913 88.247 92.073 91.438 C 90.237 94.619 90.386 98.197 92.314 99.804 Z M 40.345 87.472 L 2.994 104.878 C -0.511 106.916 -1.043 112.707 1.953 117.891 C 4.939 123.058 10.201 125.518 13.706 123.489 L 47.443 99.799 C 49.384 98.193 49.525 94.619 47.689 91.433 C 45.853 88.243 42.682 86.588 40.345 87.472 Z" })),
      e("div", { style: { flex: 1 } },
        e("div", { style: { fontSize: 17, fontWeight: 700, lineHeight: 1.1 } }, title),
        e("div", { style: { fontSize: 11.5, color: "rgba(255,255,255,.8)" } }, sub)),
      e("div", { style: { display: "flex", alignItems: "center", gap: 5, fontSize: 10.5, fontWeight: 700, background: "rgba(255,255,255,.16)", padding: "4px 9px", borderRadius: 100 } },
        e("span", { style: { width: 7, height: 7, borderRadius: "50%", background: "#7ee081" } }), "Viaje activo"));
  }
  function TabBar({ tab, setTab }) {
    const items = [["registro", "Registro", "plus"], ["wishlist", "Wishlist", "list"]];
    return e("div", { style: { flex: "0 0 auto", display: "flex", borderTop: "1px solid var(--wm-ns-100)", background: "#fff", paddingBottom: 22 } },
      items.map(([id, label, icon]) => e("button", { key: id, onClick: () => setTab(id), style: {
        flex: 1, border: "none", background: "none", padding: "9px 0 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
        color: tab === id ? BLUE : "var(--wm-ns-300)", cursor: "pointer", fontFamily: "inherit" } },
        e(I[icon], { size: 22 }), e("span", { style: { fontSize: 10.5, fontWeight: 700 } }, label))));
  }

  // ---------- REGISTRO ----------
  const PROC = ["Extrayendo texto de la boleta", "Identificando producto", "Buscando imagen del producto", "Pre-llenando registro"];
  function Registro({ onSaved }) {
    const [phase, setPhase] = React.useState("camera"); // camera|processing|review|saved
    const [pi, setPi] = React.useState(0);
    const [tela, setTela] = React.useState("Punto seamless");
    const [patron, setPatron] = React.useState("Liso");
    const [colores, setColores] = React.useState(["15-5519", "11-0601"]);
    const [recent, setRecent] = React.useState([
      { name: "Viscosa fluida floral", tela: "Viscosa fluida estampada", precio: "¥ 168", tienda: "Keqiao Market" },
      { name: "Lino-viscosa natural", tela: "Lino-viscosa 70/30", precio: "¥ 210", tienda: "Shaoxing Textile" },
    ]);

    React.useEffect(() => {
      if (phase !== "processing") return;
      setPi(0);
      const t = setInterval(() => setPi((p) => {
        if (p >= PROC.length - 1) { clearInterval(t); setTimeout(() => setPhase("review"), 500); return p; }
        return p + 1;
      }), 700);
      return () => clearInterval(t);
    }, [phase]);

    const body = (children) => e("div", { style: { flex: 1, overflowY: "auto", background: "var(--wm-ns-050)" } }, children);

    if (phase === "camera") {
      return body(e("div", { style: { padding: 16 } },
        e("div", { style: { fontSize: 13, color: "var(--wm-ns-400)", marginBottom: 12, lineHeight: 1.4 } }, "Fotografía la boleta de compra. La IA extrae los datos y busca la imagen del producto."),
        e("div", { style: { position: "relative", borderRadius: 18, overflow: "hidden", background: "#16181d", aspectRatio: "3/4", display: "grid", placeItems: "center" } },
          e("div", { style: { position: "absolute", inset: 22, border: "2px dashed rgba(255,255,255,.4)", borderRadius: 12 } }),
          e("div", { style: { position: "absolute", top: 14, left: 0, right: 0, textAlign: "center", color: "rgba(255,255,255,.7)", fontSize: 12, fontWeight: 600 } }, "Encuadra la boleta"),
          e(I.doc, { size: 64, style: { color: "rgba(255,255,255,.22)" } })),
        e("button", { onClick: () => setPhase("processing"), style: {
          width: "100%", marginTop: 16, height: 54, borderRadius: 100, border: "none", background: BLUE, color: "#fff",
          fontSize: 16, fontWeight: 700, fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 9, cursor: "pointer" } },
          e(I.image, { size: 20 }), "Tomar foto de la boleta"),
        recent.length > 0 && e("div", { style: { marginTop: 22 } },
          e("div", { style: { fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--wm-ns-300)", marginBottom: 8 } }, "Registros de hoy · " + recent.length),
          recent.map((r, i) => e("div", { key: i, style: { display: "flex", gap: 11, alignItems: "center", background: "#fff", border: "1px solid var(--wm-ns-100)", borderRadius: 12, padding: 10, marginBottom: 8 } },
            e("div", { style: { width: 40, height: 40, borderRadius: 8, background: "linear-gradient(135deg,var(--wm-sb-300),var(--wm-ns-100))", display: "grid", placeItems: "center", flex: "0 0 auto", color: BLUE } }, e(I.layers, { size: 18 })),
            e("div", { style: { flex: 1, minWidth: 0 } },
              e("div", { style: { fontWeight: 700, fontSize: 13 } }, r.name),
              e("div", { style: { fontSize: 11.5, color: "var(--wm-ns-300)" } }, r.tela + " · " + r.precio)),
            e("span", { style: { fontSize: 10.5, color: "var(--wm-success-500)", fontWeight: 700, display: "flex", alignItems: "center", gap: 3 } }, e(I.check, { size: 13 }), "En Viaje"))))));
    }

    if (phase === "processing") {
      return body(e("div", { style: { padding: 16 } },
        e("div", { style: { display: "flex", gap: 12, alignItems: "center", background: "#fff", borderRadius: 14, padding: 12, border: "1px solid var(--wm-ns-100)" } },
          e("div", { style: { width: 54, height: 70, borderRadius: 8, background: "#eceae3", display: "grid", placeItems: "center", flex: "0 0 auto", color: "var(--wm-ns-300)" } }, e(I.doc, { size: 24 })),
          e("div", null, e("div", { style: { fontWeight: 700, fontSize: 14 } }, "boleta_0608.jpg"), e("div", { style: { fontSize: 12, color: "var(--wm-ns-300)" } }, "Procesando con IA…"))),
        e("div", { style: { marginTop: 18, display: "flex", flexDirection: "column", gap: 4 } },
          PROC.map((s, i) => {
            const done = i < pi, active = i === pi;
            return e("div", { key: i, style: { display: "flex", gap: 11, alignItems: "center", padding: "11px 6px", opacity: i > pi ? .4 : 1 } },
              e("div", { style: { width: 26, height: 26, borderRadius: "50%", flex: "0 0 auto", display: "grid", placeItems: "center", background: done ? "var(--wm-success-500)" : active ? BLUE : "var(--wm-ns-100)", color: done || active ? "#fff" : "var(--wm-ns-300)" } },
                done ? e(I.check, { size: 15 }) : active ? e("span", { className: "gm-spin", style: { width: 12, height: 12, border: "2px solid rgba(255,255,255,.5)", borderTopColor: "#fff", borderRadius: "50%" } }) : i + 1),
              e("span", { style: { fontSize: 13.5, fontWeight: active ? 700 : 500 } }, s));
          }))));
    }

    if (phase === "saved") {
      return body(e("div", { style: { padding: 24, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 14, paddingTop: 50 } },
        e("div", { style: { width: 74, height: 74, borderRadius: "50%", background: "var(--wm-success-100)", color: "var(--wm-success-500)", display: "grid", placeItems: "center" } }, e(I.checkCircle, { size: 40 })),
        e("div", { style: { fontSize: 19, fontWeight: 700 } }, "Registro guardado"),
        e("div", { style: { fontSize: 13.5, color: "var(--wm-ns-400)", lineHeight: 1.5, maxWidth: 250 } }, "Aparece automáticamente en la pantalla ", e("b", null, "Viaje"), " de la plataforma. Si cubre un ítem del wishlist, se tacha solo."),
        TELA_TO_WISH[tela] && e("div", { style: { fontSize: 12.5, color: BLUE, fontWeight: 700, background: "var(--wm-sb-200)", padding: "8px 14px", borderRadius: 100 } }, "✓ Wishlist actualizado · " + tela),
        e("button", { onClick: () => { setPhase("camera"); }, style: { marginTop: 8, height: 50, padding: "0 24px", borderRadius: 100, border: "none", background: BLUE, color: "#fff", fontWeight: 700, fontSize: 15, fontFamily: "inherit", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 } },
          e(I.plus, { size: 18 }), "Nuevo registro")));
    }

    // review
    const chip = (active) => ({ padding: "7px 13px", borderRadius: 100, fontSize: 12.5, fontWeight: 600, cursor: "pointer", border: "1.5px solid " + (active ? BLUE : "var(--wm-ns-200)"), background: active ? "var(--wm-sb-200)" : "#fff", color: active ? "var(--wm-sb-500)" : "var(--wm-ns-500)" });
    const Card = (title, badge, kids) => e("div", { style: { background: "#fff", borderRadius: 14, border: "1px solid var(--wm-ns-100)", padding: 14, marginBottom: 12 } },
      e("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 12 } },
        e("div", { style: { fontSize: 13, fontWeight: 700 } }, title),
        badge && e("span", { style: { display: "inline-flex", alignItems: "center", gap: 3, fontSize: 10, fontWeight: 700, color: BLUE, background: "var(--wm-sb-200)", padding: "2px 8px", borderRadius: 100 } }, e(I.sparkles, { size: 11 }), "IA")),
      kids);
    const Field = (label, val) => e("div", { style: { marginBottom: 10 } },
      e("div", { style: { fontSize: 10.5, fontWeight: 700, color: "var(--wm-ns-300)", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 4 } }, label),
      e("input", { defaultValue: val, style: { width: "100%", height: 40, border: "1.5px solid var(--wm-ns-200)", borderRadius: 10, padding: "0 12px", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box" } }));

    return body(e("div", { style: { padding: 16 } },
      // scraped image
      e("div", { style: { display: "flex", gap: 12, marginBottom: 14, alignItems: "center" } },
        e("div", { style: { width: 84, height: 84, borderRadius: 12, flex: "0 0 auto", background: "linear-gradient(135deg,#46b4a0,#2e8576)", display: "grid", placeItems: "center", color: "rgba(255,255,255,.8)", position: "relative" } },
          e(I.layers, { size: 30 }),
          e("span", { style: { position: "absolute", bottom: 5, left: 0, right: 0, textAlign: "center", fontSize: 8.5, fontWeight: 700, color: "rgba(255,255,255,.85)" } }, "scraping ✓")),
        e("div", null,
          e("div", { style: { fontSize: 15, fontWeight: 700, lineHeight: 1.2 } }, "Tela punto seamless"),
          e("div", { style: { fontSize: 12, color: "var(--wm-ns-300)", marginTop: 2 } }, "Imagen encontrada por IA"),
          e("button", { style: { marginTop: 6, fontSize: 11.5, color: BLUE, fontWeight: 700, border: "none", background: "none", padding: 0, cursor: "pointer", textDecoration: "underline" } }, "Cambiar imagen"))),
      Card("Datos extraídos", true, e(React.Fragment, null,
        Field("Producto", "Tela punto seamless"),
        e("div", { style: { display: "flex", gap: 10 } }, e("div", { style: { flex: 1 } }, Field("Precio", "¥ 142.00")), e("div", { style: { flex: 1 } }, Field("Cantidad", "3.5 m"))),
        Field("Tienda / proveedor", "Keqiao Textile Market"),
        Field("Fecha", "08 jun 2026"))),
      Card("Datos de diseño", false, e(React.Fragment, null,
        // Tela — con mini-swatch por opción
        e("div", { style: { fontSize: 10.5, fontWeight: 700, color: "var(--wm-ns-300)", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 8 } }, "Tela"),
        e("div", { style: { display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 } },
          TELAS.map((t) => {
            const sampleColor = { "Punto seamless": "#46b4a0", "Lino-viscosa 70/30": "#c9b99a", "Viscosa fluida estampada": "#e8a87c", "Algodón pima": "#e8e0d8", "Gabardina stretch": "#7a8fa6" }[t] || "#ccc";
            const active = tela === t;
            return e("button", { key: t, onClick: () => setTela(t), style: {
              display: "flex", alignItems: "center", gap: 10, padding: "9px 12px",
              borderRadius: 12, border: "1.5px solid " + (active ? BLUE : "var(--wm-ns-150,var(--wm-ns-200))"),
              background: active ? "var(--wm-sb-200)" : "#fff", cursor: "pointer", fontFamily: "inherit",
              textAlign: "left" } },
              e("span", { style: { width: 24, height: 24, borderRadius: 6, background: sampleColor, flex: "0 0 auto", border: "1px solid rgba(0,0,0,.08)" } }),
              e("span", { style: { fontSize: 13, fontWeight: active ? 700 : 500, color: active ? "var(--wm-sb-600)" : "var(--wm-ns-500)", flex: 1 } }, t),
              active && e(I.check, { size: 15, style: { color: BLUE, flex: "0 0 auto" } }));
          })),

        // Colores — swatches con nombre
        e("div", { style: { fontSize: 10.5, fontWeight: 700, color: "var(--wm-ns-300)", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 8 } }, "Colores"),
        e("div", { style: { display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" } },
          colores.map((code) => { const c = PANTONE.find((x) => x.code === code) || { hex: "#ccc", code, name: "" }; return e("div", { key: code, style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4 } },
            e("span", { style: { width: 36, height: 36, borderRadius: 10, background: c.hex, display: "block", border: "1px solid rgba(0,0,0,.1)", boxShadow: "0 1px 3px rgba(0,0,0,.1)" } }),
            e("span", { style: { fontSize: 9.5, fontWeight: 700, color: "var(--wm-ns-400)", fontVariantNumeric: "tabular-nums" } }, code)); }),
          e("button", { style: { width: 36, height: 36, borderRadius: 10, border: "1.5px dashed var(--wm-ns-300)", background: "#fff", color: "var(--wm-ns-400)", display: "grid", placeItems: "center", cursor: "pointer" } }, e(I.plus, { size: 15 }))),

        // Patrón
        e("div", { style: { fontSize: 10.5, fontWeight: 700, color: "var(--wm-ns-300)", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 8 } }, "Patrón"),
        e("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 } },
          PATRONES.map((p) => e("button", { key: p, onClick: () => setPatron(p), style: {
            padding: "8px 10px", borderRadius: 10, fontSize: 12.5, fontWeight: patron === p ? 700 : 500,
            cursor: "pointer", border: "1.5px solid " + (patron === p ? BLUE : "var(--wm-ns-200)"),
            background: patron === p ? "var(--wm-sb-200)" : "#fff",
            color: patron === p ? "var(--wm-sb-600)" : "var(--wm-ns-500)", fontFamily: "inherit" } }, p))))),
      e("button", { onClick: () => { onSaved(TELA_TO_WISH[tela]); setRecent((r) => [{ name: "Tela punto seamless", tela, precio: "¥ 142" }, ...r]); setPhase("saved"); }, style: {
        width: "100%", height: 54, borderRadius: 100, border: "none", background: BLUE, color: "#fff", fontSize: 16, fontWeight: 700, fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 9, cursor: "pointer", marginBottom: 8 } },
        e(I.check, { size: 20 }), "Guardar registro")));
  }

  // ---------- WISHLIST ----------
  function Wishlist({ covered, justCovered }) {
    const total = WISH.reduce((n, s) => n + s.items.length, 0);
    const done = Object.keys(covered).filter((k) => covered[k]).length;
    return e("div", { style: { flex: 1, overflowY: "auto", background: "var(--wm-ns-050)", padding: 16 } },
      e("div", { style: { background: "#fff", borderRadius: 14, border: "1px solid var(--wm-ns-100)", padding: 14, marginBottom: 14 } },
        e("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 } },
          e("div", { style: { fontSize: 13.5, fontWeight: 700 } }, "Qué buscar en el viaje"),
          e("span", { style: { fontSize: 13, fontWeight: 700, color: BLUE } }, done + "/" + total)),
        e("div", { className: "gm-progress" }, e("div", { className: "gm-progress__fill", style: { width: Math.round(done / total * 100) + "%" } })),
        e("div", { style: { fontSize: 11.5, color: "var(--wm-ns-300)", marginTop: 8 } }, "Los ítems se tachan solos al registrarse una compra que los cubre.")),
      WISH.map((sec) => e("div", { key: sec.cat, style: { marginBottom: 16 } },
        e("div", { style: { display: "flex", alignItems: "center", gap: 7, marginBottom: 8 } },
          e(I[sec.icon], { size: 15, style: { color: "var(--wm-ns-400)" } }),
          e("div", { style: { fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--wm-ns-400)" } }, sec.cat)),
        sec.items.map((it) => {
          const isCov = covered[it.id]; const flash = justCovered === it.id;
          return e("div", { key: it.id, style: { display: "flex", alignItems: "center", gap: 11, background: flash ? "var(--wm-success-100)" : "#fff", border: "1px solid " + (flash ? "#bce5a8" : "var(--wm-ns-100)"), borderRadius: 12, padding: 11, marginBottom: 8, transition: "background .4s, opacity .4s", opacity: isCov ? .68 : 1 } },
            e("div", { style: { width: 26, height: 26, borderRadius: "50%", flex: "0 0 auto", display: "grid", placeItems: "center", background: isCov ? "var(--wm-success-500)" : "#fff", border: isCov ? "none" : "2px solid var(--wm-ns-200)", color: "#fff" } },
              isCov ? e(I.check, { size: 15 }) : null),
            e("div", { style: { flex: 1, minWidth: 0 } },
              e("div", { style: { fontWeight: 700, fontSize: 13.5, textDecoration: isCov ? "line-through" : "none", color: isCov ? "var(--wm-ns-400)" : "var(--wm-ns-600)" } }, it.name),
              e("div", { style: { fontSize: 11.5, color: "var(--wm-ns-300)" } }, isCov ? "Cubierto en el viaje" : it.note)),
            e(Chip, { variant: PRIO[it.prio][0], label: PRIO[it.prio][1] }));
        }))));
  }

  // ---------- one phone ----------
  function Phone({ initial, covered, justCovered, onSaved }) {
    const [tab, setTab] = React.useState(initial);
    return e(window.IOSDevice, { width: 390, height: 800 },
      e("div", { style: { height: "100%", display: "flex", flexDirection: "column", fontFamily: "var(--font-sans)" } },
        e(TopSpace),
        e(AppHeader, { title: tab === "registro" ? "Registrar compra" : "Wishlist", sub: GM.season.name + " · China" }),
        tab === "registro" ? e(Registro, { onSaved }) : e(Wishlist, { covered, justCovered }),
        e(TabBar, { tab, setTab })));
  }

  // ---------- field (two phones, shared state) ----------
  function ViajeField() {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [covered, setCovered] = React.useState({ f1: true, f2: true, p1: true });
    const [justCovered, setJust] = React.useState(null);
    const onSaved = (wishId) => {
      if (wishId && !covered[wishId]) {
        setCovered((c) => ({ ...c, [wishId]: true }));
        setJust(wishId); setTimeout(() => setJust(null), 2500);
      }
    };

    if (!loggedIn) {
      return e("div", { style: { display: "flex", gap: 40, flexWrap: "wrap", justifyContent: "center" } },
        e(DeviceLabel, { n: "App de campo", title: "Viaje de tendencias", desc: "Toca «Iniciar sesión» para ver la app." },
          e(window.IOSDevice, { width: 390, height: 800 },
            e(LoginScreen, { onLogin: () => setLoggedIn(true) }))));
    }

    return e("div", { style: { display: "flex", gap: 40, flexWrap: "wrap", justifyContent: "center" } },
      e(DeviceLabel, { n: "Pantalla 1", title: "Registro de compra", desc: "Foto de boleta → IA extrae datos y busca imagen → Valentina suma tela, colores y patrón." },
        e(Phone, { initial: "registro", covered, justCovered, onSaved })),
      e(DeviceLabel, { n: "Pantalla 2", title: "Wishlist", desc: "Qué buscar. Los ítems se tachan solos cuando un registro los cubre. Probá guardar «Punto seamless» a la izquierda." },
        e(Phone, { initial: "wishlist", covered, justCovered, onSaved })));
  }

  function DeviceLabel({ n, title, desc, children }) {
    return e("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", maxWidth: 390 } },
      children,
      e("div", { style: { marginTop: 16, textAlign: "center" } },
        e("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--wm-sb-400)" } }, n),
        e("div", { style: { fontSize: 16, fontWeight: 700, marginTop: 2 } }, title),
        e("div", { style: { fontSize: 12.5, color: "var(--wm-ns-300)", marginTop: 4, lineHeight: 1.5 } }, desc)));
  }

  window.ViajeField = ViajeField;
})();
