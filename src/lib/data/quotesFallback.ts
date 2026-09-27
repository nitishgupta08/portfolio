import type { Quote } from "@/types/Quote";

// Fallback quotes shown when Firestore is unavailable or the
// `quotes` collection is empty. Keep the original default first.
export const fallbackQuotes: Quote[] = [
  {
    id: "stay-hungry-stay-foolish",
    text: "Stay hungry. Stay foolish.",
    author: "Steve Jobs",
    isVisible: true,
    order: 1,
  },
  {
    id: "simplicity-hard",
    text: "Simplicity is hard to build, easy to use, and hard to charge for. Complexity is easy to build, hard to use, and easy to charge for.",
    author: "Chris Sacca",
    isVisible: true,
    order: 2,
  },
  {
    id: "make-it-work",
    text: "First make it work, then make it right, then make it fast.",
    author: "Kent Beck",
    isVisible: true,
    order: 3,
  },
  {
    id: "stay-curious",
    text: "The important thing is not to stop questioning. Curiosity has its own reason for existing.",
    author: "Albert Einstein",
    isVisible: true,
    order: 4,
  },
];
