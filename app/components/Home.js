/**
 * @flow
 */
import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "antd-mobile";
import { observver, inject } from "mobx-react";

// import * as actions from "../actions";
import { AuthStore } from "../stores/auth";
import { navigationReset } from "../services";
import { ROUTE_LOGIN } from "../constants/routes";

@inject("authStore")
@observver
export default class Home extends Component {
  props: {
    authStore: AuthStore
  };
  // componentDidMount() {
  // actions.repositories("0");
  // }
  logout = () => {
    this.props.authStore.logout(() => {
      // navigate to login screen
      navigationReset(this.props.navigation, ROUTE_LOGIN);
    });
  };
  render() {
    return (
      <View>
        <Text>Home</Text>
        <Text>{process.env.NODE_ENV}</Text>
        <Text>{process.env.NODE_ENV === "development" ? "true" : "false"}</Text>
        <Button onClic={this.logout}>退出</Button>
      </View>
    );
  }
}
