import {
  OpaqueColorValue,
  Platform,
  PlatformColor,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

interface IconButtonProps {
  size: number;
  touchableStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<TextStyle>;
  onPress: () => void;
  useSystemColor?: boolean;
}

interface IconButtonOctProps extends IconButtonProps {
  icon?: keyof typeof Octicons.glyphMap;
}

interface IconButtonFeProps extends IconButtonProps {
  icon?: keyof typeof Feather.glyphMap;
}

interface IconButtonMatProps extends IconButtonProps {
  icon?: keyof typeof MaterialIcons.glyphMap;
}

interface IconButtonMatCoProps extends IconButtonProps {
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
}

const IconButton = (props: IconButtonProps) => undefined;

const Oct = (props: IconButtonOctProps) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        // { backgroundColor: colors.background },
        { alignItems: "center", justifyContent: "center" },
        props.touchableStyle,
      ]}
    >
      <Octicons
        name={props.icon}
        size={props.size}
        style={[
          {
            fontWeight: "normal",
            color:
              props.useSystemColor && Platform.OS === "ios"
                ? PlatformColor("systemBlueColor")
                : theme.colors.text,
          },
          props.iconStyle,
        ]}
      />
    </TouchableOpacity>
  );
};

const Fe = (props: IconButtonFeProps) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        // { backgroundColor: colors.background },
        { alignItems: "center", justifyContent: "center" },
        props.touchableStyle,
      ]}
    >
      <Feather
        name={props.icon}
        size={props.size}
        style={[
          {
            fontWeight: "normal",
            color:
              props.useSystemColor && Platform.OS === "ios"
                ? PlatformColor("systemBlueColor")
                : theme.colors.text,
          },
          props.iconStyle,
        ]}
      />
    </TouchableOpacity>
  );
};

const Mat = (props: IconButtonMatProps) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        // { backgroundColor: colors.background },
        { alignItems: "center", justifyContent: "center" },
        props.touchableStyle,
      ]}
    >
      <MaterialIcons
        name={props.icon}
        size={props.size}
        style={[
          {
            fontWeight: "normal",
            color:
              props.useSystemColor && Platform.OS === "ios"
                ? PlatformColor("systemBlueColor")
                : theme.colors.text,
          },
          props.iconStyle,
        ]}
      />
    </TouchableOpacity>
  );
};

const MatCo = (props: IconButtonMatCoProps) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        // { backgroundColor: colors.background },
        { alignItems: "center", justifyContent: "center" },
        props.touchableStyle,
      ]}
    >
      <MaterialCommunityIcons
        name={props.icon}
        size={props.size}
        style={[
          {
            fontWeight: "normal",
            color:
              props.useSystemColor && Platform.OS === "ios"
                ? PlatformColor("systemBlueColor")
                : theme.colors.text,
          },
          props.iconStyle,
        ]}
      />
    </TouchableOpacity>
  );
};

IconButton.Oct = Oct;
IconButton.Fe = Fe;
IconButton.Mat = Mat;
IconButton.MatCo = MatCo;

export default IconButton;
