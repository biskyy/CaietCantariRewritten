import { memo } from "react";
import Separator from "./Separator";
import { Platform, View } from "react-native";
import { useThemeStyle } from "./State";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BottomBar = (props) => {
  const themeStyle = useThemeStyle();
  const insets = useSafeAreaInsets();

  return (
    <>
      <Separator />
      <View
        style={{
          paddingBottom: insets.bottom,
          ...themeStyle.bgColor,
          height: Platform.OS === "ios" ? insets.bottom + 64 : 64,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {props.children}
      </View>
    </>
  );
};

export default memo(BottomBar);
