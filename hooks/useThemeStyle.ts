import { StyleSheet } from "react-native";

import Colors from "@/constants/colors";

import { useTheme } from "@/hooks/useTheme";
import { useAtom } from "jotai";
import { themeAtom } from "@/state/persistent";

export const useThemeStyle = () => {
  const [theme] = useAtom(themeAtom);
  const themeStyle = StyleSheet.create({
    bgColor: {
      backgroundColor: theme ? Colors[800] : Colors[100],
    },
    txtColor: {
      color: theme ? Colors[200] : Colors[800],
    },
    inverseBgColor: {
      backgroundColor: theme ? Colors[100] : Colors[800],
    },
    separatorColor: {
      backgroundColor: theme ? Colors[600] : Colors[300],
    },
    inverseTxtColor: {
      color: theme ? Colors[800] : Colors[200],
    },
    borderColor: {
      borderColor: theme ? Colors[600] : Colors[300],
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
