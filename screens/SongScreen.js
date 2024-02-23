import { View, StyleSheet } from "react-native";
import { useThemeStyle } from "../components/State";

export default function SongScreen() {
  const themeStyle = useThemeStyle();

  return (
    <>
      <View style={[themeStyle.bgColor, styles.songDiv]}></View>
    </>
  );
}

const styles = StyleSheet.create({
  songDiv: {
    height: "100%",
  },
});
