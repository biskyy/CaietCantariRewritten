import { useTheme } from "@react-navigation/native";
import { ReactNode } from "react";
import { StyleProp, Text, TextStyle } from "react-native";

interface DialogTextProps {
  style?: StyleProp<TextStyle>;
  children: ReactNode;
}

const DialogText = (props: DialogTextProps) => {
  const theme = useTheme();

  return (
    <Text
      style={[
        {
          marginVertical: 5,
          fontSize: 16,
          fontWeight: "normal",
          color: theme.colors.text,
        },
        props.style,
      ]}
    >
      {props.children}
    </Text>
  );
};

export default DialogText;
