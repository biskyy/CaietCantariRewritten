import { useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, Platform } from "react-native";
import { useAtom } from "jotai";

import { useKeepAwake } from "expo-keep-awake";
import * as ScreenOrientation from "expo-screen-orientation";

import IconButton from "@/components/Button/IconButton";
import Separator from "@/components/Separator";
import BottomBar from "@/components/BottomBar";

import { orientationAtom } from "@/state/global";
import { favoriteSongsAtom, fontSizeAtom, songsAtom } from "@/state/persistent";

import { useTheme } from "@/hooks/useTheme";
import { useThemeStyle } from "@/hooks/useThemeStyle";
import { useDisplayedSongInfo } from "@/hooks/useDisplayedSong";

export default function SongScreen({ route, navigation }) {
  const [theme] = useTheme();
  const themeStyle = useThemeStyle();
  const [fontSize, setFontSize] = useAtom(fontSizeAtom);
  const [songs] = useAtom(songsAtom);
  const [favoriteSongs, setFavoriteSongs] = useAtom(favoriteSongsAtom);
  const [orientation] = useAtom(orientationAtom);

  useKeepAwake();

  useEffect(() => {
    ScreenOrientation.unlockAsync();
    return () => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP,
      );
    };
  }, []);

  const [displayedSongInfo, setDisplayedSongInfo] = useDisplayedSongInfo();

  useEffect(
    () => setDisplayedSongInfo({ song: songs[displayedSongInfo.index] }),
    [songs, displayedSongInfo.index],
  );

  const handleFontSizeChange = (sign) => {
    if (sign === "+") setFontSize(fontSize + 1);
    else if (fontSize !== 1) setFontSize(fontSize - 1);
  };

  function addSongToFavorites() {
    if (favoriteSongs.includes(displayedSongInfo.index))
      setFavoriteSongs(
        favoriteSongs.filter((song) => song !== displayedSongInfo.index),
      );
    else setFavoriteSongs([displayedSongInfo.index, ...favoriteSongs]);
  }

  return (
    <>
      <View style={[themeStyle.bgColor, styles.songDiv]}>
        <View style={styles.titleDiv}>
          <IconButton
            icon={
              displayedSongInfo.index > displayedSongInfo.listFirstIndex &&
              "keyboard-arrow-left"
            }
            size={32}
            textStyle={{ marginHorizontal: 15 }}
            touchableStyle={styles.titleArrow}
            onPress={() =>
              displayedSongInfo.index > displayedSongInfo.listFirstIndex &&
              setDisplayedSongInfo({ index: displayedSongInfo.index - 1 })
            }
          />
          <Text
            numberOfLines={1}
            style={[
              themeStyle.txtColor,
              themeStyle.title,
              styles.title,
              { flexGrow: 5, flexBasis: 0 },
            ]}
          >
            {displayedSongInfo.song.title}
          </Text>
          <IconButton
            icon={
              displayedSongInfo.index < displayedSongInfo.listLastIndex - 1 &&
              "keyboard-arrow-right"
            }
            size={32}
            textStyle={{ marginHorizontal: 15 }}
            touchableStyle={styles.titleArrow}
            onPress={() =>
              displayedSongInfo.index < displayedSongInfo.listLastIndex - 1 &&
              setDisplayedSongInfo({ index: displayedSongInfo.index + 1 })
            }
          />
        </View>
        <Separator />
        <ScrollView
          indicatorStyle={theme.data ? "white" : "black"}
          contentContainerStyle={{
            alignItems: "center",
            paddingHorizontal: 30,
            paddingVertical: 30,
            paddingBottom:
              orientation === "landscape" && Platform.OS === "ios" ? 60 : 30,
          }}
        >
          <Text
            style={{
              ...themeStyle.txtColor,
              fontSize,
            }}
          >
            {displayedSongInfo.song.content}
          </Text>
        </ScrollView>
        <BottomBar>
          <IconButton
            icon="zoom-out"
            size={32}
            touchableStyle={styles.bottomBarButtonDiv}
            onPress={() => handleFontSizeChange("-")}
          />
          <IconButton
            icon="zoom-in"
            size={32}
            touchableStyle={styles.bottomBarButtonDiv}
            onPress={() => handleFontSizeChange("+")}
          />
          <IconButton
            icon={
              favoriteSongs.includes(displayedSongInfo.index)
                ? "star"
                : "star-border"
            }
            size={32}
            touchableStyle={styles.bottomBarButtonDiv}
            onPress={() => addSongToFavorites()}
          />
          <IconButton
            icon="arrow-back"
            size={32}
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
    flexGrow: 1,
    flexBasis: 0,
  },
  titleDiv: {
    minHeight: 50,
    flexDirection: "row",
  },
  title: {
    alignSelf: "center",
    textAlign: "center",
  },
  icon: {
    fontSize: 32,
  },
});
