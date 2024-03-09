import { memo } from "react";
import {
  Keyboard,
  Platform,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  useDisplayedSongInfo,
  useTheme,
  useThemeStyle,
  userAtom,
} from "./State";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Separator from "./Separator";
import Button from "./Button";
import { useAtom } from "jotai";

function Navbar() {
  const [theme, setTheme] = useTheme();
  const themeStyle = useThemeStyle();
  const [displayedSongInfo] = useDisplayedSongInfo();

  const [user] = useAtom(userAtom);

  const route = useRoute();

  const navigation = useNavigation();

  const insets = useSafeAreaInsets();

  function reportSong() {
    throw new Error("Function not implemented.");
  }

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
          <Button
            icon="menu"
            textStyle={[styles.navbarIcon, themeStyle.txtColor]}
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
          <Button
            icon="edit"
            textStyle={[styles.navbarIcon, themeStyle.txtColor]}
            touchableStyle={styles.navbarMenuIcon}
            // @ts-ignore
            onPress={() => navigation.navigate("UpdateSong")}
          />
        ) : (
          route.name === "Cantare" &&
          !user.loggedIn && (
            <Button
              icon="report-gmailerrorred"
              textStyle={[styles.navbarIcon, themeStyle.txtColor]}
              touchableStyle={styles.navbarMenuIcon}
              onPress={() => {
                reportSong();
              }}
            />
          )
        )}
        {route.name === "Cantare" && (
          <Button
            icon="share"
            textStyle={[styles.navbarIcon, themeStyle.txtColor]}
            touchableStyle={styles.navbarMenuIcon}
            onPress={() => {
              Share.share({
                message: displayedSongInfo.song.content,
                title: displayedSongInfo.song.title,
                url: displayedSongInfo.song.title,
              });
            }}
          />
        )}
        <Button
          icon="contrast"
          textStyle={[styles.navbarIcon, themeStyle.txtColor]}
          touchableStyle={styles.navbarMenuIcon}
          onPress={() => {
            setTheme(!theme.data);
          }}
        />
      </View>
      <Separator />
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
