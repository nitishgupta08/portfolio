import { Disc3, ExternalLink, Radio, Waves } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type {
  InRotationTrack,
  ListeningStatus,
  TopArtist,
} from "@/types/LastFm";

interface AboutListeningProps {
  status?: ListeningStatus | null;
  tracks?: InRotationTrack[];
  topArtists?: TopArtist[];
  profileUrl?: string;
}

export default function AboutListening({
  status,
  tracks = [],
  topArtists = [],
  profileUrl = "https://www.last.fm",
}: AboutListeningProps) {
  if (!status && tracks.length === 0 && topArtists.length === 0) {
    return null;
  }

  const visibleTracks = tracks.slice(0, 8);
  const visibleTopArtists = topArtists.slice(0, 5);
  return (
    <div className="mt-6">
      <p className="editorial-kicker">Listening</p>

      <div className="mt-3">
        <div className="rounded-[calc(var(--radius)+2px)] border border-border/80 bg-card p-3.5 md:p-4">
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <Disc3
                className="size-4 text-muted-foreground"
                aria-hidden="true"
              />
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Recent Picks
              </h3>
            </div>
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Open Last.fm profile"
            >
              via Last.fm
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          </div>

          {status || visibleTracks.length > 0 ? (
            <ul className="mt-2.5 flex gap-2 overflow-x-auto pt-2 pb-1">
              {status ? (
                <li className="min-w-[260px] shrink-0 rounded-[calc(var(--radius)-2px)] border border-border/70 bg-secondary/30 px-3 py-3">
                  <Badge
                    variant={status.isNowPlaying ? "secondary" : "outline"}
                    className="-ml-0.5 w-fit self-start text-[10px]"
                  >
                    <Radio className="size-3.5" aria-hidden="true" />
                    {status.isNowPlaying ? "Now Playing" : "Last Played"}
                  </Badge>
                  <div className="mt-2 min-w-0 space-y-1">
                    <p className="truncate text-sm font-medium leading-tight">
                      {status.track}
                    </p>
                    <p className="truncate text-xs leading-relaxed text-muted-foreground">
                      {status.artist}
                    </p>
                    {!status.isNowPlaying && status.playedAgo ? (
                      <p className="truncate text-xs text-muted-foreground">
                        {status.playedAgo}
                      </p>
                    ) : null}
                  </div>
                </li>
              ) : null}

              {visibleTracks.map((track) => (
                <li
                  key={`${track.title}-${track.artist}-${track.playedAgo ?? ""}`}
                  className="flex min-w-[220px] shrink-0 flex-col items-start rounded-[calc(var(--radius)-2px)] border border-border/70 bg-secondary/30 px-3 py-3"
                >
                  <Badge
                    variant="outline"
                    className="-ml-0.5 w-fit self-start text-[10px]"
                  >
                    {track.playedAgo ?? "Played"}
                  </Badge>
                  <p className="mt-2 w-full truncate text-sm font-medium leading-tight">
                    {track.title}
                  </p>
                  <p className="mt-1 w-full truncate text-xs leading-relaxed text-muted-foreground">
                    {track.artist}
                  </p>
                </li>
              ))}
            </ul>
          ) : null}

          {visibleTopArtists.length > 0 ? (
            <>
              <div className="mt-2.5 flex items-center gap-2">
                <Waves
                  className="size-4 text-muted-foreground"
                  aria-hidden="true"
                />
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Top Artists
                </h3>
              </div>

              <ul className="mt-2.5 flex gap-2 overflow-x-auto pb-1">
                {visibleTopArtists.map((artist, index) => (
                  <li
                    key={artist.name}
                    className="min-w-[170px] shrink-0 rounded-[calc(var(--radius)-2px)] border border-border/70 bg-secondary/30 px-3 py-2"
                  >
                    <div className="flex items-end justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-mono text-xs text-muted-foreground">
                          #{String(index + 1).padStart(2, "0")}
                        </p>
                        <p className="truncate text-sm font-medium leading-tight">
                          {artist.name}
                        </p>
                      </div>
                      <p className="shrink-0 truncate text-xs text-muted-foreground">
                        {artist.plays} plays
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
