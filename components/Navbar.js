import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAtom } from "jotai";
import { useNavigation, useRoute } from "@react-navigation/native";
import ThemeColors from "./ColorScheme";
import { themeAtom } from "./State";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Separator from "./Separator";
import Button from "./Button";

function Navbar() {
  const [theme, setTheme] = useAtom(themeAtom);

  const themeStyle = StyleSheet.create({
    bgColor: {
      backgroundColor: theme
        ? ThemeColors.darkBgColor
        : ThemeColors.lightBgColor,
    },
    txtColor: {
      color: theme ? ThemeColors.darkTxtColor : ThemeColors.lightTxtColor,
    },
  });

  const route = useRoute();
  // @ts-ignore
  const { toggleDrawer } = useNavigation();

  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar style={theme ? "light" : "dark"} />
      <View
        style={{
          ...themeStyle.bgColor,
          ...styles.navbarDiv,
          paddingTop: insets.top,
        }}
      >
        {route.name != "Settings" && route.name != "Song" ? (
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
        <Button
          icon="contrast"
          textStyle={[styles.navbarIcon, themeStyle.txtColor]}
          touchableStyle={styles.navbarMenuIcon}
          onPress={() => {
            setTheme(!theme);
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
    height: 100,
    paddingBottom: 10,
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