import { useEffect } from "react";
import { Platform, StyleSheet, Text } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";
import { useLoadingScreen, useThemeStyle } from "./Hooks";

const LoadingScreen = () => {
  const themeStyle = useThemeStyle();
  const [loadingScreen, setLoadingScreen] = useLoadingScreen();

  const opacity = useSharedValue(0);

  useEffect(() => {
    if (loadingScreen.state == 1)
      opacity.value = withTiming(1, { duration: 500 });
    else if (loadingScreen.state == 2)
      opacity.value = withTiming(0, { duration: 500 }, () => {
        runOnJS(setLoadingScreen)({
          state: 0,
          message: "",
        });
        runOnJS(loadingScreen.callback)();
      });
  }, [loadingScreen]);

  return (
    <Animated.View
      style={{
        opacity,
        zIndex: loadingScreen.state ? 1 : -1,
        elevation: loadingScreen.state ? 1 : -1, // stupid android
        ...styles.loadingScreenDiv,
        ...themeStyle.bgColor,
      }}
    >
      <MaterialIcons
        name="menu-book"
        style={[themeStyle.txtColor, styles.iconStyle]}
      />
      <Text style={[themeStyle.txtColor, styles.textStyle]}>
        {loadingScreen.message}
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
  iconStyle: {
    fontSize: 200,
  },
  textStyle: {
    fontSize: Platform.OS === "ios" ? 32 : 24,
    textAlign: "center",
    fontWeight: "normal",
  },
});

export default LoadingScreen;
