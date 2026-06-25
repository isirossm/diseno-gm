/* Calendario de Temporadas — Renata.html → window.GMScreens.Calendario */
(function () {
  const e = React.createElement;

  // Shell stubs — la app maneja AppLayout y SubBar
  const AppLayout = (props) => props.children;
  const SubBar = () => null;

  // Btn con prop 'kind' (compatibilidad con Renata.html)
  const Btn = ({ children, kind = 'primary', size, style, onClick }) =>
    e('button', { type: 'button',
      className: 'gm-btn gm-btn--' + kind + (size ? ' gm-btn--' + size : ''),
      style: style, onClick: onClick }, children);

  // Componentes auxiliares extraídos de Renata.html
  const CardHead = ({
    title,
    link,
    right
  }) => e("div", {
    className: "gm-card__head"
  }, e("h3", {
    className: "gm-card__title"
  }, title), right ? right : link ? e("a", {
    className: "gm-card__see",
    href: "#"
  }, link) : null);

  // ── Código compilado de Renata.html ─────────────────────────────────
  // ─────────────────────────────────────────────────────────────
  // Shared: context filter banner for tool screens
  // ─────────────────────────────────────────────────────────────
  const CTX_META = {
    'moda': {
      label: 'Moda',
      color: '#2563eb',
      bg: '#dbeafe'
    },
    'moda-mujer': {
      label: 'Moda Mujer',
      color: '#7c3aed',
      bg: '#ede9fe'
    }
  };
  const ToolCtxBanner = ({
    toolCtx,
    onClear
  }) => {
    if (!toolCtx) return null;
    const m = CTX_META[toolCtx] || {
      label: toolCtx,
      color: '#2563eb',
      bg: '#dbeafe'
    };
    return e("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '9px 14px',
        background: m.bg,
        borderRadius: 8,
        border: `1px solid ${m.color}30`,
        marginBottom: 16,
        fontFamily: 'var(--font-sans)'
      }
    }, e("svg", {
      width: 14,
      height: 14,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, e("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), e("circle", {
      cx: "12",
      cy: "12",
      r: "6"
    }), e("circle", {
      cx: "12",
      cy: "12",
      r: "2"
    })), e("span", {
      style: {
        fontSize: 13,
        color: m.color,
        fontWeight: 600
      }
    }, "Filtrado por: ", e("b", null, m.label)), e("span", {
      style: {
        fontSize: 12,
        color: m.color,
        opacity: 0.8,
        flex: 1
      }
    }, "\u2014 Mostrando datos relevantes para esta categor\xEDa"), e("button", {
      type: "button",
      style: {
        fontSize: 11,
        color: m.color,
        background: 'none',
        border: `1px solid ${m.color}50`,
        borderRadius: 6,
        padding: '2px 8px',
        cursor: 'pointer',
        fontFamily: 'var(--font-sans)',
        fontWeight: 600
      },
      onClick: onClear
    }, "Ver todo \xD7"));
  };
  
  // ─────────────────────────────────────────────────────────────
  // Pantalla — Calendario de Temporadas
  // ─────────────────────────────────────────────────────────────
  const CAL_GRID_EVENTS = [{
    day: 2,
    type: 'reunion',
    label: 'Sync equipo',
    color: '#f97316'
  }, {
    day: 5,
    type: 'tarea',
    label: 'Entregar tech pack',
    color: '#3b82f6'
  }, {
    day: 9,
    type: 'semanal',
    label: 'Seguimiento semanal',
    color: '#6b7280',
    locked: true
  }, {
    day: 12,
    type: 'hito',
    label: 'Cierre muestras V25',
    color: '#16a34a'
  }, {
    day: 15,
    type: 'hito',
    label: 'Entrega packs Blusas',
    color: '#16a34a'
  }, {
    day: 16,
    type: 'reunion',
    label: 'Compras confirmación',
    color: '#f97316'
  }, {
    day: 16,
    type: 'semanal',
    label: 'Seguimiento semanal',
    color: '#6b7280',
    locked: true
  }, {
    day: 18,
    type: 'tarea',
    label: 'Kick-off Otoño 25',
    color: '#3b82f6'
  }, {
    day: 20,
    type: 'tarea',
    label: 'QA Moda Mujer',
    color: '#3b82f6'
  }, {
    day: 23,
    type: 'semanal',
    label: 'Seguimiento semanal',
    color: '#6b7280',
    locked: true
  }, {
    day: 26,
    type: 'reunion',
    label: 'Cierre de año',
    color: '#f97316'
  }, {
    day: 30,
    type: 'semanal',
    label: 'Seguimiento semanal',
    color: '#6b7280',
    locked: true
  }];
  const CalendarioScreen = ({
    toolCtx
  }) => {
    const [ctx, setCtx] = React.useState(toolCtx || null);
    
    const today = React.useMemo(() => new Date(), []);
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    
    const daysInMonth = React.useMemo(() => new Date(currentYear, currentMonth + 1, 0).getDate(), [currentYear, currentMonth]);
    const jsDayOfFirst = React.useMemo(() => new Date(currentYear, currentMonth, 1).getDay(), [currentYear, currentMonth]);
    const firstDow = (jsDayOfFirst + 6) % 7;
    
    const cells = React.useMemo(() => {
      return Array.from({ length: 42 }, (_, i) => {
        const d = i - firstDow + 1;
        return (d >= 1 && d <= daysInMonth) ? d : null;
      });
    }, [firstDow, daysInMonth]);

    const eventsForDay = d => CAL_GRID_EVENTS.filter(e => e.day === d);

    const monthName = today.toLocaleDateString('es-ES', { month: 'long' });
    const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    const currentMonthYearStr = `${capitalizedMonth} ${currentYear}`;

    const prevMonthDate = new Date(currentYear, currentMonth - 1, 1);
    const nextMonthDate = new Date(currentYear, currentMonth + 1, 1);
    
    const prevMonthName = prevMonthDate.toLocaleDateString('es-ES', { month: 'short' }).replace('.', '');
    const capitalizedPrev = prevMonthName.charAt(0).toUpperCase() + prevMonthName.slice(1);
    
    const nextMonthName = nextMonthDate.toLocaleDateString('es-ES', { month: 'short' }).replace('.', '');
    const capitalizedNext = nextMonthName.charAt(0).toUpperCase() + nextMonthName.slice(1);

    return e(AppLayout, null, e(SubBar, {
      trail: ['Inicio', 'Calendario de temporadas']
    }), e("div", {
      className: "gm-page gm-fade"
    }, e("div", {
      className: "gm-page__head"
    }, e("div", null, e("h1", {
      className: "gm-page__title"
    }, "Calendario de temporadas"), e("div", {
      className: "gm-page__sub"
    }, currentMonthYearStr + " \xB7 Vista mensual")), e("div", {
      className: "row",
      style: {
        gap: 8
      }
    }, e(Btn, {
      kind: "secondary",
      size: "sm",
      onClick: () => window.__app?.showToast?.('Sincronizando con OneDrive…')
    }, "Sincronizar OneDrive"), e(Btn, {
      kind: "secondary",
      size: "sm",
      onClick: () => window.__app?.showToast?.('Exportando calendario…')
    }, "Exportar"), e(Btn, {
      kind: "primary",
      size: "sm",
      onClick: () => window.__app?.openModal?.('event')
    }, "+ Nuevo evento"))), e(ToolCtxBanner, {
      toolCtx: ctx,
      onClear: () => setCtx(null)
    }), e("div", {
      className: "grid",
      style: {
        gridTemplateColumns: '1fr 260px',
        gap: 20,
        alignItems: 'start'
      }
    }, e("div", {
      className: "gm-card gm-card--p0"
    }, e("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 18px',
        borderBottom: '1px solid var(--wm-ns-100)'
      }
    }, e("button", {
      style: {
        background: 'none',
        border: '1px solid var(--wm-ns-200)',
        borderRadius: 6,
        padding: '4px 10px',
        cursor: 'pointer',
        fontFamily: 'var(--font-sans)',
        fontSize: 13,
        color: 'var(--wm-ns-600)'
      }
    }, "\u2039 " + capitalizedPrev), e("span", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontWeight: 700,
        fontSize: 15,
        color: 'var(--wm-ns-800)'
      }
    }, currentMonthYearStr), e("button", {
      style: {
        background: 'none',
        border: '1px solid var(--wm-ns-200)',
        borderRadius: 6,
        padding: '4px 10px',
        cursor: 'pointer',
        fontFamily: 'var(--font-sans)',
        fontSize: 13,
        color: 'var(--wm-ns-600)'
      }
    }, capitalizedNext + " \u203A")), e("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        background: 'var(--wm-sb-050)',
        borderBottom: '1px solid var(--wm-ns-100)'
      }
    }, ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(d => e("div", {
      key: d,
      style: {
        padding: '8px 6px',
        textAlign: 'center',
        fontSize: 11,
        fontWeight: 700,
        color: 'var(--wm-ns-500)',
        fontFamily: 'var(--font-sans)',
        textTransform: 'uppercase',
        letterSpacing: '.04em'
      }
    }, d))), [0, 1, 2, 3, 4, 5].map(week => e("div", {
      key: week,
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        borderBottom: week < 5 ? '1px solid var(--wm-ns-100)' : 'none'
      }
    }, cells.slice(week * 7, week * 7 + 7).map((day, di) => {
      const dayEvts = day ? eventsForDay(day) : [];
      const isToday = day === today.getDate();
      return e("div", {
        key: di,
        style: {
          minHeight: 84,
          padding: '5px',
          borderRight: di < 6 ? '1px solid var(--wm-ns-100)' : 'none',
          background: !day ? '#f9fafb' : isToday ? 'var(--wm-sb-050)' : 'transparent'
        }
      }, day && e(React.Fragment, null, e("div", {
        style: {
          width: 22,
          height: 22,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 3,
          background: isToday ? 'var(--wm-sb-400)' : 'transparent',
          color: isToday ? '#fff' : di >= 5 ? 'var(--wm-ns-400)' : 'var(--wm-ns-700)',
          fontSize: 12,
          fontWeight: isToday ? 700 : 400,
          fontFamily: 'var(--font-sans)'
        }
      }, day), e("div", {
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }
      }, dayEvts.slice(0, 2).map((ev, ei) => e("div", {
        key: ei,
        title: ev.locked ? 'Evento inamovible' : ev.label,
        style: {
          fontSize: 10,
          fontWeight: 600,
          padding: '2px 4px',
          borderRadius: 3,
          background: ev.color + '20',
          color: ev.color,
          fontFamily: 'var(--font-sans)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          border: `1px solid ${ev.color}30`,
          cursor: ev.locked ? 'not-allowed' : 'pointer'
        }
      }, ev.locked ? '[B] ' : '', ev.label)), dayEvts.length > 2 && e("div", {
        style: {
          fontSize: 10,
          color: 'var(--wm-ns-400)',
          fontFamily: 'var(--font-sans)',
          paddingLeft: 4
        }
      }, "+", dayEvts.length - 2, " m\xE1s"))));
    }))), e("div", {
      style: {
        padding: '10px 16px',
        borderTop: '1px solid var(--wm-ns-100)',
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
        alignItems: 'center'
      }
    }, [['#16a34a', 'Hito'], ['#3b82f6', 'Tarea'], ['#f97316', 'Reunión'], ['#6b7280', 'Seguimiento semanal (bloqueado)']].map(([c, l]) => e("span", {
      key: l,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        fontSize: 11,
        color: 'var(--wm-ns-600)',
        fontFamily: 'var(--font-sans)'
      }
    }, e("span", {
      style: {
        width: 10,
        height: 10,
        borderRadius: 2,
        background: c,
        display: 'inline-block'
      }
    }), l)))), e("div", {
      className: "gm-card"
    }, e(CardHead, {
      title: "Eventos de " + monthName
    }), e("div", {
      style: {
        marginTop: 8
      }
    }, CAL_GRID_EVENTS.map((ev, i) => e("div", {
      key: i,
      style: {
        display: 'flex',
        gap: 10,
        alignItems: 'flex-start',
        padding: '6px 0',
        borderBottom: i < CAL_GRID_EVENTS.length - 1 ? '1px solid var(--wm-ns-100)' : 'none'
      }
    }, e("span", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: ev.color,
        fontFamily: 'var(--font-sans)',
        minWidth: 20,
        paddingTop: 2
      }
    }, ev.day), e("div", {
      style: {
        flex: 1
      }
    }, e("div", {
      style: {
        fontSize: 12,
        color: 'var(--wm-ns-700)',
        fontFamily: 'var(--font-sans)',
        fontWeight: 600
      }
    }, ev.locked ? '[B] ' : '', ev.label), e("div", {
      style: {
        fontSize: 10,
        color: 'var(--wm-ns-400)',
        fontFamily: 'var(--font-sans)',
        marginTop: 1,
        textTransform: 'capitalize'
      }
    }, ev.type)))))))));
  };

  window.GMScreens = window.GMScreens || {};
  window.GMScreens.Calendario = CalendarioScreen;
})();