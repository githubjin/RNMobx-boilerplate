import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

const Button = ({
  onPress,
  style,
  fontStyle,
  leftIcon = null,
  rightIcon = null,
  text,
  disabled = false
}): React.ReactElement => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={[styles.button, style]}>
        {leftIcon}
        <Text style={[styles.label, fontStyle]}>
          {text}
        </Text>
        {rightIcon}
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = {
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  label: {
    marginHorizontal: 3
  }
};
