"use client";

import { useMemo, useState } from "react";
import { Clock3, Disc3, ExternalLink, Music2, User } from "lucide-react";

import type {
  InRotationTrack,
  ListeningShowcaseData,
  ListeningShowcasePeriod,
  TopAlbum,
  TopArtist,
  TopTrack,
} from "@/types/LastFm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ListeningShowcasePageProps {
  data: ListeningShowcaseData;
}

const PERIODS: ListeningShowcasePeriod[] = [
  "overall",
  "6month",
  "3month",
  "7day",
];
const LASTFM_DEFAULT_COVER_URL =
  "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png";

const periodLabel = (period: ListeningShowcasePeriod): string => {
  const labels: Record<ListeningShowcasePeriod, string> = {
    overall: "All Time",
    "6month": "6 Months",
    "3month": "3 Months",
    "7day": "7 Days",
  };
  return labels[period];
};

function Cover({
  imageUrl,
  label,
  sizeClass = "size-14",
  fallbackText,
  fallbackImageUrl,
}: {
  imageUrl?: string;
  label: string;
  sizeClass?: string;
  fallbackText?: string;
  fallbackImageUrl?: string;
}) {
  const fallback = (
    fallbackText?.trim() ||
    label.trim().charAt(0).toUpperCase() ||
    "?"
  ).slice(0, 5);

  if (imageUrl) {
    return (
      <div
        aria-hidden="true"
        className={`${sizeClass} shrink-0 rounded-[calc(var(--radius)-4px)] border border-border/70 bg-muted bg-cover bg-center`}
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
    );
  }

  if (fallbackImageUrl) {
    return (
      <div
        aria-hidden="true"
        className={`${sizeClass} shrink-0 rounded-[calc(var(--radius)-4px)] border border-border/70 bg-muted bg-cover bg-center`}
        style={{ backgroundImage: `url(${fallbackImageUrl})` }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`grid ${sizeClass} shrink-0 place-items-center rounded-[calc(var(--radius)-4px)] border border-border/70 bg-secondary/35 text-xs font-semibold text-muted-foreground`}
    >
      {fallback}
    </div>
  );
}

function Metric({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[calc(var(--radius)-2px)] border border-border/70 bg-background/60 p-3">
      <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        {title}
      </p>
      <p className="mt-2 text-xl font-semibold sm:text-2xl">{value}</p>
    </div>
  );
}

function CardExternalLink({ href, label }: { href?: string; label: string }) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="absolute bottom-2 right-2 rounded-full border border-border/70 bg-background p-1 text-muted-foreground transition-colors hover:text-foreground"
    >
      <ExternalLink className="size-3" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </a>
  );
}

function PeriodPicker({
  selected,
  onSelect,
}: {
  selected: ListeningShowcasePeriod;
  onSelect: (period: ListeningShowcasePeriod) => void;
}) {
  return (
    <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
      {PERIODS.map((period) => (
        <Button
          key={period}
          type="button"
          size="sm"
          variant={period === selected ? "default" : "outline"}
          onClick={() => onSelect(period)}
          className="shrink-0"
        >
          {periodLabel(period)}
        </Button>
      ))}
    </div>
  );
}

function TracksRail({ tracks }: { tracks: TopTrack[] }) {
  if (tracks.length === 0) {
    return (
      <p className="mt-2 text-sm text-muted-foreground">
        No track data available.
      </p>
    );
  }

  return (
    <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
      {tracks.map((track, index) => (
        <article
          key={`${track.name}-${track.artist}-${index}`}
          className="relative min-w-[240px] max-w-[240px] rounded-[calc(var(--radius)+2px)] border border-border/80 bg-card p-3 pb-8"
        >
          <div className="flex items-center gap-3">
            <Cover
              imageUrl={track.imageUrl}
              label={track.name}
              fallbackImageUrl={LASTFM_DEFAULT_COVER_URL}
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {index + 1}. {track.name}
              </p>
              <p className="mt-1 truncate text-xs text-muted-foreground">
                {track.artist}
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            {track.plays.toLocaleString()} plays
          </p>
          <CardExternalLink
            href={track.url}
            label={`Open ${track.name} by ${track.artist} on Last.fm`}
          />
        </article>
      ))}
    </div>
  );
}

function ArtistsRail({ artists }: { artists: TopArtist[] }) {
  if (artists.length === 0) {
    return (
      <p className="mt-2 text-sm text-muted-foreground">
        No artist data available.
      </p>
    );
  }

  return (
    <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
      {artists.map((artist, index) => (
        <article
          key={`${artist.name}-${index}`}
          className="relative min-w-[220px] max-w-[220px] rounded-[calc(var(--radius)+2px)] border border-border/80 bg-card p-3 pb-8"
        >
          <div className="flex items-center gap-3">
            <Cover
              imageUrl={artist.imageUrl}
              label={artist.name}
              fallbackImageUrl={LASTFM_DEFAULT_COVER_URL}
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {index + 1}. {artist.name}
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            {artist.plays.toLocaleString()} plays
          </p>
          <CardExternalLink
            href={artist.url}
            label={`Open ${artist.name} on Last.fm`}
          />
        </article>
      ))}
    </div>
  );
}

function AlbumsRail({ albums }: { albums: TopAlbum[] }) {
  if (albums.length === 0) {
    return (
      <p className="mt-2 text-sm text-muted-foreground">
        No album data available.
      </p>
    );
  }

  return (
    <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
      {albums.map((album, index) => (
        <article
          key={`${album.name}-${album.artist}-${index}`}
          className="relative min-w-[240px] max-w-[240px] rounded-[calc(var(--radius)+2px)] border border-border/80 bg-card p-3 pb-8"
        >
          <div className="flex items-center gap-3">
            <Cover imageUrl={album.imageUrl} label={album.name} />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {index + 1}. {album.name}
              </p>
              <p className="mt-1 truncate text-xs text-muted-foreground">
                {album.artist}
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            {album.plays.toLocaleString()} plays
          </p>
          <CardExternalLink
            href={album.url}
            label={`Open ${album.name} by ${album.artist} on Last.fm`}
          />
        </article>
      ))}
    </div>
  );
}

export default function ListeningShowcasePage({
  data,
}: ListeningShowcasePageProps) {
  const [tracksPeriod, setTracksPeriod] =
    useState<ListeningShowcasePeriod>("overall");
  const [artistsPeriod, setArtistsPeriod] =
    useState<ListeningShowcasePeriod>("overall");
  const [albumsPeriod, setAlbumsPeriod] =
    useState<ListeningShowcasePeriod>("overall");

  const tracksData = useMemo(
    () =>
      data.periods.find((entry) => entry.period === tracksPeriod)?.topTracks ??
      [],
    [data.periods, tracksPeriod],
  );
  const artistsData = useMemo(
    () =>
      data.periods.find((entry) => entry.period === artistsPeriod)
        ?.topArtists ?? [],
    [data.periods, artistsPeriod],
  );
  const albumsData = useMemo(
    () =>
      data.periods.find((entry) => entry.period === albumsPeriod)?.topAlbums ??
      [],
    [data.periods, albumsPeriod],
  );

  return (
    <>
      <Card className="mt-2 overflow-hidden border-border/90 bg-gradient-to-br from-card via-card to-secondary/25">
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle className="text-xl">Recap</CardTitle>
            <p className="mt-1 text-xs text-muted-foreground">
              A compact view of my listening activity, as recorded by Last.fm.
            </p>
          </div>

          <a
            href={data.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex shrink-0 items-center justify-center"
            aria-label="Open Last.fm profile"
            title="Open Last.fm profile"
          >
            <span
              aria-hidden="true"
              className="size-12 rounded-full border border-border/70 bg-secondary/40 bg-cover bg-center"
              style={
                data.profileImageUrl
                  ? { backgroundImage: `url(${data.profileImageUrl})` }
                  : undefined
              }
            >
              {!data.profileImageUrl ? (
                <span className="grid size-full place-items-center text-xs font-semibold text-muted-foreground">
                  {(data.profileName ?? "L").trim().charAt(0).toUpperCase()}
                </span>
              ) : null}
            </span>
            <span className="absolute -right-1 -bottom-1 rounded-full border border-border/70 bg-background p-1">
              <ExternalLink className="size-3" aria-hidden="true" />
            </span>
            <span className="sr-only">Open Last.fm profile</span>
          </a>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.35fr_1fr]">
            <div>
              <div className="grid grid-cols-2 gap-3">
                <Metric
                  title="Total Scrobbles"
                  value={data.totalScrobbles?.toLocaleString() ?? "-"}
                />
                <Metric
                  title="Different Tracks"
                  value={data.differentTracks?.toLocaleString() ?? "-"}
                />
                <Metric
                  title="Different Artists"
                  value={data.differentArtists?.toLocaleString() ?? "-"}
                />
                <Metric
                  title="Different Albums"
                  value={data.differentAlbums?.toLocaleString() ?? "-"}
                />
              </div>
            </div>

            <div className="rounded-[calc(var(--radius)-2px)] border border-border/70 bg-background/70 p-3">
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                Most Listened Song
              </p>
              {data.mostListenedSong ? (
                <div className="mt-3 flex items-center gap-3">
                  <Cover
                    imageUrl={data.mostListenedSong.imageUrl}
                    label={data.mostListenedSong.name}
                    sizeClass="size-24"
                    fallbackImageUrl={LASTFM_DEFAULT_COVER_URL}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {data.mostListenedSong.name}
                    </p>
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {data.mostListenedSong.artist}
                    </p>
                    <Badge variant="outline" className="mt-2">
                      {data.mostListenedSong.plays.toLocaleString()} plays
                    </Badge>
                  </div>
                </div>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">
                  No top track data available.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="mt-8">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Clock3 className="size-4 text-muted-foreground" aria-hidden="true" />
          <h2>Recently Played</h2>
        </div>
        <RecentRail tracks={data.recentTracks} />
      </section>

      <section className="mt-8">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Music2 className="size-4 text-muted-foreground" aria-hidden="true" />
          <h2>Top Songs</h2>
        </div>
        <PeriodPicker selected={tracksPeriod} onSelect={setTracksPeriod} />
        <TracksRail tracks={tracksData} />
      </section>

      <section className="mt-8">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <User className="size-4 text-muted-foreground" aria-hidden="true" />
          <h2>Top Artists</h2>
        </div>
        <PeriodPicker selected={artistsPeriod} onSelect={setArtistsPeriod} />
        <ArtistsRail artists={artistsData} />
      </section>

      <section className="mt-8">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Disc3 className="size-4 text-muted-foreground" aria-hidden="true" />
          <h2>Top Albums</h2>
        </div>
        <PeriodPicker selected={albumsPeriod} onSelect={setAlbumsPeriod} />
        <AlbumsRail albums={albumsData} />
      </section>
    </>
  );
}

function RecentRail({ tracks }: { tracks: InRotationTrack[] }) {
  if (tracks.length === 0) {
    return (
      <p className="mt-2 text-sm text-muted-foreground">
        No recent track data available.
      </p>
    );
  }

  return (
    <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
      {tracks.map((track, index) => (
        <article
          key={`${track.title}-${track.artist}-${index}`}
          className="relative min-w-[230px] max-w-[230px] rounded-[calc(var(--radius)+2px)] border border-border/80 bg-card p-3 pb-8"
        >
          <div className="flex items-center gap-3">
            <Cover
              imageUrl={track.imageUrl}
              label={track.title}
              fallbackImageUrl={LASTFM_DEFAULT_COVER_URL}
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{track.title}</p>
              <p className="mt-1 truncate text-xs text-muted-foreground">
                {track.artist}
              </p>
            </div>
          </div>
          {track.playedAgo ? (
            <p className="mt-3 text-xs text-muted-foreground">
              {track.playedAgo}
            </p>
          ) : null}
          <CardExternalLink
            href={track.url}
            label={`Open ${track.title} by ${track.artist} on Last.fm`}
          />
        </article>
      ))}
    </div>
  );
}
