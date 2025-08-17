import { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useAtom } from "jotai";
import { FlashList } from "@shopify/flash-list";
import { useNavigation, useTheme } from "@react-navigation/native";

import Button from "@/components/Button/Button";
import Dialog from "@/components/Dialog/Dialog";
import DialogTitle from "@/components/Dialog/DialogTitle";
import DialogSubtitle from "@/components/Dialog/DialogSubtitle";
import DialogText from "@/components/Dialog/DialogText";
import Separator from "@/components/Separator";

import { reportsArrayAtom } from "@/state/global";
import { songsAtom, userAtom } from "@/state/persistent";
import {
  deleteReport,
  fetchReports,
  getCorrectInsetsForScrollViewsCoveredByAbsoluteViews,
} from "@/state/utils";

import { useDisplayedSongInfo } from "@/hooks/useDisplayedSong";
import { Report } from "@/types/state";
import { useHeaderHeight } from "@react-navigation/elements";
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Icon from "@/components/Icon";

const ReportsScreen = () => {
  const theme = useTheme();
  const [displayedSongInfo, setDisplayedSongInfo] = useDisplayedSongInfo();
  const [songs] = useAtom(songsAtom);
  const [modalVisible, setModalVisible] = useState(false);
  const [fetchState, setFetchState] = useState("Loading...");
  const [reportsArray, setReportsArray] = useAtom(reportsArrayAtom);
  const [user] = useAtom(userAtom);

  const navigation = useNavigation();

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchReports();
      if (response.status === 200) setReportsArray(response.data ?? []);
      setFetchState("Empty");
    };
    fetch();
  }, []);

  const estimatedListSize = useMemo(() => {
    return { height: 794, width: 414 };
  }, [theme]);

  const itemOnPressProp = useCallback((item: Report) => {
    setDisplayedSongInfo({
      song: songs[item.songIndex],
      currentReport: item,
    });
    // @ts-ignore
    setModalVisible(true);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Report }) => {
      return (
        <Button
          type="secondary"
          onPress={() => itemOnPressProp(item)}
          touchableStyle={{ marginVertical: 2.5 }}
          text={songs[item.songIndex].title}
        />
      );
    },
    [theme],
  );

  const goToUpdateSong = () => {
    setModalVisible(false);
    // @ts-ignore
    navigation.navigate("UpdateSong");
  };

  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  return (
    <>
      <ScrollView
        // see SongList on why this mess is needed
        {...getCorrectInsetsForScrollViewsCoveredByAbsoluteViews(
          headerHeight,
          insets.top,
        )}
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
          // justifyContent: "center",
          padding: 10,
        }}
      >
        {reportsArray.length === 0 && (
          <Text style={{ alignSelf: "center", color: theme.colors.text }}>
            {fetchState}
          </Text>
        )}
        {reportsArray.length > 0 && (
          <FlashList
            renderItem={renderItem}
            data={reportsArray}
            extraData={reportsArray}
            estimatedItemSize={55}
            estimatedListSize={estimatedListSize}
            indicatorStyle={theme.dark ? "white" : "black"}
            keyboardShouldPersistTaps="handled"
          />
        )}
      </ScrollView>
      <Dialog visible={modalVisible} setModalVisible={setModalVisible}>
        <DialogTitle>
          {(displayedSongInfo && displayedSongInfo.song.title) ?? "N/A"}
        </DialogTitle>
        <Separator />
        <Text />
        <DialogText>Detalii suplimentare:</DialogText>
        <DialogText
          style={{
            padding: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: theme.colors.border,
          }}
        >
          {displayedSongInfo?.currentReport.additionalDetails != ""
            ? displayedSongInfo?.currentReport.additionalDetails
            : "Nu există"}
        </DialogText>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 5,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Button
              text="Închide"
              type="secondary"
              touchableStyle={{ marginRight: 5 }}
              onPress={() => {
                setDisplayedSongInfo({ currentReport: {} });
                setModalVisible(false);
              }}
            />
            <Button
              text="Șterge"
              icon={() => <Icon.Fe name="trash-2" size={16} />}
              type="secondary"
              onPress={() => {
                if (user.adminToken === undefined) {
                  console.log("some user got to the reports screen");
                  return;
                }
                // TODO: implement toast
                if (displayedSongInfo !== undefined)
                  deleteReport(
                    displayedSongInfo.currentReport,
                    user.adminToken,
                  );
                setModalVisible(false);
              }}
            />
          </View>
          <Button
            text="Corectează"
            type="primary"
            onPress={() => goToUpdateSong()}
          />
        </View>
      </Dialog>
    </>
  );
};

export default ReportsScreen;
