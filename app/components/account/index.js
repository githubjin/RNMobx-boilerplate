/**
 * @flow
 */
import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { observer, inject } from "mobx-react";

import { AuthStore } from "../../stores/authUser";
import { AccountStore } from "../../stores/account";

@inject("authStore", "accountStore")
@observer
export default class Account extends Component {
  static navigationOptions = {
    title: "账号"
  };
  props: {
    authStore: AuthStore,
    accountStore: AccountStore
  };
  componentDidMount() {
    this.props.accountStore
      .getAccountInfo(
        this.props.authStore.orgBaseInfo.id,
        this.props.authStore.jwt
      )
      .then(() => {})
      .catch(reason => {
        console.log(
          "Account stack navigation page getAccounInfo error: ",
          reason
        );
      });
  }
  render() {
    return (
      <View style={styles.container}>
        {this.props.accountStore.refreshing && <ActivityIndicator />}
        <Text>
          账户余额: {this.props.accountStore.account.balance}元
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  }
});
