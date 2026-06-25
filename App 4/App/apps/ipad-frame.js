/* Simple landscape iPad bezel (11"). window.IPadDevice */
function IPadDevice({ children, width = 1180, height = 820, style = {} }) {
  return React.createElement("div", { style: {
    width, height, borderRadius: 34, background: "#0b0b0d", padding: 13,
    boxShadow: "0 40px 90px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.2)",
    position: "relative", boxSizing: "content-box", ...style } },
    // front camera centered on top long edge
    React.createElement("div", { style: { position: "absolute", top: 6, left: "50%", transform: "translateX(-50%)", width: 7, height: 7, borderRadius: "50%", background: "#1f2024", border: "1px solid #303236" } }),
    React.createElement("div", { style: {
      width: "100%", height: "100%", borderRadius: 22, overflow: "hidden", background: "#fff",
      position: "relative", display: "flex", flexDirection: "column",
      fontFamily: 'var(--font-sans)', WebkitFontSmoothing: "antialiased" } }, children));
}
window.IPadDevice = IPadDevice;
