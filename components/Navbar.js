import { memo } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme, useThemeStyle } from "./State";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Separator from "./Separator";
import Button from "./Button";

function Navbar() {
  const [theme, setTheme] = useTheme();
  const themeStyle = useThemeStyle();

  const route = useRoute();
  // @ts-ignore
  const { toggleDrawer } = useNavigation();

  const insets = useSafeAreaInsets();

  const test = insets.top;

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
        route.name != "Song" &&
        route.name != "Login" &&
        route.name != "EditSong" ? (
          <Button
            icon="menu"
            textStyle={[styles.navbarIcon, themeStyle.txtColor]}
            touchableStyle={styles.navbarMenuIcon}
            onPress={() => {
              toggleDrawer();
            }}
          />
        ) : (
          <View style={styles.navbarMenuIcon} />
        )}
        <View style={styles.navbarTitleContainer}>
          <Text
            numberOfLines={1}
            style={[styles.navbarTitle, themeStyle.txtColor]}
          >
            {route.name}
          </Text>
        </View>
        {/* <Button
          icon="edit"
          textStyle={[styles.navbarIcon, themeStyle.txtColor]}
          touchableStyle={styles.navbarMenuIcon}
          onPress={() => {
            setTheme("not set");
          }}
        /> */}
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
    // height: 148,
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
    fontSize: 32,
    fontWeight: "700",
  },
  navbarTitleContainer: {
    justifyContent: "center",
    flexGrow: 6,
    flexBasis: 0,
  },
  navbarThemeIcon: {},
});

export default memo(Navbar);
