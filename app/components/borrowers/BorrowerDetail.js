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
    console.log("BorrowerDetail - this.props.authStore", this.props.authStore);
  }
  render() {
    const { navigation } = this.props;
    return (
      <View>
        <Text>借款人详细信息</Text>
      </View>
    );
  }
}
