import { useTheme } from "@react-navigation/native";
import { ReactNode } from "react";
import { Text } from "react-native";

interface DialogTextProps {
  children: ReactNode;
}

const DialogText = (props: DialogTextProps) => {
  const theme = useTheme();

  return (
    <Text
      style={{
        marginVertical: 5,
        fontSize: 16,
        fontWeight: "normal",
        color: theme.colors.text,
      }}
    >
      {props.children}
    </Text>
  );
};

export default DialogText;
