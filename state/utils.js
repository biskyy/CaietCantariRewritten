import axios from "axios";
import { getDefaultStore, useAtom } from "jotai";
import { Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import * as Font from "expo-font";

import { API_URL } from "@/constants";
import { userAtom } from "@/state/persistent";

const store = getDefaultStore();

/**
 * @returns boolean
 */
export const isInternetConnected = async () => {
  const internet = await NetInfo.fetch();
  if (!internet.isConnected)
    Alert.alert(
      "Nu exista conexiune la internet",
      "Este necesara o conexiune la internet pentru a realiza o cerere.",
    );
  return internet.isConnected;
};

const getUserToken = async () => {
  let user = await store.get(userAtom); // need to await bcuz of AsyncStorage

  if (!user.tokenExpiryDate) {
    // if for some reason the user doesnt have a tokenExpiryDate reset it
    await store.set(userAtom, {
      ...user,
      tokenExpiryDate: 0,
    });

    user = await store.get(userAtom);
  }

  if (user.tokenExpiryDate < Date.now()) {
    // token expired, resetting
    console.log("resetting token");

    try {
      const response = await axios.get(`${API_URL}/auth/token`, {
        timeout: 10000,
      });

      await store.set(userAtom, {
        ...user,
        token: response.data.token,
        tokenExpiryDate: Date.now() + 60 * 60 * 1000,
      });
    } catch (error) {
      return handleErrorResponse(error);
    }
  }

  const updatedUser = await store.get(userAtom);

  // console.log(await store.get(userAtom));

  return updatedUser.token;
};

/**
 *
 * @param {Object} config
 * @returns {Promise<{data: any, status: number}>}
 */
export const fetchSongsRequest = async (config) => {
  if (!(await isInternetConnected())) return { data: undefined, status: 400 };
  const userToken = await getUserToken();

  // console.log(userToken);

  try {
    const response = await axios.get(`${API_URL}/songs`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
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
  const userToken = await getUserToken();

  try {
    const response = await axios.post(
      `${API_URL}/auth/login`,
      { username, password },
      { headers: { Authorization: `Bearer ${userToken}` }, timeout: 10000 },
    );
    return { data: response.data, status: response.status };
  } catch (error) {
    return handleErrorResponse(error);
  }
};

/**
 * @param {import("@/state/global").SongObject} updatedSong
 */

export const updateSongRequest = async (updatedSong, token) => {
  if (!(await isInternetConnected())) return { data: undefined, status: 400 };

  console.log(token);

  try {
    const response = await axios.put(`${API_URL}/songs`, updatedSong, {
      headers: {
        authorization: `Bearer ${token}`,
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
  const userToken = await getUserToken();

  try {
    const response = await axios.post(
      `${API_URL}/reports`,
      { songIndex, additionalDetails },
      { headers: { Authorization: `Bearer ${userToken}` }, timeout: 10000 },
    );
    return { data: response.data, status: response.status };
  } catch (error) {
    return handleErrorResponse(error);
  }
};

export const fetchReports = async () => {
  if (!(await isInternetConnected())) return { data: undefined, status: 400 };
  const userToken = await getUserToken();

  try {
    const response = await axios.get(`${API_URL}/reports`, {
      headers: { Authorization: `Bearer ${userToken}` },
      timeout: 10000,
    });
    return { data: response.data, status: response.status };
  } catch (error) {
    return handleErrorResponse(error);
  }
};

export const deleteReport = async (report, token) => {
  if (!(await isInternetConnected())) return { data: undefined, status: 400 };

  try {
    const response = await axios.delete(`${API_URL}/reports`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      timeout: 10000,
      data: report,
    });
    return { data: response.data, status: response.status };
  } catch (error) {
    return handleErrorResponse(error);
  }
};

const handleErrorResponse = (error) => {
  if (error.response) {
    Alert.alert(
      `Eroare: ${error.response.status}`,
      `${error.response.data.message}`,
    );
    return { data: undefined, status: error.response.status };
  } else if (error.request) {
    console.log(error.request);
    Alert.alert(
      "Serverul este offline",
      "Nu s-a putut efectua cererea deoarece serverul nu este online.",
    );
    return { data: undefined, status: 500 };
  } else {
    Alert.alert(
      "Cererea este invalida",
      `${error.message}\n\nTrimite un screenshot la developer;)`,
    );
    return { data: undefined, status: 400 };
  }
};

export const cacheFontsAndIcons = (fonts) =>
  fonts.map((font) => Font.loadAsync(font)); // cache fonts method
