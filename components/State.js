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
export const songsAtom = atomWithStorage("songs", Cantari, storage);
export const userAtom = atomWithStorage(
  "user",
  { loggedIn: false, token: "" },
  storage
);

export const loadingScreenAtom = atom({
  state: 0,
  message: "",
  callback: () => {},
});

/**
 * @typedef {Object} LoadingScreenObject
 * @property {number} state
 * @property {string} message
 * @property {(...args: any[]) => void} callback
 *
 * @returns {[LoadingScreenObject, Function: (object: Partial<LoadingScreenObject>) => void]}
 */

export const useLoadingScreen = () => {
  const [loadingScreen, setLoadingScreen] = useAtom(loadingScreenAtom);
  const _setLoadingScreen = (newKey) => {
    setLoadingScreen((prevObject) => ({ ...prevObject, ...newKey }));
  };
  return [loadingScreen, _setLoadingScreen];
};

export const themeAtom = atomWithStorage("theme", "not set", storage, {
  getOnInit: true,
});

const readOnlyLoadableThemeAtom = loadable(themeAtom);

const writeableLoadableThemeAtom = atom(
  (get) => get(readOnlyLoadableThemeAtom),
  async (_get, set, arg) => set(themeAtom, arg)
);

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

/**
 * @returns boolean
 */
export const isInternetConnected = async () => {
  const internet = await NetInfo.fetch();
  if (!internet.isConnected)
    Alert.alert(
      "Nu exista conexiune la internet",
      "Este necesare o conexiune la internet pentru a realiza o cerere."
    );
  return internet.isConnected;
};

/**
 *
 * @param {Object} config
 * @returns {Promise<{data: any, status: number}>}
 */
export const fetchSongsRequest = async (config) => {
  if (!(await isInternetConnected())) return { data: undefined, status: 400 };

  try {
    const response = await axios.get(`${serverApi}/songs`, {
      timeout: 5000,
      ...config,
    });
    return { data: response.data, status: response.status };
  } catch (error) {
    return handleErrorResponse(error);
  }
};

/**
 *
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{data: Object, status: number}>}
 */
export const loginRequest = async (username, password) => {
  if (!(await isInternetConnected())) return;

  try {
    const response = await axios.post(
      `${serverApi}/login`,
      { username, password },
      { timeout: 5000 }
    );
    return { data: response.data, status: response.status };
  } catch (error) {
    return handleErrorResponse(error);
  }
};

const handleErrorResponse = (error) => {
  if (error.response) {
    Alert.alert(
      `Eroare: ${error.response.status}`,
      `${error.response.data.message}`
    );
    return { data: undefined, status: error.response.status };
  } else if (error.request) {
    Alert.alert(
      "Serverul este offline",
      "Nu s-a putut efectua cererea deoarece serverul nu este online."
    );
    return { data: undefined, status: 500 };
  } else {
    Alert.alert(
      "Cererea este invalida",
      `${error.message}\n\nTrimite un screenshot la developer ;)`
    );
    return { data: undefined, status: 400 };
  }
};

export const cacheFontsAndIcons = (fonts) =>
  fonts.map((font) => Font.loadAsync(font)); // cache fonts method
