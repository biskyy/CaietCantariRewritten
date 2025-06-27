import { memo } from "react";
import { StyleSheet, View } from "react-native";

import { useThemeStyle } from "@/hooks/useThemeStyle";

function Separator(props) {
  const themeStyle = useThemeStyle();

  return (
    <View style={[styles.separator, themeStyle.separatorColor, props.style]} />
  );
}

const styles = StyleSheet.create({
  separator: {
    // width: "100%",
    height: 1,
  },
});

export default memo(Separator);
