import { fallbackNotesData } from "@/lib/data/notesData";
import { db } from "@/lib/firebase/firebase";
import type { NotePost } from "@/types/NotePost";
import { PaginatedNotesResult } from "@/types/PaginatedNotesResult";
import {
  collection,
  doc,
  getCountFromServer,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const COLLECTION_NAME = "notes_posts";

export interface NotePostFilters {
  query?: string;
  tag?: string;
}

export class NotesService {
  private static getPublishedFallbackPosts(): NotePost[] {
    return fallbackNotesData
      .filter((post) => post.isPublished !== false && post.isDraft !== true)
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      );
  }

  private static collectTags(posts: NotePost[]): string[] {
    return [...new Set(posts.flatMap((post) => post.tags ?? []))].sort();
  }

  private static applyFilters(posts: NotePost[], filters?: NotePostFilters): NotePost[] {
    const normalizedQuery = filters?.query?.trim().toLowerCase() ?? "";
    const tag = filters?.tag?.trim() ?? "";

    return posts.filter((post) => {
      if (tag && !(post.tags ?? []).includes(tag)) {
        return false;
      }
      if (!normalizedQuery) {
        return true;
      }
      const haystack = [
        post.title,
        post.description,
        post.content,
        ...(post.tags ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return normalizedQuery.split(/\s+/).every((term) => haystack.includes(term));
    });
  }

  private static paginate(posts: NotePost[], page: number, safePageSize: number) {
    const totalCount = posts.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / safePageSize));
    const currentPage = Math.min(Math.max(page, 1), totalPages);
    const startIndex = (currentPage - 1) * safePageSize;

    return {
      posts: posts.slice(startIndex, startIndex + safePageSize),
      totalCount,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
      currentPage,
      totalPages,
    };
  }

  static async getPaginatedNotePosts(
    page: number,
    pageSize: number,
    filters?: NotePostFilters,
  ): Promise<PaginatedNotesResult> {
    const safePageSize = Math.max(1, pageSize);
    const hasFilters = Boolean(filters?.query?.trim() || filters?.tag?.trim());

    try {
      if (process.env.NEXT_PUBLIC_USE_FALLBACK_DATA === "true") {
        const publishedPosts = this.getPublishedFallbackPosts();
        const allTags = this.collectTags(publishedPosts);
        const filteredPosts = this.applyFilters(publishedPosts, filters);

        return {
          ...this.paginate(filteredPosts, page, safePageSize),
          allTags,
        };
      }

      // Tag list comes from a lightweight tags-only projection.
      const tagsSnapshot = await getDocs(
        query(collection(db, COLLECTION_NAME), where("isPublished", "==", true)),
      );
      const allTags = [
        ...new Set(
          tagsSnapshot.docs.flatMap(
            (snapshot) => (snapshot.data().tags ?? []) as string[],
          ),
        ),
      ].sort();

      if (hasFilters) {
        // Text/tag search needs full documents — bounded to keep it sane.
        const postsSnapshot = await getDocs(
          query(
            collection(db, COLLECTION_NAME),
            where("isPublished", "==", true),
            orderBy("publishedAt", "desc"),
            limit(500),
          ),
        );
        const publishedPosts = postsSnapshot.docs.map((snapshot) => ({
          id: snapshot.id,
          ...snapshot.data(),
        })) as NotePost[];
        const filteredPosts = this.applyFilters(publishedPosts, filters);

        return {
          ...this.paginate(filteredPosts, page, safePageSize),
          allTags,
        };
      }

      // Unfiltered path: bounded reads via count aggregation + windowed fetch.
      const countSnapshot = await getCountFromServer(
        query(collection(db, COLLECTION_NAME), where("isPublished", "==", true)),
      );
      const totalCount = countSnapshot.data().count;
      const totalPages = Math.max(1, Math.ceil(totalCount / safePageSize));
      const currentPage = Math.min(Math.max(page, 1), totalPages);

      const postsSnapshot = await getDocs(
        query(
          collection(db, COLLECTION_NAME),
          where("isPublished", "==", true),
          orderBy("publishedAt", "desc"),
          limit(currentPage * safePageSize),
        ),
      );
      const windowed = postsSnapshot.docs.map((snapshot) => ({
        id: snapshot.id,
        ...snapshot.data(),
      })) as NotePost[];
      const posts = windowed.slice((currentPage - 1) * safePageSize);

      return {
        posts,
        totalCount,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
        currentPage,
        totalPages,
        allTags,
      };
    } catch (error) {
      console.error("Error fetching paginated notes posts, falling back to static data:", error);
      const publishedPosts = this.getPublishedFallbackPosts();
      const allTags = [...new Set(publishedPosts.flatMap((post) => post.tags ?? []))].sort();
      const filteredPosts = this.applyFilters(publishedPosts, filters);

      return {
        ...this.paginate(filteredPosts, page, safePageSize),
        allTags,
      };
    }
  }

  static async getNotePostBySlug(slug: string): Promise<NotePost | null> {
    if (process.env.NEXT_PUBLIC_USE_FALLBACK_DATA === "true") {
      return (
        this.getPublishedFallbackPosts().find((post) => post.slug === slug) ??
        null
      );
    }

    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where("slug", "==", slug),
        where("isPublished", "==", true),
        limit(1),
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const record = querySnapshot.docs[0];
        return {
          id: record.id,
          ...record.data(),
        } as NotePost;
      }

      return null;
    } catch (error) {
      console.error("Error fetching notes post, falling back to static data:", error);
      return (
        this.getPublishedFallbackPosts().find((post) => post.slug === slug) ??
        null
      );
    }
  }

  static async incrementViewCount(slug: string): Promise<void> {
    if (process.env.NEXT_PUBLIC_USE_FALLBACK_DATA === "true") {
      return;
    }

    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where("slug", "==", slug),
        where("isPublished", "==", true),
        limit(1),
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = doc(db, COLLECTION_NAME, querySnapshot.docs[0].id);
        await updateDoc(docRef, {
          views: increment(1),
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error("Error incrementing view count:", error);
    }
  }
}
