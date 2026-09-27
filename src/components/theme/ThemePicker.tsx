"use client";

import { useEffect, useState } from "react";
import { Moon, Palette, Shuffle, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  CURATED_THEME_KEYS,
  THEME_META,
  FONT_META,
  FONT_THEME_KEYS,
  COLOR_STORAGE_KEY,
  FONT_STORAGE_KEY,
  DEFAULT_THEME_KEY,
  DEFAULT_FONT_KEY,
  type CuratedThemeKey,
  type FontThemeKey,
} from "@/lib/theme/curatedThemes";

function readStored<T extends string>(key: string, valid: readonly string[]): T | null {
  try {
    const value = window.localStorage.getItem(key);
    return value && valid.includes(value) ? (value as T) : null;
  } catch {
    return null;
  }
}

function writeStored(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* private mode */
  }
}

function pickRandomOther<T>(keys: readonly T[], current: T | null): T {
  if (keys.length === 0) {
    throw new Error("pickRandomOther requires at least one key");
  }
  const at = (index: number): T => {
    const value = keys[index];
    if (value === undefined) {
      throw new Error("pickRandomOther index out of bounds");
    }
    return value;
  };
  const randomIndex = () => Math.floor(Math.random() * keys.length);
  if (keys.length === 1 || current === null) {
    return at(randomIndex());
  }
  let next = at(randomIndex());
  while (next === current) {
    next = at(randomIndex());
  }
  return next;
}

function useIsMobile(breakpoint = 640): boolean {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [breakpoint]);
  return isMobile;
}

export function ThemePicker() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState<CuratedThemeKey | null>(null);
  const [font, setFont] = useState<FontThemeKey | null>(null);
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
    // Never leave color/font null: an absent or foreign data-*-theme
    // attribute (e.g. blocked seed script) falls back to defaults instead
    // of rendering the "…" unknown state.
    const colorAttr = document.documentElement.getAttribute("data-color-theme");
    setColor(
      readStored<CuratedThemeKey>(COLOR_STORAGE_KEY, CURATED_THEME_KEYS) ??
        (CURATED_THEME_KEYS.includes(colorAttr as CuratedThemeKey)
          ? (colorAttr as CuratedThemeKey)
          : DEFAULT_THEME_KEY),
    );
    const fontAttr = document.documentElement.getAttribute("data-font-theme");
    setFont(
      readStored<FontThemeKey>(FONT_STORAGE_KEY, FONT_THEME_KEYS) ??
        (FONT_THEME_KEYS.includes(fontAttr as FontThemeKey)
          ? (fontAttr as FontThemeKey)
          : DEFAULT_FONT_KEY),
    );
  }, []);

  const applyColor = (key: CuratedThemeKey) => {
    document.documentElement.setAttribute("data-color-theme", key);
    writeStored(COLOR_STORAGE_KEY, key);
    setColor(key);
  };

  const applyFont = (key: FontThemeKey) => {
    document.documentElement.setAttribute("data-font-theme", key);
    writeStored(FONT_STORAGE_KEY, key);
    setFont(key);
  };

  const shuffle = () => {
    applyColor(pickRandomOther(CURATED_THEME_KEYS, color));
    applyFont(pickRandomOther(FONT_THEME_KEYS, font));
  };

  const activeTheme = THEME_META.find((t) => t.key === color);
  const activeFont = FONT_META.find((f) => f.key === font);

  const modes = [
    { key: "light", label: "Light", icon: Sun },
    { key: "dark", label: "Dark", icon: Moon },
    { key: "system", label: "System", icon: SunMoon },
  ] as const;

  const body = (
    <FieldSet>
      <Field orientation="vertical">
        <ToggleGroup
          type="single"
          value={mounted ? (theme ?? "system") : "system"}
          onValueChange={(value) => {
            if (value === "light" || value === "dark" || value === "system") {
              setTheme(value);
            }
          }}
          variant="outline"
          aria-label="Color mode"
          className="w-full"
        >
          {modes.map(({ key, label, icon: Icon }) => (
            <ToggleGroupItem
              key={key}
              value={key}
              aria-label={`${label} mode`}
              className="h-9 flex-1 gap-1.5"
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </Field>

      <FieldSeparator />

      <Field orientation="vertical">
        <div className="grid grid-cols-2 divide-x divide-border rounded-xl border border-border/80">
          <div className="flex flex-col items-center gap-2 p-4 text-center">
            <span
              className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/60"
              aria-hidden="true"
            >
              <span
                className="h-full w-1/2"
                style={{ backgroundColor: activeTheme?.swatch.bg ?? "transparent" }}
              />
              <span
                className="h-full w-1/2"
                style={{ backgroundColor: activeTheme?.swatch.primary ?? "transparent" }}
              />
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Palette
              </span>
              <span className="block truncate text-sm font-medium">
                {activeTheme?.label ?? "…"}
              </span>
            </span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 text-center">
            <span
              aria-hidden="true"
              className="flex size-12 shrink-0 items-center justify-center rounded-full border border-border/60 bg-card text-xl font-semibold"
              style={{ fontFamily: activeFont?.stack }}
            >
              Ag
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Typeface
              </span>
              <span className="block truncate text-sm font-medium">
                {activeFont?.label ?? "…"}
              </span>
            </span>
          </div>
        </div>
        <Button onClick={shuffle} className="h-10 w-full gap-2">
          <Shuffle className="size-4" aria-hidden="true" />
          Surprise me
        </Button>
      </Field>
    </FieldSet>
  );

  // NOTE: single Radix trigger only — nesting a TooltipTrigger inside the
  // Popover/Sheet trigger swallows the click and the panel never opens.
  const triggerButton = (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Customize site theme"
      title="Customize theme"
      className="relative rounded-[calc(var(--radius)-2px)] border border-border/70 text-muted-foreground hover:bg-accent hover:text-foreground"
    >
      <Palette className="h-4 w-4" />
      {activeTheme ? (
        <span
          aria-hidden="true"
          className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-background"
          style={{ backgroundColor: activeTheme.swatch.primary }}
        />
      ) : null}
    </Button>
  );

  if (!mounted) {
    return triggerButton;
  }

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>{triggerButton}</SheetTrigger>
        <SheetContent
          side="bottom"
          className="max-h-[85dvh] overflow-y-auto rounded-t-2xl px-5 pt-3 pb-8"
        >
          <div
            aria-hidden="true"
            className="mx-auto mb-3 h-1.5 w-12 shrink-0 rounded-full bg-muted"
          />
          <SheetTitle className="sr-only">Site theme</SheetTitle>
          <div className="mt-5 space-y-4">{body}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>
      <PopoverContent align="end" sideOffset={8} className="w-[340px] p-0">
        <PopoverTitle className="sr-only">Site theme</PopoverTitle>
        <div className="space-y-4 p-4">{body}</div>
      </PopoverContent>
    </Popover>
  );
}
