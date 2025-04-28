import { forwardRef, memo } from "react";
import { View, StyleSheet, TextInput } from "react-native";

import IconButton from "@/components/Button/IconButton";

import Colors from "@/constants/colors";

import { useTheme } from "@/hooks/useTheme";
import { useThemeStyle } from "@/hooks/useThemeStyle";

const Input = forwardRef(
  /** @param {Object} props */
  (props, ref) => {
    const [theme] = useTheme();
    const themeStyle = useThemeStyle();

    const { textInputDivStyle, textInputStyle } = props;

    return (
      <View
        style={[
          styles.textInputDiv,
          themeStyle.borderColor,
          themeStyle.bgColor,
          textInputDivStyle,
        ]}
      >
        <TextInput
          {...props}
          ref={ref}
          style={[themeStyle.txtColor, styles.textInput, textInputStyle]}
          placeholderTextColor={theme.data ? Colors[500] : Colors[500]}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {props.value != "" && props.clearShortcut && (
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
  },
);

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
