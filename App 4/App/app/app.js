/* GM App root — router unificado gestión + flujo de producción
   window.GMApp */
(function () {
  const e = React.createElement;
  window.__app = window.parent.__app || window.__app;

  function StubScreen({ title, subtitle, icon }) {
    const { Empty } = window.GMUI;
    return e("div", { className: "gm-page gm-fade" },
      window.GMUI.PageHead({ title, subtitle }),
      e("div", { className: "gm-card gm-card--pad-lg" },
        e(Empty, { icon: icon || "layers", title: "Pantalla en construcción",
          body: "Este paso forma parte del flujo y ya está conectado en la navegación. El detalle se desarrolla en una etapa posterior." })));
  }

  function makeStub(cfg) {
    return ({ go }) => StubScreen(Object.assign({ go }, cfg));
  }

  function App() {
    // ── Ruta actual ──────────────────────────────────────────────
    const [route, setRoute] = React.useState(() => {
      try { return JSON.parse(localStorage.getItem("gm_route")) || { screen: "splash" }; }
      catch { return { screen: "splash" }; }
    });

    // ── Perfil activo ────────────────────────────────────────────
    const [profileId, setProfileId] = React.useState(
      () => localStorage.getItem('gm_profile') || 'default'
    );
    const profile = (window.GM_PROFILES || {})[profileId] || window.GM_PROFILES.default;

    // Escuchar cambios de perfil desde login (evento custom o storage)
    React.useEffect(() => {
      function onStorage(ev) {
        if (ev.key === 'gm_profile') setProfileId(ev.newValue || 'default');
      }
      window.addEventListener('storage', onStorage);
      return () => window.removeEventListener('storage', onStorage);
    }, []);

    const [tweaks, setTweaks] = React.useState(() => {
      try { return JSON.parse(localStorage.getItem("gm_tweaks")) || {}; }
      catch { return {}; }
    });

    React.useEffect(() => { localStorage.setItem("gm_route", JSON.stringify(route)); }, [route]);

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

    // Listen to parent events for iframe navigation
    React.useEffect(() => {
      const handleExternalNav = (e) => {
        const { screen: destScreen } = e.detail || {};
        if (destScreen) {
          setRoute({ screen: destScreen });
        }
      };
      window.top.addEventListener('gm_navigate_iframe', handleExternalNav);
      return () => window.top.removeEventListener('gm_navigate_iframe', handleExternalNav);
    }, []);

    // Track internal route changes in history
    React.useEffect(() => {
      if (!route.screen || route.screen === 'splash' || route.screen === 'login') return;
      
      window.top.__gmHistoryStack = window.top.__gmHistoryStack || [];
      const last = window.top.__gmHistoryStack[window.top.__gmHistoryStack.length - 1];
      const stateToPush = { app: 'app4', screen: route.screen };
      
      if (window.top.__gmIsGoingBack) return;
      
      if (!last || last.app !== stateToPush.app || last.screen !== stateToPush.screen) {
        window.top.__gmHistoryStack.push(stateToPush);
      }
    }, [route.screen]);

    const go = React.useCallback((screen, tab = null) => {
      // Intercept navigation to global screens of parent application
      if (window.__app && window.__app.navigate) {
        if (screen === 'historial') {
          window.__app.navigate('historial');
          return;
        }
        if (screen === 'panel') {
          window.__app.navigate('panel');
          return;
        }
        if (screen === 'correo') {
          window.__app.navigate('comms');
          return;
        }
        if (screen === 'moda-mujer') {
          window.__app.navigate('moda-mujer');
          return;
        }
        if (screen === 'moda') {
          window.__app.navigate('moda');
          return;
        }
        if (screen === 'calendario') {
          window.__app.navigate('calendario');
          return;
        }
        if (screen === 'documentos') {
          window.__app.navigate('documentos');
          return;
        }
      }

      const pid = localStorage.getItem('gm_profile') || 'default';
      setProfileId(pid);
      const main = document.querySelector(".app-scroll");
      if (main) main.scrollTop = 0;
      setRoute({ screen, tab });
    }, []);

    const { Masthead, Sidebar, FlowBar, SubBar } = window.GMChrome;
    const S   = window.GMScreens || {};
    const NAV = window.GM_NAV;

    // ── Mapa completo de pantallas ───────────────────────────────
    const map = {
      // Acceso (siempre disponibles)
      splash:            S.Splash,
      login:             S.Login,
      // Gestión
      panel:             S.Panel,
      moda:         S.Moda,
      "moda-mujer": S.ModaMujer,
      colecciones:       makeStub({ title: "Colecciones pasadas", subtitle: "Historial de colecciones cerradas", icon: "layers" }),
      kpis:              makeStub({ title: "Reportes y KPIs", subtitle: "Métricas del proceso de diseño", icon: "gauge" }),
      // Herramientas
      correo:            S.Correo,
      calendario:        S.Calendario,
      documentos:        S.Documentos,
      historial:         S.Historial,
      // Producción
      inicio:            S.Inicio,
      tendencias:        S.Tendencias,
      viaje:             S.Viaje,
      coleccion:         S.Coleccion,
      muestras:          S.Muestras,
      fichas:            S.Fichas,
      contramuestras:    S.Contramuestras,
      manuales:          S.Manuales,
      negociacion:       S.Negociacion,
      fichas_revisadas:  S.FichasRevisadas,
      validacion:        S.Validacion,
    };

    // ── Acceso según perfil ──────────────────────────────────────
    // splash y login siempre accesibles; resto filtrado por perfil.allowed
    const canAccess = (screen) => {
      if (screen === 'splash' || screen === 'login') return true;
      if (!profile || !profile.allowed) return true;  // Default = todo
      return profile.allowed.has(screen);
    };

    const ScreenComp = (canAccess(route.screen) ? map[route.screen] : null)
      || makeStub({ title: route.screen, icon: "layers" });

    const mode = NAV.screenMode(route.screen);

    // ── Sin chrome (splash / login) ──────────────────────────────
    if (mode === "bare") {
      return e(ScreenComp, { key: route.screen, go, tab: route.tab, tweaks });
    }

    // ── Shell con chrome ─────────────────────────────────────────
    const bar = mode === "flow"
      ? e(FlowBar, { screen: route.screen, go, profile })
      : e(SubBar,  { screen: route.screen, go });

    return e("div", { className: "app-shell" },
      window.Masthead
        ? e(window.Masthead, { active: (mode === "flow" || route.screen === "moda-mujer" || route.screen === "moda") ? "moda" : "inicio" })
        : e(Masthead, { screen: route.screen, go, profile }),
      bar,
      e("div", { className: "app-body" },
        e(Sidebar, { screen: route.screen, go, profile }),
        e("main", { className: "app-main" },
          e("div", { className: "app-scroll" },
            profile && profile.id === "compradores" && mode === "flow" && route.screen !== "inicio"
              ? e(window.GMUI.ApprovalPanel, { stepId: route.screen })
              : null,
            mode === "flow" && window.GMChrome.FlowTimelineCard
              ? e(window.GMChrome.FlowTimelineCard, { screen: route.screen, go })
              : null,
            e(ScreenComp, { key: route.screen + (route.tab || ""), go, tab: route.tab, tweaks, profile })))));
  }

  window.GMApp = App;
})();
