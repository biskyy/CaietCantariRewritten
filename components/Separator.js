import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { useAtom } from "jotai";
import ThemeColors from "./ColorScheme";
import { useTheme } from "./State";

function Separator() {
  const [theme] = useTheme();

  const themeStyle = StyleSheet.create({
    bgColor: {
      backgroundColor: !theme.data
        ? ThemeColors.darkBgColor
        : ThemeColors.lightBgColor,
    },
  });

  return <View style={[styles.separator, themeStyle.bgColor]} />;
}

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: 2,
  },
});

export default memo(Separator);
