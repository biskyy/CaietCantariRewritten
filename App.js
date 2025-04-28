import "react-native-gesture-handler";
import { Suspense, useEffect, useState } from "react";
import { Platform, View, useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useAtom } from "jotai";

import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar, setStatusBarHidden } from "expo-status-bar";
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

import { useTheme } from "@/hooks/useTheme";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useTheme();
  const [loading, setLoading] = useState(true);
  const [, setOrientation] = useAtom(orientationAtom);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    const preloadFontsAndIcons = async () => {
      await Promise.all(cacheFontsAndIcons([MaterialIcons.font]));
      setLoading(false);
    };

    preloadFontsAndIcons();
  }, []);

  // set orientation statee
  ScreenOrientation.addOrientationChangeListener(({ orientationInfo }) => {
    if (
      orientationInfo.orientation === 3 ||
      orientationInfo.orientation === 4
    ) {
      setOrientation("landscape");
      setStatusBarHidden(true);
    } else {
      setOrientation("portrait");
      setStatusBarHidden(false);
    }
  });

  useEffect(() => {
    if (theme.data) {
      if (Platform.OS === "android") {
        NavigationBar.setButtonStyleAsync("light");
        NavigationBar.setBackgroundColorAsync("#0a0d0c");
      }
      SystemUI.setBackgroundColorAsync("#0a0d0c");
    } else {
      if (Platform.OS === "android") {
        NavigationBar.setButtonStyleAsync("dark");
        NavigationBar.setBackgroundColorAsync("#f0f4fa");
      }
      SystemUI.setBackgroundColorAsync("#f0f4fa");
    }
  }, [theme.data]);

  useEffect(() => {
    if (theme.state !== "loading") {
      if (theme.data === "not set")
        if (colorScheme === "light") setTheme(false);
        else setTheme(true);
      else if (theme.data !== "not set" && !loading) SplashScreen.hideAsync();
    }
  }, [theme, loading]);

  return (
    // <Suspense fallback={<View style={{ backgroundColor: "blue" }}></View>}>
    // <View style={{ flex: 1, ...themeStyle.bgColor }}>
    <Suspense
      fallback={<View style={{ flex: 1, backgroundColor: "blue" }}></View>}
    >
      <>
        <StatusBar style={theme.data ? "light" : "dark"} />
        <LoadingScreen />
        <NavigationContainer theme={theme.data ? DarkTheme : DefaultTheme}>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ header: () => <Navbar /> }}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Cantare" component={SongScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="UpdateSong" component={UpdateSongScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    </Suspense>
    // </View>
    // </Suspense>
  );
}
