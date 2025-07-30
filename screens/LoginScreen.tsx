import { useRef, useState } from "react";
import {
  StyleSheet,
  Alert,
  ScrollView,
  Keyboard,
  TextInput,
} from "react-native";
import { useAtom } from "jotai";

import Input from "@/components/Input";
import Button from "@/components/Button/Button";

import { userAtom } from "@/state/persistent";
import { login } from "@/state/utils";

import { useThemeStyle } from "@/hooks/useThemeStyle";
import { useLoadingScreen } from "@/hooks/useLoadingScreen";

const LoginScreen = () => {
  const themeStyle = useThemeStyle();
  const [user, setUser] = useAtom(userAtom);
  const [, setLoadingScreen] = useLoadingScreen();

  const [usernameText, setUsernameText] = useState("");
  const [passwordText, setPasswordText] = useState("");

  const passwordInputRef = useRef<TextInput>(null);

  const handleLoginButton = async () => {
    Keyboard.dismiss();
    setLoadingScreen({ state: "fading_in", label: "Se incarca" });
    const response = await login(usernameText, passwordText);
    if (response.status === 200 && response.data !== undefined) {
      setUsernameText("");
      setPasswordText("");
      Keyboard.dismiss();
      setUser({
        ...user,
        adminToken: response.data.token,
      });
    }
    setLoadingScreen({
      state: "fading_out",
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
        placeholder="Username"
        value={usernameText}
        onChangeText={setUsernameText}
        returnKeyType="next"
        // blurOnSubmit={false}
        submitBehavior="blurAndSubmit"
        clearShortcut
        textInputDivStyle={{ marginTop: 20, width: "95%" }}
        onSubmitEditing={() => {
          if (passwordInputRef.current !== null) {
            if (usernameText !== "") passwordInputRef.current.focus();
            else Keyboard.dismiss();
          }
        }}
      />

      <Input
        // @ts-ignore
        placeholder="Password"
        value={passwordText}
        ref={passwordInputRef}
        onChangeText={setPasswordText}
        // blurOnSubmit={false}
        submitBehavior="blurAndSubmit"
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
        type="primary"
        touchableStyle={{ marginTop: 30 }}
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
});

export default LoginScreen;
