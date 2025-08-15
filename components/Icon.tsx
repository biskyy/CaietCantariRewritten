import {
  Platform,
  PlatformColor,
  StyleProp,
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

export interface IconProps {
  size: number;
  style?: StyleProp<TextStyle>;
  useSystemColor?: boolean;
  // inheritParentColor?: boolean;
}

interface IconOctProps extends IconProps {
  name?: keyof typeof Octicons.glyphMap;
}

interface IconFeProps extends IconProps {
  name?: keyof typeof Feather.glyphMap;
}

interface IconMatProps extends IconProps {
  name?: keyof typeof MaterialIcons.glyphMap;
}

interface IconMatCoProps extends IconProps {
  name?: keyof typeof MaterialCommunityIcons.glyphMap;
}

const Icon = (props: IconProps) => undefined;

const Oct = (props: IconOctProps) => {
  const theme = useTheme();
  return (
    <Octicons
      name={props.name}
      size={props.size}
      style={[
        {
          fontWeight: "normal",
          color:
            props.useSystemColor && Platform.OS === "ios"
              ? PlatformColor("systemBlueColor")
              : theme.colors.text,
        },
        // props.inheritParentColor ? { color: "inherit" } : undefined,
        props.style,
      ]}
    />
  );
};

const Fe = (props: IconFeProps) => {
  const theme = useTheme();
  return (
    <Feather
      name={props.name}
      size={props.size}
      style={[
        {
          fontWeight: "normal",
          color:
            props.useSystemColor && Platform.OS === "ios"
              ? PlatformColor("systemBlueColor")
              : theme.colors.text,
        },
        props.style,
      ]}
    />
  );
};

const Mat = (props: IconMatProps) => {
  const theme = useTheme();
  return (
    <MaterialIcons
      name={props.name}
      size={props.size}
      style={[
        {
          fontWeight: "normal",
          color:
            props.useSystemColor && Platform.OS === "ios"
              ? PlatformColor("systemBlueColor")
              : theme.colors.text,
        },
        props.style,
      ]}
    />
  );
};

const MatCo = (props: IconMatCoProps) => {
  const theme = useTheme();
  return (
    <MaterialCommunityIcons
      name={props.name}
      size={props.size}
      style={[
        {
          fontWeight: "normal",
          color:
            props.useSystemColor && Platform.OS === "ios"
              ? PlatformColor("systemBlueColor")
              : theme.colors.text,
        },
        props.style,
      ]}
    />
  );
};

Icon.Oct = Oct;
Icon.Fe = Fe;
Icon.Mat = Mat;
Icon.MatCo = MatCo;

export default Icon;
