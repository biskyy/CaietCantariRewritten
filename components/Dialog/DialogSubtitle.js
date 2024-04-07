import { useThemeStyle } from "../Hooks";
import { Text } from "react-native";

const DialogSubtitle = (props) => {
  const themeStyle = useThemeStyle();

  return (
    <Text
      style={[themeStyle.txtColor, themeStyle.subtitle, { marginVertical: 5 }]}
    >
      {props.children}
    </Text>
  );
};

export default DialogSubtitle;
