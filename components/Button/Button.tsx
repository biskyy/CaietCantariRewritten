import { memo } from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useThemeStyle } from "@/hooks/useThemeStyle";

interface ButtonProps {
  text?: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  textStyle?: StyleProp<TextStyle>;
  touchableStyle?: StyleProp<ViewStyle>;
  onPress: () => void;
  iconStyle?: StyleProp<TextStyle>;
  iconSize?: number;
  type: "primary" | "secondary";
}

const Button = ({
  text = undefined,
  icon = undefined,
  textStyle = undefined,
  iconStyle = undefined,
  touchableStyle = undefined,
  onPress,
  iconSize = undefined,
  type,
}: ButtonProps) => {
  const themeStyle = useThemeStyle();
  let prevPageX: number;

  const buttonStyleBasedOnType =
    type === "primary" && themeStyle.inverseTxtColor;

  return (
    <TouchableOpacity
      onPressIn={(e) => (prevPageX = e.nativeEvent.pageX)}
      onPress={(e) =>
        Math.abs(e.nativeEvent.pageX - prevPageX) >= 50 ? null : onPress()
      }
      style={[
        themeStyle.bgColor,
        touchableStyle,
        type === "primary" && themeStyle.inverseBgColor,
        type === "secondary" && {
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
