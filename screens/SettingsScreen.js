import { StyleSheet, View } from "react-native";
import Button from "../components/Buttons/Button";
import { useNavigation } from "@react-navigation/native";
import { useThemeStyle } from "../components/Hooks";
import { useAtom } from "jotai";
import { userAtom } from "../components/State";

export default function SettingsScreen() {
  const themeStyle = useThemeStyle();
  const [user, setUser] = useAtom(userAtom);

  const navigation = useNavigation();

  return (
    <>
      <View style={[themeStyle.bgColor, styles.settingsDiv]}>
        <Button
          icon="login"
          // primary
          secondary
          iconSize={20}
          iconStyle={{ marginRight: 10 }}
          touchableStyle={{ width: "100%" }}
          // @ts-ignore
          onPress={() => navigation.navigate("Login")}
          text="Login"
        />
        {user.loggedIn && (
          <Button
            textStyle={[themeStyle.txtColor, styles.loginButtonText]}
            touchableStyle={[themeStyle.bgColor, styles.loginButton]}
            // @ts-ignore
            onPress={() =>
              setUser({
                loggedIn: false,
                token: "",
                showCategories: user.showCategories,
              })
            }
            text="Logout"
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  settingsDiv: {
    height: "100%",
    alignItems: "center",
    padding: 20,
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
