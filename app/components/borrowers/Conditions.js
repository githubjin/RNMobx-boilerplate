/**
 * @flow
 */
import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";

import { Button } from "../lib";

export default class Conditions extends Component {
  props: {
    onPress: (fieldName: string) => () => void
  };
  render() {
    const { onPress } = this.props;
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Button
          onPress={onPress("mobile")}
          text="手机号"
          rightIcon={<Icon name="arrow-down" />}
        />
        <Button
          onPress={onPress("name")}
          text="姓名"
          rightIcon={<Icon name="arrow-down" />}
        />
        <Button
          onPress={onPress("date")}
          text="注册实践"
          rightIcon={<Icon name="arrow-down" />}
        />
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    padding: 8,
    zIndex: 1002
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-around"
  }
};
