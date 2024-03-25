import { memo, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  // TouchableWithoutFeedbackComponent,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { userAtom } from "./State";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Separator from "./Separator";
import Button from "./Buttons/Button";
import { useAtom } from "jotai";
import { useDisplayedSongInfo, useTheme, useThemeStyle } from "./Hooks";
import { createReport } from "./Utils";
import Input from "./Input";
import IconButton from "./Buttons/IconButton";

function Navbar() {
  const [theme, setTheme] = useTheme();
  const themeStyle = useThemeStyle();
  const [displayedSongInfo] = useDisplayedSongInfo();

  const [user] = useAtom(userAtom);
  const [modalVisibility, setModalVisible] = useState(false);

  const route = useRoute();

  const navigation = useNavigation();

  const insets = useSafeAreaInsets();

  const reportSong = () => {
    // createReport(displayedSongInfo.index);
  };

  return (
    <>
      <StatusBar style={theme.data ? "light" : "dark"} />
      <View
        style={{
          ...themeStyle.bgColor,
          ...styles.navbarDiv,
          paddingTop: insets.top,
          height:
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
            { flexGrow: route.name === "Cantare" ? 4 : 6 },
          ]}
        >
          <Text
            numberOfLines={1}
            style={[styles.navbarTitle, themeStyle.txtColor]}
          >
            {route.name}
          </Text>
        </View>
        {route.name === "Cantare" && user.loggedIn ? (
          <IconButton
            icon="edit"
            size={32}
            touchableStyle={styles.navbarMenuIcon}
            // @ts-ignore
            onPress={() => navigation.navigate("UpdateSong")}
          />
        ) : (
          route.name === "Cantare" &&
          !user.loggedIn && (
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
                message: displayedSongInfo.song.content,
                title: displayedSongInfo.song.title,
                url: displayedSongInfo.song.title,
              })
            }
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
      <Modal
        visible={modalVisibility}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={{ flex: 1 }}>
            <ScrollView
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
              scrollEnabled={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{
                flexGrow: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableWithoutFeedback>
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                  <View
                    style={[
                      themeStyle.borderColor,
                      themeStyle.bgColor,
                      {
                        borderWidth: 1,
                        padding: 16,
                        borderRadius: 6,
                        width: "80%",
                      },
                    ]}
                  >
                    <ScrollView
                      scrollEnabled={false}
                      keyboardShouldPersistTaps="handled"
                    >
                      <Text
                        style={[
                          themeStyle.txtColor,
                          themeStyle.title,
                          { marginBottom: 10 },
                        ]}
                      >
                        Raporteaza o greseala
                      </Text>
                      <Text
                        style={[
                          themeStyle.txtColor,
                          themeStyle.text,
                          { marginBottom: 10 },
                        ]}
                      >
                        Doresti sa raportezi o greseala pentru cantarea “
                        {displayedSongInfo.song.title}”?
                      </Text>
                      <Text
                        style={[
                          themeStyle.txtColor,
                          themeStyle.subtitle,
                          { marginBottom: 10 },
                        ]}
                      >
                        Adauga detalii suplimentare (optional)
                      </Text>
                      <Input
                        textInputStyle={{}}
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
                          text="Inchide"
                          textStyle={[{ textAlign: "center" }]}
                          touchableStyle={[]}
                          secondary
                        />
                        <Button
                          onPress={() => setModalVisible(false)}
                          text="Trimite"
                          textStyle={[{ textAlign: "center" }]}
                          touchableStyle={[]}
                          primary
                        />
                      </View>
                    </ScrollView>
                  </View>
                </KeyboardAvoidingView>
              </TouchableWithoutFeedback>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

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
