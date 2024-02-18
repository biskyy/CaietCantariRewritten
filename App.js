import "react-native-gesture-handler";
import { Suspense, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

// Screens
import HomeScreen from "./screens/HomeScreen";
import SongScreen from "./screens/SongScreen";
import SettingsScreen from "./screens/SettingsScreen";
import LoadingScreen from "./components/LoadingScreen";

import Navbar from "./components/Navbar";
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();

const cacheFonts = (fonts) => fonts.map((font) => Font.loadAsync(font)); // cache fonts method

export default function App() {
  useEffect(() => {
    const preloadFonts = async () => {
      try {
        SplashScreen.preventAutoHideAsync();

        await Promise.all(cacheFonts([MaterialIcons.font])); // preload fonts
      } catch (error) {
        console.error(error);
      } finally {
        SplashScreen.hideAsync();
      }
    };
    preloadFonts();
  }, []);

  return (
    <>
      <Suspense fallback={<></>}>
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
          </Stack.Navigator>
        </NavigationContainer>
      </Suspense>
    </>
  );
}
