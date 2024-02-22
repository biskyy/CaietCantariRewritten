import { StyleSheet, View } from "react-native";
import { useAtom } from "jotai";
import { useNavigation, useRoute } from "@react-navigation/native";
import { songsAtom, useTheme } from "./State";
import ThemeColors from "./ColorScheme";
import Button from "./Button";
import { FlashList } from "@shopify/flash-list";

export default function SongList() {
  const [theme] = useTheme();
  const [songs] = useAtom(songsAtom);

  const route = useRoute();
  const navigation = useNavigation();

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

  // get corresponding book_id for route name
  const bookIDMappings = {
    "Toate Cantarile": null,
    "Caiet de Cantari": "CC",
    "Cantari BER": "BER",
    "Jubilate": "J",
    "Cartea de Tineret": "CT",
    "Cor": "Cor",
  };

  // get the filter
  const bookIDFilter = bookIDMappings[route.name] || null;

  const data = songs.filter(
    (song) => bookIDFilter === null || song.book_id === bookIDFilter
  );

  const renderItem = ({ item }) => (
    <Button
      text={item.title}
      textStyle={[themeStyle.txtColor, styles.textStyle]}
      touchableStyle={[styles.touchableStyle]}
      onPress={() => console.log(item)}
    />
  );

  return (
    <>
      <View style={[themeStyle.bgColor, styles.songListDiv]}>
        <FlashList
          renderItem={renderItem}
          data={data}
          extraData={[theme, styles]} // update the list on theme change
          estimatedItemSize={48}
          estimatedListSize={{ height: 794, width: 414 }} // faster render
          indicatorStyle={theme.data ? "white" : "black"} // change the color of the scroll bar on theme change
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  songListDiv: {
    height: "100%",
  },
  touchableStyle: {
    paddingHorizontal: 16,
    height: 48,
    justifyContent: "center",
  },
  textStyle: {
    fontSize: 16,
  },
});
