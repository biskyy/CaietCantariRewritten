import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { favoriteSongsAtom, songsAtom } from "./State";
import { FlashList } from "@shopify/flash-list";
import Input from "./Input";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { memo, useCallback, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { useThemeStyle, useDisplayedSongInfo, useTheme } from "./Hooks";
import SongButton from "./Buttons/SongButton";
import SearchBar from "./SeachBar";

const validCategories = ["lauda", "rugaciune", "predare"];

const SongList = () => {
  const [theme] = useTheme();
  const themeStyle = useThemeStyle();
  const [songs, setSongs] = useAtom(songsAtom);
  const [searchQuery, setSearchQuery] = useState("");
  const [favoriteSongs, setFavoriteSongs] = useAtom(favoriteSongsAtom);
  const [selectedCategories, setSelectedCategories] = useState([
    // "Lauda",
    // "Rugaciune",
    // "Predare",
    // "lauda",
    // "rugaciune",
    // "predare",
  ]);

  const [, setDisplayedSongInfo] = useDisplayedSongInfo();

  const insets = useSafeAreaInsets();

  const route = useRoute();
  const navigation = useNavigation();

  // get corresponding book_id for route name
  const bookIDMappings = {
    "Toate Cantarile": null,
    "Caiet de Cantari": "CC",
    "Cantari BER": "BER",
    "Jubilate": "J",
    "Cartea de Tineret": "CT",
    "Cor": "Cor",
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
    [theme, songs, favoriteSongs]
  );

  const [filteredSongs, setFilteredSongs] = useState(data);

  const format = (text) => {
    return text
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^\w\s.-_-.\/#]/g, "")
      .replace(/[\s.-]+/g, " ");
  };

  let formattedQuery;
  let trimmedFormattedQuery;
  let prevSearchQuery;

  const handleFilteredList = (query) => {
    formattedQuery = format(query);
    trimmedFormattedQuery = formattedQuery.trim();

    setFilteredSongs((prevFilteredSongs) => {
      if (
        prevSearchQuery.length >= trimmedFormattedQuery.length ||
        formattedQuery.length - prevSearchQuery.length > 1 // handle keyboard correcting words
      ) {
        return data.filter((song) => {
          return (
            song.searchable_title.includes(trimmedFormattedQuery) ||
            song.searchable_content.includes(trimmedFormattedQuery)
          );
        });
      }
      return prevFilteredSongs.filter((song) => {
        return (
          song.searchable_title.includes(trimmedFormattedQuery) ||
          song.searchable_content.includes(trimmedFormattedQuery)
        );
      });
    });
  };

  // everything is memoized to prevent stupid rerenders from occuring
  const estimatedListSize = useMemo(() => {
    return { height: 794, width: 414 };
  }, [theme]);

  const itemOnPressProp = useCallback((item) => {
    setDisplayedSongInfo({
      song: item,
      index: item.index,
      listFirstIndex: bookIDFilter !== "CF" ? data[0].index : 0,
      listLastIndex:
        bookIDFilter !== "CF" ? data.at(-1).index : songs.at(-1).index,
    });
    // @ts-ignore
    navigation.navigate("Cantare");
  }, []);

  const renderItem = useCallback(
    ({ item }) => (
      <SongButton song={item} onPress={() => itemOnPressProp(item)} />
    ),
    [theme]
  );

  return (
    <View style={[themeStyle.bgColor, styles.songListDiv]}>
      <FlashList
        renderItem={renderItem}
        data={data}
        estimatedItemSize={55}
        estimatedListSize={estimatedListSize} // instant render
        indicatorStyle={theme.data ? "white" : "black"}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: 10 }}
      />
      {searchQuery !== "" && (
        <View style={{ ...themeStyle.bgColor, flex: 9999 }}>
          <FlashList
            renderItem={renderItem}
            data={filteredSongs}
            extraData={theme}
            estimatedItemSize={55}
            estimatedListSize={estimatedListSize}
            indicatorStyle={theme.data ? "white" : "black"}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ padding: 10 }}
            ListEmptyComponent={
              <Text
                style={[
                  themeStyle.txtColor,
                  themeStyle.text,
                  { alignSelf: "center" },
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
          ...themeStyle.bgColor,
          ...styles.keyboardAvoidingViewDiv,
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 110 : 0}
      >
        <Input
          scrollEnabled={false}
          textInputDivStyle={{
            width: "95%",
            minHeight: 55,
            alignSelf: "center",
          }}
          placeholder="Cauta o cantare"
          value={searchQuery}
          // selectedCategories={selectedCategories}
          // setSelectedCategories={setSelectedCategories}
          clearShortcut
          onChangeText={(str) => {
            setSearchQuery((prev) => {
              prevSearchQuery = prev;
              return str;
            });
            handleFilteredList(str);
          }}
        />
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
