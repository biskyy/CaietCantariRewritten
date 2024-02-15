import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

// Screens
import HomeScreen from "./screens/HomeScreen";
import SongScreen from "./screens/SongScreen";
import SettingsScreen from "./screens/SettingsScreen";

import Navbar from "./components/Navbar";

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
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
