import { DisplayedSong, LoadingScreenState, Report } from "@/types/state";
import { atom, PrimitiveAtom } from "jotai";

export const loadingScreenAtom = atom<LoadingScreenState>({
  state: "inactive",
  label: "",
  callback: () => {},
});

export const modalVisibleAtom = atom<boolean>(false);

export const displayedSongInfoAtom = atom<DisplayedSong | undefined>();

export const reportsArrayAtom = atom<Array<Report>>([]);

export const orientationAtom = atom<"portrait" | "landscape">("portrait");
