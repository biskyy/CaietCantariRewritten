export interface User {
  token: string;
  adminToken?: string;
  tokenExpiryDate: number;
}

export interface UserPrefs {
  showCategories: boolean;
}

export type ThemeState = "not set" | true | false;

export interface Report {
  songIndex: number;
  additionalDetails: string;
}

export interface LoadingScreenState {
  state: "inactive" | "fading_in" | "fading_out";
  label: string;
  callback: () => void;
}

export interface Song {
  title: string;
  content: string;
  book_id: string;
  id: number;
  index: number;
  favorite: boolean;
  tags: Array<string>;
  searchable_title: string;
  searchable_content: string;
}

export interface DisplayedSong {
  song: Song;
  bookFirstIndex: number;
  bookLastIndex: number;
  currentReport?: any;
}
