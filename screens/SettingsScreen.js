import { Text, StyleSheet, View } from "react-native";
import ThemeColors from "../components/ColorScheme";
import { themeAtom } from "../components/State";
import { useAtom } from "jotai";

export default function SettingsScreen() {
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
      <View style={[themeStyle.bgColor, styles.settingsDiv]}></View>
    </>
  );
}

const styles = StyleSheet.create({
  settingsDiv: {
    height: "100%",
  },
});
