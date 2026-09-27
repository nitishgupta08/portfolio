"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Photo } from "./Gallery";

interface PhotoCardProps {
  photo: Photo;
  isLiked: boolean;
  onPhotoClick: (photo: Photo) => void;
  onLike: (photoId: string) => void;
}

export default function PhotoCard({ 
  photo, 
  isLiked, 
  onPhotoClick, 
  onLike 
}: PhotoCardProps) {
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike(photo.id);
  };

  return (
    <Card className="group cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <div
        className="relative"
        onClick={() => onPhotoClick(photo)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onPhotoClick(photo);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Open photo: ${photo.alt}`}
      >
        {/* Photo Image */}
        <div className="relative overflow-hidden">
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            loading="lazy"
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Like button overlay */}
          <div
            className={cn(
              "absolute top-3 right-3 transition-opacity duration-300",
              isLiked
                ? "opacity-100"
                : "opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-within:opacity-100",
            )}
          >
            <Button
              size="sm"
              variant="secondary"
              className={`rounded-full w-10 h-10 p-0 ${
                isLiked 
                  ? "bg-red-500/90 hover:bg-red-600/90 text-white" 
                  : "bg-white/90 hover:bg-white text-gray-700"
              }`}
              onClick={handleLikeClick}
              aria-pressed={isLiked}
              aria-label={isLiked ? `Unlike photo ${photo.alt}` : `Like photo ${photo.alt}`}
            >
              {isLiked ? (
                <Heart className="h-4 w-4 fill-current" />
              ) : (
                <Heart className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Photo Info */}
        <div className="p-4 space-y-3">
          {/* Description */}
          {photo.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {photo.description}
            </p>
          )}
          
          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-3">
              {photo.location && (
                <span className="inline-flex max-w-[160px] items-center gap-1 truncate">
                  <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
                  <span className="truncate">{photo.location}</span>
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="flex items-center space-x-1">
                <Heart className={`h-3 w-3 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                <span>{photo.likeCount}</span>
              </span>
            </div>
          </div>

          {/* Tags */}
          {photo.tags && photo.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {photo.tags.slice(0, 3).map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="text-xs px-2 py-0.5"
                >
                  {tag}
                </Badge>
              ))}
              {photo.tags.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  +{photo.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
