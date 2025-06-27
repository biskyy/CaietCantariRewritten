import Shades, { Colors } from "@/constants/colors";
import { Theme } from "@react-navigation/native";

export const LightTheme: Theme = {
  dark: false,
  colors: {
    primary: Colors.light.primary,
    background: Shades["100"],
    card: Colors.light.accent,
    text: Shades["800"],
    border: Colors.light.secondary,
    notification: Colors.light.accent,
  },
};

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: Colors.dark.primary,
    background: Shades["100"],
    card: Colors.dark.accent,
    text: Shades["800"],
    border: Colors.dark.secondary,
    notification: Colors.dark.accent,
  },
};
