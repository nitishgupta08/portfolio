// components/NotesErrorState.tsx
import { AlertCircle } from "lucide-react";

export function NotesErrorState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className="relative mb-6">
        <div className="w-24 h-24 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30 rounded-full flex items-center justify-center border border-red-200 dark:border-red-800/50">
          <AlertCircle className="w-12 h-12 text-red-500 dark:text-red-400" aria-hidden="true" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
      </div>

      <div className="text-center space-y-4 max-w-md">
        <h3 className="text-xl md:text-2xl font-bold text-foreground">
          Oops! Something went wrong
        </h3>

        <p className="text-muted-foreground leading-relaxed">
          Unable to load notes posts right now. This has been automatically
          reported and I&rsquo;ll look into it.
        </p>

        <div className="mt-8 text-center">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
