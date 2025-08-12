import { useEffect } from "react";
import { Platform, StyleSheet, Text } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";

import { useLoadingScreen } from "@/hooks/useLoadingScreen";
import { useTheme } from "@react-navigation/native";

const LoadingScreen = () => {
  // const themeStyle = useThemeStyle();
  const theme = useTheme();
  const [loadingScreen, setLoadingScreen] = useLoadingScreen();

  const opacity = useSharedValue(0);

  useEffect(() => {
    if (loadingScreen.state == "fading_in")
      opacity.value = withTiming(1, { duration: 500 });
    else if (loadingScreen.state == "fading_out")
      opacity.value = withTiming(0, { duration: 500 }, () => {
        runOnJS(setLoadingScreen)({
          state: "inactive",
          label: "",
        });
        runOnJS(loadingScreen.callback)();
      });
  }, [loadingScreen]);

  return (
    <Animated.View
      style={{
        opacity,
        zIndex: loadingScreen.state !== "inactive" ? 1 : -1,
        elevation: loadingScreen.state !== "inactive" ? 1 : -1, // stupid android
        ...styles.loadingScreenDiv,
        backgroundColor: theme.colors.background,
      }}
    >
      <MaterialIcons
        name="menu-book"
        size={200}
        style={{ fontWeight: "normal", color: theme.colors.text }} // doesnt work, check "not possible" category on trellon
      />
      <Text style={[{ color: theme.colors.text }, styles.textStyle]}>
        {loadingScreen.label}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  loadingScreenDiv: {
    position: "absolute",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: Platform.OS === "ios" ? 32 : 24,
    textAlign: "center",
    fontWeight: "normal",
  },
});

export default LoadingScreen;
