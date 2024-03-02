import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { useAtom } from "jotai";
import { useRoute } from "@react-navigation/native";
import { debounce, songsAtom, useTheme, useThemeStyle } from "./State";
import Button from "./Button";
import { FlashList } from "@shopify/flash-list";
import Input from "./Input";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
// import Animated, {
//   Easing,
//   useSharedValue,
//   withTiming,
// } from "react-native-reanimated";
// import { useEffect } from "react";

const SongList = () => {
  const [theme] = useTheme();
  const themeStyle = useThemeStyle();
  const [songs] = useAtom(songsAtom);
  const [searchQuery, setSearchQuery] = useState("");

  const insets = useSafeAreaInsets();

  const route = useRoute();

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

  const _data = songs.filter(
    (song) => bookIDFilter === null || song.book_id === bookIDFilter
  );

  const [filteredSongs, setFilteredSongs] = useState(_data);

  // const keyboardHeight = useKeyboardHeight();

  // const keyboardHeightSharedValue = useSharedValue(0);

  // useEffect(() => {
  //   keyboardHeightSharedValue.value = withTiming(
  //     Platform.OS === "ios" ? keyboardHeight - insets.bottom : null,
  //     {
  //       duration: 300,
  //       easing: Easing.out(Easing.poly(2.2)),
  //     }
  //   );
  // }, [keyboardHeight, Keyboard.isVisible]);

  // ^ Leaving this here in case KeyboardAvoidingView starts acting up

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
        return _data.filter((song) => {
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
  const data = useMemo(() => _data, [theme]);
  const estimatedListSize = useMemo(() => {
    return { height: 794, width: 414 };
  }, [theme]);

  const itemOnPressProp = useCallback((item) => console.log(item), []);
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
            estimatedItemSize={48}
            estimatedListSize={estimatedListSize}
            indicatorStyle={theme.data ? "white" : "black"}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      )}
      <KeyboardAvoidingView
        style={{
          marginBottom: insets.bottom,
          ...themeStyle.bgColor,
          ...styles.keyboardAvoidingViewDiv,
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={110}
      >
        {/* <Animated.View
          style={{
            paddingBottom: keyboardHeightSharedValue,
            bottom: insets.bottom,
            alignItems: "center",
          }}
        > */}
        {/*           
           ^ Leaving this here in case KeyboardAvoidingView starts acting up
          */}
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
        {/* </Animated.View> */}
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
