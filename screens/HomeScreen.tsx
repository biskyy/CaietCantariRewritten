import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerScreenProps,
} from "@react-navigation/drawer";
import { useAtom } from "jotai";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ReportsScreen from "@/screens/ReportsScreen";

import SongList from "@/components/SongList";
import Button from "@/components/Button/Button";
import Separator from "@/components/Separator";
import IconButton from "@/components/Button/IconButton";

import { songsAtom, userAtom } from "@/state/persistent";
import { fetchSongs } from "@/state/utils";

import { useLoadingScreen } from "@/hooks/useLoadingScreen";
import { DrawerParamList, RootStackScreenProps } from "@/types/navigator";
import { useNavigation, useTheme } from "@react-navigation/native";
import { HeaderBackground } from "@/components/ui/HeaderBackground";
import { useEffect, useInsertionEffect, useLayoutEffect } from "react";

const Drawer = createDrawerNavigator<DrawerParamList>();

const CustomDrawerMenu = (props: DrawerContentComponentProps) => {
  const theme = useTheme();
  const [, setLoadingScreen] = useLoadingScreen();
  const [, setSongs] = useAtom(songsAtom);
  const [user] = useAtom(userAtom);

  const insets = useSafeAreaInsets();

  const refreshSongs = async () => {
    setLoadingScreen({
      state: "fading_in",
      label: "Se actualizează cântările",
    });

    const response = await fetchSongs();

    if (response.status === 200 && response.data !== undefined) {
      setSongs(response.data);
      setLoadingScreen({
        callback: () =>
          Alert.alert(
            "S-au actualizat cântările",
            "Cântările au fost actualizate cu success.",
          ),
      });
    } else {
      // we have to reset it otherwise the previous one will get called
      setLoadingScreen({ callback: () => {} });
    }
    setLoadingScreen({ state: "fading_out" });
  };

  return (
    <>
      <View
        style={{
          ...styles.drawerMenuHeaderDiv,
          backgroundColor: theme.colors.background,
          paddingTop: insets.top,
          minHeight:
            Platform.OS === "ios" // see Navbar.js for details
              ? insets.top + (100 - insets.top)
              : 100,
        }}
      >
        <Text
          numberOfLines={1}
          style={[styles.drawerMenuTitle, { color: theme.colors.text }]}
        >
          Meniu
        </Text>
        <IconButton.Oct
          icon="gear"
          size={24}
          onPress={() => {
            props.navigation.navigate("Settings");
          }}
          touchableStyle={[styles.drawerMenuSettingsButtonDiv]}
        />
      </View>
      <Separator />
      <ScrollView
        style={[
          { backgroundColor: theme.colors.background },
          styles.drawerMenuButtonDiv,
        ]}
        contentContainerStyle={{ padding: 10 }}
      >
        {props.state.routeNames.slice(0, -2).map((name, index) => (
          <Button
            text={name}
            key={name}
            onPress={() => props.navigation.navigate(name)}
            textStyle={[styles.drawerMenuButtonText]}
            touchableStyle={[styles.drawerMenuButton]}
            type={props.state.index === index ? "primary" : "secondary"}
          />
        ))}
        <Button
          text="Cântări favorite"
          icon="star"
          iconSize={20}
          onPress={() => props.navigation.navigate("Cântări favorite")}
          textStyle={[styles.drawerMenuButtonText]}
          touchableStyle={[
            styles.drawerMenuButton,
            styles.drawerMenuRefreshButton,
          ]}
          type={
            props.state.index ===
            props.state.routeNames.indexOf("Cântări favorite")
              ? "primary"
              : "secondary"
          }
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
            type={
              props.state.index === props.state.routeNames.indexOf("Rapoarte")
                ? "primary"
                : "secondary"
            }
          />
        )}
        <Button
          text="Actualizează cântările"
          icon="refresh"
          iconSize={20}
          textStyle={[styles.drawerMenuButtonText]}
          touchableStyle={[
            styles.drawerMenuButton,
            styles.drawerMenuRefreshButton,
          ]}
          onPress={refreshSongs}
          type="secondary"
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

export default function HomeScreen({
  route,
  navigation,
}: RootStackScreenProps<"Home">) {
  const theme = useTheme();

  // see https://github.com/react-navigation/react-navigation/issues/11347
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false, headerBackground: undefined });
  }, []);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: theme.colors.text,
        headerTransparent: Platform.select({ default: false, ios: true }),
        headerBackground: HeaderBackground,
        headerShadowVisible: true,
        headerBackgroundContainerStyle: {
          boxShadow: Platform.select({
            default: undefined, // on android HeaderBackground takes care of this
            ios: "0px 0px 0px 0.5px " + theme.colors.border,
          }),
          // borderColor: theme.colors.border,
          // borderBottomWidth: 1,
        },
        drawerType: "front",
        swipeEdgeWidth: 25,
      }}
      drawerContent={(props) => <CustomDrawerMenu {...props} />}
      initialRouteName="Toate Cântările"
    >
      <Drawer.Screen name="Toate Cântările" component={SongList} />
      <Drawer.Screen name="Caiet de Cântări" component={SongList} />
      <Drawer.Screen name="Cântări BER" component={SongList} />
      <Drawer.Screen name="Jubilate" component={SongList} />
      <Drawer.Screen name="Cartea de Tineret" component={SongList} />
      <Drawer.Screen name="Cor" component={SongList} />
      <Drawer.Screen name="Cântări favorite" component={SongList} />
      <Drawer.Screen name="Rapoarte" component={ReportsScreen} />
    </Drawer.Navigator>
  );
}
