import "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { Appearance, Platform, useColorScheme } from "react-native";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useAtom } from "jotai";

import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import * as ScreenOrientation from "expo-screen-orientation";
import * as SystemUI from "expo-system-ui";
import * as NavigationBar from "expo-navigation-bar";

// Screens
import HomeScreen from "./screens/HomeScreen";
import SongScreen from "./screens/SongScreen";
import SettingsScreen from "./screens/SettingsScreen";
import LoadingScreen from "./components/LoadingScreen";
import LoginScreen from "@/screens/LoginScreen";
import UpdateSongScreen from "@/screens/UpdateSongScreen";
import Navbar from "@/components/Navbar";

import { orientationAtom } from "@/state/global";
import { cacheFontsAndIcons } from "@/state/utils";

import {
  themeAtom,
  userFavoriteSongsAtom,
  writeableLoadableThemeAtom,
} from "@/state/persistent";
import { DarkTheme, LightTheme } from "@/constants/themes";
import { RootStackParamList } from "@/types/navigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const theme = useTheme();
  const scheme = useColorScheme();

  console.log(scheme);

  const [loaded, setLoaded] = useState(true);
  const [, setOrientation] = useAtom(orientationAtom);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    const preloadFontsAndIcons = async () => {
      await Promise.all([...cacheFontsAndIcons([MaterialIcons.font])]);
    };

    preloadFontsAndIcons();

    setLoaded(false);
  }, []);

  // set orientation state
  // ScreenOrientation.addOrientationChangeListener(({ orientationInfo }) => {
  //   if (
  //     orientationInfo.orientation === 3 ||
  //     orientationInfo.orientation === 4
  //   ) {
  //     setOrientation("landscape");
  //     setStatusBarHidden(true);
  //   } else {
  //     setOrientation("portrait");
  //     setStatusBarHidden(false);
  //   }
  // });

  // useEffect(() => {
  //   if (theme) {
  //     if (Platform.OS === "android") {
  //       NavigationBar.setButtonStyleAsync("light");
  //       NavigationBar.setBackgroundColorAsync("#0a0d0c");
  //     }
  //     SystemUI.setBackgroundColorAsync("#0a0d0c");
  //   } else {
  //     if (Platform.OS === "android") {
  //       NavigationBar.setButtonStyleAsync("dark");
  //       NavigationBar.setBackgroundColorAsync("#f0f4fa");
  //     }
  //     SystemUI.setBackgroundColorAsync("#f0f4fa");
  //   }
  // }, [theme]);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  return (
    <NavigationContainer theme={scheme === "dark" ? DarkTheme : LightTheme}>
      <StatusBar style={scheme === "light" ? "dark" : "light"} />
      <LoadingScreen />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ header: () => <Navbar /> }}
        // screenOptions={{
        //   headerTransparent: true,
        //   headerBlurEffect: "systemChromeMaterial",
        // }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Song" component={SongScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="UpdateSong" component={UpdateSongScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
