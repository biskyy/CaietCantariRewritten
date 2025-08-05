import { forwardRef, memo } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TextInputProps,
  StyleSheetProperties,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

import IconButton from "@/components/Button/IconButton";

import Shades from "@/constants/colors";
import { useTheme } from "@react-navigation/native";

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
        placeholderTextColor={theme.dark ? Shades[500] : Shades[500]}
        autoCorrect={false}
        autoCapitalize="none"
      />
      {props.value != "" && clearShortcut && (
        <IconButton
          icon="clear"
          size={32}
          touchableStyle={[styles.clearButton]}
          // @ts-ignore
          onPress={() => props.onChangeText("")}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  textInputDiv: {
    borderWidth: 1,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    paddingHorizontal: 16,
    paddingTop: 12, // paddingVertical doesn't work
    paddingBottom: 12,
    height: "100%",
    flexGrow: 19,
    flexBasis: 0,
    fontSize: 16,
  },
  clearButton: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    borderRadius: 10,
  },
});

export default memo(Input);
