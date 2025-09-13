import Shades, { Colors } from "@/constants/colors";
import { DefaultTheme, Theme } from "@react-navigation/native";

export const LightTheme: Theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    primary: Colors.light.primary,
    background: Shades["50"],
    card: Shades["200"], // also color for header background
    text: Shades["900"],
    border: Shades["300"],
    notification: Colors.light.accent,
  },
};

export const DarkTheme: Theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    primary: Colors.dark.primary,
    background: Shades["950"],
    card: Shades["900"],
    text: Shades["100"],
    border: Shades["800"],
    notification: Colors.dark.accent,
  },
};
