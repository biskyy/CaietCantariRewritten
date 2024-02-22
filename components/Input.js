import { forwardRef, useRef, useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { useAtom } from "jotai";
import { useTheme } from "./State";
import ThemeColors from "./ColorScheme";
import Button from "./Button";

const Input = forwardRef((props, ref) => {
  const [theme] = useTheme();

  const themeStyle = StyleSheet.create({
    bgColor: {
      backgroundColor: theme.data
        ? ThemeColors.darkBgColor
        : ThemeColors.lightBgColor,
    },
    txtColor: {
      color: theme.data ? ThemeColors.darkTxtColor : ThemeColors.lightTxtColor,
    },
    borderColor: {
      borderColor: theme.data
        ? ThemeColors.darkTxtColor
        : ThemeColors.lightTxtColor,
    },
  });

  return (
    <View style={{ ...styles.textInputDiv, ...themeStyle.borderColor }}>
      <TextInput
        {...props}
        ref={ref}
        style={[themeStyle.txtColor, styles.textInput]}
        placeholderTextColor={
          theme.data ? ThemeColors.darkTxtColor : ThemeColors.lightTxtColor
        }
        autoCorrect={false}
        autoCapitalize="none"
      />
      {
        // @ts-ignore
        props.value != "" && (
          <Button
            icon="clear"
            textStyle={[themeStyle.txtColor, styles.clearButtonIcon]}
            touchableStyle={[themeStyle.bgColor, styles.clearButton]}
            // @ts-ignore
            onPress={() => props.onChangeText("")}
          />
        )
      }
    </View>
  );
});

const styles = StyleSheet.create({
  textInputDiv: {
    // alignItems: "center",
    // justifyContent: "center",
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 10,
    height: 64,
    width: "95%",
    flexDirection: "row",
  },
  textInput: {
    height: "100%",
    paddingHorizontal: 15,
    flexGrow: 19,
    flexBasis: 0,
    fontSize: 16,
    fontWeight: "500",
  },
  clearButton: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    borderRadius: 10,
  },
  clearButtonIcon: {
    fontSize: 32,
  },
});

export default Input;
