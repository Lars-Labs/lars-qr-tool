const themes = {
  dark: { bgColor: "#0d1117", cardBg: "#010409", textColor: "#c9d1d9", accentColor: "#58a6ff", borderColor: "#21262d", placeholderColor: "#8b949e", primaryButton: "#238636", secondaryButton: "#21262d", navBg: "#010409", navText: "#8b949e", inputBg: "#010409" },
  darkgrey: { bgColor: "#161b22", cardBg: "#0d1117", textColor: "#f0f6fc", accentColor: "#58a6ff", borderColor: "#30363d", placeholderColor: "#8b949e", primaryButton: "#238636", secondaryButton: "#21262d", navBg: "#0d1117", navText: "#8b949e", inputBg: "#0d1117" },
  grey: { bgColor: "#24292e", cardBg: "#1f2428", textColor: "#ffffff", accentColor: "#79c0ff", borderColor: "#444d56", placeholderColor: "#959da5", primaryButton: "#2ea043", secondaryButton: "#30363d", navBg: "#1f2428", navText: "#959da5", inputBg: "#24292e" },
  light: { bgColor: "#ffffff", cardBg: "#f6f8fa", textColor: "#24292f", accentColor: "#0969da", borderColor: "#d0d7de", placeholderColor: "#6e7781", primaryButton: "#238636", secondaryButton: "#e6ebf1", navBg: "#f6f8fa", navText: "#57606a", inputBg: "#ffffff" }
};

const translations = {
  en: { scanner: "QR SCANNER", generator: "QR GENERATOR", history: "SCAN HISTORY", scan: "Scan", create: "Create", historyNav: "History", settings: "Settings", theme: "Theme", language: "Language", close: "Close", appTitle: "Lars QR Tool" },
  es: { scanner: "ESCÁNER QR", generator: "GENERADOR QR", history: "HISTORIAL", scan: "Escanear", create: "Crear", historyNav: "Historial", settings: "Ajustes", theme: "Tema", language: "Idioma", close: "Cerrar", appTitle: "Herramienta QR Lars" },
  fr: { scanner: "SCANNER QR", generator: "GÉNÉRATEUR QR", history: "HISTORIQUE", scan: "Scanner", create: "Créer", historyNav: "Historique", settings: "Paramètres", theme: "Thème", language: "Langue", close: "Fermer", appTitle: "Outil QR Lars" },
  de: { scanner: "QR-SCANNER", generator: "QR-GENERATOR", history: "VERLAUF", scan: "Scannen", create: "Erstellen", historyNav: "Verlauf", settings: "Einstellungen", theme: "Design", language: "Sprache", close: "Schließen", appTitle: "Lars QR Tool" },
  zh: { scanner: "二维码扫描", generator: "二维码生成", history: "扫描历史", scan: "扫描", create: "生成", historyNav: "历史", settings: "设置", theme: "主题", language: "语言", close: "关闭", appTitle: "Lars QR 工具" }
};

const translations = {
  en: { 
    scanner: "QR SCANNER", 
    generator: "QR GENERATOR", 
    history: "SCAN HISTORY",
    // ... other keys
  },
  // other languages...
};

function getCurrentLang() { return localStorage.getItem("qrLang") || "en"; }
function t(key) { const lang = getCurrentLang(); return translations[lang]?.[key] || translations.en[key] || key; }

function applyThemeAndLang() {
  const mode = localStorage.getItem("qrThemeMode") || "dark";
  const theme = themes[mode];
  Object.entries(theme).forEach(([k, v]) => document.documentElement.style.setProperty(`--${k.replace(/([A-Z])/g, '-$1').toLowerCase()}`, v));
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme.bgColor);
  document.querySelectorAll("[data-t]").forEach(el => el.textContent = t(el.getAttribute("data-t")));

  const opts = JSON.parse(localStorage.getItem("qrOptions") || "{}");
  document.getElementById("themeSelect") && (document.getElementById("themeSelect").value = mode);
  document.getElementById("langSelect") && (document.getElementById("langSelect").value = getCurrentLang());
  document.getElementById("vibrateToggle") && (document.getElementById("vibrateToggle").checked = opts.vibrate !== false);
  document.getElementById("beepToggle") && (document.getElementById("beepToggle").checked = opts.beep !== false);
  document.getElementById("continuousToggle") && (document.getElementById("continuousToggle").checked = !!opts.continuous);
}

function saveTheme(mode) { localStorage.setItem("qrThemeMode", mode); applyThemeAndLang(); }
function saveLang(lang) { localStorage.setItem("qrLang", lang); applyThemeAndLang(); }
function saveOption(key, value) {
  const opts = JSON.parse(localStorage.getItem("qrOptions") || "{}");
  opts[key] = value;
  localStorage.setItem("qrOptions", JSON.stringify(opts));
  applyThemeAndLang();
}


document.addEventListener("DOMContentLoaded", applyThemeAndLang);

// theme.js - Theme management for Lars QR Tool

const themes = {
  dark: {
    '--bg-color': '#0d1117',
    '--card-bg': '#010409',
    '--text-color': '#c9d1d9',
    '--border-color': '#21262d',
    '--placeholder-color': '#8b949e',
    '--input-bg': '#010409',
    '--nav-bg': '#010409',
    '--nav-text': '#8b949e'
  },
  darkgrey: {
    '--bg-color': '#161b22',
    '--card-bg': '#0d1117',
    '--text-color': '#f0f6fc',
    '--border-color': '#30363d',
    '--placeholder-color': '#8b949e',
    '--input-bg': '#0d1117',
    '--nav-bg': '#0d1117',
    '--nav-text': '#8b949e'
  },
  grey: {
    '--bg-color': '#24292f',
    '--card-bg': '#161b22',
    '--text-color': '#f0f6fc',
    '--border-color': '#444d56',
    '--placeholder-color': '#6e7681',
    '--input-bg': '#161b22',
    '--nav-bg': '#161b22',
    '--nav-text': '#8b949e'
  },
  light: {
    '--bg-color': '#ffffff',
    '--card-bg': '#f6f8fa',
    '--text-color': '#24292f',
    '--border-color': '#d0d7de',
    '--placeholder-color': '#6e7781',
    '--input-bg': '#ffffff',
    '--nav-bg': '#f6f8fa',
    '--nav-text': '#57606a'
  }
};

function applyTheme(themeName) {
  const theme = themes[themeName] || themes.dark;
  Object.keys(theme).forEach(key => {
    document.documentElement.style.setProperty(key, theme[key]);
  });
  localStorage.setItem("theme", themeName);
  // Update select if exists
  const select = document.getElementById("themeSelect");
  if (select) select.value = themeName;
}

function saveTheme(themeName) {
  applyTheme(themeName);
}

// Load saved theme on start
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(savedTheme);
  
  // Sync select if on settings page
  const select = document.getElementById("themeSelect");
  if (select) {
    select.value = savedTheme;
    select.addEventListener("change", e => saveTheme(e.target.value));
  }
});
