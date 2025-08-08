import { useTheme } from "@react-navigation/native";
import { memo } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface SeparatorProps {
  style?: StyleProp<ViewStyle>;
}

function Separator(props: SeparatorProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        { backgroundColor: theme.colors.border },
        styles.separator,
        props.style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
  },
});

export default memo(Separator);
