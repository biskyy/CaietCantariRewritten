import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Input from "../components/Input";
import { useDisplayedSongInfo, useSongs } from "../components/State";
import { useState } from "react";

const EditSongScreen = () => {
  const [songs] = useSongs();
  const [displayedSongInfo] = useDisplayedSongInfo();

  const [songBookId, setSongBookId] = useState(
    songs[displayedSongInfo.index].book_id
  );

  const [songId, setsongId] = useState(songs[displayedSongInfo.index].id);

  const [songTitle, setSongTitle] = useState(
    songs[displayedSongInfo.index].title
  );
  const [songContent, setSongContent] = useState(
    songs[displayedSongInfo.index].content
  );

  const [songTags, setSongTags] = useState(
    songs[displayedSongInfo.index].tags.join(", ")
  );

  console.log(songs[displayedSongInfo.index]);

  return (
    <>
      <ScrollView scrollEnabled={true}>
        <View style={{ alignItems: "center", alignSelf: "center" }}>
          <View style={{ flexDirection: "row", width: 325 }}>
            <Input
              textInputDivStyle={{
                flexGrow: 1,
                ...styles.textInputDivStyle,
              }}
              value={songBookId}
              onChangeText={setSongBookId}
            />
            <Input
              textInputDivStyle={{
                flexGrow: 5,
                flexBasis: 0,
                ...styles.textInputDivStyle,
              }}
              value={songId.toString()}
              onChangeText={setsongId}
            />
          </View>
          <View style={{ flexDirection: "column", width: 325 }}>
            <Input
              value={songTitle}
              onChangeText={setSongTitle}
              textInputDivStyle={{ ...styles.textInputDivStyle }}
              // clearShortcut={false}
            />
            <Input
              multiline
              value={songContent}
              onChangeText={setSongContent}
              textInputDivStyle={{ ...styles.textInputDivStyle }}
              // clearShortcut={false}
              onSubmitEditing={() => {}}
            />
            <Input
              textInputDivStyle={{ ...styles.textInputDivStyle }}
              value={songTags}
              onChangeText={setSongTags}
            />
          </View>
          <View style={{ height: 1000 }} />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  textInputDivStyle: {
    marginVertical: 5,
  },
});

export default EditSongScreen;
