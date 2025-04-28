import AsyncStorage from "@react-native-async-storage/async-storage";

import { atom } from "jotai";
import { atomWithStorage, createJSONStorage, loadable } from "jotai/utils";

import Cantari from "@/assets/Cantari.json";

import {
  STORAGE_USER_FAVORITE_SONGS,
  STORAGE_SONG_FONT_SIZE,
  STORAGE_SONGS,
  STORAGE_THEME,
  STORAGE_USER,
  STORAGE_USER_PREFS,
} from "@/constants";

const storage = createJSONStorage(() => AsyncStorage);

export const songsAtom = atomWithStorage(STORAGE_SONGS, Cantari, storage);

export const favoriteSongsAtom = atomWithStorage(
  STORAGE_USER_FAVORITE_SONGS,
  [],
  storage,
);

export const fontSizeAtom = atomWithStorage(
  STORAGE_SONG_FONT_SIZE,
  20,
  storage,
);

export const userAtom = atomWithStorage(
  STORAGE_USER,
  { token: "", adminToken: "", tokenExpiryDate: 0 },
  storage,
);

export const userPrefsAtom = atomWithStorage(
  STORAGE_USER_PREFS,
  {
    showCategories: true,
  },
  storage,
);

export const themeAtom = atomWithStorage(STORAGE_THEME, "not set", storage, {
  getOnInit: true,
});

const readOnlyLoadableThemeAtom = loadable(themeAtom);

export const writeableLoadableThemeAtom = atom(
  (get) => get(readOnlyLoadableThemeAtom),
  async (_get, set, arg) => set(themeAtom, arg),
);
