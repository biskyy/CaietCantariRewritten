import { useAtom } from "jotai";
import { View, StyleSheet } from "react-native";
import { themeAtom } from "../components/State";
import ThemeColors from "../components/ColorScheme";

export default function SongScreen() {
  const [theme] = useAtom(themeAtom);

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
