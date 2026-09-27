import {
  CURATED_THEME_KEYS,
  FONT_THEME_KEYS,
  COLOR_STORAGE_KEY,
  FONT_STORAGE_KEY,
} from "@/lib/theme/curatedThemes";

// Runs before paint: applies the visitor's saved palette/font when present,
// otherwise picks randomly (the site's signature surprise). Dark/light first
// honors next-themes' stored mode, then the OS preference — matching the
// ThemeProvider (defaultTheme="system") so nothing flashes on hydrate.
const themeSeedScript = `(function(){
  try {
    var root = document.documentElement;

    var savedColor = null;
    var savedFont = null;
    try {
      savedColor = window.localStorage.getItem(${JSON.stringify(COLOR_STORAGE_KEY)});
      savedFont = window.localStorage.getItem(${JSON.stringify(FONT_STORAGE_KEY)});
    } catch (_) {}

    var themeKeys = ${JSON.stringify(CURATED_THEME_KEYS)};
    var colorKey = themeKeys.indexOf(savedColor) !== -1
      ? savedColor
      : themeKeys[Math.floor(Math.random() * themeKeys.length)];
    root.setAttribute("data-color-theme", colorKey);

    var fontKeys = ${JSON.stringify(FONT_THEME_KEYS)};
    var fontKey = fontKeys.indexOf(savedFont) !== -1
      ? savedFont
      : fontKeys[Math.floor(Math.random() * fontKeys.length)];
    root.setAttribute("data-font-theme", fontKey);

    var storedMode = null;
    try {
      storedMode = window.localStorage.getItem("theme");
    } catch (_) {}
    var isDark = storedMode === "dark"
      ? true
      : storedMode === "light"
        ? false
        : window.matchMedia
          ? window.matchMedia("(prefers-color-scheme: dark)").matches
          : false;
    if (isDark) {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
  } catch (_) {}
})();`;

export default function ThemeSeedScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeSeedScript }} />;
}
