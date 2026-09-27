// components/NotesPostsList.tsx
import type { NotePost } from "@/types/NotePost";
import { NotesListItem } from "@/components/notes/NotesListItem";

interface NotesPostsListProps {
  posts: NotePost[];
}

export function NotesPostsList({ posts }: NotesPostsListProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((notes) => (
        <NotesListItem key={notes.id ?? notes.slug} notes={notes} />
      ))}
    </div>
  );
}
