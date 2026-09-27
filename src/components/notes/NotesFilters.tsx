"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { NotePostFilters } from "@/lib/firebase/services/notesService";

interface NotesFiltersProps {
  initialFilters: NotePostFilters;
  allTags: string[];
  resultCount: number;
}

function buildHref(page: number, filters: NotePostFilters): string {
  const params = new URLSearchParams();
  params.set("page", String(page));
  if (filters.query?.trim()) {
    params.set("q", filters.query.trim());
  }
  if (filters.tag?.trim()) {
    params.set("tag", filters.tag.trim());
  }
  return `/notes?${params.toString()}`;
}

export function NotesFilters({ initialFilters, allTags, resultCount }: NotesFiltersProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialFilters.query ?? "");

  // Keep the input in sync when navigating with browser back/forward.
  useEffect(() => {
    setQuery(initialFilters.query ?? "");
  }, [initialFilters.query]);

  // Debounced search — updates the URL (and server results) as you type.
  // Reads the live tag from props so a mid-typing tag change isn't clobbered.
  const initialQuery = initialFilters.query ?? "";
  const initialTag = initialFilters.tag ?? "";
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed === initialQuery) {
      return;
    }
    const handle = window.setTimeout(() => {
      router.replace(buildHref(1, { query: trimmed, tag: initialTag || undefined }));
    }, 350);
    return () => window.clearTimeout(handle);
  }, [query, initialQuery, initialTag, router]);

  const toggleTag = (tag: string) => {
    const next = initialFilters.tag === tag ? undefined : tag;
    router.replace(buildHref(1, { ...initialFilters, tag: next }));
  };

  const clearAll = () => {
    setQuery("");
    router.replace("/notes?page=1");
  };

  const hasActiveFilters = Boolean(initialFilters.query?.trim() || initialFilters.tag?.trim());

  return (
    <div className="mt-8">
      <div className="rounded-[calc(var(--radius)+2px)] border border-border/80 bg-card p-4 md:p-5">
        <label className="relative block">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search notes by title, topic, or tag"
            className="pl-9"
            aria-label="Search notes"
          />
        </label>

        {allTags.length > 0 ? (
          <>
            <div className="mt-4 hidden flex-wrap gap-2 sm:flex" aria-label="Filter notes by tag">
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  size="sm"
                  variant={initialFilters.tag === tag ? "secondary" : "outline"}
                  onClick={() => toggleTag(tag)}
                  aria-pressed={initialFilters.tag === tag}
                >
                  {tag}
                </Button>
              ))}
            </div>
            <div className="mt-4 sm:hidden">
              <Select
                value={initialFilters.tag ?? "__all"}
                onValueChange={(value) =>
                  toggleTag(value === "__all" ? "" : value)
                }
              >
                <SelectTrigger aria-label="Filter notes by tag" className="w-full">
                  <SelectValue placeholder="All topics" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__all">All topics</SelectItem>
                  {allTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        ) : null}
      </div>

      <div
        className="mt-4 flex items-center justify-between gap-4 text-sm text-muted-foreground"
        aria-live="polite"
      >
        <p>
          {resultCount} {resultCount === 1 ? "note" : "notes"} found
        </p>
        {hasActiveFilters ? (
          <Button variant="ghost" size="sm" onClick={clearAll}>
            <X className="mr-1.5 size-3.5" aria-hidden="true" />
            Clear filters
          </Button>
        ) : null}
      </div>
    </div>
  );
}
