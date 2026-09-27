"use client";

import { useState, useEffect } from 'react';
import { Eye } from "lucide-react";
import { NotesService } from '@/lib/firebase/services/notesService';

interface ViewCounterProps {
  slug: string;
  initialViews: number;
}

export default function ViewCounter({ slug, initialViews }: ViewCounterProps) {
  const [views, setViews] = useState(initialViews);
  const [hasIncremented, setHasIncremented] = useState(false);

  useEffect(() => {
    let viewedPosts: string[];
    try {
      const raw = localStorage.getItem('portfolio:viewedPosts') || '[]';
      const parsed: unknown = JSON.parse(raw);
      viewedPosts = Array.isArray(parsed) ? parsed.filter((entry): entry is string => typeof entry === 'string') : [];
    } catch {
      viewedPosts = [];
    }

    if (!viewedPosts.includes(slug) && !hasIncremented) {
      // Increment view count
      setViews(prev => prev + 1);
      setHasIncremented(true);

      // Store in localStorage to prevent duplicate views
      try {
        localStorage.setItem('portfolio:viewedPosts', JSON.stringify([...viewedPosts, slug]));
      } catch {
        // Private mode / quota — the count still increments server-side once.
      }

      // Increment view count in Firebase
      NotesService.incrementViewCount(slug).catch(console.error);
    }
  }, [slug, hasIncremented]);

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  return (
    <div className="flex items-center gap-2">
      <Eye className="h-4 w-4" aria-hidden="true" />
      <span>{formatViews(views)} views</span>
    </div>
  );
}
