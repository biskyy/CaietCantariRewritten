import { memo } from "react";
import { Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useThemeStyle } from "@/hooks/useThemeStyle";

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
          },
        {
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 6,
        },
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
              { fontWeight: "normal", marginRight: 10 },
            ]}
          />
          <Text
            style={[
              themeStyle.text,
              themeStyle.txtColor,
              textStyle,
              buttonStyleBasedOnType,
              { flexShrink: 1 },
            ]}
          >
            {text}
          </Text>
        </>
      ) : (
        <Text
          style={[
            themeStyle.txtColor,
            textStyle,
            buttonStyleBasedOnType,
            { flexShrink: 1 },
          ]}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default memo(Button);
