/**
 * @flow
 */
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { observer, inject } from "mobx-react";

import { NavigationActions } from "react-navigation";
import { BorrowerStore } from "../../stores/borrower";
import { AuthStore } from "../../stores/authUser";

@inject("borrowerStore", "authStore")
@observer
export default class BorrowerDetail extends Component {
  props: {
    borrowerStore: BorrowerStore,
    authStore: AuthStore,
    navigation: NavigationActions
  };
  componentDidMount() {
    console.log(this.props);
    console.log(this.props.authStore.jwt);
    console.log(this.props.authStore.orgBaseInfo.id);
  }
  render() {
    const { navigation } = this.props;
    console.log("NBorrowerDetails ");
    return (
      <View>
        <Text>s</Text>
      </View>
    );
  }
}
