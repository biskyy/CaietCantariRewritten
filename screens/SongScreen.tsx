import { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, Platform } from "react-native";
import { useAtom } from "jotai";

import { useKeepAwake } from "expo-keep-awake";
import * as ScreenOrientation from "expo-screen-orientation";

import IconButton from "@/components/Button/IconButton";
import Separator from "@/components/Separator";
import BottomBar from "@/components/BottomBar";

import { displayedSongInfoAtom, orientationAtom } from "@/state/global";
import {
  userFavoriteSongsAtom,
  songsAtom,
  fontSizeAtom,
} from "@/state/persistent";

import { useNavigation, useTheme } from "@react-navigation/native";
import { DisplayedSong } from "@/types/state";
import { useDisplayedSongInfo } from "@/hooks/useDisplayedSong";

export default function SongScreen() {
  const theme = useTheme();
  const [fontSize, setFontSize] = useAtom(fontSizeAtom);
  const [songs] = useAtom(songsAtom);
  const [favoriteSongs, setFavoriteSongs] = useAtom(userFavoriteSongsAtom);
  const [orientation] = useAtom(orientationAtom);
  const [displayedSongInfo, setDisplayedSongInfo] = useDisplayedSongInfo();
  const navigation = useNavigation();

  useKeepAwake();

  useEffect(() => {
    ScreenOrientation.unlockAsync();
    return () => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP,
      );
    };
  }, []);

  useEffect(
    () => setDisplayedSongInfo({ song: songs[displayedSongInfo.song.index] }),
    [songs, displayedSongInfo.song.index],
  );

  const handleFontSizeChange = (sign: "+" | "-") => {
    if (sign === "+") setFontSize(fontSize + 1);
    else if (fontSize !== 1) setFontSize(fontSize - 1);
  };

  function addSongToFavorites() {
    if (favoriteSongs.includes(displayedSongInfo.song.index))
      setFavoriteSongs(
        favoriteSongs.filter((song) => song !== displayedSongInfo.song.index),
      );
    else setFavoriteSongs([displayedSongInfo.song.index, ...favoriteSongs]);
  }

  return (
    <>
      <View
        style={[
          {
            backgroundColor: theme.colors.background,
            flex: 1,
            // marginTop: headerHeight,
          },
          styles.songDiv,
        ]}
      >
        <View style={styles.titleDiv}>
          <IconButton
            icon={
              displayedSongInfo.song.index > displayedSongInfo.bookFirstIndex
                ? "keyboard-arrow-left"
                : undefined
            }
            size={32}
            iconStyle={{ marginHorizontal: 15 }}
            touchableStyle={styles.titleArrow}
            onPress={() =>
              displayedSongInfo.song.index > displayedSongInfo.bookFirstIndex &&
              setDisplayedSongInfo({
                song: {
                  ...displayedSongInfo.song,
                  index: displayedSongInfo.song.index - 1,
                },
              })
            }
          />
          <Text
            numberOfLines={1}
            style={[
              { color: theme.colors.text, fontSize: 28, fontWeight: "bold" },
              // themeStyle.title,
              styles.title,
              { flexGrow: 5, flexBasis: 0 },
            ]}
          >
            {displayedSongInfo.song.title}
          </Text>
          <IconButton
            icon={
              displayedSongInfo.song.index < displayedSongInfo.bookLastIndex - 1
                ? "keyboard-arrow-right"
                : undefined
            }
            size={32}
            iconStyle={{ marginHorizontal: 15 }}
            touchableStyle={styles.titleArrow}
            onPress={() =>
              displayedSongInfo.song.index <
                displayedSongInfo.bookLastIndex - 1 &&
              setDisplayedSongInfo({
                song: {
                  ...displayedSongInfo.song,
                  index: displayedSongInfo.song.index + 1,
                },
              })
            }
          />
        </View>
        <Separator />
        <ScrollView
          indicatorStyle={theme ? "white" : "black"}
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
              ...{ color: theme.colors.text },
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
              favoriteSongs.includes(displayedSongInfo.song.index)
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
