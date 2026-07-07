/* Splash screen → window.GMScreens.Splash */
(function () {
  const e = React.createElement;
  const SPARK_PATH = "M 62.785 48.529 L 59.162 7.407 C 59.162 3.34 63.905 0 69.874 0 C 75.843 0 80.604 3.34 80.604 7.407 L 76.972 48.529 C 76.564 51.006 73.546 52.916 69.87 52.916 C 66.194 52.916 63.185 51.006 62.785 48.529 Z M 47.689 65.754 C 49.525 62.563 49.384 58.994 47.443 57.405 L 13.706 33.698 C 10.201 31.665 4.939 34.111 1.953 39.296 C -1.043 44.476 -0.511 50.263 2.994 52.296 L 40.345 69.724 C 42.686 70.595 45.858 68.936 47.689 65.754 Z M 92.073 65.754 C 93.909 68.94 97.075 70.595 99.412 69.724 L 136.768 52.296 C 140.286 50.267 140.791 44.476 137.818 39.296 C 134.818 34.111 129.552 31.665 126.051 33.698 L 92.314 57.405 C 90.386 58.994 90.237 62.568 92.073 65.754 Z M 62.785 108.658 L 59.162 149.78 C 59.162 153.851 63.905 157.183 69.874 157.183 C 75.843 157.183 80.604 153.851 80.604 149.78 L 76.972 108.658 C 76.564 106.185 73.546 104.279 69.87 104.279 C 66.194 104.279 63.185 106.181 62.785 108.658 Z M 92.314 99.804 L 126.051 123.494 C 129.547 125.523 134.818 123.067 137.818 117.896 C 140.791 112.712 140.286 106.92 136.768 104.882 L 99.412 87.477 C 97.075 86.597 93.913 88.247 92.073 91.438 C 90.237 94.619 90.386 98.197 92.314 99.804 Z M 40.345 87.472 L 2.994 104.878 C -0.511 106.916 -1.043 112.707 1.953 117.891 C 4.939 123.058 10.201 125.518 13.706 123.489 L 47.443 99.799 C 49.384 98.193 49.525 94.619 47.689 91.433 C 45.853 88.243 42.682 86.588 40.345 87.472 Z";

  function Splash({ go }) {
    React.useEffect(() => {
      const t = setTimeout(() => go("login"), 2200);
      return () => clearTimeout(t);
    }, [go]);

    const isApp4 = window.location.pathname.toLowerCase().indexOf('/app 4/app/') !== -1 || window.location.pathname.toLowerCase().indexOf('/app%204/app/') !== -1;
    const logoPath = isApp4 ? "../../Img/Logo walmart chile.png" : "Img/Logo walmart chile.png";

    return e("div", { className: "gm-splash", onClick: () => go("login"), style: { cursor: "pointer", height: "100vh" } },
      e("div", { className: "gm-splash__bg" }),
      e("div", { className: "gm-splash__brand" },
        e("div", { className: "gm-splash__badge" }, "Plataforma interna"),
        e("img", { src: logoPath, alt: "Walmart Chile", style: { height: "80px", display: "block", margin: "0 auto" } })),
      e("div", { className: "gm-splash__loader" },
        e("div", { className: "gm-splash__progress" }, e("div")),
        e("div", { style: { fontSize: 12, opacity: 0.8 } }, "Cargando plataforma…")),
      e("div", { className: "gm-splash__foot" }, "© Walmart Chile · Save money. Live better."));
  }

  window.GMScreens = window.GMScreens || {};
  window.GMScreens.Splash = Splash;
})();
