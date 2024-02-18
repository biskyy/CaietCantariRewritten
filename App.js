import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { View, Text } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useAtom } from "jotai";

// Screens
import HomeScreen from "./screens/HomeScreen";
import SongScreen from "./screens/SongScreen";
import SettingsScreen from "./screens/SettingsScreen";

import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { isLoadingAtom } from "./components/State";

const Stack = createStackNavigator();

const cacheFonts = (fonts) => fonts.map((font) => Font.loadAsync(font)); // cache fonts method

export default function App() {
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

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
      <View style={{}}></View>
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
    </>
  );
}
