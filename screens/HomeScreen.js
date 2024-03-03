import { createDrawerNavigator } from "@react-navigation/drawer";
import SongList from "../components/SongList";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { Alert, Platform, StyleSheet, Text, View } from "react-native";
import {
  fetchSongsRequest,
  useLoadingScreen,
  useSongs,
  useThemeStyle,
} from "../components/State";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Separator from "../components/Separator";

const Drawer = createDrawerNavigator();

const CustomDrawerMenu = (props) => {
  const themeStyle = useThemeStyle();
  const [, setSongs] = useSongs();
  const [, setLoadingScreen] = useLoadingScreen();

  const insets = useSafeAreaInsets();

  const refreshSongs = async () => {
    setLoadingScreen({
      state: 1,
      message: "Se actualizeaza cantarile",
    });
    const response = await fetchSongsRequest();
    if (response.status === 200) {
      setSongs(response.data);
    }
    setLoadingScreen({
      state: 2,
      callback: () => {
        const status = response.status;
        if (status === 200)
          Alert.alert(
            "S-au actualizat cantarile",
            "Cantarile au fost actualizate cu succes."
          );
      },
    });
  };

  return (
    <>
      <View
        style={{
          ...themeStyle.bgColor,
          ...styles.drawerMenuHeaderDiv,
          paddingTop: insets.top,
          height:
            Platform.OS === "ios" // see Navbar.js for details
              ? insets.top + (100 - insets.top)
              : 100,
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
          onPress={refreshSongs}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  drawerMenuHeaderDiv: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  drawerMenuTitle: {
    flexGrow: 9,
    flexBasis: 0,
    marginHorizontal: 15,
    fontSize: 34,
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

export default function HomeScreen() {
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
