import { useQuery } from "@tanstack/react-query";

import { NotesService, type NotePostFilters } from "@/lib/firebase/services/notesService";
import type { PaginatedNotesResult } from "@/types/PaginatedNotesResult";
import type { NotePost } from "@/types/NotePost";

const NOTES_QUERY_KEY = "notes_posts";

export function usePaginatedNotesPosts(
  page: number,
  pageSize: number,
  filters?: NotePostFilters,
  initialData?: PaginatedNotesResult,
) {
  const query = useQuery({
    queryKey: [
      NOTES_QUERY_KEY,
      "paginated",
      page,
      pageSize,
      filters?.query ?? "",
      filters?.tag ?? "",
    ],
    queryFn: () => NotesService.getPaginatedNotePosts(page, pageSize, filters),
    // Notes list changes rarely; server HTML covers first paint.
    staleTime: 5 * 60 * 1000,
    initialData,
  });

  return query;
}

export function useNotePost(slug: string, initialData?: NotePost | null) {
  const query = useQuery({
    queryKey: [NOTES_QUERY_KEY, "single", slug],
    queryFn: () => NotesService.getNotePostBySlug(slug),
    staleTime: 60 * 60 * 1000,
    initialData,
  });

  return query;
}
