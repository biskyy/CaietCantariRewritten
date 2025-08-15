import { useTheme } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";

export const HeaderBackground = () => {
  const theme = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
          borderBottomWidth: 1,
        },
        StyleSheet.absoluteFill,
      ]}
    />
  );
};
