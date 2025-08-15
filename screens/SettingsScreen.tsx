import { ScrollView, StyleSheet, View } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useAtom } from "jotai";

import Button from "@/components/Button/Button";

import { userAtom, userPrefsAtom } from "@/state/persistent";
import Icon from "@/components/Icon";

export default function SettingsScreen() {
  const theme = useTheme();

  const [userPrefs, setUserPrefs] = useAtom(userPrefsAtom);
  const [user, setUser] = useAtom(userAtom);

  const navigation = useNavigation();

  return (
    <>
      <ScrollView
        contentContainerStyle={[
          { backgroundColor: theme.colors.background },
          styles.settingsDiv,
        ]}
        contentInsetAdjustmentBehavior="always"
      >
        {user.adminToken === undefined ? (
          <Button
            text="Login"
            icon={() => <Icon.Mat name="login" size={20} />}
            // primary
            type="secondary"
            touchableStyle={{ width: "100%", marginVertical: 2.5 }}
            // @ts-ignore
            onPress={() => navigation.navigate("Login")}
          />
        ) : (
          <Button
            text="Logout"
            icon={() => <Icon.Mat name="logout" size={20} />}
            type="secondary"
            touchableStyle={{ width: "100%", marginVertical: 2.5 }}
            onPress={() => {
              setUser({
                ...user,
                adminToken: undefined,
              });
            }}
          />
        )}
        <Button
          text="Arata categoriile pe meniul principal"
          icon={() => (
            <Icon.Mat
              name={
                userPrefs.showCategories
                  ? "check-box"
                  : "check-box-outline-blank"
              }
              size={20}
            />
          )}
          touchableStyle={{ width: "100%", marginVertical: 2.5 }}
          // @ts-ignore
          onPress={() => {
            setUserPrefs({
              ...userPrefs,
              showCategories: !userPrefs.showCategories,
            });
          }}
          type="secondary"
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  settingsDiv: {
    // height: "100%",
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
