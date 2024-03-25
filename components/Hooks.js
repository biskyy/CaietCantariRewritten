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
 *
 * @returns {[DisplayedSongInfo, Function: (object: Partial<DisplayedSongInfo>) => void]}
 */
export const useDisplayedSongInfo = () => {
  const [displayedSongInfo, _setDispalyedSongInfo] = useAtom(
    dispalyedSongInfoAtom
  );

  const setDispalyedSongInfo = (newKeys) => {
    _setDispalyedSongInfo((prevObject) => ({
      ...prevObject,
      ...newKeys,
    }));
  };

  return [displayedSongInfo, setDispalyedSongInfo];
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
      backgroundColor: theme.data ? Colors[800] : Colors[200],
    },
    txtColor: {
      color: theme.data ? Colors[200] : Colors[800],
    },
    inverseBgColor: {
      backgroundColor: theme.data ? Colors[200] : Colors[800],
    },
    separatorColor: {
      backgroundColor: theme.data ? Colors[600] : Colors[600],
    },
    inverseTxtColor: {
      color: theme.data ? Colors[800] : Colors[200],
    },
    borderColor: {
      borderColor: theme.data ? Colors[600] : Colors[600],
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: 22,
      fontWeight: "bold",
    },
    text: {
      fontSize: 16,
      fontWeight: "normal",
    },
  });

  return themeStyle;
};
