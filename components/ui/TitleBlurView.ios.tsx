import { BlurView } from "expo-blur";
import { TitleBlurViewProps } from "./TitleBlurView";

export const TitleBlurView = (props: TitleBlurViewProps) => {
  return (
    <BlurView style={props.style} tint={props.tint} intensity={props.intensity}>
      {props.children}
    </BlurView>
  );
};
