import { View, StyleSheet, Text, ScrollView } from "react-native";
import {
  favoriteSongsAtom,
  fontSizeAtom,
  songsAtom,
} from "../components/State";
import { useAtom } from "jotai";
import Separator from "../components/Separator";
import Button from "../components/Button";
import { useEffect } from "react";
import BottomBar from "../components/BottomBar";
import {
  useDisplayedSongInfo,
  useTheme,
  useThemeStyle,
} from "../components/Hooks";

export default function SongScreen({ route, navigation }) {
  const [theme] = useTheme();
  const themeStyle = useThemeStyle();
  const [fontSize, setFontSize] = useAtom(fontSizeAtom);
  const [songs] = useAtom(songsAtom);
  const [favoriteSongs, setFavoriteSongs] = useAtom(favoriteSongsAtom);

  const [displayedSongInfo, setDispalyedSongInfo] = useDisplayedSongInfo();

  useEffect(
    () => setDispalyedSongInfo({ song: songs[displayedSongInfo.index] }),
    [songs, displayedSongInfo.index]
  );

  const handleFontSizeChange = (sign) => {
    if (sign === "+") setFontSize(fontSize + 1);
    else if (fontSize !== 1) setFontSize(fontSize - 1);
  };

  function addSongToFavorites() {
    if (favoriteSongs.includes(displayedSongInfo.index))
      setFavoriteSongs(
        favoriteSongs.filter((song) => song !== displayedSongInfo.index)
      );
    else setFavoriteSongs([displayedSongInfo.index, ...favoriteSongs]);
  }

  console.log(favoriteSongs);

  return (
    <>
      <View style={[themeStyle.bgColor, styles.songDiv]}>
        <View style={styles.titleDiv}>
          <Button
            icon={
              displayedSongInfo.index > displayedSongInfo.listFirstIndex &&
              "keyboard-arrow-left"
            }
            textStyle={{
              ...themeStyle.txtColor,
              ...styles.icon,
              marginHorizontal: 15,
            }}
            touchableStyle={styles.titleArrow}
            onPress={() =>
              displayedSongInfo.index > displayedSongInfo.listFirstIndex &&
              setDispalyedSongInfo({ index: displayedSongInfo.index - 1 })
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
            {displayedSongInfo.song.title}
          </Text>
          <Button
            icon={
              displayedSongInfo.index < displayedSongInfo.listLastIndex - 1 &&
              "keyboard-arrow-right"
            }
            textStyle={{
              ...themeStyle.txtColor,
              ...styles.icon,
              marginHorizontal: 15,
            }}
            touchableStyle={styles.titleArrow}
            onPress={() =>
              displayedSongInfo.index < displayedSongInfo.listLastIndex - 1 &&
              setDispalyedSongInfo({ index: displayedSongInfo.index + 1 })
            }
          />
        </View>
        <Separator />
        <ScrollView
          indicatorStyle={theme.data ? "white" : "black"}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <Text style={{ ...themeStyle.txtColor, fontSize }}>
            {displayedSongInfo.song.content}
          </Text>
        </ScrollView>
        <BottomBar>
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
            icon={
              favoriteSongs.includes(displayedSongInfo.index)
                ? "star"
                : "star-border"
            }
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
        </BottomBar>
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
