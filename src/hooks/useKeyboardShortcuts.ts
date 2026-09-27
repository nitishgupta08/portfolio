"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { isFeatureEnabled } from "@/lib/features";

interface Shortcut {
  key: string;
  description: string;
  action: () => string | void;
}

export function useKeyboardShortcuts() {
  const router = useRouter();
  const [showHelp, setShowHelp] = useState(false);
  const [lastPressed, setLastPressed] = useState<string[]>([]);

  const navigate = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );

  const shortcuts: Shortcut[] = [
    { key: "g h", description: "Go home", action: () => navigate("/") },
    ...(isFeatureEnabled("notes")
      ? [{ key: "g b", description: "Go to notes", action: () => navigate("/notes") } as Shortcut]
      : []),
    ...(isFeatureEnabled("projects")
      ? [{ key: "g p", description: "Go to projects", action: () => navigate("/projects") } as Shortcut]
      : []),
    ...(isFeatureEnabled("gallery")
      ? [{ key: "g g", description: "Go to gallery", action: () => navigate("/gallery") } as Shortcut]
      : []),
    ...(isFeatureEnabled("listening")
      ? [{ key: "g l", description: "Go to listening", action: () => navigate("/listening") } as Shortcut]
      : []),
    { key: "t", description: "Cycle theme", action: () => cycleTheme() },
    { key: "?", description: "Show keyboard shortcuts", action: () => setShowHelp((prev) => !prev) },
  ];

  const cycleTheme = useCallback(() => {
    const themes = ["ink", "forest", "ember", "rose", "violet", "teal", "mono", "cocoa"];
    const current = document.documentElement.getAttribute("data-color-theme") || "ink";
    const currentIndex = themes.indexOf(current);
    const nextIndex = (currentIndex + 1) % themes.length;
    const next = themes[nextIndex];
    document.documentElement.setAttribute("data-color-theme", next);
    try {
      localStorage.setItem("site-color-theme", next);
    } catch { /* private mode */ }
  }, []);

  useEffect(() => {
    const KONAMI_CODE = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
      "b", "a",
    ];
    let konamiIndex = 0;

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }

      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;

      setLastPressed((prev) => {
        const next = [...prev, key].slice(-10);
        return next;
      });

      if (konamiIndex < KONAMI_CODE.length && key === KONAMI_CODE[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === KONAMI_CODE.length) {
          triggerKonamiEasterEgg();
          konamiIndex = 0;
        }
      } else {
        konamiIndex = key === KONAMI_CODE[0] ? 1 : 0;
      }

      if (key === "g") {
        return;
      }

      if (key === "?") {
        event.preventDefault();
        setShowHelp((prev) => !prev);
        return;
      }

      if (key === "t") {
        event.preventDefault();
        cycleTheme();
        return;
      }

      if (lastPressed.length > 0) {
        const lastKey = lastPressed[lastPressed.length - 1];
        const enabledKeys = [
          "h",
          ...(isFeatureEnabled("notes") ? ["b"] : []),
          ...(isFeatureEnabled("projects") ? ["p"] : []),
          ...(isFeatureEnabled("gallery") ? ["g"] : []),
          ...(isFeatureEnabled("listening") ? ["l"] : []),
        ];
        if (lastKey === "g" && enabledKeys.includes(key)) {
          event.preventDefault();
          const routeMap: Record<string, string> = {
            h: "/",
            ...(isFeatureEnabled("notes") ? { b: "/notes" } : {}),
            ...(isFeatureEnabled("projects") ? { p: "/projects" } : {}),
            ...(isFeatureEnabled("gallery") ? { g: "/gallery" } : {}),
            ...(isFeatureEnabled("listening") ? { l: "/listening" } : {}),
          };
          const path = routeMap[key];
          if (path) {
            router.push(path);
          }
          return;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lastPressed, cycleTheme, router]);

  return { showHelp, setShowHelp, shortcuts };
}

function triggerKonamiEasterEgg() {
  import("canvas-confetti").then(({ default: confetti }) => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  });

  const themes = ["ink", "forest", "ember", "rose", "violet", "teal", "mono", "cocoa"];
  const randomTheme = themes[Math.floor(Math.random() * themes.length)];
  document.documentElement.setAttribute("data-color-theme", randomTheme);
  try {
    localStorage.setItem("site-color-theme", randomTheme);
  } catch { /* private mode */ }

  const toast = document.createElement("div");
  toast.textContent = "🎉 Konami code activated! Secret theme applied.";
  toast.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--primary);
    color: var(--primary-foreground);
    padding: 1rem 2rem;
    border-radius: 0.75rem;
    font-weight: 600;
    z-index: 9999;
    animation: fadeOut 3s forwards;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
