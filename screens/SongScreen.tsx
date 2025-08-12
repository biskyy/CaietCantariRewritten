import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Platform,
  Share,
} from "react-native";
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
  userAtom,
} from "@/state/persistent";

import { useNavigation, useTheme } from "@react-navigation/native";
import { DisplayedSong } from "@/types/state";
import { useDisplayedSongInfo } from "@/hooks/useDisplayedSong";
import { useHeaderHeight } from "@react-navigation/elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { getScrollViewCorrectInsetsForTransparentHeaders } from "@/state/utils";
import { TitleBlurView } from "@/components/ui/TitleBlurView";

const TITLE_VIEW_HEIGHT = 50;
const SONG_PADDING_HORIZONTAL = 14;
const SONG_PADDING_VERTICAL = 30;

export default function SongScreen() {
  const theme = useTheme();
  const [fontSize, setFontSize] = useAtom(fontSizeAtom);
  const [songs] = useAtom(songsAtom);
  const [favoriteSongs, setFavoriteSongs] = useAtom(userFavoriteSongsAtom);
  const [orientation] = useAtom(orientationAtom);
  const [displayedSongInfo, setDisplayedSongInfo] = useDisplayedSongInfo();
  const navigation = useNavigation();
  const [user] = useAtom(userAtom);

  if (displayedSongInfo === undefined) {
    return (
      <Text>
        Uh oh! Se pare ca ai ajuns pe ecranul de vizualizare cantare fara sa fi
        selectat vreuna
      </Text>
    );
  }

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
    if (displayedSongInfo === undefined) {
      return console.log(
        "error - SongScreen - displayedSong is undefined but addSongToFavorites got called",
      );
    }
    if (favoriteSongs.includes(displayedSongInfo.song.index))
      setFavoriteSongs(
        favoriteSongs.filter((song) => song !== displayedSongInfo.song.index),
      );
    else setFavoriteSongs([displayedSongInfo.song.index, ...favoriteSongs]);
  }

  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  return (
    <>
      <View
        style={[
          {
            backgroundColor: theme.colors.background,
            // flex: 1,
            paddingTop: Platform.select({ default: TITLE_VIEW_HEIGHT, ios: 0 }),
          },
          styles.songDiv,
        ]}
      >
        <ScrollView
          {...getScrollViewCorrectInsetsForTransparentHeaders(
            TITLE_VIEW_HEIGHT,
            0,
          )}
          indicatorStyle={theme ? "white" : "black"}
          contentContainerStyle={{
            alignItems: "center",
            paddingHorizontal: SONG_PADDING_HORIZONTAL,
            paddingVertical: SONG_PADDING_VERTICAL,
            paddingBottom:
              orientation === "landscape" && Platform.OS === "ios"
                ? SONG_PADDING_VERTICAL * 2
                : SONG_PADDING_VERTICAL,
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
        {/* https://docs.expo.dev/versions/latest/sdk/blur-view/#known-issues  */}
        <TitleBlurView
          style={[
            styles.titleDiv,
            {
              position: "absolute",
              top: Platform.select({ default: 0, ios: headerHeight }),
              overflow: "hidden",
              backgroundColor: Platform.select({
                default: theme.colors.card,
                ios: undefined,
              }),
            },
          ]}
          intensity={100}
          tint="systemChromeMaterial"
        >
          <IconButton.Mat
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
              { color: theme.colors.text, fontSize: 20, fontWeight: "bold" },
              // themeStyle.title,
              styles.title,
              { flexGrow: 5, flexBasis: 0 },
            ]}
          >
            {displayedSongInfo.song.title}
          </Text>
          <IconButton.Mat
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
        </TitleBlurView>
        <BottomBar>
          <IconButton.Oct
            icon={Platform.select({ android: "share-android", ios: "share" })}
            size={22}
            useSystemColor
            touchableStyle={styles.bottomBarButtonDiv}
            onPress={() =>
              Share.share({
                message: `${displayedSongInfo.song.title}\n\n${displayedSongInfo.song.content}`,
                title: displayedSongInfo.song.title,
              })
            }
          />
          <IconButton.Oct
            icon={
              favoriteSongs.includes(displayedSongInfo.song.index)
                ? Platform.select({ android: "star-fill", ios: "heart-fill" })
                : Platform.select({ android: "star", ios: "heart" })
            }
            size={22}
            useSystemColor
            touchableStyle={styles.bottomBarButtonDiv}
            onPress={() => addSongToFavorites()}
          />
          <IconButton.Fe
            icon="zoom-out"
            size={22}
            useSystemColor
            touchableStyle={styles.bottomBarButtonDiv}
            onPress={() => handleFontSizeChange("-")}
          />
          <IconButton.Fe
            icon="zoom-in"
            size={22}
            useSystemColor
            touchableStyle={styles.bottomBarButtonDiv}
            onPress={() => handleFontSizeChange("+")}
          />
          {user.adminToken !== undefined ? (
            <IconButton.Fe
              icon={Platform.select({ default: "edit-3", ios: "edit" })}
              size={22}
              useSystemColor
              touchableStyle={styles.bottomBarButtonDiv}
              onPress={() => navigation.navigate("UpdateSong")}
            />
          ) : (
            <IconButton.MatCo
              icon="bug-outline"
              size={24}
              useSystemColor
              touchableStyle={styles.bottomBarButtonDiv}
              onPress={() => {}}
            />
          )}
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
    minHeight: TITLE_VIEW_HEIGHT,
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
