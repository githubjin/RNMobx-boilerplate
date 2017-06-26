import React, { Component } from "react";
import { View, Text, ActivityIndicator, PixelRatio } from "react-native";

function Splash() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={styles.title}>Splash Screen</Text>
    </View>
  );
}

export default Splash;

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 20 / PixelRatio.get()
  }
};
