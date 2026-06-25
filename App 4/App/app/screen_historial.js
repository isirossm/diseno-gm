/* Historial de Colecciones — Renata.html → window.GMScreens.Historial */
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
  const WORKFLOW_STEPS = ['Brief', 'Diseño', 'Negociación', 'Contramuestra', 'Producción', 'Calidad'];

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

  const StepBar = ({
    currentStep = 0,
    currentPhase,
    total = 6
  }) => e("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 5,
      marginTop: 4
    }
  }, e("div", {
    style: {
      display: 'flex',
      gap: 3
    }
  }, Array.from({
    length: total
  }, (_, i) => e("div", {
    key: i,
    style: {
      height: 4,
      flex: 1,
      borderRadius: 2,
      background: i < currentStep ? 'var(--wm-sb-300)' : i === currentStep ? 'var(--wm-sb-400)' : 'var(--wm-ns-100)',
      transition: 'background .2s'
    }
  }))), e("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      color: 'var(--wm-ns-500)',
      fontWeight: 500
    }
  }, "Paso ", currentStep + 1, "/", total, " \xB7 ", currentPhase || WORKFLOW_STEPS[currentStep] || ''));

  // ── Código compilado de Renata.html ─────────────────────────────────
  // ── Historial de Colecciones ──────────────────────────────────────────────────
  const HISTORIAL_COLS = [{
    id: 'verano25',
    name: 'Verano 2026',
    status: 'cerrada',
    dateRange: 'Sep 2025 – Feb 2026',
    prendas: 48,
    sellThrough: 82,
    ingreso: '$245M',
    margen: 38,
    pasos: 10
  }, {
    id: 'otono25',
    name: 'Otoño 2026',
    status: 'en curso',
    dateRange: 'Ene 2026 – Jun 2026',
    prendas: 36,
    sellThrough: null,
    ingreso: null,
    margen: null,
    pasos: 6
  }, {
    id: 'invierno25',
    name: 'Invierno 2026',
    status: 'planificación',
    dateRange: 'Mar 2026 – Ago 2026',
    prendas: 0,
    sellThrough: null,
    ingreso: null,
    margen: null,
    pasos: 2
  }, {
    id: 'back2school',
    name: 'Back to School',
    status: 'cerrada',
    dateRange: 'May 2025 – Ago 2025',
    prendas: 62,
    sellThrough: 91,
    ingreso: '$198M',
    margen: 41,
    pasos: 10
  }];
  const HISTORIAL_DOCS = {
    verano25: [{
      name: 'Brief Verano 2026.pdf',
      size: '2.4 MB',
      date: '01 sep 2025',
      type: 'brief'
    }, {
      name: 'Fichas técnicas — Vestidos.xlsx',
      size: '850 KB',
      date: '15 oct 2025',
      type: 'ficha'
    }, {
      name: 'Fotos catálogo Primavera–Verano 26.zip',
      size: '320 MB',
      date: '12 ene 2026',
      type: 'galeria'
    }, {
      name: 'Reporte final Verano 2026.pdf',
      size: '4.1 MB',
      date: '28 feb 2026',
      type: 'reporte'
    }],
    back2school: [{
      name: 'Brief Back to School 2025.pdf',
      size: '1.8 MB',
      date: '10 may 2025',
      type: 'brief'
    }, {
      name: 'Fichas técnicas — Uniformes.xlsx',
      size: '620 KB',
      date: '01 jun 2025',
      type: 'ficha'
    }, {
      name: 'Reporte final BTS 2025.pdf',
      size: '3.2 MB',
      date: '31 ago 2025',
      type: 'reporte'
    }]
  };
  const HISTORIAL_ACTIVITY = {
    verano25: [{
      who: 'RG',
      action: 'Cerró la colección Verano 2026',
      time: 'hace 2 días'
    }, {
      who: 'AS',
      action: 'Subió fotos de catálogo',
      time: 'hace 5 días'
    }, {
      who: 'MP',
      action: 'Completó fichas técnicas',
      time: 'hace 1 semana'
    }, {
      who: 'RG',
      action: 'Aprobó muestras finales',
      time: 'hace 2 semanas'
    }],
    back2school: [{
      who: 'RG',
      action: 'Cerró colección Back to School',
      time: 'hace 4 meses'
    }, {
      who: 'JR',
      action: 'Entregó reporte de cierre',
      time: 'hace 4 meses'
    }, {
      who: 'AS',
      action: 'Cargó imágenes finales',
      time: 'hace 4 meses'
    }]
  };
  const statusColor = s => s === 'cerrada' ? {
    bg: '#ECFDF5',
    color: '#059669'
  } : s === 'en curso' ? {
    bg: '#EEF4FF',
    color: 'var(--wm-sb-400)'
  } : {
    bg: 'var(--wm-ns-100)',
    color: 'var(--wm-ns-500)'
  };
  
  // ── Historial Detail (sub-view) ───────────────────────────────────────────────
  const DocTypeIcon = ({
    type
  }) => {
    const paths = {
      brief: e("path", {
        d: "M9 12h6M9 16h6M9 8h2M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
      }),
      ficha: e(React.Fragment, null, e("rect", {
        x: "3",
        y: "3",
        width: "18",
        height: "18",
        rx: "2"
      }), e("path", {
        d: "M3 9h18M9 21V9"
      })),
      reporte: e(React.Fragment, null, e("polyline", {
        points: "22 12 18 12 15 21 9 3 6 12 2 12"
      })),
      galeria: e(React.Fragment, null, e("rect", {
        x: "3",
        y: "3",
        width: "18",
        height: "18",
        rx: "2"
      }), e("circle", {
        cx: "8.5",
        cy: "8.5",
        r: "1.5"
      }), e("polyline", {
        points: "21 15 16 10 5 21"
      }))
    };
    return e("svg", {
      width: 18,
      height: 18,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, paths[type] || paths.brief);
  };
  const HistorialDetail = ({
    col,
    onBack
  }) => {
    const docs = HISTORIAL_DOCS[col.id] || [];
    const activity = HISTORIAL_ACTIVITY[col.id] || [];
    const sc = statusColor(col.status);
    const kpis = [{
      label: 'Prendas',
      value: col.prendas ? String(col.prendas) : '—'
    }, {
      label: 'Sell-through',
      value: col.sellThrough ? col.sellThrough + '%' : '—'
    }, {
      label: 'Ingreso total',
      value: col.ingreso || '—'
    }, {
      label: 'Margen',
      value: col.margen ? col.margen + '%' : '—'
    }];
    return e("div", null, e("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 20
      }
    }, e("button", {
      onClick: onBack,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        fontFamily: 'var(--font-sans)',
        fontSize: 13,
        color: 'var(--wm-sb-400)',
        fontWeight: 600
      }
    }, e("svg", {
      width: 16,
      height: 16,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, e("polyline", {
      points: "15 18 9 12 15 6"
    })), "Volver"), e("h1", {
      className: "gm-page__title",
      style: {
        margin: 0
      }
    }, col.name), e("span", {
      style: {
        fontSize: 11,
        padding: '3px 10px',
        borderRadius: 10,
        background: sc.bg,
        color: sc.color,
        fontWeight: 700,
        fontFamily: 'var(--font-sans)'
      }
    }, col.status), e("span", {
      style: {
        fontSize: 12,
        color: 'var(--wm-ns-400)',
        fontFamily: 'var(--font-sans)',
        marginLeft: 4
      }
    }, col.dateRange)), e("div", {
      className: "grid",
      style: {
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 12,
        marginBottom: 20
      }
    }, kpis.map((kpi, i) => e("div", {
      key: i,
      className: "gm-card",
      style: {
        padding: '16px 20px'
      }
    }, e("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: 'var(--wm-ns-400)',
        textTransform: 'uppercase',
        letterSpacing: '.05em',
        fontFamily: 'var(--font-sans)',
        marginBottom: 8
      }
    }, kpi.label), e("div", {
      style: {
        fontSize: 24,
        fontWeight: 700,
        color: 'var(--wm-ns-600)',
        fontFamily: 'var(--font-sans)'
      }
    }, kpi.value)))), e("div", {
      className: "grid",
      style: {
        gridTemplateColumns: '1fr 300px',
        gap: 20
      }
    }, e("div", {
      className: "stack-lg"
    }, e("div", {
      className: "gm-card"
    }, e(CardHead, {
      title: "Im\xE1genes de la coleccion",
      link: "Ver todas"
    }), e("div", {
      className: "grid",
      style: {
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 8,
        marginTop: 12
      }
    }, [...Array(10)].map((_, i) => e("div", {
      key: i,
      style: {
        aspectRatio: '3/4',
        borderRadius: 8,
        background: `hsl(${215 + i * 9}, ${16 + i * 2}%, ${91 - i * 2}%)`,
        cursor: 'pointer',
        border: '1px solid var(--wm-ns-100)'
      }
    })))), e("div", {
      className: "gm-card"
    }, e(CardHead, {
      title: "Flujo de produccion"
    }), e("div", {
      style: {
        marginTop: 12
      }
    }, e(StepBar, {
      steps: ['Brief', 'Diseno', 'Negociacion', 'Contramuestra', 'Produccion', 'Calidad'],
      current: Math.min(col.pasos, 5)
    })), e("div", {
      style: {
        marginTop: 8,
        fontFamily: 'var(--font-sans)',
        fontSize: 13,
        color: 'var(--wm-ns-400)'
      }
    }, col.pasos >= 10 ? 'Todos los pasos completados' : `Paso ${col.pasos} de 10 completado`))), e("div", {
      className: "stack-lg"
    }, e("div", {
      className: "gm-card"
    }, e(CardHead, {
      title: "Documentos"
    }), e("div", {
      style: {
        marginTop: 8
      }
    }, docs.length > 0 ? docs.map((d, i) => e("div", {
      key: i,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 0',
        borderBottom: i < docs.length - 1 ? '1px solid var(--wm-ns-100)' : 'none'
      }
    }, e("span", {
      style: {
        color: 'var(--wm-ns-400)',
        flexShrink: 0
      }
    }, e(DocTypeIcon, {
      type: d.type
    })), e("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, e("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 12,
        fontWeight: 600,
        color: 'var(--wm-ns-600)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, d.name), e("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 11,
        color: 'var(--wm-ns-400)'
      }
    }, d.size, " \xB7 ", d.date)), e("button", {
      style: {
        border: '1px solid var(--wm-ns-200)',
        borderRadius: 5,
        background: 'none',
        cursor: 'pointer',
        padding: '2px 8px',
        fontSize: 12,
        fontFamily: 'var(--font-sans)',
        color: 'var(--wm-ns-500)'
      }
    }, "Descargar"))) : e("div", {
      style: {
        padding: '16px 0',
        textAlign: 'center',
        color: 'var(--wm-ns-400)',
        fontFamily: 'var(--font-sans)',
        fontSize: 13
      }
    }, "Sin documentos"))), e("div", {
      className: "gm-card"
    }, e(CardHead, {
      title: "Actividad reciente"
    }), e("div", {
      style: {
        marginTop: 8
      }
    }, (activity.length > 0 ? activity : [{
      who: 'RG',
      action: 'Coleccion en preparacion',
      time: 'Sin actividad'
    }]).map((a, i) => e("div", {
      key: i,
      style: {
        display: 'flex',
        gap: 10,
        padding: '6px 0',
        borderBottom: i < activity.length - 1 ? '1px solid var(--wm-ns-100)' : 'none'
      }
    }, e("span", {
      className: "gm-avatar gm-avatar--sm",
      style: {
        flexShrink: 0
      }
    }, a.who), e("div", null, e("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 12,
        color: 'var(--wm-ns-600)'
      }
    }, a.action), e("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 11,
        color: 'var(--wm-ns-400)',
        marginTop: 2
      }
    }, a.time)))))))));
  };
  
  // ── Historial main list view ──────────────────────────────────────────────────
  const HistorialScreen = () => {
    const [selected, setSelected] = React.useState(null);
    const col = HISTORIAL_COLS.find(c => c.id === selected);
    return e(AppLayout, null, e(SubBar, {
      trail: selected ? ['Inicio', 'Historial de colecciones', col?.name] : ['Inicio', 'Historial de colecciones']
    }), e("div", {
      className: "gm-page gm-fade"
    }, selected && col ? e(HistorialDetail, {
      col: col,
      onBack: () => setSelected(null)
    }) : e(React.Fragment, null, e("div", {
      className: "gm-page__head"
    }, e("div", null, e("h1", {
      className: "gm-page__title"
    }, "Historial de colecciones"), e("div", {
      className: "gm-page__sub"
    }, "Registro de todas las temporadas \u2014 ", HISTORIAL_COLS.length, " colecciones")), e("div", {
      className: "row",
      style: {
        gap: 8
      }
    }, e(Btn, {
      kind: "secondary",
      size: "sm",
      onClick: () => window.__app?.showToast?.('Exportando historial...')
    }, "Exportar"), e(Btn, {
      kind: "primary",
      size: "sm",
      onClick: () => window.__app?.openModal?.('coleccion')
    }, "+ Nueva coleccion"))), e("div", {
      className: "grid",
      style: {
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 12,
        marginBottom: 28
      }
    }, [{
      label: 'Colecciones totales',
      value: String(HISTORIAL_COLS.length)
    }, {
      label: 'Colecciones cerradas',
      value: String(HISTORIAL_COLS.filter(c => c.status === 'cerrada').length)
    }, {
      label: 'Prendas en historico',
      value: String(HISTORIAL_COLS.reduce((s, c) => s + (c.prendas || 0), 0))
    }, {
      label: 'Sell-through prom.',
      value: Math.round(HISTORIAL_COLS.filter(c => c.sellThrough).reduce((s, c) => s + c.sellThrough, 0) / HISTORIAL_COLS.filter(c => c.sellThrough).length) + '%'
    }].map((kpi, i) => e("div", {
      key: i,
      className: "gm-card",
      style: {
        padding: '16px 20px'
      }
    }, e("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: 'var(--wm-ns-400)',
        textTransform: 'uppercase',
        letterSpacing: '.05em',
        fontFamily: 'var(--font-sans)',
        marginBottom: 8
      }
    }, kpi.label), e("div", {
      style: {
        fontSize: 26,
        fontWeight: 700,
        color: 'var(--wm-ns-600)',
        fontFamily: 'var(--font-sans)'
      }
    }, kpi.value)))), e("div", {
      className: "grid",
      style: {
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 16
      }
    }, HISTORIAL_COLS.map(c => {
      const sc = statusColor(c.status);
      return e("div", {
        key: c.id,
        className: "gm-card",
        onClick: () => setSelected(c.id),
        style: {
          cursor: 'pointer',
          transition: 'box-shadow .15s, transform .1s',
          border: '1px solid var(--wm-ns-100)'
        },
        onMouseEnter: e => {
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,83,226,.10)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        },
        onMouseLeave: e => {
          e.currentTarget.style.boxShadow = '';
          e.currentTarget.style.transform = '';
        }
      }, e("div", {
        style: {
          height: 4,
          background: c.status === 'cerrada' ? '#059669' : c.status === 'en curso' ? 'var(--wm-sb-400)' : 'var(--wm-ns-200)',
          borderRadius: '8px 8px 0 0',
          margin: '-16px -16px 14px',
          width: 'calc(100% + 32px)'
        }
      }), e("div", {
        style: {
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: 12
        }
      }, e("div", null, e("div", {
        style: {
          fontFamily: 'var(--font-sans)',
          fontSize: 18,
          fontWeight: 700,
          color: 'var(--wm-ns-700)'
        }
      }, c.name), e("div", {
        style: {
          fontFamily: 'var(--font-sans)',
          fontSize: 12,
          color: 'var(--wm-ns-400)',
          marginTop: 3
        }
      }, c.dateRange)), e("span", {
        style: {
          fontSize: 11,
          padding: '3px 10px',
          borderRadius: 10,
          background: sc.bg,
          color: sc.color,
          fontWeight: 700,
          fontFamily: 'var(--font-sans)',
          whiteSpace: 'nowrap'
        }
      }, c.status)), e("div", {
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 8,
          marginBottom: 14
        }
      }, [{
        label: 'Prendas',
        value: c.prendas || '—'
      }, {
        label: 'Sell-through',
        value: c.sellThrough ? c.sellThrough + '%' : '—'
      }, {
        label: 'Margen',
        value: c.margen ? c.margen + '%' : '—'
      }].map((m, j) => e("div", {
        key: j,
        style: {
          background: 'var(--wm-ns-050)',
          borderRadius: 8,
          padding: '8px 10px'
        }
      }, e("div", {
        style: {
          fontFamily: 'var(--font-sans)',
          fontSize: 10,
          color: 'var(--wm-ns-400)',
          textTransform: 'uppercase',
          letterSpacing: '.04em',
          marginBottom: 4
        }
      }, m.label), e("div", {
        style: {
          fontFamily: 'var(--font-sans)',
          fontSize: 16,
          fontWeight: 700,
          color: 'var(--wm-ns-700)'
        }
      }, m.value)))), e("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }
      }, e("div", {
        style: {
          display: 'flex',
          gap: 6
        }
      }, (HISTORIAL_DOCS[c.id] || []).length > 0 && e("span", {
        style: {
          fontSize: 11,
          color: 'var(--wm-ns-400)',
          fontFamily: 'var(--font-sans)'
        }
      }, (HISTORIAL_DOCS[c.id] || []).length, " documentos")), e("span", {
        style: {
          fontSize: 13,
          fontWeight: 600,
          color: 'var(--wm-sb-400)',
          fontFamily: 'var(--font-sans)'
        }
      }, "Ver detalle \u203A")));
    })))));
  };
  
  // ── Root app ──────────────────────────────────────────────────────────────────

  window.GMScreens = window.GMScreens || {};
  window.GMScreens.Historial = HistorialScreen;
})();