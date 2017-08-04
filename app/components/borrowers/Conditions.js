/**
 * @flow
 */
import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  Platform,
  PixelRatio
} from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";

import { Button } from "../lib";

export default class Conditions extends Component {
  props: {
    onPress: (fieldName: string) => () => void
  };
  render() {
    const { onPress } = this.props;
    return (
      <View style={styles.container} horizontal={true}>
        <Button
          style={styles.menuItem}
          onPress={onPress("mobile")}
          text="手机号"
          rightIcon={<Icon name="arrow-down" />}
        />
        <Button
          style={styles.menuItem}
          onPress={onPress("name")}
          text="姓名"
          rightIcon={<Icon name="arrow-down" />}
        />
        <Button
          style={styles.menuItem}
          onPress={onPress("date")}
          text="注册时间"
          rightIcon={<Icon name="arrow-down" />}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    height: 32,
    padding: 8,
    zIndex: 1002,
    backgroundColor: "#ffffff",
    ...Platform.select({
      ios: {
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 0.5,
        shadowColor: "#333333",
        shadowOpacity: 0.3
      },
      android: {
        borderBottomColor: "#333333",
        borderBottomWidth: 1 / PixelRatio.get(),
        elevation: 1
      }
    }),
    flexDirection: "row",
    justifyContent: "space-around"
  }
};
