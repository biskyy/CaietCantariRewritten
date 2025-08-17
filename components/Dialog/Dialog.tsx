import { useTheme } from "@react-navigation/native";
import { ReactNode } from "react";
import {
  Modal,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Keyboard,
} from "react-native";

interface DialogProps {
  visible: boolean;
  setModalVisible: (visible: boolean) => void;
  children: ReactNode;
}

const Dialog = (props: DialogProps) => {
  const theme = useTheme();

  return (
    // dont touch this
    <Modal
      statusBarTranslucent
      visible={props.visible}
      transparent
      animationType="fade"
      onRequestClose={() => props.setModalVisible(false)}
    >
      <Pressable
        style={[
          {
            flex: 1,
            // flexGrow: 1,
            backgroundColor: "#00000080",
            // backgroundColor: 'red'
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
        onPress={() => {
          // console.log("dialog outer pressable pressed");
          Keyboard.dismiss();
          props.setModalVisible(false);
        }}
      >
        <Pressable
          // this pressable is needed to cancel the outer's one effect on the children
          onPress={() => {
            // console.log("dialog inner pressable pressed");
            Keyboard.dismiss();
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "padding"}
            style={{ justifyContent: "center", alignItems: "center" }}
            // keyboardVerticalOffset={-111}
          >
            <View
              style={{
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border,
                borderWidth: 1,
                padding: 16,
                borderRadius: 10,
                // flexBasis: 0,
                minWidth: "90%",
                maxWidth: "90%",
              }}
            >
              {props.children}
            </View>
          </KeyboardAvoidingView>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default Dialog;
