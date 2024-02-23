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

export const serverApi = "http://192.168.1.59:3000";

const storage = createJSONStorage(() => AsyncStorage);
export const themeAtom = atomWithStorage("theme", "not set", storage, {
  getOnInit: true,
});
export const songsAtom = atomWithStorage("songs", Cantari, storage);
export const loadingScreenAtom = atom({ state: 0, message: "" });
export const userAtom = atomWithStorage(
  "user",
  { loggedIn: false, token: "" },
  storage
);

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

export const isInternetConnected = async () => {
  const internet = await NetInfo.fetch();
  if (!internet.isConnected)
    Alert.alert(
      "Nu exista conexiune la internet",
      "Este necesare o conexiune la internet pentru a actualiza cantarile."
    );
  return internet.isConnected;
};

export const fetchSongsRequest = async (config) => {
  if (!(await isInternetConnected())) return { data: undefined, status: 400 };
  const response = await axios
    .get(`${serverApi}/songs`, {
      timeout: 5000,
      ...config,
    })
    .catch((error) => {
      if (error.response) {
        Alert.alert(
          `Ceva nu a mers bine: eroare ${error.response.status}`,
          `${error.response.data.message}\n\nVorbeste cu developer-ul.`
        );
        return { data: undefined, status: error.response.status };
      } else if (error.request) {
        Alert.alert(
          "Serverul este offline",
          "Nu s-au putut actualiza cantarile deoarece serverul este offline."
        );
        return { data: undefined, status: 500 };
      } else {
        Alert.alert(
          "Cererea nu este buna",
          `${error.message}\n\nVorbeste cu developer-ul.`
        );
        return { data: undefined, status: 400 };
      }
    });
  return { data: response.data, status: response.status };
};

export const loginRequest = async (username, password) => {
  if (!(await isInternetConnected())) return;
  const response = await axios
    .post(
      `${serverApi}/login`,
      {
        username,
        password,
      },
      { timeout: 5000 }
    )
    .catch((error) => {
      if (error.response) {
        Alert.alert(error.response.data.message);
        return error.response;
      } else if (error.request) {
        Alert.alert(
          "Serverul este offline",
          "Nu s-a putut realiza o cerere de logare deoarece serverul este offline."
        );
        return { message: "Server offline" };
      } else {
        Alert.alert("Cererea nu este buna", error.message);
        return { message: "Bad request" };
      }
    });

  if (response.data) return response.data;
};

export const cacheFonts = (fonts) => fonts.map((font) => Font.loadAsync(font)); // cache fonts method
