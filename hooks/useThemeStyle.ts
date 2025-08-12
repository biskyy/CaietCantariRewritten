import { StyleSheet } from "react-native";

import Shades from "@/constants/colors";

// import { useTheme } from "@/hooks/useTheme";
import { useAtom } from "jotai";
import { themeAtom } from "@/state/persistent";
import { useTheme } from "@react-navigation/native";

const useThemeStyle = () => {
  const theme = useTheme();
  const themeStyle = StyleSheet.create({
    bgColor: {
      backgroundColor: theme.dark ? Shades[800] : Shades[100],
    },
    txtColor: {
      color: theme.dark ? Shades[200] : Shades[800],
    },
    inverseBgColor: {
      backgroundColor: theme.dark ? Shades[100] : Shades[800],
    },
    separatorColor: {
      backgroundColor: theme.dark ? Shades[600] : Shades[300],
    },
    inverseTxtColor: {
      color: theme.dark ? Shades[800] : Shades[200],
    },
    borderColor: {
      borderColor: theme.dark ? Shades[600] : Shades[300],
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
