/**
 * @flow
 */
import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import Icon from "react-native-vector-icons/SimpleLineIcons";

export default class App extends Component {
  render() {
    return <Item />;
  }
}

const Item = ({ first = false }) =>
  <View>
    <Text>其他</Text>
  </View>;
