import { atom, useAtom } from "jotai";
import { atomWithStorage, createJSONStorage, loadable } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Cantari from "../assets/Cantari.json";
import NetInfo from "@react-native-community/netinfo";
import { Alert } from "react-native";
import * as Font from "expo-font";

const storage = createJSONStorage(() => AsyncStorage);
export const themeAtom = atomWithStorage("theme", "not set", storage, {
  getOnInit: true,
});
export const songsAtom = atomWithStorage("songs", Cantari, storage);
export const isLoadingAtom = atom(0);
export const userAtom = atomWithStorage(
  "user",
  { loggedIn: false, token: "" },
  storage
);

export const checkInternetConnection = () => {
  NetInfo.fetch().then((internet) => {
    if (!internet.isConnected)
      Alert.alert(
        "Nu exista conexiune la internet",
        "Conecteaza-te la internet"
      );
  });
};

export const checkConnectionToServer = () => {}; // to be added

export const cacheFonts = (fonts) => fonts.map((font) => Font.loadAsync(font)); // cache fonts method

const readOnlyLoadableThemeAtom = loadable(themeAtom);

const writeableLoadableThemeAtom = atom(
  (get) => get(readOnlyLoadableThemeAtom),
  async (_get, set, arg) => set(themeAtom, arg)
);

/**
 * @returns {Object}
 */
export const useTheme = () => {
  const [theme, setTheme] = useAtom(writeableLoadableThemeAtom);
  return [theme, setTheme];
};
