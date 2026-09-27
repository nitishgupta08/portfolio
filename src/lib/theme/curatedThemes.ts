export const CURATED_THEME_KEYS = [
  "ink",
  "forest",
  "ember",
  "rose",
  "violet",
  "teal",
  "mono",
  "cocoa",
] as const;

export type CuratedThemeKey = (typeof CURATED_THEME_KEYS)[number];

export const DEFAULT_THEME_KEY: CuratedThemeKey = "ink";

export interface ThemeMeta {
  key: CuratedThemeKey;
  label: string;
  /** Preview swatches sampled from the palette's oklch tokens in global.css. */
  swatch: { bg: string; primary: string };
}

export const THEME_META: ThemeMeta[] = [
  { key: "ink", label: "Ink", swatch: { bg: "oklch(0.99 0.004 260)", primary: "oklch(0.46 0.12 252)" } },
  { key: "forest", label: "Forest", swatch: { bg: "oklch(0.992 0.01 150)", primary: "oklch(0.48 0.1 156)" } },
  { key: "ember", label: "Ember", swatch: { bg: "oklch(0.993 0.008 35)", primary: "oklch(0.53 0.14 30)" } },
  { key: "rose", label: "Rose", swatch: { bg: "oklch(0.998 0.008 10)", primary: "oklch(0.5 0.11 12)" } },
  { key: "violet", label: "Violet", swatch: { bg: "oklch(0.99 0.01 300)", primary: "oklch(0.5 0.16 300)" } },
  { key: "teal", label: "Teal", swatch: { bg: "oklch(0.99 0.01 195)", primary: "oklch(0.48 0.11 195)" } },
  { key: "mono", label: "Mono", swatch: { bg: "oklch(0.99 0 0)", primary: "oklch(0.45 0 0)" } },
  { key: "cocoa", label: "Cocoa", swatch: { bg: "oklch(0.99 0.012 60)", primary: "oklch(0.48 0.1 60)" } },
];

export const FONT_THEME_KEYS = ["font-a", "font-b", "font-c", "font-d", "font-e", "font-f"] as const;

export type FontThemeKey = (typeof FONT_THEME_KEYS)[number];

export const DEFAULT_FONT_KEY: FontThemeKey = "font-a";

export interface FontMeta {
  key: FontThemeKey;
  label: string;
  stack: string;
}

export const FONT_META: FontMeta[] = [
  { key: "font-a", label: "Sans", stack: '"Avenir Next", "Segoe UI", "Helvetica Neue", Arial, sans-serif' },
  { key: "font-b", label: "Serif", stack: 'Georgia, "Times New Roman", serif' },
  { key: "font-c", label: "Humanist", stack: '"Trebuchet MS", "Segoe UI", Tahoma, sans-serif' },
  { key: "font-d", label: "Screen", stack: 'Verdana, Geneva, sans-serif' },
  { key: "font-e", label: "System", stack: 'system-ui, -apple-system, "Segoe UI", sans-serif' },
  { key: "font-f", label: "Terminal", stack: '"IBM Plex Mono", "JetBrains Mono", ui-monospace, Menlo, monospace' },
];

export const COLOR_STORAGE_KEY = "site-color-theme";
export const FONT_STORAGE_KEY = "site-font-theme";
