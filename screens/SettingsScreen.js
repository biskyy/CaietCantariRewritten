import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";

import Button from "@/components/Button/Button";

import { userAtom, userPrefsAtom } from "@/state/persistent";

import { useThemeStyle } from "@/hooks/useThemeStyle";

export default function SettingsScreen() {
  const themeStyle = useThemeStyle();

  const [userPrefs, setUserPrefs] = useAtom(userPrefsAtom);
  const [user, setUser] = useAtom(userAtom);

  const navigation = useNavigation();

  return (
    <>
      <View style={[themeStyle.bgColor, styles.settingsDiv]}>
        {!user.adminToken ? (
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
                adminToken: "",
              })
            }
            text="Logout"
          />
        )}
        <Button
          text="Arata categoriile pe meniul principal"
          icon={
            userPrefs.showCategories ? "check-box" : "check-box-outline-blank"
          }
          iconSize={20}
          touchableStyle={{ width: "100%", marginVertical: 2.5 }}
          // @ts-ignore
          onPress={() => {
            setUserPrefs({
              ...userPrefs,
              showCategories: !userPrefs.showCategories,
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
