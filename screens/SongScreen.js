import { useAtom } from "jotai";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../components/State";
import ThemeColors from "../components/ColorScheme";

export default function SongScreen() {
  const [theme] = useTheme();

  const themeStyle = StyleSheet.create({
    bgColor: {
      backgroundColor: theme.data
        ? ThemeColors.darkBgColor
        : ThemeColors.lightBgColor,
    },
    txtColor: {
      color: theme.data ? ThemeColors.darkTxtColor : ThemeColors.lightTxtColor,
    },
  });
  return (
    <>
      <View style={[themeStyle.bgColor, styles.songDiv]}></View>
    </>
  );
}

const styles = StyleSheet.create({
  songDiv: {
    height: "100%",
  },
});
