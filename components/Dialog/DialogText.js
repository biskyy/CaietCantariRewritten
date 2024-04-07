import { useThemeStyle } from "../Hooks";
import { Text } from "react-native";

const DialogText = (props) => {
  const themeStyle = useThemeStyle();

  return (
    <Text style={[themeStyle.txtColor, themeStyle.text, { marginVertical: 5 }]}>
      {props.children}
    </Text>
  );
};

export default DialogText;
