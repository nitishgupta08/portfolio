import type { NotePost } from "@/types/NotePost";

const WORDS_PER_MINUTE = 200;

/** Minutes to read, derived from markdown content when no explicit value exists. */
export function estimateReadingTime(content: string): number {
  const words = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*`_~\-[\]()!|]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function getReadingTime(notes: NotePost): number {
  if (notes.readTime && notes.readTime > 0) {
    return notes.readTime;
  }
  return estimateReadingTime(notes.content);
}
