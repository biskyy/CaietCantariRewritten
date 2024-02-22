import { Text, StyleSheet, View } from "react-native";
import ThemeColors from "../components/ColorScheme";
import { useTheme } from "../components/State";
import { useAtom } from "jotai";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";

export default function SettingsScreen() {
  const [theme] = useTheme();

  const navigation = useNavigation();

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
      <View style={[themeStyle.bgColor, styles.settingsDiv]}>
        <Button
          textStyle={[themeStyle.txtColor, styles.loginButtonText]}
          touchableStyle={[themeStyle.bgColor, styles.loginButton]}
          // @ts-ignore
          onPress={() => navigation.navigate("Login")}
          text="Login"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  settingsDiv: {
    height: "100%",
    alignItems: "center",
    paddingTop: 20,
  },
  loginButton: {
    width: "100%",
    alignItems: "center",
    padding: 20,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
