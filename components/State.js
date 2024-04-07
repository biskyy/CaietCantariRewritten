import { atom } from "jotai";
import { atomWithStorage, createJSONStorage, loadable } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Cantari from "../assets/Cantari.json";

export const apiUrl = "https://caiet-de-cantari.biskyys-api.net";
// export const apiUrl = "http://192.168.1.59:3000";

const storage = createJSONStorage(() => AsyncStorage);
export const songsAtom = atomWithStorage("songs", Cantari, storage);
export const favoriteSongsAtom = atomWithStorage("favoriteSongs", [], storage);
export const fontSizeAtom = atomWithStorage("fontSize", 20, storage);
export const userAtom = atomWithStorage(
  "user",
  { loggedIn: false, token: "", showCategories: true },
  storage
);
export const loadingScreenAtom = atom({
  state: 0,
  message: "",
  callback: () => {},
});

/**
 * @typedef {Object} SongObject
 * @property {string} title
 * @property {string} content
 * @property {string} book_id
 * @property {number} id
 * @property {number} index
 * @property {Array<string>} tags
 */

export const dispalyedSongInfoAtom = atom({
  song: {},
  index: 0,
  listFirstIndex: 0,
  listLastIndex: 0,
  currentReport: {},
});

export const reportsArrayAtom = atom([]);

export const themeAtom = atomWithStorage("theme", "not set", storage, {
  getOnInit: true,
});

export const orientationAtom = atom("portrait");

const readOnlyLoadableThemeAtom = loadable(themeAtom);

export const writeableLoadableThemeAtom = atom(
  (get) => get(readOnlyLoadableThemeAtom),
  async (_get, set, arg) => set(themeAtom, arg)
);
