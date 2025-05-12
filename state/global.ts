import { DisplayedSong, LoadingScreenState } from "@/types/state";
import { atom } from "jotai";

export const loadingScreenAtom = atom<LoadingScreenState>({
  state: "inactive",
  label: "",
  callback: () => {},
});

export const modalVisibleAtom = atom<boolean>(false);

export const dispalyedSongInfoAtom = atom<DisplayedSong>({
  song: undefined,
  indexInBook: undefined,
  bookFirstIndex: undefined,
  bookLastIndex: undefined,
  currentReport: undefined,
});

export const reportsArrayAtom = atom([]);

export const orientationAtom = atom<"portrait" | "landscape">("portrait");
