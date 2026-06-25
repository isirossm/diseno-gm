/* Login screen → window.GMScreens.Login */
(function () {
  const e = React.createElement;
  const SPARK_PATH = "M 62.785 48.529 L 59.162 7.407 C 59.162 3.34 63.905 0 69.874 0 C 75.843 0 80.604 3.34 80.604 7.407 L 76.972 48.529 C 76.564 51.006 73.546 52.916 69.87 52.916 C 66.194 52.916 63.185 51.006 62.785 48.529 Z M 47.689 65.754 C 49.525 62.563 49.384 58.994 47.443 57.405 L 13.706 33.698 C 10.201 31.665 4.939 34.111 1.953 39.296 C -1.043 44.476 -0.511 50.263 2.994 52.296 L 40.345 69.724 C 42.686 70.595 45.858 68.936 47.689 65.754 Z M 92.073 65.754 C 93.909 68.94 97.075 70.595 99.412 69.724 L 136.768 52.296 C 140.286 50.267 140.791 44.476 137.818 39.296 C 134.818 34.111 129.552 31.665 126.051 33.698 L 92.314 57.405 C 90.386 58.994 90.237 62.568 92.073 65.754 Z M 62.785 108.658 L 59.162 149.78 C 59.162 153.851 63.905 157.183 69.874 157.183 C 75.843 157.183 80.604 153.851 80.604 149.78 L 76.972 108.658 C 76.564 106.185 73.546 104.279 69.87 104.279 C 66.194 104.279 63.185 106.181 62.785 108.658 Z M 92.314 99.804 L 126.051 123.494 C 129.547 125.523 134.818 123.067 137.818 117.896 C 140.791 112.712 140.286 106.92 136.768 104.882 L 99.412 87.477 C 97.075 86.597 93.913 88.247 92.073 91.438 C 90.237 94.619 90.386 98.197 92.314 99.804 Z M 40.345 87.472 L 2.994 104.878 C -0.511 106.916 -1.043 112.707 1.953 117.891 C 4.939 123.058 10.201 125.518 13.706 123.489 L 47.443 99.799 C 49.384 98.193 49.525 94.619 47.689 91.433 C 45.853 88.243 42.682 86.588 40.345 87.472 Z";

  function Login({ go }) {
    const PROFILES = window.GM_PROFILES;
    const [profileId, setProfileId] = React.useState(
      localStorage.getItem('gm_profile') || 'renata'
    );

    function handleLogin(ev) {
      ev && ev.preventDefault();
      const profile = PROFILES[profileId] || PROFILES.default;
      localStorage.setItem('gm_profile', profile.id);
      go(profile.home);
    }

    const selected = PROFILES[profileId] || PROFILES.default;

    const isApp4 = window.location.pathname.toLowerCase().indexOf('/app 4/app/') !== -1 || window.location.pathname.toLowerCase().indexOf('/app%204/app/') !== -1;
    const logoPath = isApp4 ? "../../Img/Logo walmart chile.png" : "Img/Logo walmart chile.png";

    return e("div", { className: "gm-login", style: { height: "100vh" } },

      // ── Lado izquierdo (marca) ──────────────────────────────────
      e("div", { className: "gm-login__brand" },
        e("div", { className: "gm-login__sparkbg" },
          e("svg", { width: "100%", height: "100%", viewBox: "0 0 139.762 157.183", fill: "currentColor" },
            e("path", { d: SPARK_PATH }))),
        e("div", null,
          e("img", { src: logoPath, alt: "Walmart Chile", style: { height: "60px", display: "block", marginBottom: "16px" } })),
        e("div", { className: "gm-login__brand-copy" },
          e("h2", null, "Gestión de colecciones,", e("br"), "en un solo lugar."),
          e("p", null, "Centraliza el seguimiento de procesos por categoría y la comunicación entre equipos internos y proveedores.")),
        e("div", { className: "gm-login__brand-foot" }, "Acceso restringido a usuarios autorizados.")),

      // ── Lado derecho (formulario) ───────────────────────────────
      e("div", { className: "gm-login__form" },
        e("div", null,
          e("h1", null, "Bienvenido/a"),
          e("p", { className: "sub" }, "Ingresa con tu cuenta corporativa.")),

        e("div", null,
          e("label", { className: "gm-label" }, "Correo electrónico corporativo"),
          e("input", { className: "gm-field", placeholder: "nombre@walmart.cl",
            defaultValue: "renata@walmart.cl", type: "email" })),

        e("div", null,
          e("label", { className: "gm-label" }, "Contraseña"),
          e("input", { className: "gm-field", placeholder: "••••••••••", type: "password" })),

        e("div", { style: { display: "flex", justifyContent: "flex-end" } },
          e("a", { href: "#", style: { fontFamily: "var(--font-sans)", fontSize: 13,
            fontWeight: 700, color: "var(--wm-sb-400)", textDecoration: "none" } },
            "¿Olvidaste tu contraseña?")),

        // ── Separador + selector de perfil ──
        e("div", { style: { borderTop: "1px solid var(--wm-ns-100)", paddingTop: 20, display: "flex", flexDirection: "column", gap: 10 } },
          e("label", { className: "gm-label", style: { marginBottom: 0 } }, "Perfil de acceso"),

          // Selector visual: fila de chips por perfil
          e("div", { style: { display: "flex", flexDirection: "column", gap: 6 } },
            window.GM_PROFILE_IDS.map(id => {
              const p = PROFILES[id];
              const isActive = id === profileId;
              return e("button", {
                key: id,
                type: "button",
                onClick: () => setProfileId(id),
                style: {
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "9px 12px", borderRadius: 8, cursor: "pointer",
                  border: isActive ? "2px solid " + p.color : "2px solid var(--wm-ns-100)",
                  background: isActive ? p.color + "0d" : "transparent",
                  fontFamily: "var(--font-sans)", textAlign: "left",
                  transition: "border .15s, background .15s",
                }
              },
                // Avatar
                e("div", { style: {
                  width: 32, height: 32, borderRadius: "50%",
                  background: isActive ? p.color : "var(--wm-ns-100)",
                  color: isActive ? "#fff" : "var(--wm-ns-400)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700, flexShrink: 0,
                  transition: "background .15s, color .15s",
                }}, p.initials),
                // Nombre + rol
                e("div", { style: { flex: 1 } },
                  e("div", { style: { fontSize: 13.5, fontWeight: 700,
                    color: isActive ? p.color : "var(--wm-ns-700)" } }, p.name),
                  e("div", { style: { fontSize: 11.5, color: "var(--wm-ns-400)", marginTop: 1 } }, p.role)),
                // Check activo
                isActive && e("svg", { width: 16, height: 16, viewBox: "0 0 24 24",
                  fill: "none", stroke: p.color, strokeWidth: 2.5,
                  strokeLinecap: "round", strokeLinejoin: "round" },
                  e("polyline", { points: "20 6 9 17 4 12" }))
              );
            })
          )
        ),

        e("button", {
          className: "gm-btn gm-btn--primary gm-btn--lg gm-btn--block",
          style: { justifyContent: "center", marginTop: 4,
            background: selected.color, borderColor: selected.color },
          onClick: handleLogin,
        }, "Iniciar sesión"),

        e("div", { className: "legal", style: { fontSize: 12, color: "var(--wm-ns-400)", textAlign: "center", lineHeight: 1.5 } },
          "Las credenciales son gestionadas por administración.", e("br"),
          "Si necesitas acceso, contacta a tu líder de categoría.")));
  }

  window.GMScreens = window.GMScreens || {};
  window.GMScreens.Login = Login;
})();
