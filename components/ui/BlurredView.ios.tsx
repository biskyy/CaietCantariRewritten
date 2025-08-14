import { BlurTint, BlurView } from "expo-blur";
import { ReactNode } from "react";

export interface BlurredViewProps {
  tint?: BlurTint;
  intensity?: number;
  children: ReactNode;
}

export const BlurredView = (props: BlurredViewProps) => {
  return (
    <BlurView tint={props.tint} intensity={props.intensity}>
      {props.children}
    </BlurView>
  );
};
