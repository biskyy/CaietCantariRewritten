import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";

export const HeaderBackground = () => {
  return (
    <BlurView
      tint="systemChromeMaterial"
      intensity={100}
      style={[
        {
          backgroundColor: "transparent",
        },
        StyleSheet.absoluteFill,
      ]}
    />
  );
};
