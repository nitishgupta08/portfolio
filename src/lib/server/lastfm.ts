import type {
  InRotationTrack,
  ListeningData,
  ListeningStatus,
  TopArtist,
} from "@/types/LastFm";

const LASTFM_BASE_URL = "https://ws.audioscrobbler.com/2.0/";
const RECENT_TRACKS_LIMIT = 30;
const IN_ROTATION_LIMIT = 8;
const TOP_ARTISTS_LIMIT = 5;
const RECENT_TRACKS_REVALIDATE_SECONDS = 30;
const TOP_ARTISTS_REVALIDATE_SECONDS = 600;

interface LastFmErrorResponse {
  error?: number;
  message?: string;
}

interface LastFmRecentTrack {
  name?: string;
  artist?: { "#text"?: string } | string;
  date?: { uts?: string };
  "@attr"?: { nowplaying?: string };
}

interface LastFmRecentTracksResponse extends LastFmErrorResponse {
  recenttracks?: {
    track?: LastFmRecentTrack[] | LastFmRecentTrack;
  };
}

interface LastFmTopArtist {
  name?: string;
  playcount?: string;
}

interface LastFmTopArtistsResponse extends LastFmErrorResponse {
  topartists?: {
    artist?: LastFmTopArtist[] | LastFmTopArtist;
  };
}

const toArray = <T>(value: T[] | T | undefined): T[] => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

const getArtistName = (artist: LastFmRecentTrack["artist"]): string => {
  if (!artist) return "";
  if (typeof artist === "string") return artist;
  return artist["#text"] ?? "";
};

const toPlayedAgo = (uts: string): string | undefined => {
  const playedAtMs = Number(uts) * 1000;
  if (!Number.isFinite(playedAtMs)) return undefined;

  const diffSeconds = Math.max(0, Math.floor((Date.now() - playedAtMs) / 1000));
  if (diffSeconds < 60) return `${diffSeconds}s ago`;

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
};

const buildStatusFromRecent = (tracks: LastFmRecentTrack[]): ListeningStatus | null => {
  if (tracks.length === 0) return null;

  const nowPlayingTrack = tracks.find((track) => track?.["@attr"]?.nowplaying === "true" || track?.["@attr"]?.nowplaying === "1");
  const latestTrack = nowPlayingTrack ?? tracks[0];
  const title = latestTrack?.name?.trim();
  const artist = getArtistName(latestTrack?.artist).trim();

  if (!title || !artist) return null;

  if (nowPlayingTrack) {
    return {
      isNowPlaying: true,
      track: title,
      artist,
    };
  }

  return {
    isNowPlaying: false,
    track: title,
    artist,
    playedAgo: latestTrack.date?.uts ? toPlayedAgo(latestTrack.date.uts) : undefined,
  };
};

const buildInRotationFromRecent = (tracks: LastFmRecentTrack[]): InRotationTrack[] => {
  const seen = new Set<string>();
  const inRotation: InRotationTrack[] = [];

  for (const track of tracks) {
    const title = track?.name?.trim();
    const artist = getArtistName(track?.artist).trim();
    if (!title || !artist) continue;

    const key = `${title.toLowerCase()}::${artist.toLowerCase()}`;
    if (seen.has(key)) continue;

    seen.add(key);
    inRotation.push({
      title,
      artist,
      playedAgo: track?.date?.uts ? toPlayedAgo(track.date.uts) : undefined,
    });

    if (inRotation.length >= IN_ROTATION_LIMIT) break;
  }

  return inRotation;
};

const buildTopArtists = (artists: LastFmTopArtist[]): TopArtist[] => {
  return artists
    .map((artist) => ({
      name: artist.name?.trim() ?? "",
      plays: Number.parseInt(artist.playcount ?? "0", 10) || 0,
    }))
    .filter((artist) => artist.name.length > 0)
    .slice(0, TOP_ARTISTS_LIMIT);
};

const fetchLastFm = async <T extends LastFmErrorResponse>(
  params: Record<string, string>,
  revalidateSeconds: number,
): Promise<T | null> => {
  const searchParams = new URLSearchParams({
    format: "json",
    ...params,
  });

  const response = await fetch(`${LASTFM_BASE_URL}?${searchParams.toString()}`, {
    next: { revalidate: revalidateSeconds },
  });

  if (!response.ok) return null;

  const data = (await response.json()) as T;
  if (typeof data.error === "number") return null;

  return data;
};

const fetchRecentTracks = async (
  apiKey: string,
  username: string,
): Promise<LastFmRecentTrack[] | null> => {
  const data = await fetchLastFm<LastFmRecentTracksResponse>({
    method: "user.getrecenttracks",
    api_key: apiKey,
    user: username,
    limit: String(RECENT_TRACKS_LIMIT),
  }, RECENT_TRACKS_REVALIDATE_SECONDS);

  if (!data?.recenttracks?.track) return null;
  return toArray(data.recenttracks.track);
};

const fetchTopArtists = async (
  apiKey: string,
  username: string,
): Promise<LastFmTopArtist[] | null> => {
  const data = await fetchLastFm<LastFmTopArtistsResponse>({
    method: "user.gettopartists",
    api_key: apiKey,
    user: username,
    period: "1month",
    limit: String(TOP_ARTISTS_LIMIT),
  }, TOP_ARTISTS_REVALIDATE_SECONDS);

  if (!data?.topartists?.artist) return null;
  return toArray(data.topartists.artist);
};

export async function getListeningData(): Promise<ListeningData | null> {
  const apiKey = process.env.LASTFM_API_KEY?.trim();
  const username = process.env.LASTFM_USERNAME?.trim();

  if (!apiKey || !username) return null;

  const [recentTracks, topArtists] = await Promise.all([
    fetchRecentTracks(apiKey, username).catch(() => null),
    fetchTopArtists(apiKey, username).catch(() => null),
  ]);

  const status = recentTracks ? buildStatusFromRecent(recentTracks) : null;
  const tracks = recentTracks ? buildInRotationFromRecent(recentTracks) : [];
  const filteredTracks = status
    ? tracks.filter(
        (track) =>
          !(
            track.title.toLowerCase() === status.track.toLowerCase() &&
            track.artist.toLowerCase() === status.artist.toLowerCase()
          ),
      )
    : tracks;
  const artists = topArtists ? buildTopArtists(topArtists) : [];

  if (!status && filteredTracks.length === 0 && artists.length === 0) {
    return null;
  }

  return {
    status,
    tracks: filteredTracks.slice(0, IN_ROTATION_LIMIT),
    topArtists: artists,
    profileUrl: `https://www.last.fm/user/${username}`,
  };
}
