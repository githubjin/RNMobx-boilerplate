/**
 * @flow
 */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { observer, inject } from "mobx-react";

import { AuthStore } from "../../stores/authUser";
import { UserStore } from "../../stores/user";
import UserList from "./UserList";

/**
 * 员工 信息列表 入口
 */
@inject("authStore", "userStore")
@observer
export default class User extends Component {
  static navigationOptions = {
    title: "员工"
  };
  props: {
    authStore: AuthStore,
    userStore: UserStore
  };
  componentDidMount() {
    this.props.userStore
      .loadMore(
        { page: 1 },
        this.props.authStore.jwt,
        this.props.authStore.orgBaseInfo.id
      )
      .then(() => {})
      .catch(reason => {
        console.log("load user lsit error", reason);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <UserList data={this.props.userStore.users} />
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
