import { memo } from "react";
import Separator from "./Separator";
import { Keyboard, Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeStyle } from "./Hooks";
import { useAtom } from "jotai";
import { modalVisibleAtom, orientationAtom } from "./State";

const BottomBar = (props) => {
  const themeStyle = useThemeStyle();
  const insets = useSafeAreaInsets();
  const [orientation] = useAtom(orientationAtom);
  const [modalVisible, setModalVisible] = useAtom(modalVisibleAtom);

  if (orientation === "landscape") return <></>;

  if (modalVisible && Keyboard.isVisible()) return <></>;

  return (
    <>
      <Separator />
      <View
        style={{
          paddingBottom: insets.bottom,
          ...themeStyle.bgColor,
          height: Platform.OS === "ios" ? insets.bottom + 64 : 64,
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {props.children}
      </View>
    </>
  );
};

export default memo(BottomBar);
