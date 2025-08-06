import { useAtom } from "jotai";

import { displayedSongInfoAtom } from "@/state/global";
import { DisplayedSong } from "@/types/state";

type UseDisplayedSong = [
  displayedSong: DisplayedSong,
  setDisplayedSong: (args: Partial<DisplayedSong>) => void,
];

export const useDisplayedSongInfo = (): UseDisplayedSong => {
  const [displayedSongInfo, _setDisplayedSongInfo] = useAtom<DisplayedSong>(
    displayedSongInfoAtom,
  );

  const setDisplayedSongInfo = (newState: Partial<DisplayedSong>) => {
    _setDisplayedSongInfo((prevState: DisplayedSong) => ({
      ...prevState,
      ...newState,
    }));
  };

  return [displayedSongInfo, setDisplayedSongInfo];
};
