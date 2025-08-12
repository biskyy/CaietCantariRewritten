import { BlurTint } from "expo-blur";
import { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

export interface TitleBlurViewProps {
  style: StyleProp<ViewStyle>;
  intensity: number;
  tint: BlurTint;
  children: ReactNode;
}

export const TitleBlurView = (props: TitleBlurViewProps) => {
  return <View style={props.style}>{props.children}</View>;
};
