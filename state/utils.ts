import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getDefaultStore } from "jotai";
import {
  Alert,
  Platform,
  ScrollViewProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import * as FontManager from "expo-font";

import { API_URL } from "@/constants";
import { userAtom } from "@/state/persistent";

import { Font } from "@/types";
import { Report, Song, UpdatedSongProps, User } from "@/types/state";
import {
  ApiErrorResponse,
  ApiSuccessResponse,
  DefaultResponse,
  LoginResponse,
  UserTokenResponse,
} from "@/types/api";
import { FlashListProps } from "@shopify/flash-list";
import { Edge, EdgeInsets } from "react-native-safe-area-context";

const store = getDefaultStore();

export const isInternetConnected = async (): Promise<boolean | null> => {
  const internet: NetInfoState = await NetInfo.fetch();
  if (!internet.isConnected)
    Alert.alert(
      "Nu exista conexiune la internet",
      "Este necesara o conexiune la internet pentru a realiza o cerere.",
    );
  return internet.isConnected;
};

const getUserToken = async (): Promise<
  ApiSuccessResponse<UserTokenResponse>
> => {
  let user: User = await store.get(userAtom); // need to await bcuz of AsyncStorage

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
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) return handleErrorResponse(error);
      else {
        console.error("axios - get user token: unexpected error");
      }
    }
  }

  const updatedUser = await store.get(userAtom);

  // console.log(await store.get(userAtom));

  return { data: updatedUser.token, status: undefined };
};

export const fetchSongs = async (
  config?: AxiosRequestConfig,
): Promise<ApiSuccessResponse<Song[]>> => {
  if (!(await isInternetConnected())) return { data: undefined, status: 400 };
  const { data: userToken } = await getUserToken();

  try {
    const response = await axios.get(`${API_URL}/songs`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      timeout: 10000,
      ...config,
    });
    return { data: response.data, status: response.status };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) return handleErrorResponse(error);
    else {
      console.error("axios - fetch songs: unexpected error");
    }
  }

  return { data: undefined, status: undefined };
};

export const login = async (
  username: string,
  password: string,
): Promise<ApiSuccessResponse<LoginResponse>> => {
  if (!(await isInternetConnected())) return { data: undefined, status: 400 };
  const { data: userToken } = await getUserToken();

  try {
    const response = await axios.post(
      `${API_URL}/auth/login`,
      { username, password },
      { headers: { Authorization: `Bearer ${userToken}` }, timeout: 10000 },
    );
    return { data: response.data, status: response.status };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) return handleErrorResponse(error);
    else {
      console.error("axios - login: unexpected error");
    }
  }

  return { data: undefined, status: undefined };
};

export const updateSong = async (
  updatedSong: UpdatedSongProps,
  token: string,
): Promise<ApiSuccessResponse<DefaultResponse>> => {
  if (!(await isInternetConnected())) return { data: undefined, status: 400 };

  try {
    const response = await axios.put(`${API_URL}/songs`, updatedSong, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      timeout: 10000,
    });
    return { data: response.data, status: response.status };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) return handleErrorResponse(error);
    else {
      console.error("axios - update song: unexpected error");
    }
  }

  return { data: undefined, status: undefined };
};

export const createReport = async (
  songIndex: number,
  additionalDetails: string,
): Promise<ApiSuccessResponse<DefaultResponse>> => {
  if (!(await isInternetConnected())) return { data: undefined, status: 400 };
  const { data: userToken } = await getUserToken();

  try {
    const response = await axios.post(
      `${API_URL}/reports`,
      { songIndex, additionalDetails },
      { headers: { Authorization: `Bearer ${userToken}` }, timeout: 10000 },
    );
    return { data: response.data, status: response.status };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) return handleErrorResponse(error);
    else {
      console.error("axios - create report: unexpected error");
    }
  }

  return { data: undefined, status: undefined };
};

export const fetchReports = async (): Promise<ApiSuccessResponse<Report[]>> => {
  if (!(await isInternetConnected())) return { data: undefined, status: 400 };
  const { data: userToken } = await getUserToken();

  try {
    const response = await axios.get(`${API_URL}/reports`, {
      headers: { Authorization: `Bearer ${userToken}` },
      timeout: 10000,
    });
    return { data: response.data, status: response.status };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) return handleErrorResponse(error);
    else {
      console.error("axios - fetch reports: unexpected error");
    }
  }

  return { data: undefined, status: undefined };
};

export const deleteReport = async (
  report: Report,
  token: string,
): Promise<ApiSuccessResponse<DefaultResponse>> => {
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) return handleErrorResponse(error);
    else {
      console.error("axios - delete report: unexpected error");
    }
  }

  return { data: undefined, status: undefined };
};

const handleErrorResponse = (error: AxiosError) => {
  if (error?.response?.data) {
    // if we got back a response
    const responseData = error.response.data as ApiErrorResponse;

    Alert.alert(`Eroare: ${error.response.status}`, `${responseData.message}`);

    return { data: undefined, status: error.response.status };
  } else if (error.request) {
    // if we a request was sent successfully but without response

    console.log(error.request);
    Alert.alert(
      "Serverul este offline",
      "Nu s-a putut efectua cererea deoarece serverul nu este online.",
    );

    return { data: undefined, status: 500 };
  } else {
    // if the request wasn't sent
    Alert.alert(
      "Cererea este invalida",
      `${error.message}\n\nTrimite un screenshot la developer;)`,
    );

    return { data: undefined, status: 400 };
  }
};

export const cacheFontsAndIcons = (fonts: Font[]) =>
  fonts.map(async (font) => await FontManager.loadAsync(font)); // cache fonts method

export function getCorrectInsetsForScrollViewsCoveredByAbsoluteViews<T>(
  headerHeight: number,
  topInset: number,
  actionBarHeight?: number,
  bottomInset?: number,
): Partial<FlashListProps<T>>;

export function getCorrectInsetsForScrollViewsCoveredByAbsoluteViews(
  headerHeight: number,
  topInset: number,
  actionBarHeight?: number,
  bottomInset?: number,
): ScrollViewProps;

export function getCorrectInsetsForScrollViewsCoveredByAbsoluteViews<T>(
  headerHeight: number,
  topInset: number,
  actionBarHeight?: number,
  bottomInset?: number,
): Partial<FlashListProps<T>> | ScrollViewProps {
  bottomInset = bottomInset ?? 0;

  return {
    // think of insets like the actual hitbox of the scrollview:
    // the bounding rect can be bigger than the hitbox
    //
    // apply top insets which will bring the list down from under the header but also cause scroll in the list
    // apply bottom insets to counteract the action bar
    contentInset: {
      top: headerHeight - topInset,
      bottom: (actionBarHeight ?? bottomInset) - bottomInset,
    },
    // apply negative offset to counteract the aforementioned scroll
    contentOffset: {
      y: Platform.select({
        default: 0,
        ios: -headerHeight - topInset,
      }),
      x: 0,
    },
    // scrollIndicator by default has applied top insets so we need to subtract that
    scrollIndicatorInsets: {
      top: headerHeight - topInset,
      bottom: (actionBarHeight ?? bottomInset) - bottomInset,
    },
    // this sets some insets of it's own using header height
    contentInsetAdjustmentBehavior: "automatic",
    // TL;DR: this is needed so that we can have transparentHeader(or absolute views such as the action bar)
    // turned on on ios so that we can have blurry background
  };
}

export function getVerticalPaddingForViewsCoveredByAbsoluteViews(
  paddingTop: number,
  paddingBottom: number,
): Pick<ViewStyle, "paddingTop" | "paddingBottom"> {
  return {
    paddingTop: Platform.select({ default: paddingTop, ios: undefined }),
    paddingBottom: Platform.select({ default: paddingBottom, ios: undefined }),
  };
}
