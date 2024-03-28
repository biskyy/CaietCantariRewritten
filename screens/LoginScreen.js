import { StyleSheet, Alert, ScrollView, Keyboard } from "react-native";
import { useAtom } from "jotai";
import { userAtom } from "../components/State";
import Input from "../components/Input";
import { useRef, useState } from "react";
import Button from "../components/Buttons/Button";
import { useLoadingScreen, useThemeStyle } from "../components/Hooks";
import { loginRequest } from "../components/Utils";

const LoginScreen = () => {
  const themeStyle = useThemeStyle();
  const [user, setUser] = useAtom(userAtom);
  const [, setLoadingScreen] = useLoadingScreen();

  const [usernameText, setUsernameText] = useState("");
  const [passwordText, setPasswordText] = useState("");

  const passwordInputRef = useRef();

  const handleLoginButton = async () => {
    Keyboard.dismiss();
    setLoadingScreen({ state: 1, message: "Se incarca" });
    const response = await loginRequest(usernameText, passwordText);
    if (response.status === 200) {
      setUsernameText("");
      setPasswordText("");
      Keyboard.dismiss();
      setUser({
        loggedIn: true,
        token: response.data.token,
        showCategories: user.showCategories,
      });
    }
    setLoadingScreen({
      state: 2,
      callback: () => {
        const status = response.status; // i think this is the only way to pass arguments (i think)
        if (status === 200)
          Alert.alert("Logged in", "You have successfully logged in.");
      },
    });
  };

  return (
    <ScrollView
      style={[themeStyle.bgColor, styles.loginDiv]}
      scrollEnabled={false}
      keyboardShouldPersistTaps="handled" // reason for using ScrollView
      contentContainerStyle={{ alignItems: "center" }}
    >
      <Input
        // @ts-ignore
        placeholder="Username"
        value={usernameText}
        onChangeText={setUsernameText}
        returnKeyType="next"
        blurOnSubmit={false}
        clearShortcut
        textInputDivStyle={{ marginTop: 20, width: "95%" }}
        onSubmitEditing={() => {
          // @ts-ignore
          if (usernameText !== "") passwordInputRef.current.focus();
          else Keyboard.dismiss();
        }}
      />

      <Input
        // @ts-ignore
        placeholder="Password"
        value={passwordText}
        ref={passwordInputRef}
        onChangeText={setPasswordText}
        blurOnSubmit={false}
        clearShortcut
        textInputDivStyle={{ marginTop: 20, width: "95%" }}
        onSubmitEditing={() => {
          Keyboard.dismiss();
          if (passwordText !== "") handleLoginButton();
        }}
        returnKeyType="done"
        secureTextEntry
      />
      <Button
        textStyle={[themeStyle.inverseTxtColor, styles.loginButtonText]}
        touchableStyle={[themeStyle.inverseBgColor, styles.loginButton]}
        text="Login"
        onPress={handleLoginButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loginDiv: {
    height: "100%",
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
