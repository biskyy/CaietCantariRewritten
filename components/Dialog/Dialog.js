import {
  Modal,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useThemeStyle } from "../Hooks";

const Dialog = (props) => {
  const themeStyle = useThemeStyle();

  return (
    <Modal
      visible={props.visible}
      transparent
      animationType="fade"
      onRequestClose={() => props.setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => props.setModalVisible(false)}>
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
            scrollEnabled={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableWithoutFeedback>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <View
                  style={[
                    themeStyle.borderColor,
                    themeStyle.bgColor,
                    {
                      borderWidth: 1,
                      padding: 16,
                      borderRadius: 6,
                      flexBasis: 0,
                      minWidth: "85%",
                      maxWidth: "85%",
                    },
                  ]}
                >
                  <ScrollView
                    scrollEnabled={false}
                    keyboardShouldPersistTaps="handled"
                  >
                    {props.children}
                  </ScrollView>
                </View>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default Dialog;
