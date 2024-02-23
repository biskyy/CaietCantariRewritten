import { StyleSheet, Alert, ScrollView, Keyboard } from "react-native";
import { useAtom } from "jotai";
import {
  userAtom,
  useThemeStyle,
  loginRequest,
  loadingScreenAtom,
} from "../components/State";
import Input from "../components/Input";
import { useRef, useState } from "react";
import Button from "../components/Button";

const LoginScreen = () => {
  const themeStyle = useThemeStyle();
  const [, setUser] = useAtom(userAtom);
  const [, setLoadingScreen] = useAtom(loadingScreenAtom);

  const [usernameText, setUsernameText] = useState("");
  const [passwordText, setPasswordText] = useState("");

  const passwordInputRef = useRef();

  const handleLoginButton = async () => {
    setLoadingScreen({ state: 1, message: "Se incarca" });
    const response = await loginRequest(usernameText, passwordText);
    setLoadingScreen({ state: 2, message: "Se incarca" });
    if (response?.message === "Logged in") {
      Alert.alert("Logged in", "You have successfully logged in.");
      setUsernameText("");
      setPasswordText("");
      Keyboard.dismiss();
      setUser({ loggedIn: true, token: response.token });
    }
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
        onSubmitEditing={handleLoginButton}
        returnKeyType="done"
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
