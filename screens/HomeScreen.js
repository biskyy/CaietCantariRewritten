import { createDrawerNavigator } from "@react-navigation/drawer";
import SongList from "../components/SongList";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { StyleSheet, Text, View } from "react-native";
import { useAtom } from "jotai";
import {
  checkInternetConnection,
  fetchSongs,
  isLoadingAtom,
  songsAtom,
  useTheme,
  useThemeStyle,
} from "../components/State";
import ThemeColors from "../components/ColorScheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Separator from "../components/Separator";

const Drawer = createDrawerNavigator();

const CustomDrawerMenu = (props) => {
  const themeStyle = useThemeStyle();
  const [, setSongs] = useAtom(songsAtom);
  const [, setIsLoading] = useAtom(isLoadingAtom);

  const insets = useSafeAreaInsets();

  return (
    <>
      <View
        style={{
          ...themeStyle.bgColor,
          ...styles.drawerMenuHeaderDiv,
          paddingTop: insets.top,
        }}
      >
        <Text
          numberOfLines={1}
          style={[styles.drawerMenuTitle, themeStyle.txtColor]}
        >
          Meniu
        </Text>
        <Button
          icon="settings"
          onPress={() => {
            props.navigation.navigate("Settings");
          }}
          textStyle={[themeStyle.txtColor, styles.drawerMenuSettingsButton]}
          touchableStyle={[
            themeStyle.bgColor,
            styles.drawerMenuSettingsButtonDiv,
          ]}
        />
      </View>
      <Separator />
      <View style={[themeStyle.bgColor, styles.drawerMenuButtonDiv]}>
        {props.state.routeNames.map((name) => (
          <Button
            text={name}
            key={name}
            onPress={() => props.navigation.navigate(name)}
            textStyle={[themeStyle.txtColor, styles.drawerMenuButtonText]}
            touchableStyle={[themeStyle.bgColor, styles.drawerMenuButton]}
          />
        ))}
        <Button
          text="Actualizeaza cantarile"
          icon="refresh"
          textStyle={[themeStyle.txtColor, styles.drawerMenuButtonText]}
          iconStyle={[themeStyle.txtColor, styles.drawerMenuRefreshButtonIcon]}
          touchableStyle={[
            themeStyle.bgColor,
            styles.drawerMenuButton,
            styles.drawerMenuRefreshButton,
          ]}
          onPress={async () => {
            checkInternetConnection();
            try {
              setIsLoading(1);
              const fetchedSongs = await fetchSongs(
                "http://192.168.1.59:3000/songs/"
              );
              if (fetchedSongs.status === 200) setSongs(fetchedSongs.data);
            } finally {
              setIsLoading(2);
            }
          }}
        />
      </View>
    </>
  );
};

export default function HomeScreen({ navigation, route }) {
  const [theme] = useTheme();

  const themeStyle = StyleSheet.create({
    bgColor: {
      backgroundColor: theme.data
        ? ThemeColors.darkBgColor
        : ThemeColors.lightBgColor,
    },
    txtColor: {
      color: theme.data ? ThemeColors.darkTxtColor : ThemeColors.lightTxtColor,
    },
  });

  return (
    <Drawer.Navigator
      screenOptions={{
        header: () => <Navbar />,
        drawerType: "front",
        swipeEdgeWidth: 25,
      }}
      drawerContent={(props) => <CustomDrawerMenu {...props} />}
    >
      <Drawer.Screen name="Toate Cantarile" component={SongList} />
      <Drawer.Screen name="Caiet de Cantari" component={SongList} />
      <Drawer.Screen name="Cantari BER" component={SongList} />
      <Drawer.Screen name="Jubilate" component={SongList} />
      <Drawer.Screen name="Cartea de Tineret" component={SongList} />
      <Drawer.Screen name="Cor" component={SongList} />
      <Drawer.Screen name="Cantari favorite" component={SongList} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerMenuHeaderDiv: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    paddingBottom: 10,
  },
  drawerMenuTitle: {
    flexGrow: 9,
    flexBasis: 0,
    marginHorizontal: 15,
    fontSize: 32,
    fontWeight: "700",
  },
  drawerMenuSettingsButtonDiv: {
    marginHorizontal: 10,
  },
  drawerMenuSettingsButton: {
    justifyContent: "center",
    fontSize: 32,
  },
  drawerMenuButtonDiv: {
    height: "100%",
  },
  drawerMenuButton: {
    marginVertical: 4,
    overflow: "hidden",
    padding: 16,
    paddingHorizontal: 20,
  },
  drawerMenuButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  drawerMenuRefreshButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  drawerMenuRefreshButtonIcon: {
    fontSize: 20,
    marginRight: 10,
  },
});
