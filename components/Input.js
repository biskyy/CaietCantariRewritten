import { forwardRef, memo } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import ThemeColors from "./ColorScheme";
import Button from "./Button";
import { useTheme, useThemeStyle } from "./Hooks";

const Input = forwardRef(
  /** @param {Object} props */
  (props, ref) => {
    const [theme] = useTheme();
    const themeStyle = useThemeStyle();

    const { textInputDivStyle, textInputStyle } = props;

    return (
      <View
        style={{
          ...styles.textInputDiv,
          ...themeStyle.borderColor,
          ...themeStyle.bgColor,
          ...textInputDivStyle,
        }}
      >
        <TextInput
          {...props}
          ref={ref}
          style={[themeStyle.txtColor, styles.textInput, textInputStyle]}
          placeholderTextColor={
            theme.data
              ? ThemeColors.darkPlaceholderTxtColor
              : ThemeColors.lightPlaceholderTxtColor
          }
          autoCorrect={false}
          autoCapitalize="none"
        />
        {props.value != "" && props.clearShortcut && (
          <Button
            icon="clear"
            textStyle={[themeStyle.txtColor, styles.clearButtonIcon]}
            touchableStyle={[themeStyle.bgColor, styles.clearButton]}
            // @ts-ignore
            onPress={() => props.onChangeText("")}
          />
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  textInputDiv: {
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
  },
  textInput: {
    height: "100%",
    padding: 15,
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
  clearButtonIcon: {
    fontSize: 32,
  },
});

export default memo(Input);
