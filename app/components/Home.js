/**
 * @flow
 */
import React, { Component } from "react";
import { View, Text } from "react-native";

import * as actions from "../actions";

export default class Home extends Component {
  componentDidMount() {
    actions.repositories("0");
  }

  render() {
    return (
      <View>
        <Text>Home</Text>
        <Text>{process.env.NODE_ENV}</Text>
        <Text>{process.env.NODE_ENV === "development" ? "true" : "false"}</Text>
      </View>
    );
  }
}
