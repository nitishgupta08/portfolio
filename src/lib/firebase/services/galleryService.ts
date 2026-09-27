import {
  collection,
  doc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import type { Photo } from "@/types/Gallery";
import { galleryPhotos } from "@/lib/data/galleryData";

const COLLECTION_NAME = "gallery_photos";

export class GalleryService {
  static async getVisiblePhotos(): Promise<Photo[]> {
    if (process.env.NEXT_PUBLIC_USE_FALLBACK_DATA === "true") {
      return galleryPhotos;
    }

    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where("isVisible", "==", true),
      );
      const querySnapshot = await getDocs(q);

      const photos: Photo[] = [];
      querySnapshot.forEach((record) => {
        photos.push({
          id: record.id,
          ...record.data(),
        } as Photo);
      });

      photos.sort(
        (a, b) =>
          new Date(b.datetime).getTime() - new Date(a.datetime).getTime(),
      );

      return photos;
    } catch (error) {
      console.error("Error fetching gallery photos:", error);
      return galleryPhotos;
    }
  }

  static async incrementPhotoLike(photoId: string): Promise<void> {
    await this.changePhotoLike(photoId, 1);
  }

  static async decrementPhotoLike(photoId: string): Promise<void> {
    await this.changePhotoLike(photoId, -1);
  }

  private static async changePhotoLike(photoId: string, delta: 1 | -1): Promise<void> {
    if (process.env.NEXT_PUBLIC_USE_FALLBACK_DATA === "true") {
      return;
    }

    try {
      const docRef = doc(db, COLLECTION_NAME, photoId);
      await updateDoc(docRef, {
        likeCount: increment(delta),
      });
    } catch (error) {
      console.error("Error changing photo like count:", error);
    }
  }
}
