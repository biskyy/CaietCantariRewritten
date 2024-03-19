import { memo } from "react";
import { StyleSheet, View } from "react-native";
import { useThemeStyle } from "./Hooks";

function Separator() {
  const themeStyle = useThemeStyle();

  return <View style={[styles.separator, themeStyle.separatorColor]} />;
}

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: 2,
  },
});

export default memo(Separator);
