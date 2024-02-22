import "react-native-gesture-handler";
import { Suspense, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";

// Screens
import HomeScreen from "./screens/HomeScreen";
import SongScreen from "./screens/SongScreen";
import SettingsScreen from "./screens/SettingsScreen";
import LoadingScreen from "./components/LoadingScreen";

import Navbar from "./components/Navbar";
import { MaterialIcons } from "@expo/vector-icons";
import LoginScreen from "./screens/LoginScreen";
import EditSongScreen from "./screens/EditSong";
import { View, useColorScheme } from "react-native";
import { cacheFonts, useTheme } from "./components/State";
const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const preloadFonts = async () => {
      try {
        await Promise.all(cacheFonts([MaterialIcons.font]));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    preloadFonts();
  }, []);

  useEffect(() => {
    if (theme.state !== "loading" && theme.data === "not set")
      if (colorScheme === "light") setTheme(false);
      else setTheme(true);
  }, [theme]);

  useEffect(() => {
    if (theme.state !== "loading" && theme.data !== "not set" && !loading)
      SplashScreen.hideAsync();
  }, [theme, loading]);

  return (
    // <Suspense fallback={<View style={{ backgroundColor: "blue" }}></View>}>
    //   <Suspense fallback={<View style={{ backgroundColor: "red" }}></View>}>
    <>
      <LoadingScreen />

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // new screen slides from right to left on android
            header: () => <Navbar />,
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ header: () => <></> }}
          />
          <Stack.Screen name="Song" component={SongScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="EditSong" component={EditSongScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
    //   </Suspense>
    // </Suspense>
  );
}
