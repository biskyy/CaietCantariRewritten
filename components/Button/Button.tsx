import { memo } from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useTheme } from "@react-navigation/native";

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
  const theme = useTheme();
  let prevPageX: number;

  const buttonStyleBasedOnType = type === "primary" && {
    color: theme.colors.background,
  };

  return (
    <TouchableOpacity
      onPressIn={(e) => (prevPageX = e.nativeEvent.pageX)}
      onPress={(e) =>
        Math.abs(e.nativeEvent.pageX - prevPageX) >= 50 ? null : onPress()
      }
      style={[
        { backgroundColor: theme.colors.background },
        touchableStyle,
        type === "primary" && {
          backgroundColor: theme.colors.text,
        },
        type === "secondary" && {
          borderWidth: 1,
          borderColor: theme.colors.border,
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
              iconStyle,
              buttonStyleBasedOnType,
              {
                color: theme.colors.text,
                fontWeight: "normal",
                marginRight: 10,
              },
            ]}
          />
          <Text
            style={[
              textStyle,
              {
                fontSize: 16,
                fontWeight: "normal",
                color: theme.colors.text,
                flexShrink: 1,
              },
              buttonStyleBasedOnType,
            ]}
          >
            {text}
          </Text>
        </>
      ) : (
        <Text
          style={[
            textStyle,
            { color: theme.colors.text, flexShrink: 1 },
            buttonStyleBasedOnType,
          ]}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default memo(Button);
