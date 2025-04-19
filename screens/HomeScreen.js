import { createDrawerNavigator } from "@react-navigation/drawer";
import SongList from "../components/SongList";
import Navbar from "../components/Navbar";
import Button from "../components/Buttons/Button";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { songsAtom, userAtom } from "../components/State";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Separator from "../components/Separator";
import { useAtom } from "jotai";
import { useLoadingScreen, useThemeStyle } from "../components/Hooks";
import { fetchSongsRequest } from "../components/Utils";
import IconButton from "../components/Buttons/IconButton";
import ReportsScreen from "./ReportsScreen";

const Drawer = createDrawerNavigator();

const CustomDrawerMenu = (props) => {
  const themeStyle = useThemeStyle();
  const [, setLoadingScreen] = useLoadingScreen();
  const [, setSongs] = useAtom(songsAtom);
  const [user] = useAtom(userAtom);

  const insets = useSafeAreaInsets();

  const refreshSongs = async () => {
    setLoadingScreen({
      state: 1,
      message: "Se actualizeaza cantarile",
    });
    const response = await fetchSongsRequest();
    if (response.status === 200) {
      setSongs(response.data);
      setLoadingScreen({
        callback: () =>
          Alert.alert(
            "S-au actualizat cantarile",
            "Cantarile au fost actualizate cu succes.",
          ),
      });
    }
    setLoadingScreen({ state: 2 });
  };

  return (
    <>
      <View
        style={{
          ...themeStyle.bgColor,
          ...styles.drawerMenuHeaderDiv,
          paddingTop: insets.top,
          minHeight:
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
        <IconButton
          icon="settings"
          size={32}
          onPress={() => {
            props.navigation.navigate("Settings");
          }}
          touchableStyle={[styles.drawerMenuSettingsButtonDiv]}
        />
      </View>
      <Separator />
      <ScrollView
        style={[themeStyle.bgColor, styles.drawerMenuButtonDiv]}
        contentContainerStyle={{ padding: 10 }}
      >
        {props.state.routeNames.slice(0, -2).map((name, index) => (
          <Button
            text={name}
            key={name}
            onPress={() => props.navigation.navigate(name)}
            textStyle={[styles.drawerMenuButtonText]}
            touchableStyle={[styles.drawerMenuButton]}
            primary={props.state.index === index}
            secondary={props.state.index !== index}
          />
        ))}
        <Button
          text="Cantari favorite"
          icon="star"
          iconSize={20}
          onPress={() => props.navigation.navigate("Cantari favorite")}
          textStyle={[styles.drawerMenuButtonText]}
          touchableStyle={[
            styles.drawerMenuButton,
            styles.drawerMenuRefreshButton,
          ]}
          {...(props.state.index ===
          props.state.routeNames.indexOf("Cantari favorite")
            ? { primary: true }
            : { secondary: true })}
        />
        {user.adminToken && (
          <Button
            text="Rapoarte"
            icon="bug-report"
            iconSize={20}
            textStyle={[styles.drawerMenuButtonText]}
            touchableStyle={[
              styles.drawerMenuButton,
              styles.drawerMenuRefreshButton,
            ]}
            onPress={() => props.navigation.navigate("Rapoarte")}
            {...(props.state.index ===
            props.state.routeNames.indexOf("Rapoarte")
              ? { primary: true }
              : { secondary: true })}
          />
        )}
        <Button
          text="Actualizeaza cantarile"
          icon="refresh"
          iconSize={20}
          textStyle={[styles.drawerMenuButtonText]}
          touchableStyle={[
            styles.drawerMenuButton,
            styles.drawerMenuRefreshButton,
          ]}
          onPress={refreshSongs}
          secondary
        />
      </ScrollView>
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
    padding: 10,
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
    justifyContent: "center",
    minHeight: 50,
  },
  drawerMenuButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  drawerMenuRefreshButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
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
      <Drawer.Screen name="Rapoarte" component={ReportsScreen} />
    </Drawer.Navigator>
  );
}
