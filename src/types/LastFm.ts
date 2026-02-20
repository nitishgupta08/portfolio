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
}

export interface TopArtist {
  name: string;
  plays: number;
}

export interface ListeningData {
  status: ListeningStatus | null;
  tracks: InRotationTrack[];
  topArtists: TopArtist[];
  profileUrl: string;
}
