import type {
  InRotationTrack,
  ListeningData,
  ListeningDataExpanded,
  ListeningShowcaseData,
  ListeningShowcasePeriod,
  ListeningStatus,
  TopAlbum,
  TopArtist,
  TopTrack,
} from "@/types/LastFm";

const LASTFM_BASE_URL = "https://ws.audioscrobbler.com/2.0/";
const RECENT_TRACKS_LIMIT = 30;
const SHOWCASE_RECENT_LIMIT = 10;
const IN_ROTATION_LIMIT = 8;
const TOP_PREVIEW_LIMIT = 10;
const TRACK_IMAGE_ENRICH_LIMIT = 24;
const ALBUM_IMAGE_ENRICH_LIMIT = 16;
const TRACK_IMAGE_ENRICH_PER_PERIOD = 6;
const ALBUM_IMAGE_ENRICH_PER_PERIOD = 4;
const TRACK_IMAGE_ENRICH_RECENT_LIMIT = 6;
const REVALIDATE_RECENT_SECONDS = 30;
const REVALIDATE_TOP_SECONDS = 600;
const REVALIDATE_USER_SECONDS = 86400;

const SHOWCASE_PERIODS: ListeningShowcasePeriod[] = [
  "overall",
  "6month",
  "3month",
  "7day",
];
type TopPeriod = ListeningShowcasePeriod | "1month";

interface LastFmErrorResponse {
  error?: number;
  message?: string;
}

interface LastFmImage {
  "#text"?: string;
  size?: string;
}

interface LastFmRecentTrack {
  name?: string;
  artist?: { "#text"?: string; name?: string } | string;
  url?: string;
  date?: { uts?: string };
  "@attr"?: { nowplaying?: string };
  image?: LastFmImage[] | LastFmImage;
}

interface LastFmRecentTracksResponse extends LastFmErrorResponse {
  recenttracks?: {
    track?: LastFmRecentTrack[] | LastFmRecentTrack;
  };
}

interface LastFmTopTrack {
  name?: string;
  artist?: { name?: string; "#text"?: string } | string;
  playcount?: string;
  image?: LastFmImage[] | LastFmImage;
  url?: string;
}

interface LastFmTopTracksResponse extends LastFmErrorResponse {
  toptracks?: {
    track?: LastFmTopTrack[] | LastFmTopTrack;
    "@attr"?: { total?: string };
  };
}

interface LastFmTopArtist {
  name?: string;
  url?: string;
  playcount?: string;
  image?: LastFmImage[] | LastFmImage;
}

interface LastFmTopArtistsResponse extends LastFmErrorResponse {
  topartists?: {
    artist?: LastFmTopArtist[] | LastFmTopArtist;
    "@attr"?: { total?: string };
  };
}

interface LastFmTopAlbum {
  name?: string;
  artist?: { name?: string; "#text"?: string } | string;
  playcount?: string;
  url?: string;
  image?: LastFmImage[] | LastFmImage;
}

interface LastFmTopAlbumsResponse extends LastFmErrorResponse {
  topalbums?: {
    album?: LastFmTopAlbum[] | LastFmTopAlbum;
    "@attr"?: { total?: string };
  };
}

interface LastFmTopTag {
  name?: string;
  count?: string;
}

interface LastFmTopTagsResponse extends LastFmErrorResponse {
  toptags?: {
    tag?: LastFmTopTag[] | LastFmTopTag;
  };
}

interface LastFmUser {
  name?: string;
  realname?: string;
  url?: string;
  playcount?: string;
  image?: LastFmImage[] | LastFmImage;
}

interface LastFmUserInfoResponse extends LastFmErrorResponse {
  user?: LastFmUser;
}

interface LastFmTrackInfoResponse extends LastFmErrorResponse {
  track?: {
    album?: {
      image?: LastFmImage[] | LastFmImage;
    };
  };
}

interface LastFmAlbumInfoResponse extends LastFmErrorResponse {
  album?: {
    image?: LastFmImage[] | LastFmImage;
  };
}

type ArtistValue = { "#text"?: string; name?: string } | string | undefined;

const sanitizeEnvValue = (value?: string): string => {
  if (!value) return "";
  return value.trim().replace(/^\"|\"$/g, "");
};

const credentials = (): { apiKey: string; username: string } => ({
  apiKey: sanitizeEnvValue(process.env.LASTFM_API_KEY),
  username: sanitizeEnvValue(process.env.LASTFM_USERNAME),
});

const toArray = <T>(value: T[] | T | undefined): T[] => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

const getArtistName = (artist: ArtistValue): string => {
  if (!artist) return "";
  if (typeof artist === "string") return artist;
  if ("#text" in artist) return artist["#text"] ?? "";
  if ("name" in artist) return artist.name ?? "";
  return "";
};

const toPlaycount = (value?: string): number => Number.parseInt(value ?? "0", 10) || 0;

const toOptionalCount = (value?: string): number | undefined => {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const normalizeImageUrl = (url: string): string => {
  const trimmed = url.trim();
  if (trimmed.startsWith("//")) return `https:${trimmed}`;
  if (trimmed.startsWith("http://")) return `https://${trimmed.slice("http://".length)}`;
  return trimmed;
};

const normalizeWebUrl = (url?: string): string | undefined => {
  if (!url?.trim()) return undefined;
  const trimmed = url.trim();
  if (trimmed.startsWith("//")) return `https:${trimmed}`;
  if (trimmed.startsWith("http://")) return `https://${trimmed.slice("http://".length)}`;
  return trimmed;
};

const buildArtistUrl = (artist: string): string =>
  `https://www.last.fm/music/${encodeURIComponent(artist)}`;

const buildTrackUrl = (artist: string, track: string): string =>
  `https://www.last.fm/music/${encodeURIComponent(artist)}/_/${encodeURIComponent(track)}`;

const buildAlbumUrl = (artist: string, album: string): string =>
  `https://www.last.fm/music/${encodeURIComponent(artist)}/${encodeURIComponent(album)}`;

const isLastFmPlaceholderImage = (url: string): boolean => {
  const normalized = normalizeImageUrl(url).toLowerCase();
  return (
    normalized.includes("2a96cbd8b46e442fc41c2b86b821562f") ||
    normalized.includes("/noimage/") ||
    normalized.includes("4128a6eb29f94943c9d206c08e625904")
  );
};

const getImageUrl = (images: LastFmImage[] | LastFmImage | undefined): string | undefined => {
  const options = toArray(images);
  const priority = ["extralarge", "large", "medium", "small"];

  for (const size of priority) {
    const match = options.find((image) => image.size === size && image["#text"]?.trim());
    if (match?.["#text"] && !isLastFmPlaceholderImage(match["#text"])) {
      return normalizeImageUrl(match["#text"]);
    }
  }

  const fallback = options.find(
    (image) => image["#text"]?.trim() && !isLastFmPlaceholderImage(image["#text"] as string),
  );
  return fallback?.["#text"] ? normalizeImageUrl(fallback["#text"]) : undefined;
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

const trackCacheKey = (artist: string, title: string): string =>
  `${artist.trim().toLowerCase()}::${title.trim().toLowerCase()}`;

const fetchLastFm = async <T extends LastFmErrorResponse>(
  params: Record<string, string>,
  revalidateSeconds: number,
): Promise<T | null> => {
  const query = new URLSearchParams({
    format: "json",
    ...params,
  });

  const method = params.method ?? "unknown";

  try {
    const response = await fetch(`${LASTFM_BASE_URL}?${query.toString()}`, {
      next: { revalidate: revalidateSeconds },
    });

    if (!response.ok) {
      console.warn(`[lastfm] method=${method} failed status=${response.status}`);
      return null;
    }

    const data = (await response.json()) as T;
    if (typeof data.error === "number") {
      console.warn(`[lastfm] method=${method} error=${data.error}`);
      return null;
    }

    return data;
  } catch (error) {
    console.warn(`[lastfm] method=${method} exception`, error);
    return null;
  }
};

const buildStatusFromRecent = (tracks: LastFmRecentTrack[]): ListeningStatus | null => {
  if (tracks.length === 0) return null;

  const nowPlayingTrack = tracks.find(
    (track) =>
      track?.["@attr"]?.nowplaying === "true" ||
      track?.["@attr"]?.nowplaying === "1",
  );
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
  const out: InRotationTrack[] = [];

  for (const track of tracks) {
    const title = track.name?.trim();
    const artist = getArtistName(track.artist).trim();
    if (!title || !artist) continue;

    const key = `${title.toLowerCase()}::${artist.toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);

    out.push({
      title,
      artist,
      playedAgo: track.date?.uts ? toPlayedAgo(track.date.uts) : undefined,
      imageUrl: getImageUrl(track.image),
      url: normalizeWebUrl(track.url) ?? buildTrackUrl(artist, title),
    });

    if (out.length >= IN_ROTATION_LIMIT) break;
  }

  return out;
};

const mapTopTracks = (tracks: LastFmTopTrack[]): TopTrack[] => {
  return tracks
    .map((track) => {
      const name = track.name?.trim() ?? "";
      const artist = getArtistName(track.artist).trim();
      return {
        name,
        artist,
        plays: toPlaycount(track.playcount),
        imageUrl: getImageUrl(track.image),
        url: normalizeWebUrl(track.url) ?? (artist && name ? buildTrackUrl(artist, name) : undefined),
      };
    })
    .filter((track) => track.name.length > 0 && track.artist.length > 0)
    .slice(0, TOP_PREVIEW_LIMIT);
};

const mapTopArtists = (artists: LastFmTopArtist[], limit = TOP_PREVIEW_LIMIT): TopArtist[] => {
  return artists
    .map((artist) => ({
      name: artist.name?.trim() ?? "",
      plays: toPlaycount(artist.playcount),
      imageUrl: getImageUrl(artist.image),
      url: normalizeWebUrl(artist.url) ?? (artist.name?.trim() ? buildArtistUrl(artist.name.trim()) : undefined),
    }))
    .filter((artist) => artist.name.length > 0)
    .slice(0, limit);
};

const mapTopAlbums = (albums: LastFmTopAlbum[]): TopAlbum[] => {
  return albums
    .map((album) => {
      const name = album.name?.trim() ?? "";
      const artist = getArtistName(album.artist).trim();
      return {
        name,
        artist,
        plays: toPlaycount(album.playcount),
        imageUrl: getImageUrl(album.image),
        url: normalizeWebUrl(album.url) ?? (artist && name ? buildAlbumUrl(artist, name) : undefined),
      };
    })
    .filter((album) => album.name.length > 0 && album.artist.length > 0)
    .slice(0, TOP_PREVIEW_LIMIT);
};

const fetchRecentTracks = async (
  apiKey: string,
  username: string,
  limit = RECENT_TRACKS_LIMIT,
): Promise<LastFmRecentTrack[] | null> => {
  const data = await fetchLastFm<LastFmRecentTracksResponse>(
    {
      method: "user.getrecenttracks",
      api_key: apiKey,
      user: username,
      page: "1",
      limit: String(limit),
    },
    REVALIDATE_RECENT_SECONDS,
  );

  if (!data?.recenttracks?.track) return null;
  return toArray(data.recenttracks.track);
};

const fetchTopTracksPeriod = async (
  apiKey: string,
  username: string,
  period: TopPeriod,
): Promise<{ tracks: LastFmTopTrack[]; total?: number } | null> => {
  const data = await fetchLastFm<LastFmTopTracksResponse>(
    {
      method: "user.gettoptracks",
      api_key: apiKey,
      user: username,
      period,
      page: "1",
      limit: String(TOP_PREVIEW_LIMIT),
    },
    REVALIDATE_TOP_SECONDS,
  );

  const tracks = toArray(data?.toptracks?.track);
  if (tracks.length === 0) return null;

  return {
    tracks,
    total: toOptionalCount(data?.toptracks?.["@attr"]?.total),
  };
};

const fetchTopArtistsPeriod = async (
  apiKey: string,
  username: string,
  period: TopPeriod,
): Promise<{ artists: LastFmTopArtist[]; total?: number } | null> => {
  const data = await fetchLastFm<LastFmTopArtistsResponse>(
    {
      method: "user.gettopartists",
      api_key: apiKey,
      user: username,
      period,
      page: "1",
      limit: String(TOP_PREVIEW_LIMIT),
    },
    REVALIDATE_TOP_SECONDS,
  );

  const artists = toArray(data?.topartists?.artist);
  if (artists.length === 0) return null;

  return {
    artists,
    total: toOptionalCount(data?.topartists?.["@attr"]?.total),
  };
};

const fetchTopAlbumsPeriod = async (
  apiKey: string,
  username: string,
  period: TopPeriod,
): Promise<{ albums: LastFmTopAlbum[]; total?: number } | null> => {
  const data = await fetchLastFm<LastFmTopAlbumsResponse>(
    {
      method: "user.gettopalbums",
      api_key: apiKey,
      user: username,
      period,
      page: "1",
      limit: String(TOP_PREVIEW_LIMIT),
    },
    REVALIDATE_TOP_SECONDS,
  );

  const albums = toArray(data?.topalbums?.album);
  if (albums.length === 0) return null;

  return {
    albums,
    total: toOptionalCount(data?.topalbums?.["@attr"]?.total),
  };
};

const fetchTopTags = async (
  apiKey: string,
  username: string,
): Promise<LastFmTopTag[] | null> => {
  const data = await fetchLastFm<LastFmTopTagsResponse>(
    {
      method: "user.gettoptags",
      api_key: apiKey,
      user: username,
      limit: "8",
    },
    REVALIDATE_TOP_SECONDS,
  );

  const tags = toArray(data?.toptags?.tag);
  if (tags.length === 0) return null;
  return tags;
};

const fetchUserInfo = async (
  apiKey: string,
  username: string,
): Promise<LastFmUser | null> => {
  const data = await fetchLastFm<LastFmUserInfoResponse>(
    {
      method: "user.getinfo",
      api_key: apiKey,
      user: username,
    },
    REVALIDATE_USER_SECONDS,
  );

  return data?.user ?? null;
};

const fetchTrackCoverImage = async (
  apiKey: string,
  artist: string,
  track: string,
): Promise<string | undefined> => {
  const data = await fetchLastFm<LastFmTrackInfoResponse>(
    {
      method: "track.getinfo",
      api_key: apiKey,
      artist,
      track,
      autocorrect: "1",
    },
    REVALIDATE_TOP_SECONDS,
  );

  return getImageUrl(data?.track?.album?.image);
};

const fetchAlbumCoverImage = async (
  apiKey: string,
  artist: string,
  album: string,
): Promise<string | undefined> => {
  const data = await fetchLastFm<LastFmAlbumInfoResponse>(
    {
      method: "album.getinfo",
      api_key: apiKey,
      artist,
      album,
      autocorrect: "1",
    },
    REVALIDATE_TOP_SECONDS,
  );

  return getImageUrl(data?.album?.image);
};

const buildListeningData = (
  recentTracks: LastFmRecentTrack[] | null,
  topArtists: LastFmTopArtist[] | null,
  username: string,
): ListeningData | null => {
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
  const artists = topArtists ? mapTopArtists(topArtists, 5) : [];

  if (!status && filteredTracks.length === 0 && artists.length === 0) {
    return null;
  }

  return {
    status,
    tracks: filteredTracks.slice(0, IN_ROTATION_LIMIT),
    topArtists: artists,
    profileUrl: `https://www.last.fm/user/${username}`,
  };
};

export async function getListeningData(): Promise<ListeningData | null> {
  const { apiKey, username } = credentials();
  if (!apiKey || !username) return null;

  const [recentTracks, topArtistsData] = await Promise.all([
    fetchRecentTracks(apiKey, username),
    fetchTopArtistsPeriod(apiKey, username, "1month"),
  ]);

  return buildListeningData(recentTracks, topArtistsData?.artists ?? null, username);
}

export async function getListeningDataExpanded(): Promise<ListeningDataExpanded | null> {
  const { apiKey, username } = credentials();
  if (!apiKey || !username) return null;

  const [recentTracks, topArtistsData, topTracksData, topAlbumsData, topTags, user] =
    await Promise.all([
      fetchRecentTracks(apiKey, username),
      fetchTopArtistsPeriod(apiKey, username, "overall"),
      fetchTopTracksPeriod(apiKey, username, "overall"),
      fetchTopAlbumsPeriod(apiKey, username, "overall"),
      fetchTopTags(apiKey, username),
      fetchUserInfo(apiKey, username),
    ]);

  const baseData = buildListeningData(recentTracks, topArtistsData?.artists ?? null, username);
  if (!baseData && !topTracksData && !topAlbumsData) return null;

  return {
    status: baseData?.status ?? null,
    tracks: baseData?.tracks ?? [],
    topArtists: mapTopArtists(topArtistsData?.artists ?? []),
    topTracks: mapTopTracks(topTracksData?.tracks ?? []),
    topAlbums: mapTopAlbums(topAlbumsData?.albums ?? []),
    profileUrl: baseData?.profileUrl ?? `https://www.last.fm/user/${username}`,
    summary: {
      lifetimeScrobbles: toOptionalCount(user?.playcount),
      differentTracksAllTime: topTracksData?.total,
      differentArtistsAllTime: topArtistsData?.total,
      differentAlbumsAllTime: topAlbumsData?.total,
      topGenres: (topTags ?? []).slice(0, 8).map((tag) => ({
        name: tag.name?.trim() ?? "",
        count: toPlaycount(tag.count),
      })).filter((genre) => genre.name.length > 0),
    },
    fetchedAt: new Date().toISOString(),
  };
}

export async function getListeningShowcase(): Promise<ListeningShowcaseData | null> {
  const { apiKey, username } = credentials();
  if (!apiKey || !username) return null;

  const userPromise = fetchUserInfo(apiKey, username);
  const recentTracksPromise = fetchRecentTracks(apiKey, username, SHOWCASE_RECENT_LIMIT);
  const topTracksPromises = SHOWCASE_PERIODS.map((period) =>
    fetchTopTracksPeriod(apiKey, username, period),
  );
  const topArtistsPromises = SHOWCASE_PERIODS.map((period) =>
    fetchTopArtistsPeriod(apiKey, username, period),
  );
  const topAlbumsPromises = SHOWCASE_PERIODS.map((period) =>
    fetchTopAlbumsPeriod(apiKey, username, period),
  );

  const [user, recentTracksRaw, topTracksByPeriod, topArtistsByPeriod, topAlbumsByPeriod] =
    await Promise.all([
      userPromise,
      recentTracksPromise,
      Promise.all(topTracksPromises),
      Promise.all(topArtistsPromises),
      Promise.all(topAlbumsPromises),
    ]);

  const periods = SHOWCASE_PERIODS.map((period, index) => ({
    period,
    topTracks: mapTopTracks(topTracksByPeriod[index]?.tracks ?? []),
    topArtists: mapTopArtists(topArtistsByPeriod[index]?.artists ?? []),
    topAlbums: mapTopAlbums(topAlbumsByPeriod[index]?.albums ?? []),
  }));
  const recentTracks = buildInRotationFromRecent(recentTracksRaw ?? []).slice(
    0,
    SHOWCASE_RECENT_LIMIT,
  );

  const overallTracks = periods.find((entry) => entry.period === "overall")?.topTracks ?? [];
  const mostListenedSong = overallTracks[0];

  const totalScrobbles = toOptionalCount(user?.playcount);

  const trackCoverCache = new Map<string, Promise<string | undefined>>();
  const albumCoverCache = new Map<string, Promise<string | undefined>>();
  const knownTrackImages = new Map<string, string>();

  const allTrackEntries: Array<TopTrack | InRotationTrack> = [
    ...periods.flatMap((period) => period.topTracks),
    ...recentTracks,
  ];

  const getTrackTitle = (entry: TopTrack | InRotationTrack): string =>
    "name" in entry ? entry.name : entry.title;

  for (const entry of allTrackEntries) {
    if (!entry.imageUrl || !entry.artist) continue;
    const key = trackCacheKey(entry.artist, getTrackTitle(entry));
    knownTrackImages.set(key, entry.imageUrl);
  }

  const hydrateTrackFromKnownImages = (entry: TopTrack | InRotationTrack): void => {
    if (entry.imageUrl || !entry.artist) return;
    const known = knownTrackImages.get(trackCacheKey(entry.artist, getTrackTitle(entry)));
    if (known) {
      entry.imageUrl = known;
    }
  };

  for (const entry of allTrackEntries) {
    hydrateTrackFromKnownImages(entry);
  }

  const getTrackCoverFromCache = (artist: string, track: string): Promise<string | undefined> => {
    const key = trackCacheKey(artist, track);
    const cached = trackCoverCache.get(key);
    if (cached) return cached;

    const request = fetchTrackCoverImage(apiKey, artist, track);
    trackCoverCache.set(key, request);
    return request;
  };

  const getAlbumCoverFromCache = (artist: string, album: string): Promise<string | undefined> => {
    const key = `${artist.toLowerCase()}::${album.toLowerCase()}`;
    const cached = albumCoverCache.get(key);
    if (cached) return cached;

    const request = fetchAlbumCoverImage(apiKey, artist, album);
    albumCoverCache.set(key, request);
    return request;
  };

  const trackTargets = [
    ...recentTracks
      .filter((track) => !track.imageUrl && track.artist && track.title)
      .slice(0, TRACK_IMAGE_ENRICH_RECENT_LIMIT),
    ...periods.flatMap((period) =>
      period.topTracks
        .filter((track) => !track.imageUrl && track.artist && track.name)
        .slice(0, TRACK_IMAGE_ENRICH_PER_PERIOD),
    ),
  ].slice(0, TRACK_IMAGE_ENRICH_LIMIT);
  await Promise.all(
    trackTargets.map(async (entry) => {
      const title = "name" in entry ? entry.name : entry.title;
      const key = trackCacheKey(entry.artist, title);
      const known = knownTrackImages.get(key);
      if (known) {
        entry.imageUrl = known;
        return;
      }

      const imageUrl = await getTrackCoverFromCache(entry.artist, title);
      if (imageUrl) {
        entry.imageUrl = imageUrl;
        knownTrackImages.set(key, imageUrl);
      }
    }),
  );

  for (const entry of allTrackEntries) {
    hydrateTrackFromKnownImages(entry);
  }

  const albumTargets = periods
    .flatMap((period) =>
      period.topAlbums
        .filter((album) => !album.imageUrl && album.name && album.artist)
        .slice(0, ALBUM_IMAGE_ENRICH_PER_PERIOD),
    )
    .slice(0, ALBUM_IMAGE_ENRICH_LIMIT);
  await Promise.all(
    albumTargets.map(async (album) => {
      const imageUrl = await getAlbumCoverFromCache(album.artist, album.name);
      if (imageUrl) {
        album.imageUrl = imageUrl;
      }
    }),
  );

  const hasAnyData = Boolean(
    user ||
      recentTracks.length > 0 ||
      periods.some(
        (period) =>
          period.topTracks.length > 0 ||
          period.topArtists.length > 0 ||
          period.topAlbums.length > 0,
      ),
  );

  if (!hasAnyData) return null;

  return {
    profileUrl: user?.url ?? `https://www.last.fm/user/${username}`,
    profileImageUrl: getImageUrl(user?.image),
    profileName: user?.realname?.trim() || user?.name?.trim() || username,
    totalScrobbles,
    differentTracks: topTracksByPeriod[0]?.total,
    differentArtists: topArtistsByPeriod[0]?.total,
    differentAlbums: topAlbumsByPeriod[0]?.total,
    mostListenedSong,
    recentTracks,
    periods,
    fetchedAt: new Date().toISOString(),
  };
}
