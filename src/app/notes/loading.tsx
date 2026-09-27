import { NotesHeaderShell } from "@/components/notes/NotesHeaderShell";
import { NotesListFallback } from "@/components/notes/NotesListSection";

export default function NotesLoading() {
  return (
    <div className="min-h-screen pt-8 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <NotesHeaderShell />
          <NotesListFallback />
        </div>
      </div>
    </div>
  );
}
