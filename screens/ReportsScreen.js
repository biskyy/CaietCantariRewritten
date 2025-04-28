import { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useAtom } from "jotai";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";

import Button from "@/components/Button/Button";
import Dialog from "@/components/Dialog/Dialog";
import DialogTitle from "@/components/Dialog/DialogTitle";
import DialogSubtitle from "@/components/Dialog/DialogSubtitle";
import DialogText from "@/components/Dialog/DialogText";
import Separator from "@/components/Separator";

import { reportsArrayAtom } from "@/state/global";
import { songsAtom, userAtom } from "@/state/persistent";
import { deleteReport, fetchReports } from "@/state/utils";

import { useThemeStyle } from "@/hooks/useThemeStyle";
import { useDisplayedSongInfo } from "@/hooks/useDisplayedSong";
import { useTheme } from "@/hooks/useTheme";

const ReportsScreen = () => {
  const themeStyle = useThemeStyle();
  const [theme] = useTheme();
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
      if (response.status === 200) setReportsArray(response.data);
      setFetchState("Empty");
    };
    fetch();
  }, []);

  const estimatedListSize = useMemo(() => {
    return { height: 794, width: 414 };
  }, [theme]);

  const itemOnPressProp = useCallback((item) => {
    setDisplayedSongInfo({
      song: songs[item.songIndex],
      index: item.songIndex,
      currentReport: item,
    });
    // @ts-ignore
    setModalVisible(true);
  }, []);

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <Button
          secondary
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

  return (
    <View
      style={{
        flex: 1,
        ...themeStyle.bgColor,
        // justifyContent: "center",
        padding: 10,
      }}
    >
      {reportsArray.length === 0 && (
        <Text style={[themeStyle.txtColor, { alignSelf: "center" }]}>
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
          indicatorStyle={theme.data ? "white" : "black"}
          keyboardShouldPersistTaps="handled"
        />
      )}
      <Dialog visible={modalVisible} setModalVisible={setModalVisible}>
        <DialogTitle>{displayedSongInfo.song.title}</DialogTitle>
        <Separator />
        <DialogSubtitle>Detalii suplimentare:</DialogSubtitle>
        <DialogText>
          {displayedSongInfo.currentReport.additionalDetails || "Nu exista"}
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
              text="Inchide"
              secondary
              touchableStyle={{ marginRight: 5 }}
              onPress={() => {
                setDisplayedSongInfo({ currentReport: {} });
                setModalVisible(false);
              }}
            />
            <Button
              text="Sterge"
              secondary
              onPress={() => {
                deleteReport(displayedSongInfo.currentReport, user.adminToken);
                setModalVisible(false);
              }}
            />
          </View>
          <Button text="Corecteaza" primary onPress={() => goToUpdateSong()} />
        </View>
      </Dialog>
    </View>
  );
};

export default ReportsScreen;
