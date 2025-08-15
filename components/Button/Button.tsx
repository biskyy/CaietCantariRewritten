import { JSX, memo } from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { useTheme } from "@react-navigation/native";
import { IconProps } from "@/components/Icon";

interface ButtonProps {
  text?: string;
  icon?: (props?: IconProps) => JSX.Element;
  textStyle?: StyleProp<TextStyle>;
  touchableStyle?: StyleProp<ViewStyle>;
  onPress: () => void;
  type?: "primary" | "secondary" | "icon";
}

const Button = ({
  text = undefined,
  icon = undefined,
  textStyle = undefined,
  touchableStyle = undefined,
  onPress,
  type = "icon",
}: ButtonProps) => {
  const theme = useTheme();
  let prevPageX: number;

  const buttonStyleBasedOnType: Pick<TextStyle, "color"> =
    type === "primary"
      ? {
          color: theme.colors.background,
        }
      : { color: theme.colors.text };

  return (
    <TouchableOpacity
      onPressIn={(e) => (prevPageX = e.nativeEvent.pageX)}
      onPress={(e) =>
        Math.abs(e.nativeEvent.pageX - prevPageX) >= 50 ? null : onPress()
      }
      style={[
        {
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 6,
        },
        type === "primary" && {
          backgroundColor: theme.colors.text,
        },
        type === "secondary" && {
          backgroundColor: theme.colors.background,
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
        type === "icon" && {
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: undefined,
          paddingVertical: undefined,
        },
        icon &&
          text && {
            flexDirection: "row",
            alignItems: "center",
          },
        touchableStyle,
      ]}
    >
      {icon && text ? (
        <>
          {
            // ts will complain about needing to provide additional name and size properties,
            // however it doesnt realize that this props are already passed in the function definition.
            // see how this component is used in @/screens/HomeScreen.tsx

            // @ts-ignore
            icon({
              style: [buttonStyleBasedOnType],
            })
          }
          <Text
            style={[
              {
                fontSize: 16,
                fontWeight: "normal",
                color: theme.colors.text,
                flexShrink: 1,
              },
              buttonStyleBasedOnType,
              textStyle,
            ]}
          >
            {"   "}
            {text}
          </Text>
        </>
      ) : icon && !text ? (
        <>{icon()}</>
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
