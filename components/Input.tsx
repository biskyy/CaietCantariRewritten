import { forwardRef, memo } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

import Shades from "@/constants/colors";
import { useTheme } from "@react-navigation/native";
import Button from "./Button/Button";
import Icon from "./Icon";

interface InputProps extends TextInputProps {
  textInputDivStyle: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  clearShortcut?: boolean;
}

const Input = forwardRef<TextInput, InputProps>((props: InputProps, ref) => {
  const theme = useTheme();

  const { textInputDivStyle, textInputStyle, clearShortcut } = props;

  return (
    <View
      style={[
        styles.textInputDiv,
        {
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.border,
        },
        textInputDivStyle,
      ]}
    >
      <TextInput
        {...props}
        ref={ref}
        style={[{ color: theme.colors.text }, styles.textInput, textInputStyle]}
        placeholderTextColor={theme.dark ? Shades[500] : Shades[600]}
        autoCorrect={false}
        autoCapitalize="none"
      />
      {props.value != "" && clearShortcut && (
        <Button
          touchableStyle={[styles.clearButton]}
          // @ts-ignore
          onPress={() => props.onChangeText("")}
          icon={() => <Icon.Mat name="clear" size={26} />}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  textInputDiv: {
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "flex-end",
  },
  textInput: {
    paddingHorizontal: 16,
    paddingVertical: 12, // paddingVertical doesn't work
    height: "100%",
    flexGrow: 9,
    // flexBasis: 0,
    fontSize: 16,
    borderRadius: 10,
    // boxShadow: "0px 0px 10px 1px red",
  },
  clearButton: {
    // alignItems: "center",
    // justifyContent: "center",
    // boxShadow: "0px 0px 10px 1px red",
    maxWidth: 55,
    flexGrow: 1,
    borderRadius: 10,
  },
});

export default memo(Input);
