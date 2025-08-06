import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useTheme } from "@react-navigation/native";

interface IconButtonProps {
  icon?: keyof typeof MaterialIcons.glyphMap;
  size: number;
  touchableStyle: StyleProp<ViewStyle>;
  iconStyle: StyleProp<TextStyle>;
  onPress: () => void;
}

const IconButton = (props: IconButtonProps) => {
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
        style={[props.iconStyle, { fontWeight: "normal", color: colors.text }]}
      />
    </TouchableOpacity>
  );
};

export default IconButton;
