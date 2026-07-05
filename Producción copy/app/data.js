/* ============================================================
   GM — Datos de demostración (Temporada PV26, Moda Mujer)
   Todo placeholder, en español. Expuesto en window.GM.
   ============================================================ */
window.GM = (function () {
  // ---- Temporada ----
  const season = {
    name: "Primavera–Verano 26",
    code: "PV26",
    division: "Moda Mujer",
    weekNo: 14,
    weekTotal: 32,
    startDate: "3 mar 2026",
    nextMilestone: { name: "Cierre de fichas Libro Base", date: "19 jun 2026" },
  };

  // ---- 10 pasos del flujo (para timeline del dashboard) ----
  // estado: completado | curso | pendiente | bloqueado
  const steps = [
    { id: "tendencias",     no: 1,  label: "Tendencias",     phase: 1, status: "completado", screen: "tendencias" },
    { id: "viaje",          no: 2,  label: "Viaje",          phase: 1, status: "completado", screen: "viaje" },
    { id: "coleccion",      no: 3,  label: "Colección",      phase: 2, status: "completado", screen: "coleccion" },
    { id: "muestras",       no: 4,  label: "Muestras",       phase: 2, status: "curso",      screen: "muestras" },
    { id: "fichas",         no: 5,  label: "Fichas",         phase: 2, status: "curso",      screen: "fichas" },
    { id: "contramuestras", no: 6,  label: "Contramuestras", phase: 3, status: "pendiente",  screen: "contramuestras" },
    { id: "manuales",       no: 7,  label: "Manuales",       phase: 3, status: "bloqueado",   screen: "manuales" },
    { id: "negociacion",    no: 8,  label: "Negociación",    phase: 4, status: "pendiente",  screen: "negociacion" },
    { id: "fichas_revisadas",no: 9,  label: "Fichas revisadas",phase: 4, status: "pendiente",  screen: "fichas_revisadas" },
    { id: "validacion",     no: 10, label: "Validación",     phase: 4, status: "pendiente",  screen: "validacion" },
  ];

  // ---- Quién tiene la pelota ----
  const ball = {
    owner: "Comprador",
    role: "comprador",            // diseno | comprador | proveedor | marketing | externo
    since: "hace 3 días",
    reason: "Revisando fichas Libro Base — 9 de 24 con feedback devuelto. La revisión final desbloquea distribución a proveedores.",
  };

  // ---- Alertas accionables ----
  const alerts = [
    { id:"a1", type:"pendiente", title:"Confirmación de recepción pendiente",
      body:"2 proveedores no han confirmado recepción de muestras enviadas hace 6 días.", step:"Muestras", screen:"muestras", age:"6 d" },
    { id:"a2", type:"rechazo", title:"Ficha rechazada — requiere ajuste",
      body:"SKU MJ-3187 «Blazer lino oversize» rechazada por comercial: ajustar composición y largo.", step:"Fichas → Revisiones", screen:"fichas", age:"1 d" },
    { id:"a3", type:"retraso", title:"Paso sin actividad",
      body:"«Manuales» lleva 8 días bloqueado esperando el KV de campaña de Marketing.", step:"KV", screen:"kv", age:"8 d" },
    { id:"a4", type:"pendiente", title:"Imagen de contramuestra pendiente",
      body:"4 SKUs sin imagen HQ recibida para los manuales de exhibición.", step:"Contramuestras", screen:"contramuestras", age:"3 d" },
  ];

  // ---- Métricas rápidas ----
  const metrics = {
    fichas:   { done: 15, total: 24 },
    muestras: { done: 18, total: 24 },
    contramuestras: { done: 8, total: 24 },
  };

  // ---- Proveedores ----
  const providers = {
    p1: { name:"Ningbo Garments Co.",  email:"export@ningbogarments.cn", country:"China", interno:false },
    p2: { name:"Jiangsu Textile Ltd.", email:"ventas@jiangsutex.cn",     country:"China", interno:false },
    p3: { name:"Hangzhou Knit Works",  email:"info@hzknit.cn",           country:"China", interno:false },
    p4: { name:"Textil Andina S.A.",   email:"comercial@textilandina.cl",country:"Chile", interno:true  },
    p5: { name:"Shantou Apparel",      email:"sales@shantou-app.cn",     country:"China", interno:false },
  };

  // ---- Paleta Pantone por categoría ----
  const palettes = {
    basicos: { label:"Básicos permanentes", colors:[
      { code:"11-0601", name:"Bright White", hex:"#f4f3ee" },
      { code:"19-4006", name:"Caviar Black",  hex:"#26262a" },
      { code:"17-1502", name:"Frost Gray",    hex:"#9a9893" },
      { code:"19-4118", name:"Estate Blue",   hex:"#2a3b59" },
    ]},
    temporada: { label:"De temporada", colors:[
      { code:"13-1023", name:"Peach Fuzz",    hex:"#ffbe98" },
      { code:"15-3920", name:"Serenity",      hex:"#92a8d1" },
      { code:"14-0852", name:"Lemon Drop",    hex:"#f4d35e" },
      { code:"16-1546", name:"Coral Reef",    hex:"#f88379" },
      { code:"15-5519", name:"Pool Green",    hex:"#46b4a0" },
    ]},
    innovacion: { label:"Innovación", colors:[
      { code:"18-3838", name:"Ultra Violet",  hex:"#5f4b8b" },
      { code:"17-1463", name:"Tangerine",     hex:"#f96714" },
      { code:"13-0550", name:"Acid Lime",     hex:"#c7e000" },
    ]},
  };

  // ---- SKUs / Line plan ----
  // status muestra: pendiente_envio | enviado | recibido
  // ficha: sin_iniciar | en_progreso | completa | en_revision | aprobada
  const cat = { basicos:"Básicos permanentes", temporada:"De temporada", innovacion:"Innovación" };
  const win = { w1:"1ª ventana", w2:"2ª ventana", w3:"3ª ventana", perm:"Permanente" };

  const skus = [
    { id:"MJ-3101", name:"Polera básica algodón pima", cat:"basicos", win:"perm", prov:"p4", price:5990, swatch:"#f4f3ee", colors:["11-0601","19-4006","17-1502"], muestra:"recibido", ficha:"aprobada",    review:"aprobado" },
    { id:"MJ-3104", name:"Jeans skinny tiro alto",      cat:"basicos", win:"perm", prov:"p1", price:14990, swatch:"#2a3b59", colors:["19-4118","19-4006"], muestra:"recibido", ficha:"aprobada",    review:"aprobado" },
    { id:"MJ-3122", name:"Vestido midi floral viscosa", cat:"temporada", win:"w1", prov:"p2", price:19990, swatch:"#ffbe98", colors:["13-1023","16-1546"], muestra:"recibido", ficha:"en_revision", review:"ajuste" },
    { id:"MJ-3140", name:"Blusa manga abullonada",      cat:"temporada", win:"w1", prov:"p2", price:12990, swatch:"#92a8d1", colors:["15-3920","11-0601"], muestra:"enviado",   ficha:"en_progreso", review:"feedback" },
    { id:"MJ-3155", name:"Short lino cintura paperbag", cat:"temporada", win:"w2", prov:"p3", price:11990, swatch:"#f4d35e", colors:["14-0852","11-0601"], muestra:"enviado",   ficha:"en_progreso", review:"sin" },
    { id:"MJ-3162", name:"Bikini estampado tropical",   cat:"temporada", win:"w2", prov:"p5", price:13990, swatch:"#f88379", colors:["16-1546","15-5519"], muestra:"enviado",   ficha:"en_progreso", review:"sin" },
    { id:"MJ-3170", name:"Falda plisada satinada",      cat:"temporada", win:"w2", prov:"p3", price:15990, swatch:"#46b4a0", colors:["15-5519","11-0601"], muestra:"pendiente_envio", ficha:"sin_iniciar", review:"sin" },
    { id:"MJ-3187", name:"Blazer lino oversize",        cat:"temporada", win:"w3", prov:"p1", price:24990, swatch:"#9a9893", colors:["17-1502","11-0601"], muestra:"recibido",  ficha:"en_revision", review:"ajuste" },
    { id:"MJ-3201", name:"Maxi vestido tie-dye",        cat:"innovacion", win:"w3", prov:"p5", price:22990, swatch:"#5f4b8b", colors:["18-3838","13-0550"], muestra:"pendiente_envio", ficha:"sin_iniciar", review:"sin" },
    { id:"MJ-3210", name:"Top crop metalizado",         cat:"innovacion", win:"w3", prov:"p3", price:9990, swatch:"#c7e000", colors:["13-0550","17-1463"], muestra:"pendiente_envio", ficha:"en_progreso", review:"sin" },
    { id:"MJ-3218", name:"Pantalón cargo utility",      cat:"innovacion", win:"w2", prov:"p1", price:18990, swatch:"#f96714", colors:["17-1463","19-4006"], muestra:"recibido",  ficha:"aprobada",    review:"aprobado" },
    { id:"MJ-3099", name:"Calza deportiva seamless",    cat:"basicos", win:"perm", prov:"p4", price:8990, swatch:"#26262a", colors:["19-4006","17-1502"], muestra:"recibido",   ficha:"aprobada",    review:"aprobado" },
  ];

  // ---- Hilos de email por SKU (muestras) ----
  const emailThreads = {
    "MJ-3104": [
      { from:"Diseño GM", to:"Ningbo Garments", dir:"out", date:"2 jun", subject:"Muestra MJ-3104 enviada",
        body:"Hola, enviamos la muestra original de Jeans skinny tiro alto vía courier (tracking SF-99213). Favor confirmar recepción." },
      { from:"Ningbo Garments", to:"Diseño GM", dir:"in", date:"5 jun", subject:"RE: Muestra MJ-3104 enviada",
        body:"Muestra recibida en buen estado. Iniciamos desarrollo de contramuestra esta semana. Saludos." },
    ],
    "MJ-3140": [
      { from:"Diseño GM", to:"Jiangsu Textile", dir:"out", date:"3 jun", subject:"Muestra MJ-3140 — Blusa manga abullonada",
        body:"Adjuntamos foto de la muestra. Courier despachado hoy (tracking SF-99318)." },
    ],
    "MJ-3187": [
      { from:"Diseño GM", to:"Ningbo Garments", dir:"out", date:"1 jun", subject:"Muestra MJ-3187 — Blazer lino",
        body:"Enviamos muestra de blazer lino oversize. Atención al caído de la solapa." },
      { from:"Ningbo Garments", to:"Diseño GM", dir:"in", date:"4 jun", subject:"RE: Muestra MJ-3187",
        body:"Recibido. Observación: el lino propuesto puede arrugarse en exceso, sugerimos mezcla lino-viscosa 70/30. Quedamos atentos." },
    ],
  };

  // ---- Análisis de tendencias (resultado IA) ----
  const trends = {
    colors: [
      { code:"13-1023", name:"Peach Fuzz", hex:"#ffbe98", reason:"+34% en ventas categoría vestidos PV25; color del año Pantone." },
      { code:"15-5519", name:"Pool Green", hex:"#46b4a0", reason:"Tendencia mercado +21% en swimwear y resort." },
      { code:"14-0852", name:"Lemon Drop", hex:"#f4d35e", reason:"Alta rotación en básicos verano, +12% YoY." },
      { code:"15-3920", name:"Serenity",   hex:"#92a8d1", reason:"Estable en blusería; bajo riesgo de saldo." },
      { code:"16-1546", name:"Coral Reef", hex:"#f88379", reason:"Emergente en redes; sube en wishlist juvenil." },
    ],
    fabrics: [
      { name:"Lino y mezclas lino", trend:"Alta", note:"Éxito de ventas sostenido — +28% PV25. Bajo costo por prenda en mezcla lino-viscosa.", perf:"+28% PV25" },
      { name:"Viscosa fluida", trend:"Alta", note:"Alta rotación en vestidos midi; precio accesible con percepción premium.", perf:"+19% PV25" },
      { name:"Algodón pima", trend:"Estable", note:"Calidad percibida alta, margen confiable. Ancla el básico de temporada.", perf:"+6% PV25" },
      { name:"Punto seamless", trend:"Emergente", note:"Costo por pieza bajo; captura ticket de athleisure sin inversión en confección.", perf:"nuevo" },
    ],
    garments: [
      { name:"Vestido midi", pct:92, reason:"Silueta líder de temporada; éxito en ventas histórico (+34% PV25)." },
      { name:"Blazer oversize", pct:78, reason:"Tendencia tailoring relajado; alto ticket promedio." },
      { name:"Short paperbag", pct:65, reason:"Reposición de verano con buen sell-through." },
      { name:"Set coordinado", pct:58, reason:"Oportunidad de venta cruzada (top + bottom)." },
    ],
    patterns: [
      { name:"Floral acuarela", pct:71, reason:"Líder en vestidería; alta conversión en mercado." },
      { name:"Tie-dye", pct:54, reason:"Sostiene demanda en juvenil e innovación." },
      { name:"Rayas náuticas", pct:62, reason:"Clásico de verano, bajo riesgo de saldo." },
      { name:"Tropical", pct:49, reason:"Empuje en swimwear y resort." },
    ],
    licenses: [
      { name:"Disney — estreno live action", pct:88, window:"Jul 2026", potential:"Alto", reason:"Estreno coincide con 3ª ventana; tracción histórica en infantil y juvenil.", img:"disney.png" },
      { name:"Festival de música verano", pct:64, window:"Ene 2026", potential:"Medio", reason:"Pico de demanda en gráficas de banda durante enero.", img:"festival verano.jpg" },
      { name:"Serie streaming juvenil T2", pct:57, window:"Feb 2026", potential:"Medio", reason:"Audiencia objetivo alineada con segmento teen.", img:"serie juvenil.webp" },
    ],
    moodboards: [
      { id:"mb1", label:"Básicos Permanente", pct:30, code:"INSPIRACIÓN SS27", title:"BÁSICOS PERMANENTE", tagline:"BASE NEUTRA",
        tiles:[
          { label:"INSPIRACIÓN SS27", c:"#F9F9FB", role:"hero" },
          { label:"GALERÍA", c:"#633E31" },
          { label:"TEXTURA ALGODÓN", c:"#89847A" },
          { label:"COMPETENCIA", c:"#6B2331" },
        ],
        palette:[
          { hex:"#F9F9FB", name:"Blanco Puro" }, { hex:"#633E31", name:"Marrón Chocolate" }, { hex:"#89847A", name:"Gris Topo" },
          { hex:"#6B2331", name:"Guinda / Vino" }, { hex:"#C2B8AD", name:"Beige Arena" }
        ] },
      { id:"mb2", label:"Básicos Temporada", pct:55, code:"INSPIRACIÓN PV26", title:"BÁSICOS TEMPORADA", tagline:"COLOR & FLUIDEZ",
        tiles:[
          { label:"PALETA PV26", c:"#1F1A1A", role:"hero" },
          { label:"VESTIDOS MIDI", c:"#D6CDBF" },
          { label:"VISCOSA FLUIDA", c:"#1F1A1A" },
          { label:"STREET / REDES", c:"#804E3B" },
        ],
        palette:[
          { hex:"#1F1A1A", name:"Negro Profundo" }, { hex:"#D6CDBF", name:"Crudo / Marfil" }, { hex:"#804E3B", name:"Marrón Óxido" },
          { hex:"#121E36", name:"Azul Marino Noche" }, { hex:"#E0DDD8", name:"Gris Tinta" }, { hex:"#000000", name:"Negro Puro" },
        ] },
      { id:"mb3", label:"Innovación", pct:15, code:"INSPIRACIÓN FWD", title:"INNOVACIÓN", tagline:"APUESTA CREATIVA",
        tiles:[
          { label:"MATERIALES TECH", c:"#E5DAC9", role:"hero" },
          { label:"NEÓN / CONTRASTE", c:"#E5DAC9" },
          { label:"ATHLEISURE", c:"#3F6D79" },
          { label:"CÁPSULA EDICIÓN", c:"#6D8F81" },
        ],
        palette:[
          { hex:"#E5DAC9", name:"Crudo / Lino Natural" }, { hex:"#3F6D79", name:"Azul Petróleo" }, { hex:"#6D8F81", name:"Verde Seco" },
          { hex:"#6B4E3D", name:"Marrón Café" }, { hex:"#7CA2CE", name:"Azul Sereno" }, { hex:"#121212", name:"Sombra Profunda / Negro" },
        ] },
    ],
    // ---- Fuentes consultadas por la IA ----
    sources: [
      { name:"WGSN", icon:"trend", desc:"Tendencias globales · forecasting PV26", meta:"412 señales", chip:["active","Conectada"] },
      { name:"Scraping de tendencias", icon:"search", desc:"Retail, pasarela y redes · configurado en backend", meta:"1.8k imágenes", chip:["active","Activo"] },
      { name:"Ventas internas", icon:"gauge", desc:"Historial de la plataforma · sell-through por categoría", meta:"3 temporadas", chip:["success","Sincronizada"] },
      { name:"Temporadas anteriores", icon:"clock", desc:"Resultados PV24–PV25 · contexto comparativo", meta:"Comparativo", chip:["neutral","Archivo"] },
    ],
    calendar: [
      { name:"Aprobación line plan", date:"24 abr 2026" },
      { name:"Envío de muestras",    date:"15 may 2026" },
      { name:"Cierre fichas base",   date:"19 jun 2026" },
      { name:"Viaje a China",        date:"28 jul 2026" },
      { name:"PP samples",           date:"10 sep 2026" },
      { name:"Shipment / despacho",  date:"22 oct 2026" },
    ],
  };

  // ---- Etapas de validación ----
  const validationStages = ["Fit 1","Fit 2","Materiales y colores","Gráficos y estampados","Trims y accesorios","Packaging y etiquetas","PP sample","Shipment sample"];

  return { season, steps, ball, alerts, metrics, providers, palettes, skus, emailThreads, trends, cat, win, validationStages };
})();
