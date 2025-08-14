import { useTheme } from "@react-navigation/native";
import { BlurTint } from "expo-blur";
import { ReactNode } from "react";
import { View } from "react-native";

export interface BlurredViewProps {
  tint?: BlurTint;
  intensity?: number;
  children: ReactNode;
}

export const BlurredView = (props: BlurredViewProps) => {
  const theme = useTheme();
  return (
    <View style={{ backgroundColor: theme.colors.card }}>{props.children}</View>
  );
};
