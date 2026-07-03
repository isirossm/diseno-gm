/* GM app root — routing + shell + tweaks. window.GMApp */
(function () {
  const e = React.createElement;

  function StubScreen({ screen, go, title, subtitle, icon, children }) {
    const I = window.GMIcon, { Empty } = window.GMUI;
    return e("div", { className: "gm-page gm-fade" },
      window.GMUI.PageHead({ title, subtitle }),
      children || e("div", { className: "gm-card gm-card--pad-lg" },
        e(Empty, { icon: icon || "layers", title: "Pantalla en construcción",
          body: "Este paso forma parte del flujo y ya está conectado en la navegación. El detalle se desarrolla en una etapa posterior." })));
  }

  // light but real-feeling placeholders for steps not built deep
  function makeStub(cfg) {
    return ({ go }) => StubScreen(Object.assign({ go }, cfg));
  }

  const STUBS = {
    chat: { title: "Chat del equipo", subtitle: "Las menciones de SKU, paso o proveedor se anotan automáticamente", icon: "chat" },
  };

  function App() {
    const [route, setRoute] = React.useState(() => {
      try { return JSON.parse(localStorage.getItem("gm_route")) || { screen: "inicio", tab: null }; } catch { return { screen: "inicio", tab: null }; }
    });
    const [tweaks, setTweaks] = React.useState(() => {
      try { return JSON.parse(localStorage.getItem("gm_tweaks")) || {}; } catch { return {}; }
    });
    React.useEffect(() => { localStorage.setItem("gm_route", JSON.stringify(route)); }, [route]);

    // listen for tweak changes from the panel (same-window CustomEvent bridge)
    React.useEffect(() => {
      function onTweak(ev) {
        const edits = ev.detail || {};
        setTweaks((prev) => {
          const next = { ...prev, ...edits };
          localStorage.setItem("gm_tweaks", JSON.stringify(next));
          return next;
        });
      }
      window.addEventListener("tweakchange", onTweak);
      return () => window.removeEventListener("tweakchange", onTweak);
    }, []);

    const go = React.useCallback((screen, tab = null) => {
      const main = document.querySelector(".app-scroll");
      if (main) main.scrollTop = 0;
      setRoute({ screen, tab });
    }, []);

    const { Masthead, Sidebar, FlowBar } = window.GMChrome;
    const S = window.GMScreens || {};
    const map = {
      inicio: S.Inicio,
      tendencias: S.Tendencias,
      viaje: S.Viaje,
      coleccion: S.Coleccion,
      muestras: S.Muestras,
      fichas: S.Fichas,
      percheros: S.Percheros,
      kv: S.KV,
      contramuestras: S.Contramuestras,
      manuales: S.Manuales,
      negociacion: S.Negociacion,
      fichas_revisadas: S.FichasRevisadas,
      validacion: S.Validacion,
      correo: S.Correo,
      calendario: S.Calendario,
      documentos: S.Documentos,
      historial: S.Historial,
    };
    let ScreenComp = map[route.screen];
    if (!ScreenComp) ScreenComp = STUBS[route.screen] ? makeStub(STUBS[route.screen]) : makeStub({ title: route.screen, icon: "layers" });

    return e("div", { className: "app-shell" },
      e(Masthead, { screen: route.screen, go }),
      e("div", { className: "app-body" },
        e(Sidebar, { screen: route.screen, go }),
        e("main", { className: "app-main" },
          e(FlowBar, { screen: route.screen, go }),
          e("div", { className: "app-scroll" },
            (window.GM_NAV.isWorkflow(route.screen) || route.screen === "inicio") && window.GMChrome.FlowTimelineCard
              ? e(window.GMChrome.FlowTimelineCard, { screen: route.screen, go })
              : null,
            e(ScreenComp, { key: route.screen + (route.tab || ""), go, tab: route.tab, tweaks })))));
  }

  window.GMApp = App;
})();
