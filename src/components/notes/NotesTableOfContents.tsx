"use client";

import { useEffect, useState } from "react";
import { ListTree } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";

interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

export function NotesTableOfContents({ contentKey }: { contentKey: string }) {
  const [entries, setEntries] = useState<TocEntry[]>([]);

  useEffect(() => {
    const collect = () => {
      const article = document.querySelector("article.notes-md");
      if (!article) {
        setEntries([]);
        return;
      }
      const found: TocEntry[] = [];
      article.querySelectorAll("h2[id], h3[id]").forEach((heading) => {
        found.push({
          id: heading.id,
          text: heading.textContent?.trim() ?? "",
          level: heading.tagName === "H3" ? 3 : 2,
        });
      });
      setEntries(found.filter((entry) => entry.id && entry.text));
    };

    collect();

    // Re-scan when the (dynamically imported) markdown renderer mounts late.
    const article = document.querySelector("article.notes-md");
    if (!article) {
      return;
    }
    const observer = new MutationObserver(collect);
    observer.observe(article, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [contentKey]);

  if (entries.length < 2) {
    return null;
  }

  return (
    <nav aria-label="Table of contents" className="sticky top-24 hidden self-start lg:block">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        <ListTree className="size-4" aria-hidden="true" />
        On this page
      </p>
      <ScrollArea className="mt-4 max-h-[50vh]">
        <ul className="space-y-2.5 border-l border-border/80 pl-4">
          {entries.map((entry) => (
            <li key={entry.id} className={entry.level === 3 ? "pl-4" : undefined}>
              <a
                href={`#${entry.id}`}
                className="line-clamp-2 text-sm leading-snug text-muted-foreground transition-colors hover:text-foreground"
              >
                {entry.text}
              </a>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </nav>
  );
}
