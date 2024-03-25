import axios from "axios";
import { Alert } from "react-native";
import { apiUrl } from "./State";
import NetInfo from "@react-native-community/netinfo";
import * as Font from "expo-font";

/**
 * @returns boolean
 */
export const isInternetConnected = async () => {
  const internet = await NetInfo.fetch();
  if (!internet.isConnected)
    Alert.alert(
      "Nu exista conexiune la internet",
      "Este necesara o conexiune la internet pentru a realiza o cerere."
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
    const response = await axios.get(`${apiUrl}/songs`, {
      timeout: 10000,
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
  if (!(await isInternetConnected())) return { data: undefined, status: 400 };

  try {
    const response = await axios.post(
      `${apiUrl}/login`,
      { username, password },
      { timeout: 10000 }
    );
    return { data: response.data, status: response.status };
  } catch (error) {
    return handleErrorResponse(error);
  }
};

/**
 * @param {import("./State").SongObject} updatedSong
 */

export const updateSongRequest = async (updatedSong, token) => {
  if (!(await isInternetConnected())) return { data: undefined, status: 400 };

  try {
    const response = await axios.put(`${apiUrl}/songs`, updatedSong, {
      headers: {
        authorization: token,
      },
      timeout: 10000,
    });
    return { data: response.data, status: response.status };
  } catch (error) {
    return handleErrorResponse(error);
  }
};

export const createReport = async (songIndex, additionalDetails) => {
  if (!(await isInternetConnected())) return { data: undefined, status: 400 };
  try {
    const response = await axios.post(
      `${apiUrl}/reports`,
      { songIndex, additionalDetails },
      { timeout: 10000 }
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
