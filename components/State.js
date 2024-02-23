import { atom, useAtom } from "jotai";
import { atomWithStorage, createJSONStorage, loadable } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Cantari from "../assets/Cantari.json";
import NetInfo from "@react-native-community/netinfo";
import { Alert } from "react-native";
import * as Font from "expo-font";
import axios from "axios";
import { StyleSheet } from "react-native";
import ThemeColors from "./ColorScheme";

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

/**
 * @returns {Promise}
 */

export const fetchSongs = async (url, config) => {
  const response = await axios
    .get(url, {
      headers: {
        "Connection": "Keep-Alive",
      },
    })
    .catch((error) => {
      console.log(error.toJSON());
      if (error.response) return error.response.data;
      else if (error.request) Alert.alert("Serverul este offline");
      else return error.message;
    });
  return { data: response.data, status: response.status };
};

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

export const useThemeStyle = () => {
  const [theme] = useTheme();
  const themeStyle = StyleSheet.create({
    bgColor: {
      backgroundColor: theme.data
        ? ThemeColors.darkBgColor
        : ThemeColors.lightBgColor,
    },
    txtColor: {
      color: theme.data ? ThemeColors.darkTxtColor : ThemeColors.lightTxtColor,
    },
    inverseBgColor: {
      backgroundColor: theme.data
        ? ThemeColors.lightBgColor
        : ThemeColors.darkBgColor,
    },
    inverseTxtColor: {
      color: theme.data ? ThemeColors.lightTxtColor : ThemeColors.darkTxtColor,
    },
    borderColor: {
      borderColor: theme.data
        ? ThemeColors.darkTxtColor
        : ThemeColors.lightTxtColor,
    },
  });

  return themeStyle;
};
