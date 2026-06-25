/* Correo (Centro de Comunicaciones) — Renata.html → window.GMScreens.Correo */
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
  const Chip = window.GMUI.Chip;

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

  const TeamsIcon = ({
    size = 18
  }) => e("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  }, e("rect", {
    width: "24",
    height: "24",
    rx: "5",
    fill: "#6264A7"
  }), e("path", {
    d: "M7.5 8h9v2.5h-3.5v7h-2v-7H7.5z",
    fill: "white"
  }));

  // ── Código compilado de Renata.html ─────────────────────────────────
  // ─────────────────────────────────────────────────────────────
  // Pantalla 4 — Centro de Comunicaciones
  // ─────────────────────────────────────────────────────────────
  // Equipo interno — por subgrupo
  const INT_CONV = [
  // Diseñadoras
  {
    id: 'diseno',
    group: 'disenadores',
    name: 'Equipo Diseño',
    last: 'Subí los tech packs actualizados al drive.',
    time: '10:42',
    unread: 3,
    init: 'DM',
    tag: 'Diseñadoras',
    members: 'Ana Soto, Luisa Vera, María Pérez'
  }, {
    id: 'ai-team',
    group: 'disenadores',
    name: 'Equipo IA',
    last: 'El modelo generó 3 propuestas de colección.',
    time: '10:05',
    unread: 1,
    init: 'IA',
    tag: 'Equipo IA',
    members: 'IA Generativa · Asistente GM'
  },
  // Compradores
  {
    id: 'compras',
    group: 'compradores',
    name: 'Compradores · Primavera–Verano 26',
    last: 'Necesitamos confirmar volúmenes para el pedido.',
    time: '09:15',
    unread: 0,
    init: 'CV',
    tag: 'Compradores',
    members: 'María Pérez, Carlos Ruiz'
  }, {
    id: 'comercial',
    group: 'compradores',
    name: 'Comercial · Planificación',
    last: 'Revisaron la estructura de márgenes.',
    time: 'ayer',
    unread: 0,
    init: 'CM',
    tag: 'Compradores',
    members: 'Equipo Comercial'
  },
  // General
  {
    id: 'gm',
    group: 'general',
    name: 'GM · Sync semanal',
    last: 'Recordatorio: sync mañana 10am.',
    time: 'ayer',
    unread: 0,
    init: 'GM',
    tag: 'General',
    members: 'Todas las áreas'
  }, {
    id: 'calidad',
    group: 'general',
    name: 'Calidad · QA muestras',
    last: 'Aprobado vestido REF-038 sin observaciones.',
    time: 'lun',
    unread: 1,
    init: 'QA',
    tag: 'Calidad',
    members: 'Pablo Lara, equipo QA'
  }];
  const INT_GROUPS = [{
    id: 'disenadores',
    label: 'Diseñadoras'
  }, {
    id: 'compradores',
    label: 'Compradores'
  }, {
    id: 'general',
    label: 'General'
  }];
  
  // Proveedores — internos (CL) y externos
  const PROV_CONV = [
  // Internos
  {
    id: 'texma',
    group: 'interno',
    name: 'Texma',
    supplier: 'Proveedor interno · Telas CL',
    last: 'Confirmamos yardas para Primavera–Verano 26.',
    time: '10:05',
    unread: 0,
    init: 'TX',
    country: 'CL',
    tipo: 'interno'
  }, {
    id: 'andina',
    group: 'interno',
    name: 'Andina Knits',
    supplier: 'Proveedor interno · Tejidos CL',
    last: 'Reagendamos visita planta para el viernes.',
    time: 'ayer',
    unread: 0,
    init: 'AK',
    country: 'CL',
    tipo: 'interno'
  },
  // Externos
  {
    id: 'trends-co',
    group: 'externo',
    name: 'Trends Co.',
    supplier: 'Proveedor externo · Blusas CN',
    last: 'Tenemos un retraso en REF-019 por lote de tela…',
    time: '11:20',
    unread: 2,
    init: 'TC',
    country: 'CN',
    tipo: 'externo'
  }, {
    id: 'fabricas-pe',
    group: 'externo',
    name: 'Fábricas Andes',
    supplier: 'Proveedor externo · Confección PE',
    last: 'Enviamos muestras el martes por DHL.',
    time: 'mié',
    unread: 0,
    init: 'FA',
    country: 'PE',
    tipo: 'externo'
  }];
  const PROV_GROUPS = [{
    id: 'interno',
    label: 'Proveedores internos'
  }, {
    id: 'externo',
    label: 'Proveedores externos'
  }];
  
  // Internal thread content per conversation
  const INT_THREADS = {
    diseno: {
      members: '4 participantes · contacto: Luisa Vera',
      bubbles: [{
        side: 'rx',
        author: 'LV',
        text: 'Subí los tech packs actualizados al drive. Necesito feedback del de Vestidos antes del viernes — hay cambios en el escote y tabla de tallas.',
        time: '09:48'
      }, {
        side: 'tx',
        text: 'Ok, lo reviso esta tarde. ¿Está la nueva ficha de medidas incluida?',
        time: '09:55'
      }, {
        side: 'rx',
        author: 'LV',
        text: 'Sí, actualicé la tabla con los cambios del fit 2.',
        time: '10:01'
      }, {
        side: 'rx',
        author: 'AS',
        text: '¿Y el de Blusas? ¿Podemos avanzar con ese tech pack?',
        time: '10:18'
      }, {
        side: 'tx',
        text: 'Blusas está bloqueado por el lote de tela con Trends Co. No avancen ahí hasta que confirmen entrega.',
        time: '10:22'
      }, {
        side: 'rx',
        author: 'AS',
        text: 'Entendido. Me pongo con Pantalones entonces.',
        time: '10:31'
      }, {
        side: 'rx',
        author: 'LV',
        text: '¿Alguien tiene el contacto del lab de calidad para el QA de Vestidos?',
        time: '10:42'
      }]
    },
    compras: {
      members: '3 participantes · contacto: María Pérez',
      bubbles: [{
        side: 'rx',
        author: 'MP',
        text: 'Necesitamos confirmar volúmenes de Primavera–Verano 26 para el pedido de telas esta semana.',
        time: '09:15'
      }, {
        side: 'tx',
        text: 'Los números están en el archivo de planificación. Lo subí ayer al drive.',
        time: '09:28'
      }, {
        side: 'rx',
        author: 'MP',
        text: '¿Hay cambios respecto a la semana pasada?',
        time: '09:35'
      }, {
        side: 'tx',
        text: 'Sí — vestidos subió 200 unidades y blusas bajó 100. El total se mantiene igual.',
        time: '09:42'
      }, {
        side: 'rx',
        author: 'MP',
        text: 'Perfecto. Confirmo con el proveedor esta tarde.',
        time: '09:58'
      }]
    },
    gm: {
      members: '8 participantes · General',
      bubbles: [{
        side: 'rx',
        author: 'GM',
        text: 'Recordatorio: sync semanal mañana jueves a las 10am. Agenda en el calendario compartido.',
        time: 'ayer 16:00'
      }, {
        side: 'tx',
        text: 'Confirmado. Preparamos el avance de Moda Mujer para presentar.',
        time: 'ayer 16:30'
      }, {
        side: 'rx',
        author: 'GM',
        text: 'Gracias. También veríamos el estado del calendario Otoño 26.',
        time: 'ayer 16:45'
      }]
    },
    calidad: {
      members: '2 participantes · contacto: Pablo Lara',
      bubbles: [{
        side: 'rx',
        author: 'PL',
        text: 'QA de muestra Vestidos REF-038 aprobado. Sin observaciones de forma.',
        time: 'lun 14:20'
      }, {
        side: 'tx',
        text: 'Excelente. ¿El reporte de calidad ya está en el drive?',
        time: 'lun 15:00'
      }, {
        side: 'rx',
        author: 'PL',
        text: 'Sí, está en la carpeta QA / Primavera–Verano 26.',
        time: 'lun 15:10'
      }, {
        side: 'tx',
        text: 'Perfecto, gracias. Queda registrado.',
        time: 'lun 15:18'
      }]
    }
  };
  const Conv = ({
    c,
    kind = 'int',
    active,
    onClick
  }) => e("div", {
    className: `gm-conv gm-conv--${kind}${active ? ' is-active' : ''}`,
    style: {
      cursor: 'pointer'
    },
    onClick: onClick
  }, e("div", {
    className: `gm-conv__avatar gm-conv__avatar--${kind}`
  }, e("span", null, c.init), kind === 'ext' ? e("span", {
    className: "gm-conv__ext-marker",
    title: "Externo"
  }, "EXT") : null), e("div", {
    className: "gm-conv__col"
  }, e("div", {
    className: "gm-conv__name"
  }, e("span", {
    style: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, c.name), e("time", null, c.time)), e("div", {
    className: "gm-conv__sub"
  }, kind === 'ext' ? c.supplier : c.tag), e("div", {
    className: "gm-conv__preview"
  }, c.last)), c.unread > 0 ? e("span", {
    className: "gm-conv__unread"
  }, c.unread) : null);
  
  // In-message mention chip
  const Mention = ({
    name,
    step,
    tone = 'crit'
  }) => e("span", {
    className: `gm-mention gm-mention--${tone}`
  }, e("span", {
    className: "gm-mention__icon",
    "aria-hidden": "true"
  }, e("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, e("path", {
    d: "M4 7l4-3 2 2h4l2-2 4 3-2 4h-2v9H8v-9H6L4 7z"
  }))), e("span", null, e("b", null, name), step ? ` · ${step}` : ''));
  const PrendaRefCard = ({
    name,
    refCode,
    step,
    severity = 'warn',
    desc,
    due
  }) => {
    const sevLabel = {
      crit: 'Crítico',
      warn: 'Advertencia',
      ok: 'Al día',
      normal: 'En curso'
    }[severity];
    return e("div", {
      className: `gm-ref-card gm-ref-card--${severity}`
    }, e("div", {
      className: "gm-ref-card__head"
    }, e("span", {
      className: "gm-ref-card__icon",
      "aria-hidden": "true"
    }, e("svg", {
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, e("path", {
      d: "M4 7l4-3 2 2h4l2-2 4 3-2 4h-2v9H8v-9H6L4 7z"
    }))), e("div", {
      className: "gm-ref-card__title-col"
    }, e("div", {
      className: "gm-ref-card__title"
    }, name, " ", e("span", {
      className: "gm-ref-card__ref"
    }, refCode)), e("div", {
      className: "gm-ref-card__sub"
    }, step)), e("span", {
      className: `gm-ref-card__sev gm-ref-card__sev--${severity}`
    }, e("span", {
      className: "gm-ref-card__sev-dot"
    }), sevLabel)), desc ? e("div", {
      className: "gm-ref-card__desc"
    }, desc) : null, e("div", {
      className: "gm-ref-card__foot"
    }, due ? e("span", {
      className: "gm-ref-card__due"
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
        display: "inline",
        verticalAlign: "middle",
        marginRight: 3
      }
    }, e("rect", {
      x: "3",
      y: "4",
      width: "18",
      height: "18",
      rx: "2"
    }), e("path", {
      d: "M16 2v4M8 2v4M3 10h18"
    })), due) : e("span", null), e("div", {
      className: "row",
      style: {
        gap: 6
      }
    }, e("button", {
      type: "button",
      className: "gm-ref-card__btn gm-ref-card__btn--ghost"
    }, "Vista previa"), e("button", {
      type: "button",
      className: "gm-ref-card__btn gm-ref-card__btn--primary",
      onClick: () => window.__app?.openModal?.('ajustar')
    }, "Ajustar \u2192"))));
  };
  const Bubble = ({
    side = 'rx',
    text,
    time,
    attachment,
    reference,
    kind = 'int',
    author,
    children
  }) => e("div", {
    className: "gm-bubble-row",
    style: {
      justifyContent: side === 'tx' ? 'flex-end' : 'flex-start'
    }
  }, side === 'rx' && author ? e("span", {
    className: `gm-bubble__avatar gm-bubble__avatar--${kind}`
  }, author) : null, e("div", {
    className: `gm-bubble gm-bubble--${side}${kind === 'ext' && side === 'rx' ? ' gm-bubble--ext' : ''}`
  }, reference ? e(PrendaRefCard, reference) : null, attachment ? e("div", {
    className: "gm-bubble__file"
  }, e("span", {
    style: {
      display: "flex"
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
  }, e("path", {
    d: "m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"
  }))), e("span", {
    style: {
      fontWeight: 700
    }
  }, attachment.name), e("span", {
    style: {
      opacity: 0.7
    }
  }, "\xB7 ", attachment.size)) : null, children ? e("div", {
    className: "gm-bubble__text"
  }, children) : text ? e("div", {
    className: "gm-bubble__text"
  }, text) : null, e("span", {
    className: "gm-bubble__time"
  }, time)));
  
  // ─────────────────────────────────────────────────────────────
  // Smart composer — @ mention picker + send as bubble
  // ─────────────────────────────────────────────────────────────
  const MENTION_PRENDAS = [{
    name: 'Vestidos',
    ref: 'REF-038',
    fase: 'Contramuestra',
    estado: 'enCurso'
  }, {
    name: 'Blusas',
    ref: 'REF-019',
    fase: 'Producción',
    estado: 'bloqueada'
  }, {
    name: 'Pantalones',
    ref: 'REF-034',
    fase: 'Calidad',
    estado: 'enCurso'
  }, {
    name: 'Tops',
    ref: 'REF-021',
    fase: 'Diseño',
    estado: 'retrasada'
  }];
  const ESTADO_COLOR_MAP = {
    enCurso: '#2563eb',
    bloqueada: '#dc2626',
    retrasada: '#d97706',
    completada: '#16a34a'
  };
  const SmartComposer = ({
    placeholder,
    kind = 'int'
  }) => {
    const [text, setText] = React.useState('');
    const [picker, setPicker] = React.useState(false);
    const [query, setQuery] = React.useState('');
    const [pending, setPending] = React.useState(null); // prenda attached
    const [sent, setSent] = React.useState([]); // sent bubbles
  
    const filtered = MENTION_PRENDAS.filter(p => !query || p.name.toLowerCase().startsWith(query.toLowerCase()) || p.ref.toLowerCase().includes(query.toLowerCase()));
    const handleChange = e => {
      const val = e.target.value;
      setText(val);
      const atMatch = val.match(/@([^\s@]*)$/);
      const refMatch = val.match(/\bREF-?\w*$/i);
      if (atMatch) {
        setPicker(true);
        setQuery(atMatch[1]);
      } else if (refMatch) {
        setPicker(true);
        setQuery('');
      } else {
        setPicker(false);
        setQuery('');
      }
    };
    const selectPrend = p => {
      const cleaned = text.replace(/@[^\s@]*$/, '').replace(/\bREF-?\w*$/i, '').trimEnd();
      setText(cleaned + (cleaned ? ' ' : '') + `@${p.name} `);
      setPending(p);
      setPicker(false);
      setQuery('');
    };
    const openPicker = () => {
      setText(t => t + '@');
      setPicker(true);
      setQuery('');
    };
    const handleSend = () => {
      if (!text.trim() && !pending) return;
      setSent(prev => [...prev, {
        text: text.trim(),
        prenda: pending
      }]);
      setText('');
      setPending(null);
      setPicker(false);
    };
    return e("div", null, sent.map((b, i) => e("div", {
      key: i,
      className: "gm-bubble-row",
      style: {
        justifyContent: 'flex-end'
      }
    }, e("div", {
      className: `gm-bubble gm-bubble--tx`
    }, b.prenda && e(PrendaRefCard, {
      name: b.prenda.name,
      refCode: b.prenda.ref,
      step: `${b.prenda.fase} · Primavera–Verano 26`,
      severity: b.prenda.estado === 'bloqueada' ? 'crit' : b.prenda.estado === 'retrasada' ? 'warn' : 'normal'
    }), b.text && e("div", {
      className: "gm-bubble__text"
    }, b.text), e("span", {
      className: "gm-bubble__time"
    }, "ahora")))), pending && e("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '7px 20px',
        background: 'var(--wm-sb-050)',
        borderTop: '1px solid var(--wm-sb-100)',
        fontFamily: 'var(--font-sans)',
        fontSize: 12
      }
    }, e("span", {
      style: {
        fontWeight: 700,
        color: 'var(--wm-sb-500)',
        background: 'var(--wm-sb-100)',
        padding: '2px 7px',
        borderRadius: 4
      }
    }, pending.ref), e("span", {
      style: {
        color: 'var(--wm-ns-600)'
      }
    }, pending.name, " \xB7 ", pending.fase), e("span", {
      style: {
        marginLeft: 'auto',
        fontSize: 10,
        color: ESTADO_COLOR_MAP[pending.estado]
      }
    }, "\u25CF\xA0", pending.estado === 'bloqueada' ? 'Bloqueada' : pending.estado === 'retrasada' ? 'Retrasada' : 'En curso'), e("button", {
      style: {
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        color: 'var(--wm-ns-400)',
        fontSize: 18,
        lineHeight: 1,
        padding: '0 4px'
      },
      onClick: () => setPending(null)
    }, "\xD7")), e("div", {
      style: {
        position: 'relative'
      }
    }, picker && filtered.length > 0 && e("div", {
      className: "gm-mention-picker"
    }, e("div", {
      className: "gm-mention-picker__head"
    }, "Mencionar prenda", query ? ` · "${query}"` : ' — escribe para filtrar'), filtered.map(p => e("button", {
      key: p.ref,
      className: "gm-mention-picker__item",
      onClick: () => selectPrend(p)
    }, e("span", {
      className: "gm-mention-picker__ref"
    }, p.ref), e("span", {
      className: "gm-mention-picker__name"
    }, p.name), e("span", {
      className: "gm-mention-picker__fase"
    }, p.fase), e("span", {
      style: {
        fontSize: 10,
        color: ESTADO_COLOR_MAP[p.estado]
      }
    }, "\u25CF")))), e("div", {
      className: "gm-thread__composer"
    }, e(Btn, {
      kind: "secondary",
      size: "sm"
    }, e("svg", {
      width: 13,
      height: 13,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: {
        marginRight: 4
      }
    }, e("path", {
      d: "m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"
    })), "Adjuntar"), e(Btn, {
      kind: "secondary",
      size: "sm",
      onClick: openPicker
    }, "@ Mencionar"), e("div", {
      className: "gm-field",
      style: {
        flex: 1
      }
    }, e("input", {
      value: text,
      onChange: handleChange,
      onKeyDown: e => {
        if (e.key === 'Escape') setPicker(false);
        if (e.key === 'Enter' && !picker) handleSend();
      },
      placeholder: placeholder
    })), e(Btn, {
      kind: "primary",
      size: "sm",
      onClick: handleSend
    }, "Enviar"))));
  };
  
  // Internal team thread
  const InternalThread = ({
    conv
  }) => {
    const thread = INT_THREADS[conv?.id] || INT_THREADS.diseno;
    return e("section", {
      className: "gm-thread gm-thread--int"
    }, e("header", {
      className: "gm-thread__head"
    }, e("div", {
      className: "row",
      style: {
        gap: 12
      }
    }, e("div", {
      className: "gm-conv__avatar gm-conv__avatar--int",
      style: {
        width: 44,
        height: 44,
        fontSize: 15
      }
    }, e("span", null, conv?.init)), e("div", null, e("div", {
      className: "row",
      style: {
        gap: 8
      }
    }, e("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 16,
        fontWeight: 700,
        color: 'var(--wm-ns-600)'
      }
    }, conv?.name), e("span", {
      className: "gm-chip gm-chip--active"
    }, e("span", {
      className: "gm-chip__dot"
    }), "Equipo interno")), e("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 12,
        color: 'var(--wm-ns-400)',
        marginTop: 2
      }
    }, thread.members))), e("div", {
      className: "row",
      style: {
        gap: 8
      }
    }, e(Chip, {
      kind: "neutral"
    }, conv?.tag), e(Btn, {
      kind: "secondary",
      size: "sm"
    }, "Info"))), e("div", {
      className: "gm-thread__body"
    }, e("div", {
      className: "gm-thread__day"
    }, "Hoy"), thread.bubbles.map((b, i) => e(Bubble, {
      key: i,
      side: b.side,
      kind: "int",
      author: b.author,
      text: b.text,
      time: b.time
    }))), e(SmartComposer, {
      placeholder: `Escribe un mensaje en ${conv?.name || ''}…`,
      kind: "int"
    }));
  };
  
  // External thread (Trends Co.) — unchanged content
  const ExternalThread = () => e("section", {
    className: "gm-thread gm-thread--ext"
  }, e("header", {
    className: "gm-thread__head"
  }, e("div", {
    className: "row",
    style: {
      gap: 12
    }
  }, e("div", {
    className: "gm-conv__avatar gm-conv__avatar--ext",
    style: {
      width: 44,
      height: 44
    }
  }, e("span", null, "TC"), e("span", {
    className: "gm-conv__ext-marker",
    title: "Externo"
  }, "EXT")), e("div", null, e("div", {
    className: "row",
    style: {
      gap: 8
    }
  }, e("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 16,
      fontWeight: 700,
      color: 'var(--wm-ns-600)'
    }
  }, "Trends Co."), e("span", {
    className: "gm-chip gm-chip--warning"
  }, e("span", {
    className: "gm-chip__dot"
  }), "Externo \xB7 Proveedor")), e("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      color: 'var(--wm-ns-400)',
      marginTop: 2
    }
  }, "Categor\xEDa: Moda Mujer \xB7 Blusas \xB7 3 participantes \xB7 contacto: Wei Chen"))), e("div", {
    className: "row",
    style: {
      gap: 8
    }
  }, e(Chip, {
    kind: "neutral"
  }, "archivos \xB7 4"), e(Chip, {
    kind: "neutral"
  }, "prendas vinculadas \xB7 2"), e(Btn, {
    kind: "secondary",
    size: "sm"
  }, "Info"))), e("div", {
    className: "gm-thread__body"
  }, e("div", {
    className: "gm-thread__day"
  }, "Hoy"), e(Bubble, {
    side: "rx",
    kind: "ext",
    author: "WC",
    time: "11:18"
  }, "Buenos d\xEDas. Tenemos un retraso en ", e(Mention, {
    name: "Blusas",
    step: "REF-019",
    tone: "crit"
  }), " por el lote de tela. El proveedor de tela nos confirm\xF3 entrega para el 13."), e(Bubble, {
    side: "rx",
    kind: "ext",
    author: "WC",
    reference: {
      name: 'Blusas',
      refCode: 'REF-019',
      step: 'Producción · Primavera–Verano 26',
      severity: 'crit',
      desc: 'Tech pack aprobado. Producción detenida por falta de tela. Necesita confirmación para reanudar.',
      due: window.GMUtils ? 'Vence ' + window.GMUtils.formatDayMonth(5) : 'Vence 20 jun'
    },
    time: "11:20"
  }), e(Bubble, {
    side: "tx",
    text: "Recibido. Voy a revisar la disponibilidad de un lote alternativo.",
    time: "11:24"
  }), e(Bubble, {
    side: "tx",
    time: "11:25"
  }, "Tambi\xE9n necesito que confirmen muestras de ", e(Mention, {
    name: "Vestidos",
    step: "REF-038",
    tone: "warn"
  }), " antes del cierre."), e(Bubble, {
    side: "tx",
    reference: {
      name: 'Vestidos',
      refCode: 'REF-038',
      step: 'Calidad · Primavera–Verano 26',
      severity: 'warn',
      desc: 'QA pendiente de tu sign-off. Aprobado por diseño el ' + (window.GMUtils ? window.GMUtils.formatDayMonth(-4) : '11 jun') + '.',
      due: window.GMUtils ? 'Vence ' + window.GMUtils.formatDayMonth(3) : 'Vence 18 jun'
    },
    time: "11:26"
  }), e(Bubble, {
    side: "rx",
    kind: "ext",
    author: "WC",
    text: "Entendido. Te confirmo ma\xF1ana temprano por ambas.",
    time: "11:32"
  })), e(SmartComposer, {
    placeholder: "Escribe un mensaje a Trends Co...",
    kind: "ext"
  }));
  const CommsScreen = () => {
    const [activeTab, setActiveTab] = React.useState('int');
    const [activeConvId, setActiveConvId] = React.useState('diseno');
    const activeIntConv = INT_CONV.find(c => c.id === activeConvId);
    const isInternal = activeIntConv != null;
    const handleConvClick = (conv, kind) => {
      setActiveConvId(conv.id);
      setActiveTab(kind);
    };
    const GroupLabel = ({
      label,
      dot,
      count
    }) => e("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 16px 5px',
        fontFamily: 'var(--font-sans)',
        fontSize: 11,
        fontWeight: 700,
        color: 'var(--wm-ns-500)',
        textTransform: 'uppercase',
        letterSpacing: '.05em',
        marginTop: 4
      }
    }, e("span", {
      style: {
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: dot,
        flexShrink: 0
      }
    }), label, e("span", {
      style: {
        fontWeight: 500,
        textTransform: 'none',
        letterSpacing: 0,
        marginLeft: 'auto'
      }
    }, count));
    return e(AppLayout, {
      active: "comms",
      unread: 3
    }, e(SubBar, {
      trail: ['Inicio', 'Correo']
    }), e("div", {
      className: "gm-comms flex-1 gm-fade"
    }, e("aside", {
      className: "gm-comms__list"
    }, e("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 16px',
        background: 'linear-gradient(90deg,#f3f3fb,#ebebf8)',
        borderBottom: '1px solid #dcdcf0',
        fontFamily: 'var(--font-sans)',
        fontSize: 11
      }
    }, e(TeamsIcon, {
      size: 16
    }), e("span", {
      style: {
        fontWeight: 600,
        color: '#5558a4'
      }
    }, "Microsoft Teams"), e("span", {
      style: {
        marginLeft: 'auto',
        color: '#2e7d45',
        fontWeight: 700,
        fontSize: 10,
        display: 'flex',
        alignItems: 'center',
        gap: 3
      }
    }, e("span", {
      style: {
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: '#4caf50',
        display: 'inline-block'
      }
    }), "Conectado")), e("div", {
      className: "gm-comms__list-head"
    }, e(Search, {
      placeholder: "Buscar conversaciones..."
    }), e("div", {
      className: "gm-comms__tabs"
    }, e("button", {
      type: "button",
      className: `gm-comms__tab gm-comms__tab--int${activeTab === 'int' ? ' is-active' : ''}`,
      onClick: () => {
        setActiveTab('int');
        setActiveConvId('diseno');
      }
    }, e("span", {
      className: "gm-comms__tab-dot gm-comms__tab-dot--int"
    }), "Equipo interno", e("span", {
      className: "gm-comms__tab-count"
    }, INT_CONV.length)), e("button", {
      type: "button",
      className: `gm-comms__tab gm-comms__tab--ext${activeTab === 'ext' ? ' is-active' : ''}`,
      onClick: () => {
        setActiveTab('ext');
        setActiveConvId('trends-co');
      }
    }, e("span", {
      className: "gm-comms__tab-dot gm-comms__tab-dot--ext"
    }), "Proveedores", e("span", {
      className: "gm-comms__tab-count gm-comms__tab-count--alert"
    }, PROV_CONV.reduce((a, c) => a + c.unread, 0))))), e("div", {
      className: "gm-comms__list-body"
    }, activeTab === 'int' ? e(React.Fragment, null, e(GroupLabel, {
      label: "Disenadores",
      dot: "var(--wm-sb-400)",
      count: INT_CONV.filter(c => c.group === 'disenadores').length
    }), INT_CONV.filter(c => c.group === 'disenadores').map(c => e(Conv, {
      key: c.id,
      c: c,
      kind: "int",
      active: activeConvId === c.id,
      onClick: () => handleConvClick(c, 'int')
    })), e(GroupLabel, {
      label: "Compradores",
      dot: "#0D9488",
      count: INT_CONV.filter(c => c.group === 'compradores').length
    }), INT_CONV.filter(c => c.group === 'compradores').map(c => e(Conv, {
      key: c.id,
      c: c,
      kind: "int",
      active: activeConvId === c.id,
      onClick: () => handleConvClick(c, 'int')
    })), e(GroupLabel, {
      label: "General",
      dot: "var(--wm-ns-400)",
      count: INT_CONV.filter(c => c.group === 'general').length
    }), INT_CONV.filter(c => c.group === 'general').map(c => e(Conv, {
      key: c.id,
      c: c,
      kind: "int",
      active: activeConvId === c.id,
      onClick: () => handleConvClick(c, 'int')
    }))) : e(React.Fragment, null, e(GroupLabel, {
      label: "Proveedores internos",
      dot: "#16a34a",
      count: PROV_CONV.filter(c => c.group === 'interno').length
    }), PROV_CONV.filter(c => c.group === 'interno').map(c => e(Conv, {
      key: c.id,
      c: c,
      kind: "int",
      active: activeConvId === c.id,
      onClick: () => handleConvClick(c, 'ext')
    })), e(GroupLabel, {
      label: "Proveedores externos",
      dot: "var(--wm-spark-400)",
      count: PROV_CONV.filter(c => c.group === 'externo').length
    }), PROV_CONV.filter(c => c.group === 'externo').map(c => e(Conv, {
      key: c.id,
      c: c,
      kind: "ext",
      active: activeConvId === c.id,
      onClick: () => handleConvClick(c, 'ext')
    }))))), isInternal ? e(InternalThread, {
      conv: activeIntConv
    }) : e(ExternalThread, null)));
  };

  window.GMScreens = window.GMScreens || {};
  window.GMScreens.Correo = CommsScreen;
})();