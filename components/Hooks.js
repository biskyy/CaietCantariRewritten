import { StyleSheet } from "react-native";
import { useAtom, atom } from "jotai";
import {
  dispalyedSongInfoAtom,
  loadingScreenAtom,
  writeableLoadableThemeAtom,
} from "./State";
import Colors from "./Colors";

/**
 * @typedef {Object} LoadingScreenObject
 * @property {number} state
 * @property {string} message
 * @property {(...args: any[]) => void} callback
 *
 * @returns {[LoadingScreenObject, Function: (object: Partial<LoadingScreenObject>) => void]}
 */
export const useLoadingScreen = () => {
  const [loadingScreen, _setLoadingScreen] = useAtom(loadingScreenAtom);
  const setLoadingScreen = (newKey) => {
    _setLoadingScreen((prevObject) => ({ ...prevObject, ...newKey }));
  };
  return [loadingScreen, setLoadingScreen];
};

/**
 * @typedef {Object} SongObject
 * @property {string} title
 * @property {string} content
 * @property {string} book_id
 * @property {number} id
 * @property {number} index
 * @property {Array<string>} tags
 */

/**
 *
 * @typedef {Object} DisplayedSongInfo
 * @property {Partial<SongObject>} song
 * @property {number} index
 * @property {number} listFirstIndex
 * @property {number} listLastIndex
 * @property {object} currentReport
 *
 * @returns {[DisplayedSongInfo, Function: (object: Partial<DisplayedSongInfo>) => void]}
 */
export const useDisplayedSongInfo = () => {
  const [displayedSongInfo, _setDisplayedSongInfo] = useAtom(
    dispalyedSongInfoAtom
  );

  const setDisplayedSongInfo = (newKeys) => {
    _setDisplayedSongInfo((prevObject) => ({
      ...prevObject,
      ...newKeys,
    }));
  };

  return [displayedSongInfo, setDisplayedSongInfo];
};

/**
 * @returns {[{data?: boolean | string, state: string}, (arg: boolean) => void]}
 */
export const useTheme = () => {
  const [theme, setTheme] = useAtom(writeableLoadableThemeAtom);
  return [theme, setTheme];
};

export const useThemeStyle = () => {
  const [theme] = useTheme();
  const themeStyle = StyleSheet.create({
    bgColor: {
      backgroundColor: theme.data ? Colors[800] : Colors[100],
    },
    txtColor: {
      color: theme.data ? Colors[200] : Colors[800],
    },
    inverseBgColor: {
      backgroundColor: theme.data ? Colors[100] : Colors[800],
    },
    separatorColor: {
      backgroundColor: theme.data ? Colors[600] : Colors[300],
    },
    inverseTxtColor: {
      color: theme.data ? Colors[800] : Colors[200],
    },
    borderColor: {
      borderColor: theme.data ? Colors[600] : Colors[300],
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: 22,
      fontWeight: "600",
    },
    text: {
      fontSize: 16,
      fontWeight: "normal",
    },
  });

  return themeStyle;
};
