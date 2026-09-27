"use client";

import QueryProvider from "./QueryProvider";
import { ThemeProvider } from "./ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { KeyboardShortcutsHelp } from "@/components/layout/KeyboardShortcutsHelp";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const { showHelp, setShowHelp, shortcuts } = useKeyboardShortcuts();

  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem={true}
        disableTransitionOnChange
      >
        <TooltipProvider delayDuration={300}>
          {children}
          <KeyboardShortcutsHelp
            open={showHelp}
            onOpenChange={setShowHelp}
            shortcuts={shortcuts}
          />
        </TooltipProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
