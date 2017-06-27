import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

function Button({ onPress, style, fontStyle, leftIcon, rightIcon, text }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={style}>
        {leftIcon}
        <Text style={fontStyle}>{text}</Text>
        {rightIcon}
      </View>
    </TouchableOpacity>
  );
}

export default Button;

const styles = {
  button: {
    backgroundColor: "#000000"
  }
};
