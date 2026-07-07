/* GM — Manuales · Manual de Implementación → window.GMScreens.Manuales */
(function () {
  const e = React.createElement;
  const { PageHead, AdvanceBar, Chip } = window.GMUI;

  function Manuales({ go }) {
    const [approved, setApproved] = React.useState(false);
    const iframeRef = React.useRef(null);
    const [iframeH, setIframeH] = React.useState(800);

    function sizeToContent() {
      const el = iframeRef.current;
      if (!el) return;
      try {
        const doc = el.contentDocument || el.contentWindow.document;
        if (doc.readyState !== 'complete') return;
        const h = Math.max(
          doc.documentElement.scrollHeight,
          doc.documentElement.offsetHeight,
          doc.body ? doc.body.scrollHeight : 0,
          doc.body ? doc.body.offsetHeight : 0
        );
        if (h > 200) setIframeH(h + 32);
      } catch (_) {
        setIframeH(2400);
      }
    }

    React.useEffect(function () {
      const el = iframeRef.current;
      if (!el) return;
      sizeToContent();
      el.addEventListener('load', sizeToContent);
      const t = setTimeout(sizeToContent, 400);
      return function () {
        el.removeEventListener('load', sizeToContent);
        clearTimeout(t);
      };
    }, []);

    return e('div', { className: 'gm-page gm-fade', style: { paddingBottom: 80 } },
      e(PageHead, {
        title: 'Manual de Implementación',
        subtitle: 'Fase 3 · Materiales — Pallets/PDQ y packaging',
        actions: approved
          ? e(Chip, { variant: 'success', label: 'Manual aprobado', lg: true })
          : null,
      }),
      e('div', {
        style: {
          margin: '4px -4px 0',
          borderRadius: 12,
          overflow: 'hidden',
          border: '1px solid var(--wm-ns-100)',
          boxShadow: '0 1px 4px rgba(0,0,0,.06)',
        },
      },
        e('iframe', {
          ref: iframeRef,
          src: window.GM_CONTEXT === 'flujo' ? 'Producción copy/manual.html' : '../Producción copy/manual.html',
          title: 'Manual de Implementación',
          scrolling: 'no',
          style: { display: 'block', width: '100%', height: iframeH + 'px', border: 'none' },
        })),
      e(AdvanceBar, {
        stepId: 'manuales',
        onComplete: function () { setApproved(true); },
        go,
        completed: approved,
      }));
  }

  const S = window.GMScreens = window.GMScreens || {};
  S.Manuales = Manuales;
})();
