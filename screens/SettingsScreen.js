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
        {!user.loggedIn ? (
          <Button
            icon="login"
            // primary
            secondary
            iconSize={20}
            touchableStyle={{ width: "100%", marginVertical: 2.5 }}
            // @ts-ignore
            onPress={() => navigation.navigate("Login")}
            text="Login"
          />
        ) : (
          <Button
            icon="logout"
            iconSize={20}
            touchableStyle={{ width: "100%", marginVertical: 2.5 }}
            secondary
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
        <Button
          text="Arata categoriile pe meniul principal"
          icon={user.showCategories ? "check-box" : "check-box-outline-blank"}
          iconSize={20}
          touchableStyle={{ width: "100%", marginVertical: 2.5 }}
          // @ts-ignore
          onPress={() => {
            setUser({
              loggedIn: user.loggedIn,
              token: user.token,
              showCategories: !user.showCategories,
            });
          }}
          secondary
        />
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
