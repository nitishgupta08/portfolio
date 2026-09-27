import { NotePost } from "@/types/NotePost";

export interface PaginatedNotesResult {
  posts: NotePost[];
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  currentPage: number;
  totalPages: number;
  allTags: string[];
}
