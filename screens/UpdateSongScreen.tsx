import { useReducer } from "react";
import { Alert, ScrollView, StyleSheet, View, Text } from "react-native";
import { useAtom } from "jotai";
import { useNavigation, useTheme } from "@react-navigation/native";

import Input from "@/components/Input";
import BottomBar from "@/components/BottomBar";
import IconButton from "@/components/Button/IconButton";

import { userAtom } from "@/state/persistent";
import { deleteReport, updateSong } from "@/state/utils";

import { useDisplayedSongInfo } from "@/hooks/useDisplayedSong";
import { useLoadingScreen } from "@/hooks/useLoadingScreen";
import { Song, UpdatedSongProps } from "@/types/state";

type UpdateSongActionType =
  | { type: "book_id"; payload: Song["book_id"] }
  | { type: "id"; payload: number }
  | { type: "title"; payload: string }
  | { type: "content"; payload: string }
  | { type: "tags"; payload: Array<string> };

const reducer = (
  currentState: UpdatedSongProps,
  action: UpdateSongActionType,
) => {
  switch (action.type) {
    case "book_id": {
      return { ...currentState, book_id: action.payload };
    }
    case "id": {
      console.log(action.payload);
      // if (isNaN(action.payload)) return { ...currentState, id: -1 };
      return { ...currentState, id: action.payload };
    }
    case "title": {
      return { ...currentState, title: action.payload };
    }
    case "content": {
      return { ...currentState, content: action.payload };
    }
    case "tags": {
      return { ...currentState, tags: action.payload };
    }
    default:
      return currentState;
  }
};

const UpdateSongScreen = () => {
  const theme = useTheme();
  const [displayedSongInfo, setDisplayedSongInfo] = useDisplayedSongInfo();
  const [user] = useAtom(userAtom);
  const [, setLoadingScreen] = useLoadingScreen();

  if (displayedSongInfo === undefined) {
    return <Text>Cum ai reusit vere sa ajungi aici</Text>;
  }

  const [song, dispatch] = useReducer(reducer, {
    ...displayedSongInfo.song,
    // tags: displayedSongInfo.song.tags.join(", "),
  });

  const navigation = useNavigation();

  const submitChanges = async () => {
    if (user.adminToken === undefined || user.adminToken === "") {
      console.log("unauthorized user got access to UpdateSong screen");
      return;
    }

    if (displayedSongInfo.currentReport) {
      await deleteReport(displayedSongInfo.currentReport, user.adminToken);
      setDisplayedSongInfo({ currentReport: {} });
    }
    setLoadingScreen({ state: "fading_in", label: "Se incarca schimbarile" });

    const updateResponse = await updateSong(
      {
        book_id: song.book_id,
        id: song.id,
        title: song.title,
        content: song.content,
        tags: song.tags.join(", ").length !== 0 ? song.tags : [],
        index: song.index,
      },
      user.adminToken,
    );
    setLoadingScreen({
      state: "fading_out",
      callback: () => {
        const status = updateResponse.status;
        if (status === 200) {
          Alert.alert("Success", "Cantarea a fost actualizata cu success.");
          navigation.goBack();
        }
      },
    });
  };

  return (
    <>
      <ScrollView contentInsetAdjustmentBehavior="always">
        <View
          style={{
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <View style={{ flexDirection: "row", width: 325 }}>
            <Input
              textInputDivStyle={{
                flexGrow: 1,
                ...styles.textInputDivStyle,
              }}
              value={song.book_id}
              onChangeText={(str) =>
                dispatch({ type: "book_id", payload: str })
              }
            />
            <Input
              textInputDivStyle={{
                flexGrow: 5,
                flexBasis: 0,
                ...styles.textInputDivStyle,
              }}
              value={!isNaN(song.id) ? song.id.toString() : ""}
              onChangeText={(str) =>
                dispatch({ type: "id", payload: parseInt(str) })
              }
            />
          </View>
          <View style={{ flexDirection: "column", width: 325 }}>
            <Input
              value={song.title}
              onChangeText={(str) => dispatch({ type: "title", payload: str })}
              textInputDivStyle={{ ...styles.textInputDivStyle }}
              // clearShortcut={false}
            />
            <Input
              multiline
              value={song.content}
              onChangeText={(str) =>
                dispatch({ type: "content", payload: str })
              }
              textInputDivStyle={{ ...styles.textInputDivStyle }}
              // clearShortcut={false}
              onSubmitEditing={() => {}}
            />
            <Input
              textInputDivStyle={{ ...styles.textInputDivStyle }}
              value={song.tags.join(", ")}
              onChangeText={(str) =>
                dispatch({ type: "tags", payload: str.split(", ") })
              }
            />
          </View>
          <View style={{ height: 1000 }} />
        </View>
      </ScrollView>
      <BottomBar>
        <View style={{ flex: 3 }} />
        <IconButton.Mat
          icon="save"
          size={24}
          touchableStyle={{ flex: 1 }}
          onPress={() => submitChanges()}
        />
      </BottomBar>
    </>
  );
};

const styles = StyleSheet.create({
  textInputDivStyle: {
    marginVertical: 5,
  },
  icon: {
    fontSize: 32,
  },
  bottomBarButtonDiv: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

export default UpdateSongScreen;
