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

import Separator from "@/components/Separator";

import { orientationAtom } from "@/state/global";
import {
  userFavoriteSongsAtom,
  songsAtom,
  fontSizeAtom,
  userAtom,
} from "@/state/persistent";

import { useNavigation, useTheme } from "@react-navigation/native";
import { useDisplayedSongInfo } from "@/hooks/useDisplayedSong";
import { useHeaderHeight } from "@react-navigation/elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  createReport,
  getCorrectInsetsForScrollViewsCoveredByAbsoluteViews,
  getVerticalPaddingForViewsCoveredByAbsoluteViews,
} from "@/state/utils";
import { TitleBlurView } from "@/components/ui/TitleBlurView";
import { ActionBar } from "@/components/ActionBar";
import { useActionBarHeight } from "@/hooks/useActionBarHeight";
import { ACTION_BAR_PREFFERED_HEIGHT } from "@/constants";
import Button from "@/components/Button/Button";
import Icon from "@/components/Icon";
import Dialog from "@/components/Dialog/Dialog";
import DialogTitle from "@/components/Dialog/DialogTitle";
import DialogText from "@/components/Dialog/DialogText";
import Input from "@/components/Input";

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

  const [songReportDialogVisible, setSongReportDialogVisible] = useState(false);
  const [songReportAdditionalDetails, setSongReportAdditionalDetails] =
    useState("");

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

  const [actionBarHeight] = useActionBarHeight();
  // console.log(actionBarHeight);

  return (
    <>
      <View
        style={[
          {
            backgroundColor: theme.colors.background,
            ...getVerticalPaddingForViewsCoveredByAbsoluteViews(
              TITLE_VIEW_HEIGHT,
              actionBarHeight,
            ),
          },
          styles.songDiv,
        ]}
      >
        <ScrollView
          {...getCorrectInsetsForScrollViewsCoveredByAbsoluteViews(
            TITLE_VIEW_HEIGHT + 1, // TODO: + 1 px from the separator at the bottom of the title view
            0,
            actionBarHeight,
            insets.bottom,
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
        <View
          style={[
            {
              position: "absolute",
              top: Platform.select({ default: 0, ios: headerHeight }),
              overflow: "hidden",
              width: "100%",
            },
          ]}
        >
          {/* <Separator /> */}
          <TitleBlurView
            style={[
              styles.titleDiv,
              {
                backgroundColor: Platform.select({
                  default: theme.colors.card,
                  ios: undefined,
                }),
                justifyContent: "space-between",
              },
            ]}
            intensity={100}
            tint="systemChromeMaterial"
          >
            <Button
              touchableStyle={styles.titleArrow}
              onPress={() =>
                displayedSongInfo.song.index >
                  displayedSongInfo.bookFirstIndex &&
                setDisplayedSongInfo({
                  song: {
                    ...displayedSongInfo.song,
                    index: displayedSongInfo.song.index - 1,
                  },
                })
              }
              icon={() => (
                <Icon.Mat
                  name={
                    displayedSongInfo.song.index >
                    displayedSongInfo.bookFirstIndex
                      ? "keyboard-arrow-left"
                      : undefined
                  }
                  size={32}
                  // style={{ marginHorizontal: 15 }}
                />
              )}
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
            <Button
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
              icon={() => (
                <Icon.Mat
                  name={
                    displayedSongInfo.song.index <
                    displayedSongInfo.bookLastIndex - 1
                      ? "keyboard-arrow-right"
                      : undefined
                  }
                  size={32}
                  // style={{ marginHorizontal: 15 }}
                />
              )}
            />
          </TitleBlurView>
          <Separator />
        </View>
        <ActionBar horizontal prefferedHeight={ACTION_BAR_PREFFERED_HEIGHT}>
          <Button
            touchableStyle={styles.bottomBarButtonDiv}
            onPress={() =>
              Share.share({
                message: `${displayedSongInfo.song.title}\n\n${displayedSongInfo.song.content}`,
                title: displayedSongInfo.song.title,
              })
            }
            icon={() => (
              <Icon.Oct
                name={Platform.select({
                  android: "share-android",
                  ios: "share",
                })}
                size={22}
                useSystemColor
              />
            )}
          />
          <Button
            touchableStyle={styles.bottomBarButtonDiv}
            onPress={() => addSongToFavorites()}
            icon={() => (
              <Icon.Oct
                name={
                  favoriteSongs.includes(displayedSongInfo.song.index)
                    ? Platform.select({
                        android: "star-fill",
                        ios: "heart-fill",
                      })
                    : Platform.select({ android: "star", ios: "heart" })
                }
                size={22}
                useSystemColor
              />
            )}
          />
          <Button
            touchableStyle={styles.bottomBarButtonDiv}
            onPress={() => handleFontSizeChange("-")}
            icon={() => <Icon.Fe name="zoom-out" size={22} useSystemColor />}
          />
          <Button
            touchableStyle={styles.bottomBarButtonDiv}
            onPress={() => handleFontSizeChange("+")}
            icon={() => <Icon.Fe name="zoom-in" size={22} useSystemColor />}
          />
          {user.adminToken !== undefined ? (
            <Button
              touchableStyle={styles.bottomBarButtonDiv}
              onPress={() => navigation.navigate("UpdateSong")}
              icon={() => (
                <Icon.Fe
                  name={Platform.select({ default: "edit-3", ios: "edit" })}
                  size={22}
                  useSystemColor
                />
              )}
            />
          ) : (
            <Button
              touchableStyle={styles.bottomBarButtonDiv}
              onPress={() => setSongReportDialogVisible(true)}
              icon={() => (
                <Icon.MatCo name="bug-outline" size={24} useSystemColor />
              )}
            />
          )}
        </ActionBar>
      </View>
      <Dialog
        visible={songReportDialogVisible}
        setModalVisible={setSongReportDialogVisible}
      >
        <DialogTitle>Raportează o greșeală</DialogTitle>
        <Separator />
        <Text />
        <DialogText>Adaugă detalii suplimentare (opțional)</DialogText>
        <Input
          value={songReportAdditionalDetails}
          onChangeText={setSongReportAdditionalDetails}
          textInputDivStyle={{ marginBottom: 10, marginTop: 5, height: 150 }}
          placeholder="Scrie aici cum ar trebuii să corectăm cântarea..."
          multiline
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            onPress={() => setSongReportDialogVisible(false)}
            text="Anulează"
            type="secondary"
          />
          <Button
            onPress={() => {
              createReport(
                displayedSongInfo.song.index,
                songReportAdditionalDetails,
              );
              setSongReportDialogVisible(false);
            }}
            text="Trimite"
            type="primary"
          />
        </View>
      </Dialog>
    </>
  );
}

const styles = StyleSheet.create({
  songDiv: {
    height: "100%",
  },
  bottomBarButtonDiv: {
    // backgroundColor: "red",
    minHeight: 50,
    // height: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleArrow: {
    paddingHorizontal: 15,
    flexShrink: 0,
    // flexGrow: 1,
    // flexBasis: 0,
  },
  titleDiv: {
    width: "100%",
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
