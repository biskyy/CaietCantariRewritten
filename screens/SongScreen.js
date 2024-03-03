import { View, StyleSheet, Text, ScrollView, Platform } from "react-native";
import {
  fontSizeAtom,
  useSongs,
  useTheme,
  useThemeStyle,
} from "../components/State";
import { useAtom } from "jotai";
import Separator from "../components/Separator";
import Button from "../components/Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMemo, useState } from "react";

export default function SongScreen({ route, navigation }) {
  const [theme] = useTheme();
  const themeStyle = useThemeStyle();
  const [fontSize, setFontSize] = useAtom(fontSizeAtom);
  const [songs, , setFavorite] = useSongs();
  const insets = useSafeAreaInsets();

  const [songIndex, setSongIndex] = useState(route.params.index);

  const { listFirstIndex, listLastIndex } = route.params;

  const song = useMemo(() => songs[songIndex], [songs, songIndex]);

  const handleFontSizeChange = (sign) => {
    if (sign === "+") setFontSize(fontSize + 1);
    else if (fontSize !== 1) setFontSize(fontSize - 1);
  };

  function addSongToFavorites() {
    setFavorite(song.index);
  }

  return (
    <>
      <View style={[themeStyle.bgColor, styles.songDiv]}>
        <View style={styles.titleDiv}>
          <Button
            icon={songIndex > listFirstIndex && "keyboard-arrow-left"}
            textStyle={{
              ...themeStyle.txtColor,
              ...styles.icon,
              marginHorizontal: 15,
            }}
            touchableStyle={styles.titleArrow}
            onPress={() =>
              songIndex > listFirstIndex && setSongIndex(songIndex - 1)
            }
          />
          <Text
            numberOfLines={1}
            style={[
              themeStyle.txtColor,
              styles.title,
              { flexGrow: 5, flexBasis: 0 },
            ]}
          >
            {song.title}
          </Text>
          <Button
            icon={songIndex < listLastIndex - 1 && "keyboard-arrow-right"}
            textStyle={{
              ...themeStyle.txtColor,
              ...styles.icon,
              marginHorizontal: 15,
            }}
            touchableStyle={styles.titleArrow}
            onPress={() =>
              songIndex < listLastIndex - 1 && setSongIndex(songIndex + 1)
            }
          />
        </View>
        <Separator />
        <ScrollView
          indicatorStyle={theme.data ? "white" : "black"}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <Text style={{ ...themeStyle.txtColor, fontSize }}>
            {song.content}
          </Text>
        </ScrollView>
        <Separator />
        <View
          style={{
            paddingBottom: insets.bottom,
            ...themeStyle.bgColor,
            height: Platform.OS === "ios" ? insets.bottom + 64 : 64,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            icon="zoom-out"
            textStyle={{
              ...themeStyle.txtColor,
              ...styles.icon,
            }}
            touchableStyle={styles.bottomBarButtonDiv}
            onPress={() => handleFontSizeChange("-")}
          />
          <Button
            icon="zoom-in"
            textStyle={{
              ...themeStyle.txtColor,
              ...styles.icon,
            }}
            touchableStyle={styles.bottomBarButtonDiv}
            onPress={() => handleFontSizeChange("+")}
          />
          <Button
            icon={song.favorite ? "star" : "star-border"}
            textStyle={{
              ...themeStyle.txtColor,
              ...styles.icon,
            }}
            touchableStyle={styles.bottomBarButtonDiv}
            onPress={() => addSongToFavorites()}
          />
          <Button
            icon="arrow-back"
            textStyle={{
              ...themeStyle.txtColor,
              ...styles.icon,
            }}
            touchableStyle={styles.bottomBarButtonDiv}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  songDiv: {
    height: "100%",
  },
  bottomBarButtonDiv: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  titleArrow: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    flexBasis: 0,
  },
  titleDiv: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 7,
    flexDirection: "row",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  icon: {
    fontSize: 32,
  },
});
