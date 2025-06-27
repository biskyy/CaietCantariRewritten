import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useAtom } from "jotai";

import { userPrefsAtom } from "@/state/persistent";

import { useThemeStyle } from "@/hooks/useThemeStyle";

import Shades from "@/constants/colors";
import { useTheme } from "@react-navigation/native";

const SongButton = (props) => {
  const { colors } = useTheme();
  // const themeStyle = useThemeStyle();

  const [userPrefs] = useAtom(userPrefsAtom);

  let prevPageX;

  return (
    <TouchableOpacity
      onPressIn={(e) => (prevPageX = e.nativeEvent.pageX)}
      onPress={(e) =>
        Math.abs(e.nativeEvent.pageX - prevPageX) >= 50 ? null : props.onPress()
      }
      style={[
        { backgroundColor: colors.background },
        // themeStyle.borderColor,
        styles.touchableStyle,
      ]}
    >
      <Text style={{ backgroundColor: colors.background }} numberOfLines={1}>
        {props.song.title}
      </Text>
      {props.song.tags.length !== 0 && userPrefs.showCategories && (
        <Text style={[{ fontSize: 12, color: Shades[500] }]} numberOfLines={1}>
          {props.song.tags.length > 3
            ? [...props.song.tags.slice(0, 2), "…"].join(" • ")
            : props.song.tags.join(" • ")}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableStyle: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 55,
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    borderWidth: 1,
    borderRadius: 6,
    marginVertical: 2.5,
  },
});

export default SongButton;
