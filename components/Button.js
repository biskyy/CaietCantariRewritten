import { memo } from "react";
import { Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";

function Button({
  text = undefined,
  icon = undefined,
  textStyle,
  iconStyle = undefined,
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
      {icon && text ? (
        <>
          <MaterialIcons name={icon} style={iconStyle} />
          <Text numberOfLines={1} style={textStyle}>
            {text}
          </Text>
        </>
      ) : text ? (
        <Text numberOfLines={1} style={textStyle}>
          {text}
        </Text>
      ) : (
        <MaterialIcons name={icon} style={textStyle} />
      )}
    </TouchableOpacity>
  );
}

export default memo(Button);
