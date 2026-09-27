// components/NotesListItem.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Eye } from "lucide-react";
import Link from "next/link";
import type { NotePost } from "@/types/NotePost";
import { getReadingTime } from "@/lib/notesReadingTime";

interface NotesListItemProps {
  notes: NotePost;
}

export function NotesListItem({ notes }: NotesListItemProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatViews = (views: number) => {
    return views >= 1000 ? `${(views / 1000).toFixed(1)}k` : views.toString();
  };

  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {notes.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {notes.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{notes.tags.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" aria-hidden="true" />
              <span>{formatDate(notes.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" aria-hidden="true" />
              <span>{formatViews(notes.views ?? 0)} views</span>
            </div>
            <span>{getReadingTime(notes)} min read</span>
          </div>
        </div>

        <Link href={`/notes/${notes.slug}`}>
          <h2 className="text-2xl md:text-3xl font-bold hover:text-primary transition-colors cursor-pointer line-clamp-2 leading-tight">
            {notes.title}
          </h2>
        </Link>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed line-clamp-3">
            {notes.description}
          </p>
          <div>
            <Link href={`/notes/${notes.slug}`}>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 px-0 text-primary hover:text-primary/80"
              >
                Read more →
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
