import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useThemeStyle } from "@/hooks/useThemeStyle";
import { useTheme } from "@react-navigation/native";

const IconButton = (props) => {
  // const themeStyle = useThemeStyle();
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        props.touchableStyle,
        { backgroundColor: colors.background },
        { alignItems: "center", justifyContent: "center" },
      ]}
    >
      <MaterialIcons
        name={props.icon}
        size={props.size}
        style={[{ fontWeight: "normal", color: colors.text }]}
      />
    </TouchableOpacity>
  );
};

export default IconButton;
