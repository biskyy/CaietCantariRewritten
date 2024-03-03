import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSongs, useTheme, useThemeStyle } from "./State";
import Button from "./Button";
import { FlashList } from "@shopify/flash-list";
import Input from "./Input";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { memo, useCallback, useMemo, useState } from "react";

const SongList = () => {
  const [theme] = useTheme();
  const themeStyle = useThemeStyle();
  const [songs] = useSongs();
  const [searchQuery, setSearchQuery] = useState("");

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
        if (bookIDFilter === "CF") return song.favorite === true;
        return bookIDFilter === null || song.book_id === bookIDFilter;
      }),
    [theme, songs]
  );

  const [filteredSongs, setFilteredSongs] = useState(data);

  const format = (text) => {
    return text
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^\w\s.-_-.\/]/g, "")
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

  const itemOnPressProp = useCallback(
    // @ts-ignore
    (item) => navigation.navigate("Cantare", { index: item.index }),
    []
  );
  const itemStylesProp = useMemo(() => {
    return {
      textStyle: [themeStyle.txtColor, styles.textStyle],
      touchableStyle: [styles.touchableStyle],
    };
  }, [theme]);

  const renderItem = useCallback(
    ({ item }) => (
      <Button
        text={item.title}
        textStyle={itemStylesProp.textStyle}
        touchableStyle={itemStylesProp.touchableStyle}
        onPress={() => itemOnPressProp(item)}
      />
    ),
    [theme]
  );

  return (
    <View style={[themeStyle.bgColor, styles.songListDiv]}>
      <FlashList
        renderItem={renderItem}
        data={data}
        estimatedItemSize={48}
        estimatedListSize={estimatedListSize} // instant render
        indicatorStyle={theme.data ? "white" : "black"}
        keyboardShouldPersistTaps="handled"
      />
      {searchQuery !== "" && (
        <View style={{ ...themeStyle.bgColor, flex: 9999 }}>
          <FlashList
            renderItem={renderItem}
            data={filteredSongs}
            extraData={theme}
            estimatedItemSize={48}
            estimatedListSize={estimatedListSize}
            indicatorStyle={theme.data ? "white" : "black"}
            keyboardShouldPersistTaps="handled"
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
          textInputDivStyle={{}}
          placeholder="Cauta o cantare"
          value={searchQuery}
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
    alignItems: "center",
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

export default memo(SongList);
