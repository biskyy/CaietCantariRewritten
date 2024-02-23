import { StyleSheet, View } from "react-native";
import { useThemeStyle } from "../components/State";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";

export default function SettingsScreen() {
  const themeStyle = useThemeStyle();

  const navigation = useNavigation();

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
