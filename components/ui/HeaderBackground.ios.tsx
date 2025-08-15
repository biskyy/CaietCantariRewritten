import { useTheme } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { Platform, StyleSheet, View } from "react-native";

export const HeaderBackground = () => {
  // const theme = useTheme();
  return (
    <BlurView
      tint="systemChromeMaterial"
      intensity={100}
      style={[
        {
          // flex: 1,
          // width: "100%",
          // height: "100%",
          backgroundColor: "transparent",
        },
        StyleSheet.absoluteFill,
      ]}
    />
  );
};

// <View
//   style={[
//     {
//       zIndex: 100,
//       boxShadow: Platform.select({
//         default: "0px 0px 0px 1px " + theme.colors.border,
//         ios: "0px 0px 0px 0.5px " + theme.colors.border,
//       }),
//       shadowOpacity: 1,
//       // height: "100%",
//       // backgroundColor: "red",
//     },
//     StyleSheet.absoluteFill,
//   ]}
// >
//  here goes the BlurView in case i change my mind
// </View>;
