import { atom } from "jotai";
import { atomWithStorage, createJSONStorage, loadable } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Cantari from "../assets/Cantari.json";

export const SONGS_ATOM_STORAGE = "songs";
export const FAVORITE_SONGS_ATOM_STORAGE = "favoriteSongs";
export const FONT_SIZE_ATOM_STORAGE = "fontSize";
export const USER_PREFS_ATOM_STORAGE = "userPrefs";
export const USER_ATOM_STORAGE = "user";

//export const apiUrl = "https://caiet-de-cantari.biskyys-api.net";
export const apiUrl =
  "https://oi2ahiamhhmtrhwgsi2z43wob40wfgbe.lambda-url.eu-central-1.on.aws";
// export const apiUrl = "http://192.168.1.61:3000/caiet-de-cantari";

const storage = createJSONStorage(() => AsyncStorage);
export const songsAtom = atomWithStorage(SONGS_ATOM_STORAGE, Cantari, storage);

export const favoriteSongsAtom = atomWithStorage(
  FAVORITE_SONGS_ATOM_STORAGE,
  [],
  storage,
);

export const fontSizeAtom = atomWithStorage(
  FONT_SIZE_ATOM_STORAGE,
  20,
  storage,
);

export const userAtom = atomWithStorage(
  USER_ATOM_STORAGE,
  { token: "", adminToken: "", tokenExpiryDate: 0 },
  storage,
);

export const loadingScreenAtom = atom({
  state: 0,
  message: "",
  callback: () => {},
});

export const userPrefsAtom = atomWithStorage(
  USER_PREFS_ATOM_STORAGE,
  {
    showCategories: true,
  },
  storage,
);

export const modalVisibleAtom = atom(false);

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
  async (_get, set, arg) => set(themeAtom, arg),
);
