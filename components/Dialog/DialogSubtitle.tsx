import { useTheme } from "@react-navigation/native";
import { Text } from "react-native";

const DialogSubtitle = (props) => {
  const theme = useTheme();

  return (
    <Text
      style={{
        marginVertical: 5,
        fontSize: 22,
        fontWeight: "600",
        color: theme.colors.text,
      }}
    >
      {props.children}
    </Text>
  );
};

export default DialogSubtitle;
