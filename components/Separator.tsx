import { useTheme } from "@react-navigation/native";
import { memo } from "react";
import { StyleSheet, View } from "react-native";

function Separator(props) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.separator,
        { backgroundColor: theme.colors.border },
        props.style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    // width: "100%",
    height: 1,
  },
});

export default memo(Separator);
