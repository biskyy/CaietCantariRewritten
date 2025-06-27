import { StyleSheet } from "react-native";

import Shades from "@/constants/colors";

import { useTheme } from "@/hooks/useTheme";
import { useAtom } from "jotai";
import { themeAtom } from "@/state/persistent";

export const useThemeStyle = () => {
  const [theme] = useAtom(themeAtom);
  const themeStyle = StyleSheet.create({
    bgColor: {
      backgroundColor: theme ? Shades[800] : Shades[100],
    },
    txtColor: {
      color: theme ? Shades[200] : Shades[800],
    },
    inverseBgColor: {
      backgroundColor: theme ? Shades[100] : Shades[800],
    },
    separatorColor: {
      backgroundColor: theme ? Shades[600] : Shades[300],
    },
    inverseTxtColor: {
      color: theme ? Shades[800] : Shades[200],
    },
    borderColor: {
      borderColor: theme ? Shades[600] : Shades[300],
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
