import AsyncStorage from "@react-native-async-storage/async-storage";

import { atom, Provider, WritableAtom } from "jotai";
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

import { Song, ThemeState, User, UserPrefs } from "@/types/state";
import { Loadable } from "jotai/vanilla/utils/loadable";

const storage = createJSONStorage<any>(() => AsyncStorage);

export const songsAtom = atomWithStorage<Song[]>(
  STORAGE_SONGS,
  Cantari,
  storage,
);

export const fontSizeAtom = atomWithStorage<number>(
  STORAGE_SONG_FONT_SIZE,
  20,
  storage,
);

export const userAtom = atomWithStorage<User>(
  STORAGE_USER,
  { token: "", adminToken: "", tokenExpiryDate: 0 },
  storage,
);

export const userPrefsAtom = atomWithStorage<UserPrefs>(
  STORAGE_USER_PREFS,
  {
    showCategories: true,
  },
  storage,
);

export const userFavoriteSongsAtom = atomWithStorage<number[]>(
  STORAGE_USER_FAVORITE_SONGS,
  [],
  storage,
);

// export const themeAtom = atomWithStorage<ThemeState>(
//   STORAGE_THEME,
//   "not set",
//   storage,
//   {
//     getOnInit: true,
//   },
// );
//
// const readOnlyLoadableThemeAtom = loadable(themeAtom);
//
// export const writeableLoadableThemeAtom = atom(
//   (get) => get(readOnlyLoadableThemeAtom),
//   async (_get, set, arg: ThemeState) => set(themeAtom, arg),
// );
