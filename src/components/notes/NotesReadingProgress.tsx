"use client";

import { useEffect, useState } from "react";

import { Progress } from "@/components/ui/progress";

export function NotesReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(scrollableHeight > 0 ? Math.min((window.scrollY / scrollableHeight) * 100, 100) : 0);
      });
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  if (progress <= 0) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 top-16 z-50" aria-hidden="true">
      <Progress value={progress} className="h-0.5 rounded-none bg-transparent" />
    </div>
  );
}
