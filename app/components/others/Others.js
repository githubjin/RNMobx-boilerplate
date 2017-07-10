/**
 * @flow
 */
import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import Icon from "react-native-vector-icons/SimpleLineIcons";

import WXDemo from "./WXDemo";

export default class App extends Component {
  render() {
    return <WXDemo />;
  }
}

const Item = ({ first = false }) =>
  <View>
    <Text>其他</Text>
  </View>;
