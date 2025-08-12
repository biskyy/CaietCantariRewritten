import { useAtom } from "jotai";

import { displayedSongInfoAtom } from "@/state/global";
import { DisplayedSong } from "@/types/state";

type UseDisplayedSong = [
  displayedSong: DisplayedSong | undefined,
  setDisplayedSong: (args: Partial<DisplayedSong>) => void,
];

export const useDisplayedSongInfo = (): UseDisplayedSong => {
  const [displayedSongInfo, _setDisplayedSongInfo] = useAtom(
    displayedSongInfoAtom,
  );

  const setDisplayedSongInfo = (
    newState: Partial<DisplayedSong> | undefined,
  ) => {
    _setDisplayedSongInfo((prevState) => {
      if (newState === undefined) {
        return undefined;
      } else {
        return {
          ...prevState,
          ...newState,
        } as DisplayedSong;
      }
    });
  };

  return [displayedSongInfo, setDisplayedSongInfo];
};
