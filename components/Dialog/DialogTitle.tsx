import { useTheme } from "@react-navigation/native";
import { ReactNode } from "react";
import { Text } from "react-native";

interface DialogTitleProps {
  children: ReactNode;
}

const DialogTitle = (props: DialogTitleProps) => {
  const theme = useTheme();

  return (
    <Text
      style={{
        marginVertical: 5,
        color: theme.colors.text,
        fontSize: 24,
        fontWeight: "bold",
      }}
    >
      {props.children}
    </Text>
  );
};

export default DialogTitle;
