import { useTheme } from "@react-navigation/native";
import { Text } from "react-native";

const DialogTitle = (props) => {
  const theme = useTheme();

  return (
    <Text
      style={{
        marginVertical: 5,
        color: theme.colors.text,
        fontSize: 28,
        fontWeight: "bold",
      }}
    >
      {props.children}
    </Text>
  );
};

export default DialogTitle;
