import { ReactNode, useEffect, useRef } from "react";
import { Platform, StyleProp, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Separator from "./Separator";
import { useActionBarHeight } from "@/hooks/useActionBarHeight";
import Animated, {
  AnimatedStyle,
  KeyboardState,
  useAnimatedKeyboard,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useIsFocused } from "@react-navigation/native";
import { BlurredView } from "@/components/ui/BlurredView";

interface ActionBarProps {
  horizontal?: boolean;
  style?: StyleProp<ViewStyle>;
  prefferedHeight?: number;
  // viewStyle?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
  settag?: string;
  moveWithKeyboard?: boolean | undefined;
  children: ReactNode;
}

export const ActionBar = (props: ActionBarProps) => {
  const insets = useSafeAreaInsets();

  // ---- logic for getting the action bar height ---- //
  const [actionBarHeight, setActionBarHeight] = useActionBarHeight();

  // leavin this here just in case
  // useThrottledCallback from beautiful-react-hooks
  // const throttledSetActionBarHeight = useThrottledCallback(
  //   setActionBarHeight,
  //   [],
  //   50,
  // );

  const viewRef = useRef<View>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    viewRef.current?.measure((x, y, width, height) => {
      // console.log("useLayoutEffect: ", height);
      // console.log("value stored: ", actionBarHeight);
      if (isFocused) setActionBarHeight(height);
      // throttledSetActionBarHeight(height);
    });
  }, [isFocused]);

  // ---- //

  // ---- keyboard avoiding logic + animation ---- //

  const keyboard = useAnimatedKeyboard();

  const bottomInset = useSharedValue(insets.bottom);

  useAnimatedReaction(
    () => keyboard.state.value,
    (currentState) => {
      if (
        currentState === KeyboardState.OPENING ||
        currentState === KeyboardState.OPEN
      ) {
        bottomInset.value = withTiming(0);
      } else if (
        currentState === KeyboardState.CLOSING ||
        currentState === KeyboardState.CLOSED
      ) {
        bottomInset.value = withTiming(insets.bottom);
      }
    },
  );

  const animatedBlurViewPaddingBottom = useAnimatedStyle(() => ({
    paddingBottom: keyboard.height.value + bottomInset.value,
  }));

  // ---- //

  return (
    <Animated.View
      // leaving this here because i will need it for the toast component
      onLayout={({ nativeEvent }) => {
        // console.log(
        //   "value changed to: ",
        //   nativeEvent.layout.height,
        //   actionBarHeight,
        // );
        // console.log(isFocused);

        // because this gets fired so fast and so much, the padding of the view holding the flashlist
        // doesnt keep up and gets left behind the actual value(the actual value of actionBarHeight)
        // causing the padding to be seen above the keyboard as white rect while the keyboard is closing
        //
        // TODO: find a way to fix this. possible solutions: animate the padding of the view holding the flashlist
        // or find a better system to prevent the overlapping of normal views with absolute ones(example: ActionBar,
        // transparent headers on ios)
        //
        if (isFocused) setActionBarHeight(nativeEvent.layout.height);
        // throttledSetActionBarHeight(nativeEvent.layout.height);
      }}
      ref={viewRef}
      sharedTransitionTag={props.settag}
      style={[
        {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          overflow: "hidden",
        },
        // props.viewStyle,
      ]}
    >
      <Separator />
      <BlurredView tint="systemChromeMaterial" intensity={100}>
        <Animated.View
          style={[
            {
              minHeight: props.prefferedHeight,
              flexDirection: props.horizontal ? "row" : "column",
              paddingBottom:
                insets.bottom + Platform.select({ default: 10, ios: 0 }),
            },
            props.moveWithKeyboard ? animatedBlurViewPaddingBottom : undefined,
            props.style,
          ]}
        >
          {props.children}
        </Animated.View>
      </BlurredView>
    </Animated.View>
  );
};
