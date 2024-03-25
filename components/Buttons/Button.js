import { memo } from "react";
import { Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { useThemeStyle } from "../Hooks";

const Button = ({
  text = undefined,
  icon = undefined,
  textStyle = undefined,
  iconStyle = undefined,
  touchableStyle = undefined,
  onPress,
  iconSize = undefined,
  primary = false,
  secondary = false,
}) => {
  const themeStyle = useThemeStyle();
  let prevPageX;

  const buttonStyleBasedOnType = primary && themeStyle.inverseTxtColor;

  return (
    <TouchableOpacity
      onPressIn={(e) => (prevPageX = e.nativeEvent.pageX)}
      onPress={(e) =>
        Math.abs(e.nativeEvent.pageX - prevPageX) >= 50 ? null : onPress()
      }
      style={[
        themeStyle.bgColor,
        touchableStyle,
        primary && themeStyle.inverseBgColor,
        secondary && {
          borderWidth: 1,
          ...themeStyle.borderColor,
        },
        icon &&
          text && {
            flexDirection: "row",
            alignItems: "center",
            // justifyContent: "space-evenly",
          },
        { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 6 },
      ]}
    >
      {icon && text ? (
        <>
          <MaterialIcons
            name={icon}
            size={iconSize}
            style={[
              themeStyle.txtColor,
              iconStyle,
              buttonStyleBasedOnType,
              { fontWeight: "normal" },
            ]}
          />
          <Text
            numberOfLines={1}
            style={[
              themeStyle.text,
              themeStyle.txtColor,
              textStyle,
              buttonStyleBasedOnType,
            ]}
          >
            {text}
          </Text>
        </>
      ) : (
        <Text
          numberOfLines={1}
          style={[themeStyle.txtColor, textStyle, buttonStyleBasedOnType]}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default memo(Button);
