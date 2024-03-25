import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useThemeStyle } from "../Hooks";

const IconButton = (props) => {
  const themeStyle = useThemeStyle();

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        props.touchableStyle,
        themeStyle.bgColor,
        { alignItems: "center", justifyContent: "center" },
      ]}
    >
      <MaterialIcons
        name={props.icon}
        size={props.size}
        style={[themeStyle.txtColor]}
      />
    </TouchableOpacity>
  );
};

export default IconButton;
