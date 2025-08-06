import { LoadingScreenState, Report, Song } from "@/types/state";
import { atom } from "jotai";

export const loadingScreenAtom = atom<LoadingScreenState>({
  state: "inactive",
  label: "",
  callback: () => {},
});

export const modalVisibleAtom = atom<boolean>(false);

interface DisplayedSong {
  song: Song;
  bookFirstIndex: number;
  bookLastIndex: number;
  currentReport?: any;
}

export const displayedSongInfoAtom = atom<DisplayedSong>({
  song: undefined,
  bookFirstIndex: undefined,
  bookLastIndex: undefined,
  currentReport: undefined,
});

export const reportsArrayAtom = atom<Array<Report>>([]);

export const orientationAtom = atom<"portrait" | "landscape">("portrait");
