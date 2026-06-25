/* Definición de perfiles de usuario — window.GM_PROFILES */
(function () {

  const PROFILES = {
    default: {
      id:       'default',
      name:     'Default',
      role:     'Acceso total (desarrollo)',
      initials: 'GM',
      color:    '#0071dc',
      home:     'panel',
      allowed:  null,   // null = todas las pantallas
      filter:   null,
    },
    renata: {
      id:       'renata',
      name:     'Renata González',
      role:     'Jefa de Diseño GM',
      initials: 'RG',
      color:    '#7c3aed',
      home:     'panel',
      allowed:  new Set([
        'panel', 'moda', 'moda-mujer', 'colecciones', 'kpis',
        'correo', 'calendario', 'documentos', 'historial',
        'inicio',
      ]),
      filter: null,
    },
    valentina: {
      id:       'valentina',
      name:     'Valentina García',
      role:     'Diseñadora',
      initials: 'VG',
      color:    '#0891b2',
      home:     'moda-mujer',
      allowed:  new Set([
        'moda-mujer', 'colecciones', 'kpis',
        'correo', 'calendario', 'documentos', 'historial',
        'inicio', 'tendencias', 'viaje', 'coleccion',
        'muestras', 'fichas', 'contramuestras', 'manuales',
        'negociacion', 'fichas_revisadas', 'validacion',
      ]),
      filter: 'moda-mujer',
    },
    compradores: {
      id:       'compradores',
      name:     'Compradores',
      role:     'Equipo de Compras',
      initials: 'CP',
      color:    '#d97706',
      home:     'moda-mujer',
      allowed:  new Set([
        'moda-mujer', 'colecciones', 'kpis',
        'correo', 'calendario', 'documentos', 'historial',
        'inicio', 'tendencias', 'viaje', 'coleccion',
        'muestras', 'fichas', 'contramuestras', 'manuales',
        'negociacion', 'fichas_revisadas', 'validacion',
      ]),
      filter: 'moda-mujer',
    },
    proveedores: {
      id:       'proveedores',
      name:     'Proveedores',
      role:     'Proveedor externo',
      initials: 'PR',
      color:    '#16a34a',
      home:     'correo',
      allowed:  new Set([
        'correo', 'calendario', 'documentos', 'historial',
        // muestras/fichas/negociación versión proveedores: pendiente de desarrollo
      ]),
      filter: null,
    },
  };

  window.GM_PROFILES    = PROFILES;
  window.GM_PROFILE_IDS = ['default', 'renata', 'valentina', 'compradores', 'proveedores'];

})();
