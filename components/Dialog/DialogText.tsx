import { useTheme } from "@react-navigation/native";
import { Text } from "react-native";

const DialogText = (props) => {
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
