import { View, StyleSheet, Alert, Keyboard, ScrollView } from "react-native";
import ThemeColors from "../components/ColorScheme";
import { useAtom } from "jotai";
import {
  userAtom,
  useTheme,
  checkInternetConnection,
} from "../components/State";
import Input from "../components/Input";
import { useRef, useState } from "react";
import Button from "../components/Button";

const LoginScreen = () => {
  const [theme] = useTheme();
  const [user, setUser] = useAtom(userAtom);

  const [usernameText, setUsernameText] = useState("");
  const [passwordText, setPasswordText] = useState("");

  const passwordInputRef = useRef();

  const themeStyle = StyleSheet.create({
    bgColor: {
      backgroundColor: theme.data
        ? ThemeColors.darkBgColor
        : ThemeColors.lightBgColor,
    },
    txtColor: {
      color: theme.data ? ThemeColors.darkTxtColor : ThemeColors.lightTxtColor,
    },
    inverseBgColor: {
      backgroundColor: theme.data
        ? ThemeColors.lightBgColor
        : ThemeColors.darkBgColor,
    },
    inverseTxtColor: {
      color: theme.data ? ThemeColors.lightTxtColor : ThemeColors.darkTxtColor,
    },
  });

  const loginRequest = async (username, password) => {
    checkInternetConnection();
    try {
      const response = await fetch("http://192.168.1.59:3000/login", {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      const { message, token } = await response.json();
      if (message === "Logged in") {
        setUser({ loggedIn: true, token });
        setUsernameText("");
        setPasswordText("");
        // Keyboard.dismiss();
        Alert.alert("Logged in", "You have successfully logged in.");
      } else Alert.alert(message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView
      style={[themeStyle.bgColor, styles.loginDiv]}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <Input
        // @ts-ignore
        placeholder="User"
        value={usernameText}
        onChangeText={setUsernameText}
        returnKeyType="next"
        blurOnSubmit={false}
        // @ts-ignore
        onSubmitEditing={() => passwordInputRef.current.focus()}
      />

      <Input
        // @ts-ignore
        placeholder="Password"
        value={passwordText}
        ref={passwordInputRef}
        onChangeText={setPasswordText}
        blurOnSubmit={false}
        onSubmitEditing={async () =>
          await loginRequest(usernameText, passwordText)
        }
        returnKeyType="done"
      />
      <Button
        textStyle={[themeStyle.inverseTxtColor, styles.loginButtonText]}
        touchableStyle={[themeStyle.inverseBgColor, styles.loginButton]}
        text="Login"
        onPress={async () => await loginRequest(usernameText, passwordText)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loginDiv: {
    height: "100%",
    // alignItems: "center",
  },
  loginButton: {
    marginTop: 30,
    padding: 20,
    borderRadius: 10,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;
