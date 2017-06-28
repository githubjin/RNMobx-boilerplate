/**
 * @flow
 */
import React, { Component } from "react";
import { View, Text, Alert } from "react-native";
import { Button } from "antd-mobile";
import { observer, inject } from "mobx-react";

// import * as actions from "../actions";
import { AuthStore } from "../stores/auth";
import { navigationReset, clearJwt } from "../services";
import { ROUTE_LOGIN } from "../constants/routes";

@inject("authStore")
@observer
export default class Home extends Component {
  props: {
    authStore: AuthStore,
    navigation: Object
  };
  componentDidMount() {
    // actions.repositories("0");
    // clearJwt();
  }
  logout = () => {
    this.props.authStore
      .logout()
      .then(() => {
        // navigate to login screen
        navigationReset(this.props.navigation, ROUTE_LOGIN);
      })
      .catch(error => {
        Alert.alert("提示", error);
      });
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Home</Text>
        <Text>
          {process.env.NODE_ENV}
        </Text>
        <Text>
          {process.env.NODE_ENV === "development" ? "true" : "false"}
        </Text>
        <Button onClic={this.logout}>退出</Button>
      </View>
    );
  }
}
