import { memo, useCallback, useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useAtom } from "jotai";
import { FlashList } from "@shopify/flash-list";
import {
  Route,
  useNavigation,
  useRoute,
  useTheme,
} from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import SongButton from "@/components/Button/SongButton";

import { songsAtom, userFavoriteSongsAtom } from "@/state/persistent";

import { useDisplayedSongInfo } from "@/hooks/useDisplayedSong";
import { Song } from "@/types/state";
import {
  DrawerParamList,
  DrawerParamListKeys,
  SongListScreenProps,
} from "@/types/navigator";

// const validCategories = ["lauda", "rugaciune", "predare"];

const SongList = <T extends DrawerParamListKeys>({
  route,
  navigation,
}: SongListScreenProps<T>) => {
  const { dark: theme, colors } = useTheme();
  const [songs, setSongs] = useAtom(songsAtom);
  const [searchQuery, setSearchQuery] = useState("");
  const [favoriteSongs, setFavoriteSongs] = useAtom(userFavoriteSongsAtom);
  // const [selectedCategories, setSelectedCategories] = useState([
  //   // "Lauda",
  //   // "Rugaciune",
  //   // "Predare",
  //   // "lauda",
  //   // "rugaciune",
  //   // "predare",
  // ]);

  // SongList<"Caiet de Cantari">;

  const [, setDisplayedSongInfo] = useDisplayedSongInfo();

  const insets = useSafeAreaInsets();

  // const route: Route<""> = useRoute();
  // const navigation: NavigationTimingType = useNavigation();

  // get corresponding book_id for route name
  const bookIDMappings = {
    "Toate Cantarile": null,
    "Caiet de Cantari": "CC",
    "Cantari BER": "BER",
    Jubilate: "J",
    "Cartea de Tineret": "CT",
    Cor: "Cor",
    "Cantari favorite": "CF",
  };

  // get the filter
  const bookIDFilter = bookIDMappings[route.name] || null;

  const data = useMemo(
    () =>
      songs.filter((song) => {
        if (bookIDFilter === "CF") return favoriteSongs.includes(song.index);
        return bookIDFilter === null || song.book_id === bookIDFilter;
      }),
    [theme, songs, favoriteSongs],
  );

  const [filteredSongs, setFilteredSongs] = useState(data);

  const format = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^\w\s.-_-.\/#]/g, "")
      .replace(/[\s.-]+/g, " ");
  };

  let formattedQuery;
  let trimmedFormattedQuery: string;
  // let prevSearchQuery;

  const handleFilteredList = (query: string) => {
    formattedQuery = format(query);
    trimmedFormattedQuery = formattedQuery.trim();

    setFilteredSongs((prevFilteredSongs) => {
      if (
        prevSearchQuery.length >= trimmedFormattedQuery.length ||
        formattedQuery.length - prevSearchQuery.length > 1 // handle keyboard correcting words
      ) {
        return data.filter((song) => {
          if (!song.searchable_title || !song.searchable_content)
            return console.log(
              `song with id ${song.id} doesnt have searchable_title or searchable_content`,
            );

          return (
            song.searchable_title.includes(trimmedFormattedQuery) ||
            song.searchable_content.includes(trimmedFormattedQuery)
          );
        });
      }
      return prevFilteredSongs.filter((song) => {
        if (!song.searchable_title || !song.searchable_content)
          return console.log(
            `song with id ${song.id} doesnt have searchable_title or searchable_content`,
          );

        return (
          song.searchable_title.includes(trimmedFormattedQuery) ||
          song.searchable_content.includes(trimmedFormattedQuery)
        );
      });
    });
  };

  // everything is memoized to prevent stupid rerenders from occurring
  const estimatedListSize = useMemo(() => {
    return { height: 794, width: 414 };
  }, [theme]);

  const itemOnPressProp = useCallback((item: Song) => {
    setDisplayedSongInfo({
      song: item,
      bookFirstIndex: bookIDFilter !== "CF" ? data[0].index : 0,
      bookLastIndex:
        bookIDFilter !== "CF" ? data.at(-1).index : songs.at(-1).index,
    });
    navigation.navigate("Song");
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Song }) => (
      <SongButton song={item} onPress={() => itemOnPressProp(item)} />
    ),
    [theme],
  );

  return (
    <View style={[{ backgroundColor: colors.background }, styles.songListDiv]}>
      <FlashList
        renderItem={renderItem}
        data={data}
        estimatedItemSize={55}
        estimatedListSize={estimatedListSize} // instant render
        indicatorStyle={theme ? "white" : "black"}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 10 }}
        contentInsetAdjustmentBehavior="automatic"
      />
      {searchQuery !== "" && (
        <View style={{ backgroundColor: colors.background, flex: 9999 }}>
          <FlashList
            renderItem={renderItem}
            data={filteredSongs}
            extraData={theme}
            estimatedItemSize={55}
            estimatedListSize={estimatedListSize}
            indicatorStyle={theme ? "white" : "black"}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ padding: 10 }}
            ListEmptyComponent={
              <Text
                style={[
                  // themeStyle.text,
                  { backgroundColor: colors.background, alignSelf: "center" },
                ]}
              >
                Nu s-a gasit nicio cantare
              </Text>
            } // TODO: add empty component
          />
        </View>
      )}
      <KeyboardAvoidingView
        style={{
          marginBottom: Platform.OS === "ios" ? insets.bottom : 5,
          backgroundColor: colors.background,
          ...styles.keyboardAvoidingViewDiv,
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 110 : 0}
      >
        {/* <Input */}
        {/*   scrollEnabled={false} */}
        {/*   textInputDivStyle={{ */}
        {/*     width: "95%", */}
        {/*     minHeight: 55, */}
        {/*     alignSelf: "center", */}
        {/*   }} */}
        {/*   placeholder="Cauta o cantare" */}
        {/*   value={searchQuery} */}
        {/*   // selectedCategories={selectedCategories} */}
        {/*   // setSelectedCategories={setSelectedCategories} */}
        {/*   clearShortcut */}
        {/*   onChangeText={(str) => { */}
        {/*     setSearchQuery((prev) => { */}
        {/*       prevSearchQuery = prev; */}
        {/*       return str; */}
        {/*     }); */}
        {/*     handleFilteredList(str); */}
        {/*   }} */}
        {/* /> */}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  songListDiv: {
    flex: 1,
  },
  keyboardAvoidingViewDiv: {
    // alignItems: "center",
  },
});

export default memo(SongList);
