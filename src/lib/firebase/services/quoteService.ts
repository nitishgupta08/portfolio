import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import type { Quote } from "@/types/Quote";
import { fallbackQuotes } from "@/lib/data/quotesFallback";

const COLLECTION_NAME = "quotes";

export class QuoteService {
  static async getVisibleQuotes(): Promise<Quote[]> {
    if (process.env.NEXT_PUBLIC_USE_FALLBACK_DATA === "true") {
      return fallbackQuotes.filter((quote) => quote.isVisible);
    }

    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where("isVisible", "==", true),
      );
      const querySnapshot = await getDocs(q);

      const quotes: Quote[] = [];
      querySnapshot.forEach((doc) => {
        quotes.push({
          id: doc.id,
          ...doc.data(),
        } as Quote);
      });

      quotes.sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));

      return quotes.length > 0
        ? quotes
        : fallbackQuotes.filter((quote) => quote.isVisible);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      return fallbackQuotes.filter((quote) => quote.isVisible);
    }
  }

  static async getRandomQuote(): Promise<Quote> {
    const quotes = await this.getVisibleQuotes();
    const pool =
      quotes.length > 0
        ? quotes
        : fallbackQuotes.filter((quote) => quote.isVisible);
    if (pool.length === 0) {
      return {
        id: "stay-hungry-stay-foolish",
        text: "Stay hungry. Stay foolish.",
        author: "Steve Jobs",
        isVisible: true,
      };
    }
    return pool[Math.floor(Math.random() * pool.length)];
  }
}
