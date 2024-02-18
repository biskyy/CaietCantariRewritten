import { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";
import { useAtom } from "jotai";
import { isLoadingAtom, themeAtom } from "./State";
import ThemeColors from "./ColorScheme";

const LoadingScreen = () => {
  const [theme] = useAtom(themeAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

  const opacity = useSharedValue(0);

  const themeStyle = StyleSheet.create({
    bgColor: {
      backgroundColor: theme
        ? ThemeColors.darkBgColor
        : ThemeColors.lightBgColor,
    },
    txtColor: {
      color: theme ? ThemeColors.darkTxtColor : ThemeColors.lightTxtColor,
    },
  });

  useEffect(() => {
    if (isLoading == 1) opacity.value = withTiming(1, { duration: 500 });
    else if (isLoading == 2)
      opacity.value = withTiming(0, { duration: 500 }, () =>
        runOnJS(setIsLoading)(0)
      );
  }, [isLoading]);

  return (
    <Animated.View
      style={{
        zIndex: isLoading ? 1 : -1,
        opacity,
        ...styles.loadingScreenDiv,
        ...themeStyle.bgColor,
      }}
    >
      <MaterialIcons
        name="menu-book"
        style={[themeStyle.txtColor, styles.iconStyle]}
      />
      <Text style={[themeStyle.txtColor, styles.textStyle]}>
        Se actualizează cântările
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
    fontSize: 32,
  },
});

export default LoadingScreen;
