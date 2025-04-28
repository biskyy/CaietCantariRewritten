import { memo, useState } from "react";
import {
  Keyboard,
  Platform,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useAtom } from "jotai";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

import Separator from "@/components/Separator";
import Button from "@/components/Button/Button";
import Input from "@/components/Input";
import IconButton from "@/components/Button/IconButton";
import Dialog from "@/components/Dialog/Dialog";
import DialogTitle from "@/components/Dialog/DialogTitle";
import DialogText from "@/components/Dialog/DialogText";

import {
  modalVisibleAtom,
  orientationAtom,
  reportsArrayAtom,
} from "@/state/global";
import { userAtom } from "@/state/persistent";
import { createReport, fetchReports } from "@/state/utils";

import { useTheme } from "@/hooks/useTheme";
import { useThemeStyle } from "@/hooks/useThemeStyle";
import { useDisplayedSongInfo } from "@/hooks/useDisplayedSong";

const Navbar = () => {
  const [theme, setTheme] = useTheme();
  const themeStyle = useThemeStyle();
  const [displayedSongInfo] = useDisplayedSongInfo();
  const [, setReportsArray] = useAtom(reportsArrayAtom);
  const [orientation] = useAtom(orientationAtom);
  const [additionalDetails, setAdditionalDetails] = useState("");

  const [user] = useAtom(userAtom);
  const [modalVisible, setModalVisible] = useAtom(modalVisibleAtom);

  const route = useRoute();

  const navigation = useNavigation();

  const insets = useSafeAreaInsets();

  const reportSong = () => {
    createReport(displayedSongInfo.index, additionalDetails);
  };

  if (orientation === "landscape") return <></>;

  return (
    <>
      <View
        style={{
          ...themeStyle.bgColor,
          ...styles.navbarDiv,
          paddingTop: insets.top,
          minHeight:
            Platform.OS === "ios" // change 100 to whatever you want the total height of the navbar to be
              ? insets.top + (100 - insets.top) // on ios, height = element height + padding + margin(probably)
              : 100, //on android, height = element height(the element height is always what you set it to regardless of padding and margin)
        }}
      >
        {route.name != "Settings" &&
        route.name != "Cantare" &&
        route.name != "Login" &&
        route.name != "UpdateSong" ? (
          <IconButton
            icon="menu"
            size={32}
            touchableStyle={styles.navbarMenuIcon}
            onPress={() => {
              Keyboard.dismiss();
              // @ts-ignore
              navigation.toggleDrawer();
            }}
          />
        ) : (
          <View style={styles.navbarMenuIcon} />
        )}
        <View
          style={[
            styles.navbarTitleContainer,
            {
              flexGrow:
                route.name === "Cantare"
                  ? 4
                  : route.name === "Rapoarte"
                    ? 5
                    : 6,
            },
          ]}
        >
          <Text
            numberOfLines={1}
            style={[styles.navbarTitle, themeStyle.txtColor]}
          >
            {route.name}
          </Text>
        </View>
        {route.name === "Cantare" && user.adminToken ? (
          <IconButton
            icon="edit"
            size={32}
            touchableStyle={styles.navbarMenuIcon}
            // @ts-ignore
            onPress={() => navigation.navigate("UpdateSong")}
          />
        ) : (
          route.name === "Cantare" &&
          !user.adminToken && (
            <IconButton
              icon="report-gmailerrorred"
              size={32}
              touchableStyle={styles.navbarMenuIcon}
              onPress={() => setModalVisible(true)}
            />
          )
        )}
        {route.name === "Cantare" && (
          <IconButton
            icon="share"
            size={32}
            touchableStyle={styles.navbarMenuIcon}
            onPress={() =>
              Share.share({
                message: `${displayedSongInfo.song.title}\n\n${displayedSongInfo.song.content}`,
                title: displayedSongInfo.song.title,
              })
            }
          />
        )}
        {route.name === "Rapoarte" && (
          <IconButton
            icon="refresh"
            size={32}
            touchableStyle={styles.navbarMenuIcon}
            onPress={async () => {
              const response = await fetchReports();
              setReportsArray(response.data);
            }}
          />
        )}
        <IconButton
          icon="contrast"
          size={32}
          touchableStyle={styles.navbarMenuIcon}
          onPress={() => {
            setTheme(!theme.data);
          }}
        />
      </View>
      <Separator />
      {modalVisible && (
        <Dialog visible={modalVisible} setModalVisible={setModalVisible}>
          <DialogTitle>Raporteaza o cantare</DialogTitle>
          <Separator />
          <Text />
          <DialogText>Adauga detalii suplimentare (optional)</DialogText>
          <Input
            value={additionalDetails}
            onChangeText={setAdditionalDetails}
            textInputDivStyle={{ marginBottom: 10, height: 150 }}
            placeholder="Scrie aici cum ar trebuii sa corectam cantarea"
            multiline
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              onPress={() => setModalVisible(false)}
              text="Anulează"
              secondary
            />
            <Button
              onPress={() => {
                createReport(displayedSongInfo.index, additionalDetails);
                setModalVisible(false);
              }}
              text="Trimite"
              primary
            />
          </View>
        </Dialog>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  navbarDiv: {
    flexDirection: "row",
  },
  navbarIcon: {
    fontSize: 32,
  },
  navbarMenuIcon: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    flexBasis: 0,
  },
  navbarTitle: {
    fontSize: 34,
    fontWeight: "bold",
  },
  navbarTitleContainer: {
    justifyContent: "center",
    flexBasis: 0,
  },
  navbarThemeIcon: {},
});

export default memo(Navbar);
