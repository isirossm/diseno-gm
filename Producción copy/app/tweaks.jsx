/* GM Tweaks — mounts the panel in its own root; bridges to the app via the
   `tweakchange` window event that useTweaks fires. JSX → loaded with Babel. */

const GM_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "dash": "banner",
  "aipanel": "steps",
  "lineplan": "cards",
  "skucard": "expanded",
  "percheros": "categoria",
  "contramuestras": "galeria"
}/*EDITMODE-END*/;

function GMTweaks() {
  const { useTweaks, TweaksPanel, TweakSection, TweakRadio } = window;
  const [t, setTweak] = useTweaks(GM_TWEAK_DEFAULTS);

  // On first paint, sync the app to whatever the panel restored.
  React.useEffect(() => {
    window.dispatchEvent(new CustomEvent("tweakchange", { detail: t }));
  }, []);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Dashboard" />
      <TweakRadio
        label="Composición"
        value={t.dash}
        options={["banner", "columns"]}
        onChange={(v) => setTweak("dash", v)}
      />

      <TweakSection label="Análisis IA" />
      <TweakRadio
        label="Procesamiento"
        value={t.aipanel}
        options={["steps", "bar"]}
        onChange={(v) => setTweak("aipanel", v)}
      />

      <TweakSection label="Colección" />
      <TweakRadio
        label="Line plan"
        value={t.lineplan}
        options={["cards", "table"]}
        onChange={(v) => setTweak("lineplan", v)}
      />

      <TweakSection label="Muestras" />
      <TweakRadio
        label="Tarjeta SKU"
        value={t.skucard}
        options={["expanded", "compact"]}
        onChange={(v) => setTweak("skucard", v)}
      />

      <TweakSection label="Percheros" />
      <TweakRadio
        label="Agrupación"
        value={t.percheros}
        options={["categoria", "ventana"]}
        onChange={(v) => setTweak("percheros", v)}
      />

      <TweakSection label="Contramuestras" />
      <TweakRadio
        label="Vista"
        value={t.contramuestras}
        options={["galeria", "lista"]}
        onChange={(v) => setTweak("contramuestras", v)}
      />
    </TweaksPanel>
  );
}

(function mount() {
  const host = document.createElement("div");
  host.id = "gm-tweaks-root";
  document.body.appendChild(host);
  ReactDOM.createRoot(host).render(React.createElement(GMTweaks));
})();
