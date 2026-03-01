export interface ListeningStatus {
  isNowPlaying: boolean;
  track: string;
  artist: string;
  playedAgo?: string;
}

export interface InRotationTrack {
  title: string;
  artist: string;
  playedAgo?: string;
  imageUrl?: string;
  url?: string;
}

export interface TopArtist {
  name: string;
  plays: number;
  imageUrl?: string;
  url?: string;
}

export interface ListeningData {
  status: ListeningStatus | null;
  tracks: InRotationTrack[];
  topArtists: TopArtist[];
  profileUrl: string;
}

export interface TopTrack {
  name: string;
  artist: string;
  plays: number;
  imageUrl?: string;
  url?: string;
}

export interface TopAlbum {
  name: string;
  artist: string;
  plays: number;
  imageUrl?: string;
  url?: string;
}

export interface TopGenre {
  name: string;
  count: number;
}

export interface ListeningSummary {
  lifetimeScrobbles?: number;
  differentTracksAllTime?: number;
  differentArtistsAllTime?: number;
  differentAlbumsAllTime?: number;
  topGenres: TopGenre[];
}

export interface ListeningDataExpanded extends ListeningData {
  topTracks: TopTrack[];
  topAlbums: TopAlbum[];
  summary: ListeningSummary;
  fetchedAt: string;
}

export type ListeningShowcasePeriod = "overall" | "6month" | "3month" | "7day";

export interface ListeningPeriodSectionData {
  period: ListeningShowcasePeriod;
  topTracks: TopTrack[];
  topArtists: TopArtist[];
  topAlbums: TopAlbum[];
}

export interface ListeningShowcaseData {
  profileUrl: string;
  profileImageUrl?: string;
  profileName?: string;
  totalScrobbles?: number;
  differentTracks?: number;
  differentArtists?: number;
  differentAlbums?: number;
  mostListenedSong?: TopTrack;
  recentTracks: InRotationTrack[];
  periods: ListeningPeriodSectionData[];
  fetchedAt: string;
}
