/* Documentos — Renata.html → window.GMScreens.Documentos */
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
  const Search = ({
    placeholder = 'Buscar...',
    style
  }) => e("div", {
    className: "gm-search",
    style: style
  }, e("span", {
    style: {
      color: 'var(--wm-ns-300)'
    }
  }, "\u2315"), e("input", {
    placeholder: placeholder
  }));

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
  const DOC_FOLDERS = [{
    id: 'fichas-tecnicas',
    label: 'Fichas tecnicas',
    count: 42,
    children: [{
      id: 'fichas-verano26',
      label: 'Primavera–Verano 26',
      count: 18
    }, {
      id: 'fichas-otono26',
      label: 'Otono 26',
      count: 14
    }, {
      id: 'fichas-invierno26',
      label: 'Invierno 26',
      count: 10
    }]
  }, {
    id: 'packaging',
    label: 'Packaging',
    count: 24,
    children: [{
      id: 'pkg-etiquetas',
      label: 'Etiquetas y marcado',
      count: 11
    }, {
      id: 'pkg-hangtags',
      label: 'Hangtags',
      count: 8
    }, {
      id: 'pkg-bolsas',
      label: 'Bolsas y cajas',
      count: 5
    }]
  }, {
    id: 'manual-impl',
    label: 'Manual de implementacion',
    count: 6
  }, {
    id: 'briefs',
    label: 'Briefs de diseno',
    count: 18
  }, {
    id: 'qa-reports',
    label: 'Reportes QA',
    count: 31
  }, {
    id: 'proveedores',
    label: 'Fichas de proveedores',
    count: 9
  }, {
    id: 'plantillas',
    label: 'Plantillas',
    count: 12
  }];
  const DOC_FILES = {
    'fichas-verano26': [{
      name: 'Ficha tecnica Vestidos REF-038',
      ext: 'pdf',
      size: '2.1 MB',
      modified: 'Hoy 10:22',
      author: 'Luisa Vera',
      status: 'aprobado',
      changelog: [{
        initials: 'LV',
        author: 'Luisa Vera',
        action: 'actualizo medidas tabla de tallas',
        timestamp: 'Hoy 10:22'
      }, {
        initials: 'RG',
        author: 'Renata G.',
        action: 'aprobo version final',
        timestamp: 'Ayer 17:05'
      }]
    }, {
      name: 'Ficha tecnica Blusas REF-019',
      ext: 'pdf',
      size: '1.8 MB',
      modified: 'Ayer 16:40',
      author: 'Ana Soto',
      status: 'en revision',
      changelog: [{
        initials: 'AS',
        author: 'Ana Soto',
        action: 'subio nueva version',
        timestamp: 'Ayer 16:40'
      }]
    }, {
      name: 'Ficha tecnica Pantalones REF-034',
      ext: 'pdf',
      size: '1.5 MB',
      modified: 'Ayer 11:00',
      author: 'Luisa Vera',
      status: 'aprobado'
    }, {
      name: 'Ficha tecnica Faldas REF-027',
      ext: 'pdf',
      size: '1.2 MB',
      modified: '06 dic',
      author: 'Ana Soto',
      status: 'aprobado'
    }, {
      name: 'Ficha tecnica Tops REF-021',
      ext: 'pdf',
      size: '980 KB',
      modified: '05 dic',
      author: 'Luisa Vera',
      status: 'aprobado'
    }, {
      name: 'Tabla de tallas Primavera–Verano 26',
      ext: 'xls',
      size: '312 KB',
      modified: '07 dic',
      author: 'Maria Perez',
      status: 'aprobado'
    }],
    'fichas-otono26': [{
      name: 'Ficha tecnica Abrigos REF-101',
      ext: 'pdf',
      size: '2.3 MB',
      modified: '02 dic',
      author: 'Luisa Vera',
      status: 'en revision'
    }, {
      name: 'Ficha tecnica Sweaters REF-102',
      ext: 'pdf',
      size: '1.9 MB',
      modified: '01 dic',
      author: 'Ana Soto',
      status: 'borrador'
    }, {
      name: 'Tabla de tallas Otono 26',
      ext: 'xls',
      size: '298 KB',
      modified: '28 nov',
      author: 'Maria Perez',
      status: 'en revision'
    }],
    'fichas-invierno26': [{
      name: 'Ficha tecnica Parkas REF-201',
      ext: 'pdf',
      size: '1.4 MB',
      modified: '15 nov',
      author: 'Luisa Vera',
      status: 'borrador'
    }, {
      name: 'Tabla de tallas Invierno 26',
      ext: 'xls',
      size: '180 KB',
      modified: '12 nov',
      author: 'GM',
      status: 'borrador',
      stale: true
    }],
    'pkg-etiquetas': [{
      name: 'Etiqueta composicion textil — std',
      ext: 'pdf',
      size: '340 KB',
      modified: 'Hoy 09:15',
      author: 'GM',
      status: 'vigente'
    }, {
      name: 'Etiqueta lavado — simbolos 2026',
      ext: 'pdf',
      size: '210 KB',
      modified: '04 dic',
      author: 'GM',
      status: 'vigente'
    }, {
      name: 'Etiqueta precio — template',
      ext: 'ai',
      size: '1.2 MB',
      modified: '01 dic',
      author: 'Ana Soto',
      status: 'vigente'
    }, {
      name: 'Especificaciones de marcado SERNAC',
      ext: 'doc',
      size: '480 KB',
      modified: '10 nov',
      author: 'GM',
      status: 'vigente',
      stale: false
    }, {
      name: 'Guia de color etiquetas brand',
      ext: 'pdf',
      size: '2.4 MB',
      modified: '30 oct',
      author: 'RG',
      status: 'vigente'
    }],
    'pkg-hangtags': [{
      name: 'Hangtag coleccion Primavera–Verano 26',
      ext: 'ai',
      size: '3.1 MB',
      modified: '06 dic',
      author: 'Ana Soto',
      status: 'aprobado'
    }, {
      name: 'Hangtag precio — formato paisaje',
      ext: 'pdf',
      size: '820 KB',
      modified: '04 dic',
      author: 'Ana Soto',
      status: 'aprobado'
    }, {
      name: 'Template hangtag corporativo',
      ext: 'ai',
      size: '2.8 MB',
      modified: '15 nov',
      author: 'GM',
      status: 'plantilla'
    }],
    'pkg-bolsas': [{
      name: 'Spec bolsa polietileno — talla S',
      ext: 'pdf',
      size: '540 KB',
      modified: '05 dic',
      author: 'GM',
      status: 'aprobado'
    }, {
      name: 'Spec bolsa polietileno — talla M/L',
      ext: 'pdf',
      size: '540 KB',
      modified: '05 dic',
      author: 'GM',
      status: 'aprobado'
    }, {
      name: 'Spec caja empaque exportacion',
      ext: 'pdf',
      size: '720 KB',
      modified: '28 nov',
      author: 'GM',
      status: 'vigente'
    }],
    'manual-impl': [{
      name: 'Manual de implementacion GM — v3',
      ext: 'pdf',
      size: '4.2 MB',
      modified: '10 nov',
      author: 'RG',
      status: 'vigente'
    }, {
      name: 'Guia de proceso Paso a Paso',
      ext: 'doc',
      size: '1.1 MB',
      modified: '05 nov',
      author: 'RG',
      status: 'vigente'
    }, {
      name: 'Checklist implementacion proveedor',
      ext: 'xls',
      size: '380 KB',
      modified: '01 nov',
      author: 'GM',
      status: 'vigente'
    }, {
      name: 'Protocolo de entrega de muestras',
      ext: 'doc',
      size: '620 KB',
      modified: '20 oct',
      author: 'GM',
      status: 'vigente',
      stale: true
    }],
    'briefs': [{
      name: 'Brief Primavera–Verano 26 — Moda Mujer',
      ext: 'doc',
      size: '840 KB',
      modified: '08 dic',
      author: 'GM',
      status: 'aprobado'
    }, {
      name: 'Brief Otono 26',
      ext: 'doc',
      size: '720 KB',
      modified: '01 dic',
      author: 'RG',
      status: 'en revision'
    }, {
      name: 'Brief Invierno 26',
      ext: 'doc',
      size: '650 KB',
      modified: '15 nov',
      author: 'RG',
      status: 'borrador'
    }, {
      name: 'Brief Back to School 2025',
      ext: 'doc',
      size: '580 KB',
      modified: '20 abr',
      author: 'GM',
      status: 'cerrado',
      stale: true
    }],
    'qa-reports': [{
      name: 'Reporte QA Vestidos REF-038',
      ext: 'pdf',
      size: '720 KB',
      modified: '04 dic',
      author: 'Pablo Lara',
      status: 'aprobado'
    }, {
      name: 'Reporte QA Blusas REF-019',
      ext: 'pdf',
      size: '650 KB',
      modified: 'Ayer',
      author: 'Pablo Lara',
      status: 'en revision'
    }, {
      name: 'Informe QA Fit 2 — Pantalones',
      ext: 'pdf',
      size: '540 KB',
      modified: '02 dic',
      author: 'Pablo Lara',
      status: 'aprobado'
    }],
    'proveedores': [{
      name: 'Ficha Trends Co.',
      ext: 'pdf',
      size: '540 KB',
      modified: '05 dic',
      author: 'GM',
      status: 'vigente'
    }, {
      name: 'Ficha Texma — Telas',
      ext: 'pdf',
      size: '480 KB',
      modified: '01 dic',
      author: 'GM',
      status: 'vigente'
    }, {
      name: 'Ficha Andina Knits',
      ext: 'pdf',
      size: '520 KB',
      modified: '20 nov',
      author: 'GM',
      status: 'vigente'
    }, {
      name: 'Cuestionario homologacion proveedor',
      ext: 'doc',
      size: '210 KB',
      modified: '15 oct',
      author: 'GM',
      status: 'plantilla',
      stale: true
    }],
    'plantillas': [{
      name: 'Template ficha tecnica estandar',
      ext: 'doc',
      size: '210 KB',
      modified: '15 nov',
      author: 'GM',
      status: 'plantilla'
    }, {
      name: 'Template brief de diseno',
      ext: 'doc',
      size: '95 KB',
      modified: '15 nov',
      author: 'GM',
      status: 'plantilla'
    }, {
      name: 'Template ficha de proveedor',
      ext: 'xls',
      size: '88 KB',
      modified: '10 oct',
      author: 'GM',
      status: 'plantilla'
    }, {
      name: 'Template reporte QA',
      ext: 'pdf',
      size: '340 KB',
      modified: '10 oct',
      author: 'GM',
      status: 'plantilla'
    }, {
      name: 'Template etiqueta composicion',
      ext: 'ai',
      size: '1.4 MB',
      modified: '10 oct',
      author: 'GM',
      status: 'plantilla'
    }, {
      name: 'Template hangtag coleccion',
      ext: 'ai',
      size: '2.1 MB',
      modified: '08 oct',
      author: 'GM',
      status: 'plantilla'
    }, {
      name: 'Checklist entrega final proveedor',
      ext: 'doc',
      size: '60 KB',
      modified: '08 oct',
      author: 'GM',
      status: 'plantilla'
    }, {
      name: 'Cronograma de coleccion',
      ext: 'xls',
      size: '115 KB',
      modified: '01 oct',
      author: 'GM',
      status: 'plantilla'
    }]
  };
  const EXT_COLOR = {
    pdf: '#dc2626',
    doc: '#2563eb',
    xls: '#16a34a',
    zip: '#7c3aed'
  };
  const STATUS_DOC = {
    aprobado: {
      bg: '#dcfce7',
      color: '#166534'
    },
    'en revisión': {
      bg: '#fef9c3',
      color: '#854d0e'
    },
    vigente: {
      bg: '#dbeafe',
      color: '#1e40af'
    },
    plantilla: {
      bg: '#f3e8ff',
      color: '#6b21a8'
    },
    entregado: {
      bg: 'var(--wm-ns-100)',
      color: 'var(--wm-ns-500)'
    }
  };
  const DocFile = ({
    f
  }) => {
    const [showChangelog, setShowChangelog] = React.useState(false);
    const sc = EXT_COLOR[f.ext] || '#888';
    const st = STATUS_DOC[f.status] || STATUS_DOC.entregado;
    return e("div", null, e("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '9px 16px',
        borderBottom: showChangelog ? 'none' : '1px solid var(--wm-ns-100)',
        transition: 'background .1s'
      },
      onMouseEnter: e => e.currentTarget.style.background = 'var(--wm-sb-050)',
      onMouseLeave: e => e.currentTarget.style.background = 'transparent'
    }, e("div", {
      style: {
        width: 32,
        height: 36,
        borderRadius: 4,
        background: sc + '18',
        border: `1px solid ${sc}40`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }
    }, e("span", {
      style: {
        fontSize: 9,
        fontWeight: 800,
        color: sc,
        fontFamily: 'var(--font-sans)',
        textTransform: 'uppercase',
        letterSpacing: '.02em'
      }
    }, f.ext)), e("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, e("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        flexWrap: 'wrap'
      }
    }, e("span", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--wm-ns-700)',
        fontFamily: 'var(--font-sans)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, f.name), f.stale && e("span", {
      style: {
        fontSize: 10,
        fontWeight: 700,
        padding: '1px 6px',
        borderRadius: 6,
        background: '#fef3c7',
        color: '#92400e',
        fontFamily: 'var(--font-sans)',
        flexShrink: 0,
        border: '1px solid #fbbf24'
      }
    }, "\u26A0 Sin actualizaci\xF3n +12m")), e("div", {
      style: {
        fontSize: 11,
        color: 'var(--wm-ns-400)',
        fontFamily: 'var(--font-sans)',
        marginTop: 1
      }
    }, f.author, " \xB7 ", f.modified, " \xB7 ", f.size)), e("span", {
      style: {
        fontSize: 11,
        fontWeight: 600,
        padding: '2px 8px',
        borderRadius: 10,
        background: st.bg,
        color: st.color,
        fontFamily: 'var(--font-sans)',
        flexShrink: 0
      }
    }, f.status), f.changelog && e("button", {
      type: "button",
      onClick: () => setShowChangelog(p => !p),
      style: {
        fontSize: 11,
        color: 'var(--wm-ns-400)',
        background: 'none',
        border: '1px solid var(--wm-ns-200)',
        borderRadius: 5,
        padding: '2px 7px',
        cursor: 'pointer',
        fontFamily: 'var(--font-sans)',
        flexShrink: 0
      }
    }, showChangelog ? 'Ocultar' : 'Historial'), e("button", {
      type: "button",
      className: "gm-btn gm-btn--secondary gm-btn--sm",
      style: {
        flexShrink: 0
      },
      onClick: () => window.__app?.showToast?.(`Descargando ${f.name}…`)
    }, "\u2193")), showChangelog && f.changelog && e("div", {
      style: {
        background: '#f8fafc',
        borderBottom: '1px solid var(--wm-ns-100)',
        padding: '8px 16px 10px 60px'
      }
    }, f.changelog.map((entry, i) => e("div", {
      key: i,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '3px 0'
      }
    }, e("span", {
      style: {
        width: 22,
        height: 22,
        borderRadius: '50%',
        background: 'var(--wm-sb-400)',
        color: '#fff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 9,
        fontWeight: 700,
        fontFamily: 'var(--font-sans)',
        flexShrink: 0
      }
    }, entry.initials), e("span", {
      style: {
        fontSize: 11,
        color: 'var(--wm-ns-600)',
        fontFamily: 'var(--font-sans)'
      }
    }, e("b", null, entry.author), " ", entry.action), e("span", {
      style: {
        fontSize: 11,
        color: 'var(--wm-ns-400)',
        fontFamily: 'var(--font-sans)',
        marginLeft: 'auto'
      }
    }, entry.timestamp)))));
  };
  const DocumentosScreen = ({
    toolCtx
  }) => {
    const initFolder = 'fichas-verano26';
    const [activeFolder, setActiveFolder] = React.useState(initFolder);
    const [openFolders, setOpenFolders] = React.useState({
      'fichas-tecnicas': true,
      'packaging': false
    });
    const [ctx, setCtx] = React.useState(toolCtx || null);
    const files = DOC_FILES[activeFolder] || DOC_FILES['fichas-verano26'] || [];
    const toggleFolder = id => setOpenFolders(p => ({
      ...p,
      [id]: !p[id]
    }));
    const STALE_MARKERS = ['10 oct', '01 oct', '08 oct', '15 nov', '10 nov'];
    const enrichedFiles = files.map(f => ({
      ...f,
      stale: STALE_MARKERS.some(d => f.modified && f.modified.toLowerCase().includes(d.toLowerCase())),
      changelog: f.modified === 'Hoy 10:22' ? [{
        initials: 'LV',
        author: 'Luisa Vera',
        action: 'actualizó medidas tabla de tallas',
        timestamp: 'Hoy 10:22'
      }, {
        initials: 'RG',
        author: 'Renata G.',
        action: 'aprobó versión final',
        timestamp: 'Ayer 17:05'
      }] : f.modified === 'Ayer 16:40' ? [{
        initials: 'AS',
        author: 'Ana Soto',
        action: 'subió nueva versión',
        timestamp: 'Ayer 16:40'
      }, {
        initials: 'LV',
        author: 'Luisa Vera',
        action: 'dejó observaciones',
        timestamp: 'Ayer 14:20'
      }] : null
    }));
    return e(AppLayout, null, e(SubBar, {
      trail: ['Inicio', 'Documentos y plantillas']
    }), e("div", {
      className: "gm-page gm-fade"
    }, e("div", {
      className: "gm-page__head"
    }, e("div", null, e("h1", {
      className: "gm-page__title"
    }, "Documentos y plantillas"), e("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginTop: 4
      }
    }, e("div", {
      className: "gm-page__sub"
    }, "Repositorio centralizado"), e("span", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        padding: '2px 8px',
        borderRadius: 10,
        background: '#dcfce7',
        color: '#166534',
        fontFamily: 'var(--font-sans)',
        border: '1px solid #86efac',
        display: 'flex',
        alignItems: 'center',
        gap: 4
      }
    }, "\u2601 OneDrive conectado"))), e("div", {
      className: "row",
      style: {
        gap: 8
      }
    }, e(Btn, {
      kind: "secondary",
      size: "sm",
      onClick: () => window.__app?.showToast?.('Sincronizando OneDrive…')
    }, "Sincronizar"), e(Btn, {
      kind: "primary",
      size: "sm",
      onClick: () => window.__app?.openModal?.('upload')
    }, "+ Subir archivo"))), e(ToolCtxBanner, {
      toolCtx: ctx,
      onClear: () => setCtx(null)
    }), e("div", {
      className: "grid",
      style: {
        gridTemplateColumns: '240px 1fr',
        gap: 20,
        alignItems: 'start'
      }
    }, e("div", {
      className: "gm-card gm-card--p0"
    }, e("div", {
      style: {
        padding: '12px 16px',
        fontWeight: 700,
        fontSize: 12,
        color: 'var(--wm-ns-500)',
        fontFamily: 'var(--font-sans)',
        textTransform: 'uppercase',
        letterSpacing: '.04em',
        borderBottom: '1px solid var(--wm-ns-100)'
      }
    }, "Categorias"), DOC_FOLDERS.map(folder => {
      const isParentActive = folder.children && folder.children.some(c => c.id === activeFolder);
      return e("div", {
        key: folder.id
      }, e("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '9px 16px',
          cursor: 'pointer',
          background: activeFolder === folder.id || isParentActive ? 'var(--wm-sb-050)' : 'transparent',
          borderLeft: activeFolder === folder.id || isParentActive ? '3px solid var(--wm-sb-400)' : '3px solid transparent'
        },
        onClick: () => {
          if (folder.children) toggleFolder(folder.id);else setActiveFolder(folder.id);
        }
      }, e("svg", {
        width: 14,
        height: 14,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        style: {
          color: 'var(--wm-ns-400)',
          flexShrink: 0
        }
      }, folder.children ? e("path", {
        d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
      }) : e(React.Fragment, null, e("path", {
        d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
      }), e("polyline", {
        points: "14 2 14 8 20 8"
      }))), e("span", {
        style: {
          fontSize: 13,
          fontFamily: 'var(--font-sans)',
          color: 'var(--wm-ns-700)',
          fontWeight: activeFolder === folder.id || isParentActive ? 700 : 400,
          flex: 1
        }
      }, folder.label), folder.count !== undefined && e("span", {
        style: {
          fontSize: 11,
          color: 'var(--wm-ns-400)',
          fontFamily: 'var(--font-sans)'
        }
      }, folder.count), folder.children && e("span", {
        style: {
          fontSize: 10,
          color: 'var(--wm-ns-400)'
        }
      }, openFolders[folder.id] ? '▴' : '▾')), folder.children && openFolders[folder.id] && folder.children.map(child => e("div", {
        key: child.id,
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '7px 16px 7px 36px',
          cursor: 'pointer',
          background: activeFolder === child.id ? 'var(--wm-sb-050)' : 'transparent',
          borderLeft: activeFolder === child.id ? '3px solid var(--wm-sb-400)' : '3px solid transparent'
        },
        onClick: () => setActiveFolder(child.id)
      }, e("svg", {
        width: 12,
        height: 12,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        style: {
          color: 'var(--wm-ns-300)',
          flexShrink: 0
        }
      }, e("path", {
        d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
      }), e("polyline", {
        points: "14 2 14 8 20 8"
      })), e("span", {
        style: {
          fontSize: 12,
          fontFamily: 'var(--font-sans)',
          color: 'var(--wm-ns-600)',
          fontWeight: activeFolder === child.id ? 700 : 400,
          flex: 1
        }
      }, child.label), e("span", {
        style: {
          fontSize: 11,
          color: 'var(--wm-ns-400)',
          fontFamily: 'var(--font-sans)'
        }
      }, child.count))));
    })), e("div", {
      className: "gm-card gm-card--p0"
    }, e("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        borderBottom: '1px solid var(--wm-ns-100)'
      }
    }, e("span", {
      style: {
        fontWeight: 700,
        fontSize: 13,
        color: 'var(--wm-ns-800)',
        fontFamily: 'var(--font-sans)'
      }
    }, files.length, " archivos"), e(Search, {
      placeholder: "Buscar\u2026",
      style: {
        width: 180
      }
    })), enrichedFiles.map((f, i) => e(DocFile, {
      key: i,
      f: f
    }))))));
  };
  
  // ─────────────────────────────────────────────────────────────
  // Pantalla — Reportes y KPIs
  // ─────────────────────────────────────────────────────────────
  const KPI_DATA = [{
    label: 'Prendas completadas',
    value: '24',
    total: '42',
    unit: 'de 42 en Primavera–Verano 26',
    pct: 57,
    color: '#2563eb'
  }, {
    label: 'Tiempo prom. Brief→Prod.',
    value: '34',
    unit: 'días promedio',
    pct: 72,
    color: '#10b981',
    note: '↓ 4 días vs Otoño 25'
  }, {
    label: 'Tasa QA aprobado',
    value: '88%',
    unit: 'en primera revisión',
    pct: 88,
    color: '#8b5cf6',
    note: '+3% vs temporada anterior'
  }, {
    label: 'Alertas resueltas',
    value: '8/11',
    unit: 'últimas 30 días',
    pct: 73,
    color: '#f59e0b',
    note: '3 críticas pendientes'
  }];
  const PHASE_DIST = [{
    label: 'Brief',
    count: 2,
    color: '#6b7cff'
  }, {
    label: 'Diseño',
    count: 4,
    color: '#3b82f6'
  }, {
    label: 'Negociación',
    count: 3,
    color: '#0ea5e9'
  }, {
    label: 'Contramuestra',
    count: 8,
    color: '#f59e0b'
  }, {
    label: 'Producción',
    count: 5,
    color: '#10b981'
  }, {
    label: 'Calidad',
    count: 2,
    color: '#8b5cf6'
  }];
  const PHASE_TOTAL = PHASE_DIST.reduce((s, p) => s + p.count, 0);
  const COL_KPI_TABLE = [{
    name: 'Primavera–Verano 26',
    prendas: 42,
    completadas: 24,
    pct: 57,
    sellThrough: '—',
    qaPass: '88%',
    alertas: 3,
    status: 'activa'
  }, {
    name: 'Otoño 26',
    prendas: 38,
    completadas: 4,
    pct: 11,
    sellThrough: '—',
    qaPass: '—',
    alertas: 1,
    status: 'en curso'
  }, {
    name: 'Otoño 25',
    prendas: 34,
    completadas: 34,
    pct: 100,
    sellThrough: '87%',
    qaPass: '94%',
    alertas: 0,
    status: 'cerrada'
  }, {
    name: 'Invierno 25',
    prendas: 28,
    completadas: 28,
    pct: 100,
    sellThrough: '79%',
    qaPass: '88%',
    alertas: 0,
    status: 'cerrada'
  }, {
    name: 'Verano 25',
    prendas: 42,
    completadas: 42,
    pct: 100,
    sellThrough: '92%',
    qaPass: '97%',
    alertas: 0,
    status: 'cerrada'
  }];

  window.GMScreens = window.GMScreens || {};
  window.GMScreens.Documentos = DocumentosScreen;
})();