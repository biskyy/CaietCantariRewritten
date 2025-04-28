import { useAtom } from "jotai";

import { dispalyedSongInfoAtom } from "@/state/global";

/**
 *
 * @typedef {Object} DisplayedSongInfo
 * @property {Partial<import("@/state/global").SongObject>} song
 * @property {number} index
 * @property {number} listFirstIndex
 * @property {number} listLastIndex
 * @property {object} currentReport
 *
 * @returns {[DisplayedSongInfo, Function: (object: Partial<DisplayedSongInfo>) => void]}
 */
export const useDisplayedSongInfo = () => {
  const [displayedSongInfo, _setDisplayedSongInfo] = useAtom(
    dispalyedSongInfoAtom,
  );

  const setDisplayedSongInfo = (newKeys) => {
    _setDisplayedSongInfo((prevObject) => ({
      ...prevObject,
      ...newKeys,
    }));
  };

  return [displayedSongInfo, setDisplayedSongInfo];
};
