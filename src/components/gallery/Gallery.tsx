"use client";

import { useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ArrowDownWideNarrow, Clock, Heart } from "lucide-react";
import PhotoCard from "./PhotoCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateFingerprint } from "@/lib/utils";
import { GalleryService } from "@/lib/firebase/services/galleryService";
import type { Photo } from "@/types/Gallery";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const PhotoModal = dynamic(() => import("./PhotoModal"), { ssr: false });

export type { Photo };

export type GallerySort = "newest" | "loved";

interface GalleryProps {
  initialPhotos: Photo[];
  initialSort?: GallerySort;
}

export default function Gallery({ initialPhotos, initialSort = "newest" }: GalleryProps) {
  const router = useRouter();
  const [sort, setSort] = useState<GallerySort>(initialSort);
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likedPhotos, setLikedPhotos] = useState<Set<string>>(new Set());

  // Load liked photos from localStorage
  useEffect(() => {
    const fingerprint = generateFingerprint();
    const saved = localStorage.getItem(`gallery_likes_${fingerprint}`);
    if (saved) {
      try {
        setLikedPhotos(new Set(JSON.parse(saved)));
      } catch (error) {
        console.error("Error loading liked photos:", error);
      }
    }
  }, []);

  const handleLike = (photoId: string) => {
    const fingerprint = generateFingerprint();
    const newLikedPhotos = new Set(likedPhotos);
    const isCurrentlyLiked = newLikedPhotos.has(photoId);

    // Persist to Firestore (failures stay local-only).
    if (!isCurrentlyLiked) {
      GalleryService.incrementPhotoLike(photoId).catch(console.error);
    } else {
      GalleryService.decrementPhotoLike(photoId).catch(console.error);
    }

    // Update like count optimistically
    setPhotos(prev => prev.map(photo => 
      photo.id === photoId 
        ? { ...photo, likeCount: photo.likeCount + (isCurrentlyLiked ? -1 : 1) }
        : photo
    ));

    // Update liked photos set
    if (isCurrentlyLiked) {
      newLikedPhotos.delete(photoId);
    } else {
      newLikedPhotos.add(photoId);
    }
    
    setLikedPhotos(newLikedPhotos);
    
    // Update selected photo if it's the one being liked
    if (selectedPhoto?.id === photoId) {
      setSelectedPhoto(prev => prev ? {
        ...prev,
        likeCount: prev.likeCount + (isCurrentlyLiked ? -1 : 1)
      } : null);
    }

    // Save to localStorage
    localStorage.setItem(
      `gallery_likes_${fingerprint}`, 
      JSON.stringify([...newLikedPhotos])
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  const sortedPhotos = useMemo(() => {
    const list = [...photos];
    if (sort === "loved") {
      list.sort((a, b) => b.likeCount - a.likeCount);
    } else {
      list.sort(
        (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime(),
      );
    }
    return list;
  }, [photos, sort]);

  const changeSort = (next: GallerySort) => {
    setSort(next);
    router.replace(next === "loved" ? "/gallery?sort=loved" : "/gallery");
  };

  const handleSortedPhotoClick = (photo: Photo) => {
    const index = sortedPhotos.findIndex((p) => p.id === photo.id);
    setCurrentPhotoIndex(index);
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const handleSortedNavigate = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next'
      ? (currentPhotoIndex + 1) % sortedPhotos.length
      : (currentPhotoIndex - 1 + sortedPhotos.length) % sortedPhotos.length;

    setCurrentPhotoIndex(newIndex);
    setSelectedPhoto(sortedPhotos[newIndex]);
  };

  if (photos.length === 0) {
    return (
      <div className="rounded-[calc(var(--radius)+2px)] border border-dashed border-border bg-card/60 px-6 py-14 text-center">
        <p className="text-lg font-medium">No frames published yet.</p>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
          The gallery is ready for real work. Add images and their captions in
          <code className="mx-1 rounded bg-secondary px-1.5 py-0.5 text-foreground">src/lib/data/galleryData.ts</code>
          when there is something worth keeping here.
        </p>
      </div>
    );
  }

  return (
    <>
      <Tabs
        value={sort}
        onValueChange={(value) => changeSort(value as GallerySort)}
        className="mb-5"
      >
        <div className="flex flex-wrap items-center gap-2" aria-label="Sort gallery">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            <ArrowDownWideNarrow className="size-3.5" aria-hidden="true" />
            Sort
          </span>
          <TabsList className="h-auto gap-1 border border-border/70 bg-card p-1">
            <TabsTrigger value="newest" className="gap-1.5">
              <Clock className="size-3.5" aria-hidden="true" />
              Newest
            </TabsTrigger>
            <TabsTrigger value="loved" className="gap-1.5">
              <Heart className="size-3.5" aria-hidden="true" />
              Most loved
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>

      {/* Gallery Grid */}
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 
          350: 1, 
          750: 2, 
          900: 3, 
          1200: 4 
        }}
      >
        <Masonry gutter="16px">
          {sortedPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isLiked={likedPhotos.has(photo.id)}
              onPhotoClick={handleSortedPhotoClick}
              onLike={handleLike}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>

      {/* Photo Modal */}
      <PhotoModal
        photo={selectedPhoto}
        isOpen={isModalOpen}
        onClose={closeModal}
        onLike={handleLike}
        onNavigate={handleSortedNavigate}
        isLiked={selectedPhoto ? likedPhotos.has(selectedPhoto.id) : false}
        currentIndex={currentPhotoIndex}
        totalPhotos={sortedPhotos.length}
      />
    </>
  );
}
