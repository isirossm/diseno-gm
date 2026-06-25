/* @ds-bundle: {"format":3,"namespace":"WalmartDesignSystem_a4d405","components":[],"sourceHashes":{"ui_kits/walmart-shop/components.jsx":"60b01aa0ade3","ui_kits/walmart-shop/screens.jsx":"074c0274d3f9","ui_kits/walmart-shop/wm-assets.js":"831ff95b4694"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.WalmartDesignSystem_a4d405 = window.WalmartDesignSystem_a4d405 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/walmart-shop/components.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Walmart Shop UI Kit — all components for the storefront prototype.
// Exports to window so index.html can use them without modules.

const {
  useState,
  useMemo,
  useCallback
} = React;

/* ------------------------------------------------------------------ */
/* Icons — small Lucide-style strokes. 24px, 2px stroke, current color */
/* ------------------------------------------------------------------ */
const I = ({
  d,
  viewBox = "0 0 24 24",
  size = 22,
  stroke = 2,
  fill = "none",
  children
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: viewBox,
  fill: fill,
  stroke: "currentColor",
  strokeWidth: stroke,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, d ? /*#__PURE__*/React.createElement("path", {
  d: d
}) : children);
const Icons = {
  Search: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    y1: "21",
    x2: "16.65",
    y2: "16.65"
  })),
  Cart: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "20",
    r: "1.7"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17",
    cy: "20",
    r: "1.7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 4h2l3 12h11l3-9H6"
  })),
  User: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "8",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 21a8 8 0 0 1 16 0"
  })),
  Reorder: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("polyline", {
    points: "1 4 1 10 7 10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3.5 15a9 9 0 1 0 2.1-9.4L1 10"
  })),
  ChevDown: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  })),
  ChevRight: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("polyline", {
    points: "9 18 15 12 9 6"
  })),
  ChevLeft: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("polyline", {
    points: "15 18 9 12 15 6"
  })),
  Plus: p => /*#__PURE__*/React.createElement(I, _extends({}, p, {
    stroke: 2.5
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "5",
    x2: "12",
    y2: "19"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  })),
  Minus: p => /*#__PURE__*/React.createElement(I, _extends({}, p, {
    stroke: 2.5
  }), /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  })),
  Heart: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
  })),
  Star: p => /*#__PURE__*/React.createElement(I, _extends({}, p, {
    fill: "currentColor",
    stroke: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2l3.09 6.26 6.91 1L17 14.14l1.18 6.88L12 17.77 5.82 21l1.18-6.88L2 9.27l6.91-1L12 2z"
  })),
  Truck: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("rect", {
    x: "1",
    y: "3",
    width: "15",
    height: "13"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "16 8 20 8 23 11 23 16 16 16 16 8"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "5.5",
    cy: "18.5",
    r: "2.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "18.5",
    cy: "18.5",
    r: "2.5"
  })),
  Pin: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "10",
    r: "3"
  })),
  Check: p => /*#__PURE__*/React.createElement(I, _extends({}, p, {
    stroke: 2.5
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  })),
  X: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  })),
  Clock: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "12 6 12 12 16 14"
  })),
  Menu: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "12",
    x2: "21",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "6",
    x2: "21",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "18",
    x2: "21",
    y2: "18"
  })),
  Mic: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "2",
    width: "6",
    height: "13",
    rx: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 10v2a7 7 0 0 1-14 0v-2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "19",
    x2: "12",
    y2: "22"
  })),
  Camera: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "13",
    r: "4"
  })),
  Sparkles: p => /*#__PURE__*/React.createElement(I, p, /*#__PURE__*/React.createElement("path", {
    d: "M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"
  }))
};

/* ------------------------------------------------------------------ */
/* Spark logo — uses asset PNG from /assets                            */
/* ------------------------------------------------------------------ */
const _WM = typeof window !== "undefined" && window.__WM_ASSETS || {};
const SPARK_SRC = _WM.spark || "../../assets/walmart-spark.png";
const LOGO_SRC = _WM.logo || "../../assets/walmart-logo-primary.png";
const SparkLogo = ({
  size = 40
}) => /*#__PURE__*/React.createElement("img", {
  src: SPARK_SRC,
  width: size,
  height: size,
  alt: "Walmart",
  style: {
    display: "block"
  }
});
const WalmartWordmark = ({
  height = 32,
  white = false
}) => /*#__PURE__*/React.createElement("img", {
  src: LOGO_SRC,
  alt: "Walmart",
  style: {
    height,
    display: "block",
    filter: white ? "brightness(0) invert(1)" : "none"
  }
});

/* ------------------------------------------------------------------ */
/* Header — three-tier nav                                             */
/* ------------------------------------------------------------------ */
function Header({
  cartCount,
  cartTotal,
  onNav,
  currentScreen
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: "wm-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wm-mast"
  }, /*#__PURE__*/React.createElement("button", {
    className: "wm-mast__logo",
    onClick: () => onNav("home"),
    "aria-label": "Walmart home"
  }, /*#__PURE__*/React.createElement(SparkLogo, {
    size: 44
  })), /*#__PURE__*/React.createElement("button", {
    className: "wm-pill-outline"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wm-pill-outline__icon"
  }, /*#__PURE__*/React.createElement(Icons.Pin, {
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    className: "wm-pill-outline__txt"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wm-pill-outline__hd"
  }, "How do you want your items?"), /*#__PURE__*/React.createElement("span", {
    className: "wm-pill-outline__sub"
  }, "Sacramento, 95829 \xB7 Pickup or delivery")), /*#__PURE__*/React.createElement(Icons.ChevDown, {
    size: 16
  })), /*#__PURE__*/React.createElement("div", {
    className: "wm-search"
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: "Search everything at Walmart online and in store"
  }), /*#__PURE__*/React.createElement("button", {
    className: "wm-search__icon",
    "aria-label": "Voice search"
  }, /*#__PURE__*/React.createElement(Icons.Mic, {
    size: 18
  })), /*#__PURE__*/React.createElement("button", {
    className: "wm-search__icon",
    "aria-label": "Image search"
  }, /*#__PURE__*/React.createElement(Icons.Camera, {
    size: 18
  })), /*#__PURE__*/React.createElement("button", {
    className: "wm-search__btn",
    "aria-label": "Search"
  }, /*#__PURE__*/React.createElement(Icons.Search, {
    size: 20,
    stroke: 2.5
  }))), /*#__PURE__*/React.createElement("button", {
    className: "wm-mast__opt"
  }, /*#__PURE__*/React.createElement(Icons.Reorder, {
    size: 22
  }), /*#__PURE__*/React.createElement("div", {
    className: "wm-mast__opt-txt"
  }, /*#__PURE__*/React.createElement("span", null, "Reorder"), /*#__PURE__*/React.createElement("b", null, "My Items"))), /*#__PURE__*/React.createElement("button", {
    className: "wm-mast__opt",
    onClick: () => onNav("account")
  }, /*#__PURE__*/React.createElement(Icons.User, {
    size: 22
  }), /*#__PURE__*/React.createElement("div", {
    className: "wm-mast__opt-txt"
  }, /*#__PURE__*/React.createElement("span", null, "Sign In"), /*#__PURE__*/React.createElement("b", null, "Account"))), /*#__PURE__*/React.createElement("button", {
    className: "wm-mast__cart",
    onClick: () => onNav("cart")
  }, /*#__PURE__*/React.createElement("div", {
    className: "wm-mast__cart-icon"
  }, /*#__PURE__*/React.createElement(Icons.Cart, {
    size: 26
  }), cartCount > 0 && /*#__PURE__*/React.createElement("span", {
    className: "wm-mast__cart-badge"
  }, cartCount)), /*#__PURE__*/React.createElement("b", null, "$", cartTotal.toFixed(2)))), /*#__PURE__*/React.createElement("nav", {
    className: "wm-cats"
  }, /*#__PURE__*/React.createElement("button", {
    className: "wm-cats__lead"
  }, /*#__PURE__*/React.createElement(Icons.Menu, {
    size: 18
  }), /*#__PURE__*/React.createElement("span", null, "Departments"), /*#__PURE__*/React.createElement(Icons.ChevDown, {
    size: 14
  })), /*#__PURE__*/React.createElement("button", {
    className: "wm-cats__lead"
  }, /*#__PURE__*/React.createElement("span", null, "Services"), /*#__PURE__*/React.createElement(Icons.ChevDown, {
    size: 14
  })), /*#__PURE__*/React.createElement("span", {
    className: "wm-cats__div"
  }), ["Grocery & Essentials", "Holiday Shop", "Gift Ideas", "New & Trending", "Toy Shop", "Home", "Fashion", "Electronics", "ONE Cash", "Walmart+"].map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    className: "wm-cats__item",
    onClick: () => onNav("plp", {
      dept: t
    })
  }, t))));
}

/* ------------------------------------------------------------------ */
/* Footer — restrained, all white                                      */
/* ------------------------------------------------------------------ */
function Footer() {
  const cols = [{
    title: "All Departments",
    links: ["Auto & Tires", "Baby", "Beauty", "Books", "Cell Phones", "Clothing", "Electronics", "Food"]
  }, {
    title: "Services",
    links: ["Walmart+", "Walmart Health", "Pharmacy", "Auto Care Center", "Vision Center", "Photo Center"]
  }, {
    title: "Get to Know Us",
    links: ["About Walmart", "Newsroom", "Investors", "Diversity & Inclusion", "Sustainability", "Affiliates"]
  }, {
    title: "Customer Service",
    links: ["Help Center", "Order status", "Track orders", "Returns & refunds", "Pickup & delivery", "Product recalls"]
  }];
  return /*#__PURE__*/React.createElement("footer", {
    className: "wm-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wm-footer__row"
  }, cols.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.title,
    className: "wm-footer__col"
  }, /*#__PURE__*/React.createElement("h4", null, c.title), /*#__PURE__*/React.createElement("ul", null, c.links.map(l => /*#__PURE__*/React.createElement("li", {
    key: l
  }, /*#__PURE__*/React.createElement("a", null, l))))))), /*#__PURE__*/React.createElement("div", {
    className: "wm-footer__bottom"
  }, /*#__PURE__*/React.createElement(WalmartWordmark, {
    height: 28
  }), /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Walmart. The trademarks Walmart and the Spark design are the property of Walmart Apollo, LLC.")));
}

/* ------------------------------------------------------------------ */
/* Category Tile                                                       */
/* ------------------------------------------------------------------ */
const CATEGORY_TILES = [{
  name: "Grocery",
  icon: "🛒",
  color: "#fff3d6",
  emoji: false,
  gradient: "linear-gradient(135deg,#fff8e1,#ffd569)",
  svg: "Sparkles"
}, {
  name: "Home",
  color: "#ffe5d9",
  gradient: "linear-gradient(135deg,#ffe8d6,#f4a96b)"
}, {
  name: "Electronics",
  color: "#d6e9ff",
  gradient: "linear-gradient(135deg,#e3f2fd,#90caf9)"
}, {
  name: "Fashion",
  color: "#fde2f3",
  gradient: "linear-gradient(135deg,#fce4ec,#f48fb1)"
}, {
  name: "Toys",
  color: "#fff0c2",
  gradient: "linear-gradient(135deg,#fff59d,#ffc220)"
}, {
  name: "Pharmacy",
  color: "#dcedc8",
  gradient: "linear-gradient(135deg,#dcedc8,#81c784)"
}, {
  name: "Auto",
  color: "#cfd8dc",
  gradient: "linear-gradient(135deg,#cfd8dc,#78909c)"
}, {
  name: "Baby",
  color: "#f8bbd0",
  gradient: "linear-gradient(135deg,#fce4ec,#f8bbd0)"
}];
function CategoryTile({
  tile,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    className: "wm-cat-tile",
    onClick: onClick
  }, /*#__PURE__*/React.createElement("div", {
    className: "wm-cat-tile__img",
    style: {
      background: tile.gradient
    }
  }), /*#__PURE__*/React.createElement("span", null, tile.name));
}

/* ------------------------------------------------------------------ */
/* Promo / Season cards                                                */
/* ------------------------------------------------------------------ */
function PromoCard({
  size = "horizontal-md",
  eyebrow,
  title,
  body,
  cta = "Shop now",
  bg,
  dark = false,
  onClick
}) {
  const txtColor = dark ? "#fff" : "#002d58";
  const sizeMap = {
    "vertical-lg": {
      h: 600,
      w: 460
    },
    "vertical-sm": {
      h: 300,
      w: 300
    },
    "horizontal-md": {
      h: 300,
      w: 600
    },
    "horizontal-lg": {
      h: 350,
      w: 980
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "wm-promo",
    style: {
      background: bg,
      color: txtColor,
      minHeight: sizeMap[size].h
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    className: "wm-promo__eyebrow"
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    className: "wm-promo__title",
    style: {
      color: txtColor
    }
  }, title), body && /*#__PURE__*/React.createElement("p", {
    className: "wm-promo__body",
    style: {
      color: dark ? "rgba(255,255,255,.85)" : "#003d76"
    }
  }, body), /*#__PURE__*/React.createElement("div", {
    className: "wm-promo__cta"
  }, /*#__PURE__*/React.createElement("button", {
    className: "wm-btn wm-btn--secondary",
    onClick: onClick,
    style: dark ? {
      background: "#fff",
      color: "#0071dc",
      borderColor: "#fff"
    } : {}
  }, cta)));
}

/* ------------------------------------------------------------------ */
/* Product Card                                                        */
/* ------------------------------------------------------------------ */
function ProductCard({
  product,
  onAdd,
  onOpen,
  qty = 0,
  onInc,
  onDec
}) {
  const {
    title,
    price,
    was,
    image,
    pickup = "Pickup today",
    rating,
    reviews,
    badge,
    freeShip
  } = product;
  const isAdded = qty > 0;
  return /*#__PURE__*/React.createElement("article", {
    className: "wm-card",
    onClick: () => onOpen(product)
  }, /*#__PURE__*/React.createElement("div", {
    className: "wm-card__image",
    style: {
      background: image
    }
  }, badge && /*#__PURE__*/React.createElement("span", {
    className: `wm-tag wm-tag--${badge.kind}`
  }, badge.text), /*#__PURE__*/React.createElement("button", {
    className: "wm-card__heart",
    "aria-label": "Save for later",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement(Icons.Heart, {
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    className: "wm-card__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wm-card__price"
  }, /*#__PURE__*/React.createElement("strong", null, "$", price.toFixed(2)), was && /*#__PURE__*/React.createElement("s", null, "$", was.toFixed(2))), freeShip && /*#__PURE__*/React.createElement("div", {
    className: "wm-card__ship"
  }, /*#__PURE__*/React.createElement(Icons.Truck, {
    size: 12
  }), " Free shipping, arrives tomorrow"), /*#__PURE__*/React.createElement("div", {
    className: "wm-card__pickup"
  }, /*#__PURE__*/React.createElement(Icons.Clock, {
    size: 12
  }), " ", pickup), /*#__PURE__*/React.createElement("p", {
    className: "wm-card__title"
  }, title), rating != null && /*#__PURE__*/React.createElement("div", {
    className: "wm-card__stars"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#ffc220"
    }
  }, "★".repeat(Math.round(rating)), "☆".repeat(5 - Math.round(rating))), /*#__PURE__*/React.createElement("span", {
    className: "wm-card__reviews"
  }, "(", reviews, ")")), /*#__PURE__*/React.createElement("div", {
    className: "wm-card__add",
    onClick: e => e.stopPropagation()
  }, !isAdded ? /*#__PURE__*/React.createElement("button", {
    className: "wm-addbtn",
    onClick: () => onAdd(product)
  }, /*#__PURE__*/React.createElement(Icons.Plus, {
    size: 14,
    stroke: 2.5
  }), " Add") : /*#__PURE__*/React.createElement("div", {
    className: "wm-counter"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onDec(product),
    "aria-label": "Decrease"
  }, /*#__PURE__*/React.createElement(Icons.Minus, {
    size: 14
  })), /*#__PURE__*/React.createElement("span", null, qty), /*#__PURE__*/React.createElement("button", {
    onClick: () => onInc(product),
    "aria-label": "Increase"
  }, /*#__PURE__*/React.createElement(Icons.Plus, {
    size: 14
  }))))));
}

/* ------------------------------------------------------------------ */
/* Filter sidebar (PLP)                                                */
/* ------------------------------------------------------------------ */
function FilterSidebar({
  dept = "Department"
}) {
  const filters = [{
    name: "Pickup & delivery",
    opts: ["Pickup", "Delivery", "Shipping"]
  }, {
    name: "Price",
    opts: ["Under $10", "$10 – $25", "$25 – $50", "$50 – $100", "$100 & up"]
  }, {
    name: "Customer Rating",
    opts: ["★★★★ & up", "★★★ & up", "★★ & up"]
  }, {
    name: "Brand",
    opts: ["Great Value", "Equate", "Mainstays", "onn.", "Athletic Works", "Wonder Nation"]
  }, {
    name: "Special Offers",
    opts: ["Rollback", "Reduced Price", "Clearance"]
  }];
  return /*#__PURE__*/React.createElement("aside", {
    className: "wm-filters"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "wm-filters__head"
  }, "Filters for ", dept), filters.map(f => /*#__PURE__*/React.createElement("div", {
    className: "wm-filters__group",
    key: f.name
  }, /*#__PURE__*/React.createElement("div", {
    className: "wm-filters__title"
  }, f.name), f.opts.map(o => /*#__PURE__*/React.createElement("label", {
    className: "wm-filters__opt",
    key: o
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox"
  }), " ", /*#__PURE__*/React.createElement("span", null, o))))));
}

/* ------------------------------------------------------------------ */
/* Breadcrumb                                                          */
/* ------------------------------------------------------------------ */
function Breadcrumb({
  trail = [],
  onNav
}) {
  return /*#__PURE__*/React.createElement("nav", {
    className: "wm-crumb"
  }, trail.map((t, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement(Icons.ChevRight, {
    size: 12
  }), i === trail.length - 1 ? /*#__PURE__*/React.createElement("span", {
    className: "wm-crumb__cur"
  }, t.label) : /*#__PURE__*/React.createElement("a", {
    onClick: () => t.onClick && t.onClick()
  }, t.label))));
}
Object.assign(window, {
  Icons,
  SparkLogo,
  WalmartWordmark,
  Header,
  Footer,
  CategoryTile,
  CATEGORY_TILES,
  PromoCard,
  ProductCard,
  FilterSidebar,
  Breadcrumb
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/walmart-shop/components.jsx", error: String((e && e.message) || e) }); }

// ui_kits/walmart-shop/screens.jsx
try { (() => {
// Walmart Shop — screens (Home, PLP, PDP, Cart, Account) and the App shell.

const {
  useState,
  useMemo
} = React;

/* Fake product catalog — gradient placeholders + realistic copy. */
const PRODUCTS = [{
  id: "p1",
  title: "Great Value organic whole grain pancake mix, 32 oz",
  price: 4.97,
  was: 6.97,
  rating: 5,
  reviews: 2341,
  image: "linear-gradient(135deg,#fff8e1,#ffe082)",
  dept: "Grocery & Essentials",
  badge: {
    kind: "rollback",
    text: "Rollback"
  },
  pickup: "Pickup today"
}, {
  id: "p2",
  title: "onn. 65\" Class 4K UHD (2160p) LED Roku Smart TV",
  price: 498.00,
  rating: 4,
  reviews: 1028,
  image: "linear-gradient(135deg,#e3f2fd,#90caf9)",
  dept: "Electronics",
  freeShip: true,
  pickup: "Free shipping, arrives tomorrow"
}, {
  id: "p3",
  title: "Equate beauty 100% pure mineral sunscreen, SPF 50, 6 fl oz",
  price: 12.48,
  rating: 4,
  reviews: 847,
  image: "linear-gradient(135deg,#fce4ec,#f8bbd0)",
  dept: "Beauty",
  pickup: "Pickup today"
}, {
  id: "p4",
  title: "Mainstays 6-piece bath towel set, navy blue",
  price: 19.97,
  was: 27.97,
  rating: 5,
  reviews: 3120,
  image: "linear-gradient(135deg,#e8eaf6,#7986cb)",
  dept: "Home",
  badge: {
    kind: "rollback",
    text: "Rollback"
  },
  pickup: "Pickup today"
}, {
  id: "p5",
  title: "Athletic Works women's active fleece pullover, sizes XS-XXXL",
  price: 14.98,
  rating: 4,
  reviews: 612,
  image: "linear-gradient(135deg,#f3e5f5,#ce93d8)",
  dept: "Fashion",
  pickup: "Pickup today"
}, {
  id: "p6",
  title: "Wonder Nation girls' long-sleeve graphic tee, sizes 4-18",
  price: 5.97,
  rating: 4,
  reviews: 219,
  image: "linear-gradient(135deg,#e0f7fa,#80deea)",
  dept: "Fashion",
  badge: {
    kind: "save",
    text: "Save $3"
  },
  pickup: "Pickup today"
}, {
  id: "p7",
  title: "Hyper Tough 20V Max cordless drill, 3/8-inch chuck",
  price: 39.97,
  rating: 4,
  reviews: 1801,
  image: "linear-gradient(135deg,#fff3e0,#ffb74d)",
  dept: "Auto & Tools",
  freeShip: true,
  pickup: "Free shipping"
}, {
  id: "p8",
  title: "Equate Acetaminophen extra strength 500mg, 200 caplets",
  price: 7.92,
  rating: 5,
  reviews: 4218,
  image: "linear-gradient(135deg,#e8f5e9,#a5d6a7)",
  dept: "Pharmacy",
  pickup: "Pickup today"
}, {
  id: "p9",
  title: "Marketside Caesar salad chopped kit, 11.6 oz, fresh",
  price: 3.78,
  rating: 5,
  reviews: 902,
  image: "linear-gradient(135deg,#f1f8e9,#aed581)",
  dept: "Grocery & Essentials",
  badge: {
    kind: "new",
    text: "New"
  },
  pickup: "Pickup today"
}, {
  id: "p10",
  title: "Beats Studio Pro wireless noise cancelling headphones, black",
  price: 169.99,
  was: 349.99,
  rating: 5,
  reviews: 8412,
  image: "linear-gradient(135deg,#fafafa,#bdbdbd)",
  dept: "Electronics",
  badge: {
    kind: "clearance",
    text: "Clearance"
  },
  freeShip: true,
  pickup: "Free shipping, arrives tomorrow"
}, {
  id: "p11",
  title: "PAW Patrol Adventure Bay HQ playset with figures, ages 3+",
  price: 49.97,
  rating: 4,
  reviews: 1287,
  image: "linear-gradient(135deg,#fff9c4,#fff176)",
  dept: "Toys",
  badge: {
    kind: "best",
    text: "Best Seller"
  },
  pickup: "Pickup today"
}, {
  id: "p12",
  title: "Parent's Choice purified water 16.9 fl oz bottles, 24-pack",
  price: 3.98,
  rating: 5,
  reviews: 5103,
  image: "linear-gradient(135deg,#e1f5fe,#4fc3f7)",
  dept: "Baby",
  pickup: "Pickup today"
}];

/* ============================================================ */
/* HOME                                                         */
/* ============================================================ */
function HomeScreen({
  onNav,
  addToCart,
  qtyOf,
  inc,
  dec
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "wm-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wm-cat-row"
  }, CATEGORY_TILES.map(t => /*#__PURE__*/React.createElement(CategoryTile, {
    key: t.name,
    tile: t,
    onClick: () => onNav("plp", {
      dept: t.name
    })
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.4fr 1fr 1fr",
      gap: 16,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(PromoCard, {
    size: "vertical-lg",
    eyebrow: "Black Friday Deals",
    title: "Save big this holiday",
    body: "Walmart+ members get the deals 12 hours early.",
    cta: "Shop deals",
    bg: "linear-gradient(135deg,#0071dc 0%,#002d58 100%)",
    dark: true,
    onClick: () => onNav("plp", {
      dept: "Black Friday"
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(PromoCard, {
    size: "horizontal-md",
    eyebrow: "New low prices",
    title: "Top toy deals under $25",
    cta: "Shop now",
    bg: "linear-gradient(135deg,#ffc220 0%,#ffd569 100%)",
    onClick: () => onNav("plp", {
      dept: "Toy Shop"
    })
  }), /*#__PURE__*/React.createElement(PromoCard, {
    size: "horizontal-md",
    eyebrow: "Walmart+",
    title: "Free shipping, no order minimum",
    cta: "Start free trial",
    bg: "linear-gradient(135deg,#e6f1fc 0%,#bbdefb 100%)",
    onClick: () => onNav("account")
  })), /*#__PURE__*/React.createElement(PromoCard, {
    size: "vertical-lg",
    eyebrow: "Fresh on Walmart",
    title: "Pickup today, in as little as 1 hour",
    body: "From your nearest store. Available on thousands of items.",
    cta: "See how",
    bg: "linear-gradient(135deg,#2a8703 0%,#558b2f 100%)",
    dark: true,
    onClick: () => onNav("plp", {
      dept: "Grocery & Essentials"
    })
  })), /*#__PURE__*/React.createElement(Section, {
    title: "Flash Picks \xB7 Up to 65% off",
    see: "See all"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wm-grid"
  }, PRODUCTS.slice(0, 5).map(p => /*#__PURE__*/React.createElement(ProductCard, {
    key: p.id,
    product: p,
    onAdd: addToCart,
    onOpen: prod => onNav("pdp", {
      id: prod.id
    }),
    qty: qtyOf(p.id),
    onInc: inc,
    onDec: dec
  })))), /*#__PURE__*/React.createElement(Section, {
    title: "More to explore \xB7 Trending now",
    see: "See all"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wm-grid"
  }, PRODUCTS.slice(5, 10).map(p => /*#__PURE__*/React.createElement(ProductCard, {
    key: p.id,
    product: p,
    onAdd: addToCart,
    onOpen: prod => onNav("pdp", {
      id: prod.id
    }),
    qty: qtyOf(p.id),
    onInc: inc,
    onDec: dec
  })))), /*#__PURE__*/React.createElement(Section, {
    title: "Pickup & delivery near you",
    see: "Change store"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wm-grid"
  }, PRODUCTS.slice(7, 12).map(p => /*#__PURE__*/React.createElement(ProductCard, {
    key: p.id + "_alt",
    product: p,
    onAdd: addToCart,
    onOpen: prod => onNav("pdp", {
      id: prod.id
    }),
    qty: qtyOf(p.id),
    onInc: inc,
    onDec: dec
  })))));
}
function Section({
  title,
  see,
  children
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "wm-sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wm-sec__head"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "wm-sec__title",
    dangerouslySetInnerHTML: {
      __html: title
    }
  }), see && /*#__PURE__*/React.createElement("a", {
    className: "wm-sec__see"
  }, see)), children);
}

/* ============================================================ */
/* PLP                                                          */
/* ============================================================ */
function PlpScreen({
  params,
  onNav,
  addToCart,
  qtyOf,
  inc,
  dec
}) {
  const dept = params.dept || "All items";
  return /*#__PURE__*/React.createElement("div", {
    className: "wm-page"
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    trail: [{
      label: "Home",
      onClick: () => onNav("home")
    }, {
      label: dept
    }]
  }), /*#__PURE__*/React.createElement("div", {
    className: "wm-plp__head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "700 28px/1.15 Bogle",
      margin: 0,
      color: "#030303"
    }
  }, dept), /*#__PURE__*/React.createElement("span", {
    className: "wm-plp__count"
  }, "1,000+ results \xB7 in stores near 95829")), /*#__PURE__*/React.createElement("div", {
    className: "wm-plp__sort"
  }, /*#__PURE__*/React.createElement("span", null, "Sort by"), /*#__PURE__*/React.createElement("button", {
    className: "wm-btn wm-btn--secondary",
    style: {
      padding: "8px 16px",
      fontSize: 14
    }
  }, "Best match", /*#__PURE__*/React.createElement(Icons.ChevDown, {
    size: 14
  })))), /*#__PURE__*/React.createElement("div", {
    className: "wm-plp"
  }, /*#__PURE__*/React.createElement(FilterSidebar, {
    dept: dept
  }), /*#__PURE__*/React.createElement("div", {
    className: "wm-plp__grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wm-grid"
  }, PRODUCTS.map(p => /*#__PURE__*/React.createElement(ProductCard, {
    key: p.id,
    product: p,
    onAdd: addToCart,
    onOpen: prod => onNav("pdp", {
      id: prod.id
    }),
    qty: qtyOf(p.id),
    onInc: inc,
    onDec: dec
  }))))));
}

/* ============================================================ */
/* PDP                                                          */
/* ============================================================ */
function PdpScreen({
  params,
  onNav,
  addToCart,
  qtyOf,
  inc,
  dec
}) {
  const product = PRODUCTS.find(p => p.id === params.id) || PRODUCTS[0];
  const [fulfill, setFulfill] = useState("pickup");
  const qty = qtyOf(product.id);
  return /*#__PURE__*/React.createElement("div", {
    className: "wm-page"
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    trail: [{
      label: "Home",
      onClick: () => onNav("home")
    }, {
      label: product.dept,
      onClick: () => onNav("plp", {
        dept: product.dept
      })
    }, {
      label: product.title.slice(0, 28) + "…"
    }]
  }), /*#__PURE__*/React.createElement("div", {
    className: "wm-pdp"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wm-pdp__image",
    style: {
      background: product.image
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "wm-pdp__brand"
  }, product.title.split(" ").slice(0, 2).join(" ")), /*#__PURE__*/React.createElement("h1", {
    className: "wm-pdp__title"
  }, product.title), /*#__PURE__*/React.createElement("div", {
    className: "wm-pdp__stars"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#ffc220",
      letterSpacing: 1,
      fontSize: 16
    }
  }, "★".repeat(product.rating || 4), "☆".repeat(5 - (product.rating || 4))), /*#__PURE__*/React.createElement("span", null, product.rating || 4, ".0"), /*#__PURE__*/React.createElement("a", null, "(", product.reviews || 0, " reviews)"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("a", null, "5K+ bought since yesterday")), /*#__PURE__*/React.createElement("div", {
    className: "wm-pdp__price"
  }, "$", product.price.toFixed(2)), product.was && /*#__PURE__*/React.createElement("div", {
    className: "wm-pdp__was"
  }, /*#__PURE__*/React.createElement("s", null, "$", product.was.toFixed(2)), /*#__PURE__*/React.createElement("span", {
    className: "wm-pdp__save"
  }, "You save $", (product.was - product.price).toFixed(2))), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: "700 14px Bogle",
      margin: "16px 0 4px"
    }
  }, "How do you want your item?"), /*#__PURE__*/React.createElement("div", {
    className: "wm-pdp__opts"
  }, [{
    id: "shipping",
    h: "Shipping",
    s: "Arrives tomorrow, free"
  }, {
    id: "pickup",
    h: "Pickup",
    s: "Today, Sacramento store"
  }, {
    id: "delivery",
    h: "Delivery",
    s: "From your store, today"
  }].map(o => /*#__PURE__*/React.createElement("button", {
    key: o.id,
    className: "wm-pdp__opt" + (fulfill === o.id ? " is-active" : ""),
    onClick: () => setFulfill(o.id)
  }, /*#__PURE__*/React.createElement("div", {
    className: "wm-pdp__opt-head"
  }, o.h), /*#__PURE__*/React.createElement("div", {
    className: "wm-pdp__opt-sub"
  }, o.s)))), /*#__PURE__*/React.createElement("div", {
    className: "wm-pdp__cta"
  }, qty === 0 ? /*#__PURE__*/React.createElement("button", {
    className: "wm-btn wm-btn--primary",
    onClick: () => addToCart(product)
  }, "Add to cart") : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wm-counter",
    style: {
      height: 44,
      padding: "0 6px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => dec(product)
  }, /*#__PURE__*/React.createElement(Icons.Minus, {
    size: 16
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16
    }
  }, qty), /*#__PURE__*/React.createElement("button", {
    onClick: () => inc(product)
  }, /*#__PURE__*/React.createElement(Icons.Plus, {
    size: 16
  }))), /*#__PURE__*/React.createElement("button", {
    className: "wm-btn wm-btn--primary",
    onClick: () => onNav("cart")
  }, "Go to cart")), /*#__PURE__*/React.createElement("button", {
    className: "wm-btn wm-btn--secondary"
  }, "Save for later")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      padding: "16px 18px",
      background: "#f2f8fd",
      borderRadius: 8,
      fontFamily: "Bogle",
      fontSize: 13,
      lineHeight: 1.5
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: "#0071dc"
    }
  }, "Free 90-day returns."), " Bring it back to any Walmart store or print a free shipping label."))), /*#__PURE__*/React.createElement(Section, {
    title: "Customers also bought"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wm-grid"
  }, PRODUCTS.filter(p => p.id !== product.id).slice(0, 5).map(p => /*#__PURE__*/React.createElement(ProductCard, {
    key: p.id,
    product: p,
    onAdd: addToCart,
    onOpen: prod => onNav("pdp", {
      id: prod.id
    }),
    qty: qtyOf(p.id),
    onInc: inc,
    onDec: dec
  })))));
}

/* ============================================================ */
/* CART                                                         */
/* ============================================================ */
function CartScreen({
  cart,
  products,
  inc,
  dec,
  remove,
  onNav
}) {
  const items = Object.entries(cart).map(([id, qty]) => ({
    product: products.find(p => p.id === id),
    qty
  })).filter(x => x.product);
  const subtotal = items.reduce((acc, {
    product,
    qty
  }) => acc + product.price * qty, 0);
  const ship = subtotal > 35 ? 0 : 5.99;
  const total = subtotal + ship;
  if (items.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "wm-page"
    }, /*#__PURE__*/React.createElement(Breadcrumb, {
      trail: [{
        label: "Home",
        onClick: () => onNav("home")
      }, {
        label: "Cart"
      }]
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#fff",
        borderRadius: 8,
        padding: 60,
        textAlign: "center",
        border: "1px solid #f0f0f0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: "700 24px Bogle",
        margin: "0 0 8px"
      }
    }, "Your cart is empty"), /*#__PURE__*/React.createElement("p", {
      style: {
        font: "400 14px Bogle",
        color: "#74767c",
        margin: "0 0 20px"
      }
    }, "Add items to it now. Or sign in to see saved items from before."), /*#__PURE__*/React.createElement("button", {
      className: "wm-btn wm-btn--primary",
      onClick: () => onNav("home")
    }, "Continue shopping")));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "wm-page"
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    trail: [{
      label: "Home",
      onClick: () => onNav("home")
    }, {
      label: "Cart"
    }]
  }), /*#__PURE__*/React.createElement("div", {
    className: "wm-cart"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wm-cart__list"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "wm-cart__head"
  }, "Cart \xB7 ", items.reduce((a, x) => a + x.qty, 0), " items"), items.map(({
    product,
    qty
  }) => /*#__PURE__*/React.createElement("div", {
    className: "wm-cart__item",
    key: product.id
  }, /*#__PURE__*/React.createElement("div", {
    className: "wm-cart__thumb",
    style: {
      background: product.image
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "wm-cart__name"
  }, product.title), /*#__PURE__*/React.createElement("div", {
    className: "wm-cart__pickup"
  }, product.pickup), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wm-counter"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => dec(product)
  }, /*#__PURE__*/React.createElement(Icons.Minus, {
    size: 14
  })), /*#__PURE__*/React.createElement("span", null, qty), /*#__PURE__*/React.createElement("button", {
    onClick: () => inc(product)
  }, /*#__PURE__*/React.createElement(Icons.Plus, {
    size: 14
  }))), /*#__PURE__*/React.createElement("button", {
    className: "wm-cart__remove",
    onClick: () => remove(product)
  }, "Remove"), /*#__PURE__*/React.createElement("button", {
    className: "wm-cart__remove"
  }, "Save for later"))), /*#__PURE__*/React.createElement("div", {
    className: "wm-cart__line"
  }, "$", (product.price * qty).toFixed(2)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right",
      color: "#74767c",
      fontSize: 12
    }
  }, "$", product.price.toFixed(2), " each")))), /*#__PURE__*/React.createElement("div", {
    className: "wm-cart__sum"
  }, /*#__PURE__*/React.createElement("h3", null, "Order summary"), /*#__PURE__*/React.createElement("div", {
    className: "wm-cart__sum-row"
  }, /*#__PURE__*/React.createElement("span", null, "Subtotal (", items.reduce((a, x) => a + x.qty, 0), " items)"), /*#__PURE__*/React.createElement("span", null, "$", subtotal.toFixed(2))), /*#__PURE__*/React.createElement("div", {
    className: "wm-cart__sum-row"
  }, /*#__PURE__*/React.createElement("span", null, "Shipping"), /*#__PURE__*/React.createElement("span", null, ship === 0 ? "Free" : "$" + ship.toFixed(2))), /*#__PURE__*/React.createElement("div", {
    className: "wm-cart__sum-row"
  }, /*#__PURE__*/React.createElement("span", null, "Taxes"), /*#__PURE__*/React.createElement("span", null, "Calculated at checkout")), /*#__PURE__*/React.createElement("div", {
    className: "wm-cart__sum-row wm-cart__sum-total"
  }, /*#__PURE__*/React.createElement("span", null, "Estimated total"), /*#__PURE__*/React.createElement("span", null, "$", total.toFixed(2))), /*#__PURE__*/React.createElement("button", {
    className: "wm-btn wm-btn--primary"
  }, "Continue to checkout"), ship > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      padding: "10px 12px",
      background: "#f2f8fd",
      borderRadius: 8,
      fontFamily: "Bogle",
      fontSize: 12,
      color: "#0071dc",
      textAlign: "center"
    }
  }, "Add $", (35 - subtotal).toFixed(2), " more for free shipping"))));
}

/* ============================================================ */
/* ACCOUNT                                                      */
/* ============================================================ */
function AccountScreen({
  onNav
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "wm-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wm-acct"
  }, /*#__PURE__*/React.createElement("h2", null, "Sign in or create an account"), /*#__PURE__*/React.createElement("p", null, "Save items, see past orders, and manage Walmart+."), /*#__PURE__*/React.createElement("input", {
    placeholder: "Email or mobile number"
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Password",
    type: "password"
  }), /*#__PURE__*/React.createElement("button", {
    className: "wm-btn wm-btn--primary"
  }, "Sign in"), /*#__PURE__*/React.createElement("button", {
    className: "wm-btn wm-btn--secondary",
    style: {
      width: "100%",
      marginTop: 8
    }
  }, "Create an account"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => onNav("home")
  }, "Continue as guest"))));
}

/* ============================================================ */
/* APP shell                                                    */
/* ============================================================ */
function App() {
  const [screen, setScreen] = useState({
    name: "home",
    params: {}
  });
  const [cart, setCart] = useState({});
  const onNav = (name, params = {}) => {
    setScreen({
      name,
      params
    });
    window.scrollTo({
      top: 0
    });
  };
  const addToCart = p => setCart(c => ({
    ...c,
    [p.id]: (c[p.id] || 0) + 1
  }));
  const inc = p => setCart(c => ({
    ...c,
    [p.id]: (c[p.id] || 0) + 1
  }));
  const dec = p => setCart(c => {
    const next = {
      ...c
    };
    next[p.id] = (next[p.id] || 0) - 1;
    if (next[p.id] <= 0) delete next[p.id];
    return next;
  });
  const remove = p => setCart(c => {
    const n = {
      ...c
    };
    delete n[p.id];
    return n;
  });
  const qtyOf = id => cart[id] || 0;
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((a, [id, q]) => {
    const p = PRODUCTS.find(p => p.id === id);
    return a + (p ? p.price * q : 0);
  }, 0);
  let body = null;
  switch (screen.name) {
    case "home":
      body = /*#__PURE__*/React.createElement(HomeScreen, {
        onNav: onNav,
        addToCart: addToCart,
        qtyOf: qtyOf,
        inc: inc,
        dec: dec
      });
      break;
    case "plp":
      body = /*#__PURE__*/React.createElement(PlpScreen, {
        params: screen.params,
        onNav: onNav,
        addToCart: addToCart,
        qtyOf: qtyOf,
        inc: inc,
        dec: dec
      });
      break;
    case "pdp":
      body = /*#__PURE__*/React.createElement(PdpScreen, {
        params: screen.params,
        onNav: onNav,
        addToCart: addToCart,
        qtyOf: qtyOf,
        inc: inc,
        dec: dec
      });
      break;
    case "cart":
      body = /*#__PURE__*/React.createElement(CartScreen, {
        cart: cart,
        products: PRODUCTS,
        inc: inc,
        dec: dec,
        remove: remove,
        onNav: onNav
      });
      break;
    case "account":
      body = /*#__PURE__*/React.createElement(AccountScreen, {
        onNav: onNav
      });
      break;
    default:
      body = /*#__PURE__*/React.createElement(HomeScreen, {
        onNav: onNav,
        addToCart: addToCart,
        qtyOf: qtyOf,
        inc: inc,
        dec: dec
      });
  }
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": `${screen.name === "home" ? "01 Home" : screen.name === "plp" ? "02 PLP" : screen.name === "pdp" ? "03 PDP" : screen.name === "cart" ? "04 Cart" : "05 Account"}`
  }, /*#__PURE__*/React.createElement(Header, {
    cartCount: cartCount,
    cartTotal: cartTotal,
    onNav: onNav,
    currentScreen: screen.name
  }), body, /*#__PURE__*/React.createElement(Footer, null));
}
Object.assign(window, {
  App,
  PRODUCTS,
  HomeScreen,
  PlpScreen,
  PdpScreen,
  CartScreen,
  AccountScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/walmart-shop/screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/walmart-shop/wm-assets.js
try { (() => {
window.__WM_ASSETS = {
  logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAD2CAYAAABImfWUAAAgAElEQVR4AeydB5gkRd3/6wgC8oqoBCXc1NydIKivAVQMyOtrQl/B14ARwcB7Ini3Xb1HUFFPzP5NmDGgooiciogCIod707N3HjBdvQuchAMk5ygccGnrT3VP787sTuhUoWe//Tz79GyHqt/vU9XVVd+uQAg2EAABEAABEAABEAABEAABEACBUhMQq/bYTqyoHihqlWHh0WXCo77w6A3Cow8Kj24WHr1XeJW1wqOXCI+eJjx6tKhVXiQE2aLUjsN4EAABEAABEAABEAABEAABEAABEJgNBER97n6iRk+JGvhUCC/lX43eGt1f/c/ZwAs+ggAIgAAIgAAIgAAIgAAIgAAIgECpCIQN/zr1Ujf4uwsEE2HPgRFKSwUCxoIACIAACIAACIAACIAACIAACIDAIBIQI3Rb4VV+LDwqG+zpv/j3v2edqFfcQWQHn0AABEAABEAABEAABEAABEAABECgFATEyF47iWK/+vcSEH4j5xUoBRgYCQIgAAIgAAIgAAIgAAIgAAIgAAKDQkCsXrCD8Og1ir76dxYCavRsIcicQWEIP0AABEAABEAABEAABEAABEAABEDAagKyES686u+1Nv4nhwpUPmk1HBgHAiAAAiAAAiAAAiAAAiAAAiAAAoNCQHjVw800/sM5BjYJb+6+g8ISfoAACIAACIAACIAACIAACIAACICAtQSER680KADI4QG/sBYODAMBEAABEAABEAABEAABEAABEACBQSAgapV9DDf+pQDwkFhGthwEnvABBEAABEAABEAABEAABEAABEAABKwkIGqV91sgAAgxWt3bSkAwCgRAAARAAARAAARAAARAAARAAAQGgYDwqh+3QgCoVV4xCDzhAwiAAAiAAAiAAAiAAAiAAAiAAAhYScCaHgC1yj5WAoJRIAACIAACIAACIAACIAACIAACIDAIBMSK6uut6AGwao+nDwJP+AACIAACIAACIAACIAACIAACIAACVhIQXvU/LRAANghB5lgJCEaBAAiAAAiAAAiAAAiAAAiAAAiAwCAQEMuruxoXAGr01kFgCR9AAARAAARAAARAAARAAARAAARAwFoCcvk94dFNhkUAbi0gGAYCIAACIAACIAACIAACIAACIAACg0JAePQuwwLABYPCEn6AAAiAAAiAAAiAAAiAAAiAAAiAgLUEhEcvNyoA1OgvrYUDw0AABEAABEAABEAABEAABEAABEBgUAgIr7rcqADgVb42KCzhBwiAAAiAAAiAAAiAAAiAAAiAAAhYS0DU6RlGBYBadYm1cGAYCIAACIAACIAACIAACIAACIAACAwKAeHRbxoVAOrVDwwKS/gBAiAAAiAAAiAAAiAAAiAAAiAAAtYSEHV6glEBwKNvtBYODAMBEAABEAABEAABEAABEAABEACBQSEg6vRDRgWAlfSFg8ISfoAACIAACIAACIAACIAACIAACICAtQRErfJmowKAV3mWtXBgGAiAAAiAAAiAAAiAAAiAAAiAAAgMCgFRn7ufQQFgQjT223pQWMIPEAABEAABEAABEAABEAABEAABELCWgBhZsIdBAeBea8HAMBAAARAAARAAARAAARAAARAAARAYJAJizb5PEh6dMCQCrBkklvAFBEAABEAABEAABEAABEAABEAABKwmIDx6vxEBoE7/bjUYGAcCIAACIAACIAACIAACIAACIAACg0RAePRqIwKAR387SBzhCwiAAAiAAAiAAAiAAAiAAAiAAAhYTUB4tGZEAKjRU6wGA+NAAARAAARAAARAAARAAARAAARAYJAICI8uMyIA1CufGiSO8AUEQAAEQAAEQAAEQAAEQAAEQAAErCYgvMp3jQgAXvUoq8HAOBAAARAAARAAARAAARAAARAAARAYJALCq37aiABQqx46SBzhCwiAAAiAAAiAAAiAAAiAAAiAAAhYTUDU6UIjAkCdvsxqMDAOBEAABEAABEAABEAABEAABEAABAaJgPDoW40IALVKdZA4whcQAAEQAAEQAAEQAAEQAAEQAAEQsJqAGKUHGBEALtx1e6vBwDgQAAEQAAEQAAEQAAEQAAEQAAEQGCQColap6hcAKg8PEkP4AgIgAAIgAAIgAAIgAAIgAAIgAALWExCN3Z6sXwCg11kPBgaCAAiAAAiAAAiAAAiAAAiAAAiAwKAREB59RLMIsGrQGMIfEAABEAABEAABEAABEAABEAABELCegPDo9ZoFgD9aDwUGggAIgAAIgAAIgAAIgAAIgAAIgMCgERAeXaVVAKjRUweNIfwBARAAARAAARAAARAAARAAARAAAesJCI/+UasA4FVOth4KDAQBEAABEAABEAABEAABEAABEACBQSMg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",
  spark: "data:image/png;base64,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+WJ3X98tuWrb0eMtrysNNSSoNwIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACjRKwWydPMGn0t4WK20aLy42OdhstM6PkNZkSX85V9O95Ej/LnnvsUY2qGIUNXsBu3nhYPts6LUuiMzMtv+hi2ihhjBJzRsWXFVp+ZiGJX2TPO+UewWMBgAAC4QjYdvT4QottRovCaGnX/r+4OU/l++2F0fpwlKhpEwXs9Pi9Tbv1KqPlpWvHtbRGyZsyHb3V7jzxQU2sL2VGAAEE1hSwm9cdkquJZ2Qq+lJXA+PBEgMlTK7F2XaLPHrNA7IBAiUK2F1Th5uk9Vqj5G19xbcS87kSH7Iz8ViJxeZQCCCAwOgE7PTYnRfa8QuMkt/ta2A8WCKgoyvdrYHRlZpvRqB7AbszmjQ6/vpw4lsUhZY6nxk/vfsSsCUCCCBQIwH3K93d3zc6unI4A+MdbxV0bgts3nhYjapNUQISsHbdnUwav65zb/+gieodY7aXvuCeHXBXzdzVs4BYqSoCCDRVwO4Yu3+WyM1Gixt6Gez63db9WuJBqqZGS3PL7a5s5Vp+uN+47XG/S0w7eoWdPvWuzRWj5Agg4K2A3b5hYu+AuNDj4NbFQ4Br/JJKxS57/vH38xaXitVKwF3dypT8r9LjvHM1LX41z8DUKhwoDALhClgtHtfbE/1rnMz7vZTqkoBtU0eG2xLUvAwB9ys80/Hnyj/5L+034hY3vdAmEw8po84cAwEEENgn0Hmif2b89M785n5P2CPYr0jkJ9192X0F5T8QGKKAnd50aKGjT1V78l+aCMiFXEXnuqtvQ6wmX4UAAgjcUcCes/EuRrVeYpT8YY0GwQNuIWTt1hvuWHL+BYHBBdzCVPWMezdzQGy3O1pPGLyWfAMCCCCwRMA9ZOceQtqzWt8Bv0AOOPnWY3AUxVw6+ZtLis9/IjCwwEIiXliP+F6r/8Vfd9Nu3dWKgSvNFyCAQLgCVk89NNPiHUaLW5ox+O0dHFV8GTMDwo3bYdfcXrD+OLdiX6P6gBY/MKk4w121G7YH34cAAh4LWH1Sy91bNFqW/0T/kJ4NyNLobR43EVUrScA971LNE/9r/dLv8nMlrnbTct0SxSWRcRgEEGiiwO72+K8ViZzpfo3+LgehIZ3Ue/oFpsS8TaZOamI7UOb6CJhE/nVPcVdFrHd1THGzu5rHzIH6xBYlQaBygX1P9A+yRn9XA1D5yYJ7MKpyYArQWAH3gp7G3f5auy8uFKmctjsmHtnYhqHgCCAwmICbz2za4k+Mkj/y4xfOwROM3TPjTxxMir1DFXAv5/G3b4iiUHLH7lm5MdT2pd4IBCew74l+Ja/wd3DbnwwUWlwYXCNT4YEF3AOwTX4Gpre+Lb7RmTnAezUGjhu+AIFaCtgdG34lS+W/enhJc82piHbH2Cm1bBQKVVuBXLfO6u0kuj/pbOx+bn0P1XoJMwdqG5YUDIHeBOzsZNT0J/oHHVBzHX+wNzW2Dlmgc3uspJdZDRrbI9lfyWs6MwfSk+8TchxQdwQaK+DufRcqbnvxRP/aDzatfhVAiVvtucce1djGpOClCiy0xe+P5MQ6aByXvn/nnQPvdLdDSm0ADoYAAr0L+PxE/6ADct6Ofqd3UfYIUaDQ8jODxptX+yth3Au/bDr+qBDjgTojUGuBPZcs45caLS/xauAZ4i+ePBXn1LoRKVwtBOyuqcONErfSjw72TIN750A069YLqUVjUQgEQhaweuqenTX6lfwFA9bBBqwl/5aI/w05Vqh7dwJ2RsT0pSX9ZqUkXImLmDnQXUyxFQJDFeg80Z9EZ/JLpYuBanEAUzLnOYChhqGXX7aQxC8iAeilX4mfuB8hdtvUkV4GBJVCoC4CS57ozxikehik9iYBNpl4TF3aknLUUyBPxb/Rt3rvW4aZA/UMaErVfIHds9GTCiUSBqY+BqbFKwBa2gUtX9z8aKAGoxRo9It/lsR6ZWOFErdmSXSmu0o5ynbiuxHwWmD/E/3iy5V15joMKMMsQzv+S6+DhsoNLGC0+D79bbBEu+PHzIGBY5EvCFDA3UszSv5fo8WPGYiGMBAtTSDa8esDDCmq3IOA0dGV9Lth9jv3zoG47a5i9tAMbIpAWAJ229Qxpt16leGJ/tUX9Vl6Qu/xv7M0fnNYUUVtexUwWlxFAjDMBGDJdzFzoNdwZHvfBewF64/LVfwuo+RtDDxLBoseT+7d2GVt8Rbf44n6DSZgtPxZN7HENoP0VfFjk0Z/ysyBwWKVvRss4OYb50n0MaMlT/SP4GR/0AGaZwAa3GPKKbpJxa6Dxk5ZMRrScZS8xrTj11veOVBOcHOU6gWsFo9zy2qyRv8gvyD62zfX4pnVRwAlqLNAkchPkgD017/6dlNizr2wzKbixDrHBmVDoC8Bu3njYfNJ9GyjxTf67iQh/TIYUV3ttg2P6KsB2SkYAfeLlD5acgKwv79nuZIftUrKYAKOivorYM9ad4RbLtNo8QMGlcoGlb0PFYrLrV13J3+jjZoNQ8DOxL9KX626r0qbKfE/+cz46fTZYUQ131GqgJ2O7+vep220vJbBpPrBxLVBnsTvLTUIOFgjBez02J2NltfRb+vRb42Ov+6unrqrqI0MKAodjoBNWw/vLCXKE/0jm8rX78BsdfTocCKRmg4ikKXyX/uNM/YbUeKgxE+Mbr2MmQODRDb7jkTA3bNyD7HwRP+IOv/+e4R9JRZZKv97JA3Pl3opYPXUQ40Sc5zMa9mfr3Xredj21AO8DD4q1RyBOTXxlEJFKQNFLQeKxWRhwU25bE5UUdI6CGS69Sb6dY37tZK3ufVT3DoqdYgXyhCIQOeJft16rlHiIgaIGg8Qi1cN2tFrAglNqjlEAfcAL2sCNKB/K5nnOv643RlNDrH5+SoEDhRw75I3afxyk4qfcuJvwMDgHvzT4myeIj4wjvlb9wLuMrNR8of092b090JL7a7Kdt/CbInAGgKdJ/rbrTfwZHAzBoHOYK1kbtL4dZz81whuPl5TwL2jI9PisyQBTer/4qL52fg5zBxYM7zZYCUBd2/JvdeaNfob1PH3XPb/md3ResJK7cq/I9CrgEskTTt6BQ8GNm8scO3mrt722uZsH6gAT/Q3rpMvPuxni1RO2y3y6EBDl2qPWMBeODbOsz+NHB9udD/mmDkw4g7S5K/fv0Z/IwN830kwyEuVSl6Tq4lnNDn+KHszBOw5G+/ipqEZJUyQfW3x4dom/rn4zoELo/XNiDZKOVIBu3ndIW65yUzLr9KZm5n4FEokduv6B440UPhyBJYJ7J4Zf6JR8WWMGw0cN5Qw7oVsLA62LKhD+audHrtb554e7/5u8pWD2zv391jfP5RuW7t6Wj11TzfThCSggUnA3isYvHOgdt1qdAVaskY/a3038RLeYqfV8quWy3ij6yh8c08CuZKbmCXU3CRgbwJ3sXtxm901dXhPjc/G9Rdwa/TzRH/jO6i7WpF1lgGlk9a/0wVWQrtj7P6Fkju4GtD4ceZnpt16lbu6E1gI+1ddtwQsa/Q3vkPuuU2hxE/cg5r+RSk18kWgM10wFWcwddiDMUfJmzozB3i+qHndkyf6PeiAS25RuCTOPbfRvEikxCEK2Jl4zL3GlqsBHoxDizMHkqmTQozlxtTZ3btx9+IyJb9Gx/Og47kEQImr89no6Y0JQgqKwF4BNx5lidxs3KqUS5JZ/ruhYxMzB+rZt5c80X8pnauhnesgA2SRyBkW7qhnn6NU3QvYtHWqUfJHjE3+jE3MHOg+/ke2pT3/+PvtybDFL+lc/nSuzv3TdvSKkQUOX4xAyQL2vFPuwXRBj8aofT9Y4m8xc6DszrT4RL+Wt3Pi96tTZUp82W7b8IiSQ4rDIVCKQK7FM42W1zJu+TVuGR1d6X6MMnNghN1o3xP93FNr8uI9K5U963Sg6U2HjjCE+GoEKhewW4871q1CRxLgWxLgnlli5sBQO5ibVpNr+bRMyf+iw3jYYToP+snv2mRyaqiBw5etKuD6lZ0ev7dbH8O94MYtpWynT73rqjvx4dAE9kwXjP6U6YKejmk62p0n8Xu5mtlnl3FP0Lp7K0aJb3Pi97WTiCLXrbM48fTZSbrYzZ617gi7Y+wUo+T/zZX4kNHyYqPFDSv2KSXmjJK/KFTczlL5T+6StU0mHtLFodikDwG3miWzlnwd3zqzmEyho0/ZnWMn9xEeYe6SJ/L/8JINjzvFnl/9V8ypiaeEGeGjrXVnOuxs67Rcyw+7S5Irnuz3PcjURawpcVFndbQt8mGjLX14396ZLqjjf3SrXA6lrXppV7Zd6Zbk0P+989KytPXw8CK8yxq7X4J7V+0bOj4dq4tBvqTBoEjltE1Pvk+XYcFmXQrY7a17ZUn0xtGuSS+KTMefm0smntxlsdisS4HOdEEtL2Gsqs9YNfy2ELcstKM/7jIkwtnMbpFHu4Fl+OA+B1PD6uZ+jabijHCiupya2nOPPcr9OjepuL7M/pMl8gu72+O/Vk4twziK+xHUeWeJFkWZbcmxyh1LO+8z4S2mezr1nqAXXyEIyw3CMr3dQ5x2x4ZfCWMYL6+W+c74qUaLy8tsy+XHyhP5Hy6BL6/W/h/JrX7pVsFcbs3f/Rkjs7Z4i/+R3EUNcy0/QmD7E9jL2nKB6X1ddIIeN3FPkXcWwarLL0UVX2Z3RpM9VoPNVxFwry4vtPzMsv7E7dGSblWW4h76FdGFNPqDUqB9Cpqm1EWJb9ttsVhljOOjPgTcQ2PuOYr69RtxM29r7KNB19hlQcsXGy1uqV97e/ujpbwkS4k5G+pLhtw8ZKPkNQS2Zx1JCZO147fbczbeZY2xjY97FOisi5FEH6ttn1HiVtZ06LFRu9jcbp08IdPyi7Vt96b8KKlhOd2zb65fdxEGfm2SJfJfCGjfTv7xZbtnxp/oV6TWpzYmjf62/n1GXG63TR1THzU/SmI3bzzMpPHrjJYL9Y8Bz8a1EScO87Pxc/yI0i5r4dZMHtoc5RE3Dp2tu87snuXgYbAuO0Afm9nZycgoMd+EeMy1OK+PKrJLFwI2HX+U0eL7TYgDytjd2Gl0/K2grgKYVPwFwdFtcNR8u1RcP59Ez+5i7GKTAQSatX68KHgocIDGXmNXu23qyFzLd5u6PATKj7CBnxtwM3rWaHZ/Ps60/CoJQM1P7F106kJLbWeiB/sTmfWsiVtTvGmDvVuJsJ6a/pRqLp38Tbd0M2Np88fSXMmP+hOZq9TEzQdv2mBGB1vewaLdRstXBnXZapWYHvVHnYV+ukjI6hWn4gZ333rUNqF/v3veolDxp+vV9svHC/6+Zvu4B2jPPfYo7+N5z7QWAmLNgKjrgM/0vtL7qHuhSBPjxc7EY6VjBXrAXMlNZa8G2cSYrHOZg7gNkCfRB+rcCJRtheRMyTzTrTfZ6bE7BzrGVlZt417GU9eEcJVy5e3Wb1eGFuCB7Rb5MJZUX2H8WiVO69K3skT+s/dh6554rAs45eiys6Tip7YdPd774KxpBZt6n9dd7aspqbfFstObDjU6fnVTZowwBu8fg92S6d4G5mLFjBK30uj7G73uFp23921v3Wux/fizXAG7ed0hjX1VbNJ6bblaHG1RwG7fMGFS+c26jy+Ub+m5QFy12H5e/unWt6bBlzZ4nf9b3DCvW8/1MhAbVKkm95lct85qELV3RXWrcbo3zxklDONuncfa/WWzW4+5u3eBuFghOyNiAnF/Y9fVotDRrG1PPWCx3fizOgF74dh4XeNkrXLlSnyiOjmOvCgwl8a/bhLx87Xai8+rH5vdlZvFdvPuT/eyEIKs+iBbpQ1ud1PO3GVn74KvoRVySyuv0l4DL0Ayyu8O4p5mQ+LKrb6aq+jcUbY33z342G519OiGhFTvxZxLJp5MkAweJKMwzJT8mr0wWt97q7LHKAXcOuGjaO9SvlNF3xulDd/du0BnuqASvyyl/Rvw5H3dHHbPRk/qvVUbskc+2zqtbuCUR2ZZu/UG95rZhoRRUMU0afzyxsaoEr8MqrEaUlmbTDykSOOdjY0rjxMLd45sSBj1Xkw7E/8qQVejKwBM7+s9iEvew80Nbm6fEQXrRpQcMF0ezq3iaVJxhlHytubGV43G0iElJe4c2WUTNm8z965wgq0eQevuB9rpsbs1L4rCKnGu4w82uc/YnSc+KKwWa1Zt3WqNRotvNDnGfCq73THxyGZFUA+ltWnr4T41ViProsTV+cz46T00G5tWKNCstwDeMbnlrYAVBk+Xh7ZnrTsi09FbmS54x/gte4y3qTixy2Zr3mbuciBBVl2QMb2veX2m6W/OdG+sa556mCW2aetUo+UlZZ/0ON7iOUEUbu0Gr6OP+aiLjV3qn7ebdvQK3t7XvK5ltLy0yQPkQhr9QfPUwy2xPe+Ue+RanN3kmGts2ZW8wvvIc3ODG9tAQ3rQo8z6Z1p+0W6dPMH7wPK0gkbL28uMl6EfS8m/8bRpvK5WZ7qgltcNPR4aOIaWZeBe5OR1ULnKZVq8oyzQwI+TuWVAmd7X3C7lFm9pegxnafS25rZA2CW3W487ttBie9NjsCnld+dG7yNuPpXPa0qDNLec4sdWycd6H0yeV9Bu2/CI5sbgnltceSr+0/Nm8rp6+6cL8hK3UfdFt+iX18HkKueechw1ZLjfL4pcy3fbbVNHeh9IAVTQJXFNj+UikSqApvK+ilZPbjCp2NX0eKxz+e3M1PHeB5KrYNMfbKpnEImr8lT8VhABFEgl83b0O/WMtR4eYE3lNwNpLu+raTdvPCxL5GajZN74uKzfswiXeB9AixXMU/l+AqiHQXSNYC1U/Gm7beqYRV/+9EPA6Pilze8n0ZV+tAa1WBSwO8ZOMUr+sPmxObwxeFCLLIneuejr/Z95Ej9rUDD2l9YoeRPTrPztLkZHf+9BnGe8XdK/GHXvrc+T6AMexGct3qjpXtnsX5SsUCN3j9pocQvB038GyvS+FYLLo3/OVfTvPvQROx3f16NmoSpLBPKd8VONkr/wIU6rq4O4yt1eWcLq/3/ybuq+T/4L7j6cnd50qP9REnYN3a2d6galvuPzDr+o7PYNE2G3pN+1t+cff79Cya0+xGoVdcja4i1+R8hBajenxW9Ugd3wY36HtdUPEkye/lOmxP80PF47ycDumfEnetpEVGuJwEI7fgFXdntPnN0MiyWMYfynuy/IutPdBoub3ifOZnpfGH1jsZZGyR/5kAAEMb95sdEC/9NesP64TIvP+xC3ZdShUFEabMgYLV9ZBnKzjxFdmc+2Tgs2SAKuuHvIs9mxuy/BfWXAzRhc1d39bNNuvcpoueBJ/N7httaw6hXUw3/Le4J7kvT/JwE3DgvTt+8pUjlt05Pvs9yNv/sv4N4K5ks8Z4n8Z/9bjBouF7Dp+KOMFt/3JY6HXw/xjeBf0ObWqx8+7L5fHiPL3EZbZnHDvG49d3mH4u/hCFg99dDRxlh5fSTX8QfDaTlqulTAnnvsUXtms4jCl3geVj1yLZ+21CrI/7Zb5NEmFdcPC7Xp31Ok8U6bTDwkyGCg0vsE7M6xk5sey4vldy+U2Vcx/iNIgTk18RSj5BWLMRH6n26cDzIQDlZpo+XfhR4QRke73X0zFk05WISE92/5zPjpvvSJTMuvhteC1Hi5gFsPokjF+b7Edd/1UDK3+qTWcp9g/+4uExkVX9Y36BpL5db+e1P5TeZKBxv+B634QiJeWPu47b7fXXrQSvKPQQrsiW1xs0fx3dOt5lzL9wTZ8KtVOlcTzwgvIESRJdGZ9qx1R6xmw2fhCZh29Bp/+kO0O7wWpMarCdgdG34lS+V/+xPj3T5TE11pt7futZpNsJ8FtprUpbtn5cZgG5uKryqQpfJffRocrZ6656oV5sPgBDprwbSjVxgl5n2K9dXqkiu5KbiG7rbCe558FjesBujDZ7mWH2ZA7DYqwtwuV/KjPsT6Yh1sKk4MsyWp9VoCbnVTo+R3F2PF1z8LLbasZRH85168A33Fe6PihvlUPi/4RgZgTYFCiwt9GgitFo9bs9JsB7cuvAAADvhJREFUEKyAW/eiMyVcCeNT3O+vi7icNV26DG83b3g/XLf3Vuq9XaGltjtPfFCXBGwWuIDR8js+9QGX2AfepFS/CwG3Mp5JxM99in2jhOF9GF00/uImnVkBWnzDkyC43ejWy4Jf8WmxcfmzKwGj5DWexP/eJ6Tjl3ZVcTYKXsBOj987V+IT3sS/kn8TfKP2CmC3rn9g8zPB+Ft2djLqte5sH7ZAZy11zy6FuldYh92q1L5XAffAXNMXictTcU6v9Wb7vQJ2x8QjjRK3Ni4TVDLPkuiNdtfU4TQmAr0K2B1j929czK/43MueW3NuOdheHdgegc50QS0+28T+4J7jsdNjd6YVBxBwDw81KglIxU/tjtYTBqgyuwYuYJWUTRzwVitzoeJPB96sVL9PAXf71OyZLji3WozV6bNMRV9yL7vrs8rstlRgLpl4cmep3DV+ZVQdALmKzqXRl7Yc/92PQGfd9JrHeq99LVPif/qxYB8EFgXshWPjRomLeo298rcX32Cxn8VWG9Kfu2ejJ9X21cFKXpO3W789pKryNYELzKuJ55c/aI14Fo2SPwy8Wan+EATcqqlZGr3NPVlfxz7Suey/RR49hKryFcsFOhmglpfWqeELFbfdA4vLy8rfEehXwOjor+oU40Mpi5I39evBfggsF7DJxGOMFj8eSmwO6Wpbkcppt57B8rLy9yEK2JnowVkiv1B5w7uHE1XrJUzvG2Lj8lUdgawt3lJ5fA9pUFxaDzt96l1pYgSGJeBeJZ9rcd7SGKvkv5XM3bs7OBcMq2XX+B43TcpNK6rqMlCWiK+wtOkajcTHfQu4paIrGchGcNJfWg/3RHffKOyIwAoCeRI/y2h53dJYK+2/lbjaPaO2QtH451EK7Hk4sNTLQJnR0d+7BGSU9eK7wxYodDRb2gA24pP+0nrYnWMnh92y1H5UAm6VVbfa6tJ4G/V/u6sPdjq+76jqxPd2IWC3TR2ZJfJfRv9GKfEDBrAuGoRNBhYwOv76qAevKr4/nxk/fWAcvgCBFQT2TRfU0e4Rx/clc+nkb65QDP65CgH3JsFci7ONux8z5F81nel902N3q6JeHDM8AaPkFcOO4Tp830ISvyi81qTGZQtYPblhJEm0W5673XqVm4lQdp04XpcC7t783nep3zj4oCe+n8+2Tuvy0GyGwMACnV8xvr4fvR29ZmAgvgCBLgTcCnxZu/UGo8UtQzgPfGOhHf2xu9rcxaHZpA4C7oVC80n07FzHHzdK3tRDECwUiVTu7WV287pD6lAXyhCOgHsRSg+xuvdFOyOewz+kK2pZEp0ZTktS0zoIdPpTGr/OaPH9nvqVir6X6dab3HL0dagHZRhAwD20Z7fFwl2CzLR4h3t4w53k3UMjhRKJu8RvtPy7XE08w+qpew5wKHZFYCCBPZcvm3FC72lA1dLmSfSxgXDYGYEBBOyF0Xr3S949M1ak4vzO+O/OAVps67yCvh2/Pp+Nns66LgMgsysCCPQvsHtWbuz1xNqU7d0qaf3LsCcCCCCAAAIeC8yn4veackLvo5zf8bjpqBoCCCCAAAL9C5g0fnkfJ9amPAtwbf8y7IkAAggggIDHAlkSvdHfBEAUdtfU4R43H1VDAAEEEECgP4E8le/3NwGQ1ranHtCfDHshgAACCCDgsUCh5FavEwAlpcfNR9UQQAABBBDoTyBT4ss+JwBzauIp/cmwFwIIIIAAAh4LmFT81OcEYKEtft/j5qNqCCCAAAII9CdglLzN5wTA6Oiv+pNhLwQQQAABBDwVsFuPubvfJ39pMx291dPmo1oIIIAAAgj0J2Bnpo73PQHItfxwfzrshQACCCCAgKcCNpl4jO8JQKHitqfNR7UQQAABBBDoT8C9jMr3BMBo8Y3+dNgLAQQQQAABTwWMar3E+wRAySs8bT6qhQACCCCAQH8Cph2/3vsEQMvMbl53SH9C7IUAAggggICHArmW7w4gAbA2Pfk+HjYfVUIAAQQQQKA/gSKRnwwiAZiJx/oTYi8EEEAAAQQ8FMh0/LkQEoDds3Kjh81HlRBAAAEEEOhPwGjxgxASgPlU/F5/QuyFAAIIIICAhwJGixtCSABMGr/cw+ajSggggAACCPQuYM9ad4TRogghAciS6I29C7EHAggggAACHgrYZOIhIZz8XR3zVL7fwyakSggggAACCPQuYHdMPDKUBKBI4wt6F2IPBBBAAAEEPBTItXxaKAlApsSXPWxCqoQAAggggEDvAgu69UehJAAmFT/tXYg9EEAAAQQQ8FDA6PjVwSQAWt7uYRNSJQQQQAABBHoXyLR4R0AJgLVbj7l770rsgQACCCCAgGcCuZYfCSoBmJk63rMmpDoIIIAAAgj0LlCoKA0qAUgmHtO7EnsggAACCCDgmYBR4tshJQC5mniGZ01IdRBAAAEEEOhdwChxdUgJgGmLP+ldiT0QQAABBBDwSMBObzrUKJmHlQDEr/eoCakKAggggAACvQvYrccdG9TJ3y0HrOW7e5diDwQQQAABBDwSsLOTUWgJQJHIT3rUhFQFAQQQQACB3gXm0vjXQ0sAMh1/rncp9kAAAQQQQMAjgflUPi+0BMBo8QOPmpCqIIAAAggg0LuAScVfhJcAyBt7l2IPBBBAAAEEPBLI0vjNASYA1p6z8S4eNSNVQQABBBBAoDeBPBXnBJkAJBMP6U2KrRFAAAEEEPBIoEjkTJAJwI6JR3rUjFQFAQQQQACB3gRMKnaFmADkWj6tNym2RgABBBBAwCMBk4ifh5gALOjWH3nUjFQFAQQQQACB7gWsXXcno8RciAmA0fGru5diSwQQQAABBDwSsNtb9wrz5C9tlkTv9KgpqQoCCCCAAALdC9hk6qRQE4Bcy490L8WWCCCAAAIIeCRgd7SeEGoCUKgo9agpqQoCCCCAAALdC+RKbgo1ATBKfLt7KbZEAAEEEEDAIwGjWy8LOAG42qOmpCoIIIAAAgh0L5C1W28IOAEwdvPGw7rXYksEEEAAAQQ8Eci1ODvYBEBLa7ced6wnTUk1EEAAAQQQ6F6g0GJL0AnA7GTUvRZbIoAAAggg4IlApuUXQ04A5tL41z1pSqqBAAIIIIBA9wJGix+HnADMp/J53WuxJQIIIIAAAp4IGCVuDTkBMKn4C0+akmoggAACCCDQnYDdNnVk0Cd/LW2Wxm/uToutEEAAAQQQ8ETAXrD+uNATgDwV53jSnFQDAQQQQACB7gSsjh4degJQJHKmOy22QgABBBBAwBOBvN367dATAJOKXZ40J9VAAAEEEECgO4EFLV8cfAKQiJ93p8VWCCCAAAIIeCJgktZrg08AlJi3dt2dPGlSqoEAAggggMDaArmK3xV8AuCWA97eutfaWmyBAAIIIICAJwK5Ep8gAZDWJlMnedKkVAMBBBBAAIG1BTIl/4sEQFq7o/WEtbXYAgEEEEAAAU8EjIq+RwIgba7kJk+alGoggAACCCCwtoBR4pckANIa3XrZ2lpsgQACCCCAgAcCdtfU4UaLggRA2qzdeoMHTUoVEEAAAQQQWFvA7jzxQZz83a9/aXMtzl5bjC0QQAABBBDwQMDujCZJAPYkAIWWn/GgSakCAggggAACawvkO+OnkgDsSQAyLb+4thhbIIAAAggg4IHAQhr9AQnAngTAaPFjD5qUKiCAAAIIILC2gFHyb0gA9iYASty6thhbIIAAAggg4IFAlkZvIwFYvAIgrT332KM8aFaqgAACCCCAwOoCeSr+kwRgSQJwwfrjVhfjUwQQQAABBDwQKBKpSACWJAA6erQHzUoVEEAAAQQQWF3AaHkxCcD+BCBvt357dTE+RQABBBBAwAMBo6MrSQD2JwAmFWd40KxUAQEEEEAAgZUF7OZ1hxgtMxKAJQlA0nrtymJ8ggACCCCAgAcCdjq+Lyf/JSd/txywit/lQdNSBQQQQAABBFYWsNs3TJAALE8AxCdWFuMTBBBAAAEEPBDYPTP+RBKAAxOATMn/8qBpqQICCCCAAAIrC8zPxs8hATgwATAq+t7KYnyCAAIIIICABwJGy1eSACxLAFJxvQdNSxUQQAABBBBYWSBL5D+TACxLALQo7PTYnVdW4xMEEEAAAQQaLpDr+IMkAMsTAGntzhMf1PCmpfgIIIAAAgisLJAn0cdIAA6SAFwYrV9ZjU8QQAABBBBouECu5XtIAA6SAGybOqbhTUvxEUAAAQQQWFkgS+RmEoBlCYCSuZ3edOjKanyCAAIIIIBAwwXci29IAJYlAFpe3PBmpfgIIIAAAgisLmDPP/5+RouCJGB/EpBrcfbqanyKAAIIIICABwKZll8kATggAXimB81KFRBAAAEEEFhdwKjWS0gA9iUA19mz1h2xuhifIoAAAggg4IGA3XrM3Y2W15IESJvp6K0eNClVQAABBBBAoDsBk7T+nARA3OyeiehOjK0QQAABBBDwQMCes/Eu7iU4QScBafS3HjQlVUAAAQQQQKA3AbszmjRaLoSYBGRKfs3umjq8NzG2RgABBBBAwBMBk8i/Di4BUPImu3XyBE+akGoggAACCCDQn0Cein8LKAlYmFMTT+lPir0QQAABBBDwSMBu3nhYkcpp75MAJfP52fg5HjUdVUEAAQQQQGAwAbcWfp5E7/M2CVBiLldy02BK7I0AAggggICHAtauu5PR8u+MkrlfiYC4ymrxOA+bjCohgAACCCAwPIHds9GTjBJX+5AEFGm807anHjA8Hb4JAQQQQAABjwXstqljchWd29wkQNzsFjuym9cd4nEzUTUEEEAAAQRGIzCXTDzZaHlxcxIBUeRKftRuXf/A0YjwrQgggAACCAQi4H5Fz+vWc42SP6xvIiCKQsWftrOTUSDNQjURQAABBBAoR8AlAnkqfqtQIjFaFPVIBsQNWRKdafXkhnIUOAoCCCCAAAIBC9iZqeNNO3qNSeU3S08ElLzN/dp3VyXstqkjA24Gqo4AAggggEB1Am5ZXaNaL8l1/HGjxVVDTwiUzN3a/Vk7fns+Gz2dk351bc2REUAAAQQQWFHAzkQPzmdbpxkdvzpPxTmFitsmEf9rtLx2xTUGlLzNaHlplsgvFKk4P0ujty0k4oU2HX+UPffYo1Y8GB8ggEAjBf4fDKog0ZueaEoAAAAASUVORK5CYII="
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/walmart-shop/wm-assets.js", error: String((e && e.message) || e) }); }

})();
