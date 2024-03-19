import { Alert, ScrollView, StyleSheet, View } from "react-native";
import Input from "../components/Input";
import { userAtom } from "../components/State";
import { useReducer, useState } from "react";
import BottomBar from "../components/BottomBar";
import Button from "../components/Button";
import { useAtom } from "jotai";
import { useNavigation } from "@react-navigation/native";
import {
  useDisplayedSongInfo,
  useLoadingScreen,
  useThemeStyle,
} from "../components/Hooks";
import { updateSongRequest } from "../components/Utils";

const reducer = (currentState, action) => {
  switch (action.type) {
    case "book_id": {
      return { ...currentState, book_id: action.payload };
    }
    case "id": {
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
  const themeStyle = useThemeStyle();
  const [displayedSongInfo] = useDisplayedSongInfo();
  const [user] = useAtom(userAtom);
  const [, setLoadingScreen] = useLoadingScreen();

  const [song, dispatch] = useReducer(reducer, {
    ...displayedSongInfo.song,
    tags: displayedSongInfo.song.tags.join(", "),
  });

  const navigation = useNavigation();

  // const { song } = displayedSongInfo;

  // const [songBookId, setSongBookId] = useState(song.book_id);

  // const [songId, setsongId] = useState(song.id);

  // const [songTitle, setSongTitle] = useState(song.title);

  // const [songContent, setSongContent] = useState(song.content);

  // const [songTags, setSongTags] = useState(song.tags?.join(", "));

  const submitChanges = async () => {
    setLoadingScreen({ state: 1, message: "Se incarca schimbarile" });
    const updateResponse = await updateSongRequest(
      {
        book_id: song.book_id,
        id: song.id,
        title: song.title,
        content: song.content,
        tags: song.tags !== "" ? song.tags.split(", ") : [],
        index: song.index,
      },
      user.token
    );
    setLoadingScreen({
      state: 2,
      callback: () => {
        const status = updateResponse.status;
        if (status === 200) {
          Alert.alert("Succes", "Cantarea a fost actualizata cu succes.");
          navigation.goBack();
        }
      },
    });
  };

  return (
    <>
      <ScrollView scrollEnabled={true}>
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
              value={song.id.toString()}
              onChangeText={(str) => dispatch({ type: "id", payload: str })}
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
              value={song.tags}
              onChangeText={(str) => dispatch({ type: "tags", payload: str })}
            />
          </View>
          <View style={{ height: 1000 }} />
        </View>
      </ScrollView>
      <BottomBar>
        <View style={{ flex: 3 }} />
        {/* <View style={{ flex: 1 }} />
        <View style={{ flex: 1 }} /> */}
        <Button
          icon="save"
          textStyle={{
            ...themeStyle.txtColor,
            ...styles.icon,
          }}
          touchableStyle={styles.bottomBarButtonDiv}
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
