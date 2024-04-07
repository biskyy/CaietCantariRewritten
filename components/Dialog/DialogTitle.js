import { useThemeStyle } from "../Hooks";
import { Text } from "react-native";

const DialogTitle = (props) => {
  const themeStyle = useThemeStyle();

  return (
    <Text
      style={[themeStyle.txtColor, themeStyle.title, { marginVertical: 5 }]}
    >
      {props.children}
    </Text>
  );
};

export default DialogTitle;
