import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useThemeStyle } from "@/hooks/useThemeStyle";

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
        style={[themeStyle.txtColor, { fontWeight: "normal" }]}
      />
    </TouchableOpacity>
  );
};

export default IconButton;
