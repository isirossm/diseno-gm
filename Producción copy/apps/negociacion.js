/* App Negociación (iPad) — ficha del SKU, anotaciones sobre la imagen, edición de
   campos y sincronización en vivo con la plataforma. window.NegociacionField */
(function () {
  const { Chip, Btn } = window.GMUI;
  const I = window.GMIcon;
  const e = React.createElement;
  const BLUE = "var(--wm-sb-400)", SPARK = "var(--wm-spark-400)";
  const provName = (p) => GM.providers[p].name;
  const PANTONE = {}; Object.values(GM.palettes).forEach((g) => g.colors.forEach((c) => { PANTONE[c.code] = c; }));

  function clock() { return new Date().toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" }); }

  function NegociacionApp() {
    const [skuId, setSkuId] = React.useState("MJ-3187");
    const s = GM.skus.find((x) => x.id === skuId);
    const [annot, setAnnot] = React.useState({}); // per sku: [{n,x,y,note}]
    const [annotMode, setAnnotMode] = React.useState(true);
    const [fields, setFields] = React.useState({});
    const [feed, setFeed] = React.useState([
      { label: "Sesión iniciada", detail: "Revisión en origen · Ningbo", time: clock(), icon: "handshake" },
    ]);
    const [pulse, setPulse] = React.useState(false);

    const curAnnot = annot[skuId] || [];
    const f = fields[skuId] || {};
    const defF = { fob: "8.40", comp: "100% lino", moq: "1.200", entrega: "22 oct 2026" };

    function sync(label, detail, icon) {
      setFeed((x) => [{ label, detail, time: clock(), icon: icon || "refresh" }, ...x].slice(0, 8));
      setPulse(true); setTimeout(() => setPulse(false), 900);
    }
    function addPin(ev) {
      if (!annotMode) return;
      const r = ev.currentTarget.getBoundingClientRect();
      const x = ((ev.clientX - r.left) / r.width) * 100, y = ((ev.clientY - r.top) / r.height) * 100;
      const list = annot[skuId] || [];
      const n = list.length + 1;
      setAnnot((a) => ({ ...a, [skuId]: [...list, { n, x, y, note: "" }] }));
      sync("Anotación " + n + " agregada", s.id + " · sobre la imagen", "pin");
    }
    function setNote(n, note) {
      setAnnot((a) => ({ ...a, [skuId]: (a[skuId] || []).map((p) => p.n === n ? { ...p, note } : p) }));
    }
    function editField(key, val, label) {
      setFields((ff) => ({ ...ff, [skuId]: { ...(ff[skuId] || {}), [key]: val } }));
    }
    function commitField(label, val) { sync(label + " actualizado", s.id + " · " + val, "edit"); }

    return e("div", { style: {
      width: "100%", height: 810, borderRadius: 16, overflow: "hidden", background: "#fff",
      border: "1px solid var(--wm-ns-200)", boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      position: "relative", display: "flex", flexDirection: "column",
      fontFamily: "var(--font-sans)", WebkitFontSmoothing: "antialiased" } },
      // header
      e("div", { style: { flex: "0 0 auto", background: BLUE, color: "#fff", padding: "12px 22px", display: "flex", alignItems: "center", gap: 14 } },
        e("svg", { width: 26, height: 26, viewBox: "0 0 139.762 157.183", fill: SPARK, style: { flex: "0 0 auto" } },
          e("path", { d: "M 62.785 48.529 L 59.162 7.407 C 59.162 3.34 63.905 0 69.874 0 C 75.843 0 80.604 3.34 80.604 7.407 L 76.972 48.529 C 76.564 51.006 73.546 52.916 69.87 52.916 C 66.194 52.916 63.185 51.006 62.785 48.529 Z M 47.689 65.754 C 49.525 62.563 49.384 58.994 47.443 57.405 L 13.706 33.698 C 10.201 31.665 4.939 34.111 1.953 39.296 C -1.043 44.476 -0.511 50.263 2.994 52.296 L 40.345 69.724 C 42.686 70.595 45.858 68.936 47.689 65.754 Z M 92.073 65.754 C 93.909 68.94 97.075 70.595 99.412 69.724 L 136.768 52.296 C 140.286 50.267 140.791 44.476 137.818 39.296 C 134.818 34.111 129.552 31.665 126.051 33.698 L 92.314 57.405 C 90.386 58.994 90.237 62.568 92.073 65.754 Z M 62.785 108.658 L 59.162 149.78 C 59.162 153.851 63.905 157.183 69.874 157.183 C 75.843 157.183 80.604 153.851 80.604 149.78 L 76.972 108.658 C 76.564 106.185 73.546 104.279 69.87 104.279 C 66.194 104.279 63.185 106.181 62.785 108.658 Z M 92.314 99.804 L 126.051 123.494 C 129.547 125.523 134.818 123.067 137.818 117.896 C 140.791 112.712 140.286 106.92 136.768 104.882 L 99.412 87.477 C 97.075 86.597 93.913 88.247 92.073 91.438 C 90.237 94.619 90.386 98.197 92.314 99.804 Z M 40.345 87.472 L 2.994 104.878 C -0.511 106.916 -1.043 112.707 1.953 117.891 C 4.939 123.058 10.201 125.518 13.706 123.489 L 47.443 99.799 C 49.384 98.193 49.525 94.619 47.689 91.433 C 45.853 88.243 42.682 86.588 40.345 87.472 Z" })),
        e("div", { style: { flex: 1 } },
          e("div", { style: { fontSize: 16, fontWeight: 700, lineHeight: 1.1 } }, "Negociación en origen"),
          e("div", { style: { fontSize: 12, color: "rgba(255,255,255,.8)" } }, "Fase 4 · " + GM.season.name + " · China")),
        e("div", { style: { display: "flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 700, background: "rgba(255,255,255,.16)", padding: "6px 12px", borderRadius: 100 } },
          e("span", { style: { width: 8, height: 8, borderRadius: "50%", background: "#7ee081", boxShadow: pulse ? "0 0 0 5px rgba(126,224,129,.4)" : "none", transition: "box-shadow .3s" } }),
          "En vivo · Sincronizado")),

      // body: rail | image | panel
      e("div", { style: { flex: 1, display: "flex", minHeight: 0 } },
        // SKU rail
        e("div", { style: { width: 184, flex: "0 0 auto", borderRight: "1px solid var(--wm-ns-100)", overflowY: "auto", background: "var(--wm-ns-050)", padding: 10 } },
          e("div", { style: { fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--wm-ns-300)", padding: "4px 6px 8px" } }, "SKUs en revisión"),
          GM.skus.slice(0, 8).map((x) => e("button", { key: x.id, onClick: () => setSkuId(x.id), style: {
            width: "100%", display: "flex", gap: 9, alignItems: "center", padding: 8, borderRadius: 10, border: "none", marginBottom: 4,
            background: x.id === skuId ? "#fff" : "transparent", boxShadow: x.id === skuId ? "0 1px 4px rgba(0,0,0,.08)" : "none", cursor: "pointer", textAlign: "left" } },
            e("div", { style: { width: 34, height: 34, borderRadius: 7, background: x.swatch, flex: "0 0 auto" } }),
            e("div", { style: { flex: 1, minWidth: 0 } },
              e("div", { style: { fontSize: 11, fontWeight: 700, color: x.id === skuId ? BLUE : "var(--wm-ns-600)" } }, x.id),
              e("div", { style: { fontSize: 10.5, color: "var(--wm-ns-300)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, x.name)))) ),

        // image + annotations
        e("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", padding: 18, background: "var(--wm-ns-050)" } },
          e("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 12 } },
            e("div", null, e("div", { style: { fontSize: 11, fontWeight: 700, color: BLUE } }, s.id), e("div", { style: { fontSize: 17, fontWeight: 700 } }, s.name)),
            e("button", { onClick: () => setAnnotMode((m) => !m), style: {
              marginLeft: "auto", display: "flex", alignItems: "center", gap: 7, height: 38, padding: "0 16px", borderRadius: 100,
              border: "1.5px solid " + (annotMode ? BLUE : "var(--wm-ns-200)"), background: annotMode ? "var(--wm-sb-200)" : "#fff", color: annotMode ? "var(--wm-sb-500)" : "var(--wm-ns-500)", fontWeight: 700, fontSize: 13, fontFamily: "inherit", cursor: "pointer" } },
              e(I.edit, { size: 16 }), annotMode ? "Anotando — toca la imagen" : "Anotar")),
          e("div", { onClick: addPin, style: { flex: 1, borderRadius: 16, position: "relative", overflow: "hidden", cursor: annotMode ? "crosshair" : "default",
            background: "linear-gradient(150deg," + s.swatch + "33," + s.swatch + "66)", minHeight: 320 } },
            e("div", { style: { position: "absolute", inset: 0, display: "grid", placeItems: "center", color: s.swatch, opacity: .4 } }, e(I.image, { size: 80 })),
            curAnnot.map((p) => e("div", { key: p.n, style: { position: "absolute", left: p.x + "%", top: p.y + "%", transform: "translate(-50%,-50%)", zIndex: 2 } },
              e("div", { style: { width: 30, height: 30, borderRadius: "50%", background: SPARK, color: "var(--wm-sb-500)", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 14, border: "3px solid #fff", boxShadow: "0 2px 8px rgba(0,0,0,.3)" } }, p.n))),
            curAnnot.length === 0 && annotMode && e("div", { style: { position: "absolute", bottom: 16, left: 0, right: 0, textAlign: "center", color: "var(--wm-ns-400)", fontSize: 13, fontWeight: 600 } }, "Toca un punto de la prenda para anotar"))),

        // ficha panel
        e("div", { style: { width: 330, flex: "0 0 auto", borderLeft: "1px solid var(--wm-ns-100)", overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 14 } },
          e("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
            e(I.truck, { size: 15, style: { color: "var(--wm-ns-400)" } }),
            e("span", { style: { fontSize: 12.5, color: "var(--wm-ns-500)", fontWeight: 600 } }, provName(s.prov))),
          // editable fields
          e("div", { style: { background: "#fff", border: "1px solid var(--wm-ns-100)", borderRadius: 12, padding: 14 } },
            e("div", { style: { fontSize: 12, fontWeight: 700, marginBottom: 12 } }, "Campos en negociación"),
            [["fob", "Precio FOB (USD)", defF.fob], ["comp", "Composición final", defF.comp], ["moq", "MOQ (unidades)", defF.moq], ["entrega", "Fecha de entrega", defF.entrega]].map(([k, label, dv]) =>
              e("div", { key: k, style: { marginBottom: 11 } },
                e("div", { style: { fontSize: 10.5, fontWeight: 700, color: "var(--wm-ns-300)", textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 4 } }, label),
                e("input", { defaultValue: dv, onChange: (ev) => editField(k, ev.target.value), onBlur: (ev) => commitField(label, ev.target.value),
                  style: { width: "100%", height: 38, border: "1.5px solid var(--wm-ns-200)", borderRadius: 9, padding: "0 11px", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box" } }))),
            e("div", { style: { fontSize: 11, color: "var(--wm-ns-300)", display: "flex", alignItems: "center", gap: 5, marginTop: 2 } }, e(I.refresh, { size: 12 }), "Cada cambio sincroniza con la plataforma")),
          // annotations list
          e("div", { style: { background: "#fff", border: "1px solid var(--wm-ns-100)", borderRadius: 12, padding: 14 } },
            e("div", { style: { fontSize: 12, fontWeight: 700, marginBottom: 10 } }, "Anotaciones · " + curAnnot.length),
            curAnnot.length === 0 ? e("div", { style: { fontSize: 12, color: "var(--wm-ns-300)" } }, "Sin anotaciones. Activá «Anotar» y tocá la imagen.")
              : curAnnot.map((p) => e("div", { key: p.n, style: { display: "flex", gap: 9, alignItems: "flex-start", marginBottom: 9 } },
                  e("span", { style: { width: 22, height: 22, borderRadius: "50%", background: SPARK, color: "var(--wm-sb-500)", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 12, flex: "0 0 auto" } }, p.n),
                  e("input", { value: p.note, placeholder: "Escribe la observación…", onChange: (ev) => setNote(p.n, ev.target.value), onBlur: () => p.note && sync("Anotación " + p.n + " editada", p.note, "chat"),
                    style: { flex: 1, height: 34, border: "1.5px solid var(--wm-ns-200)", borderRadius: 8, padding: "0 9px", fontSize: 12.5, fontFamily: "inherit", boxSizing: "border-box" } })))),
          // sync feed
          e("div", { style: { background: "var(--wm-sb-200)", border: "1px solid #cfe5fb", borderRadius: 12, padding: 14 } },
            e("div", { style: { fontSize: 12, fontWeight: 700, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 } }, e(I.refresh, { size: 14, style: { color: BLUE } }), "Sincronización en vivo"),
            feed.map((it, i) => e("div", { key: i, style: { display: "flex", gap: 9, alignItems: "flex-start", paddingBottom: 9 } },
              e("span", { style: { width: 20, height: 20, borderRadius: "50%", background: "#fff", color: "var(--wm-success-500)", display: "grid", placeItems: "center", flex: "0 0 auto" } }, e(I.check, { size: 12 })),
              e("div", { style: { flex: 1 } },
                e("div", { style: { fontSize: 12.5, fontWeight: 700 } }, it.label),
                e("div", { style: { fontSize: 11, color: "var(--wm-ns-400)" } }, it.detail),
                e("div", { style: { fontSize: 10, color: "var(--wm-ns-300)", marginTop: 1 } }, "Sincronizado · " + it.time))))))));
  }

  function NegociacionField() {
    return e("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", width: "100%" } },
      e(NegociacionApp),
      e("div", { style: { marginTop: 16, textAlign: "center", maxWidth: 640 } },
        e("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--wm-sb-400)" } }, "Negociación en origen"),
        e("div", { style: { fontSize: 16, fontWeight: 700, marginTop: 2 } }, "Revisión y negociación de la prenda"),
        e("div", { style: { fontSize: 12.5, color: "var(--wm-ns-300)", marginTop: 4, lineHeight: 1.5 } }, "Valentina anota sobre la imagen y edita los campos que cambian. Cada modificación sincroniza en tiempo real con la pantalla Negociación de la plataforma.")));
  }

  window.NegociacionField = NegociacionField;
})();
