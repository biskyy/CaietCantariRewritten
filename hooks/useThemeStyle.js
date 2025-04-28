import { StyleSheet } from "react-native";

import Colors from "@/constants/colors";

import { useTheme } from "@/hooks/useTheme";

export const useThemeStyle = () => {
  const [theme] = useTheme();
  const themeStyle = StyleSheet.create({
    bgColor: {
      backgroundColor: theme.data ? Colors[800] : Colors[100],
    },
    txtColor: {
      color: theme.data ? Colors[200] : Colors[800],
    },
    inverseBgColor: {
      backgroundColor: theme.data ? Colors[100] : Colors[800],
    },
    separatorColor: {
      backgroundColor: theme.data ? Colors[600] : Colors[300],
    },
    inverseTxtColor: {
      color: theme.data ? Colors[800] : Colors[200],
    },
    borderColor: {
      borderColor: theme.data ? Colors[600] : Colors[300],
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: 22,
      fontWeight: "600",
    },
    text: {
      fontSize: 16,
      fontWeight: "normal",
    },
  });

  return themeStyle;
};
