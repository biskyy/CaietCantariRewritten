import { memo } from "react";
import { Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

function Button({
  text = undefined,
  icon = undefined,
  textStyle,
  touchableStyle,
  onPress,
}) {
  let prevPageX;

  return (
    <TouchableOpacity
      onPressIn={(e) => (prevPageX = e.nativeEvent.pageX)}
      onPress={(e) =>
        Math.abs(e.nativeEvent.pageX - prevPageX) >= 50 ? null : onPress()
      }
      style={touchableStyle}
    >
      {icon ? (
        <MaterialIcons name={icon} style={textStyle} />
      ) : (
        <Text numberOfLines={1} style={textStyle}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export default memo(Button);
