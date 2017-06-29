/**
 * 客户列表
 * @flow
 */
import React, { Component } from "react";
import {
  ScrollView,
  Text,
  ListView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  InteractionManager
} from "react-native";
import { ActionSheet } from "antd-mobile";
import { observer, inject } from "mobx-react/native";
import { NavigationActions } from "react-navigation";

import { borrowersStore } from "../stores";
import { Borrowers } from "../stores/borrowers";
import type { Borrower } from "../stores/borrowers";
import { showLong } from "../utils";
import { CurrentUser } from "../stores/currentUser";
import { AuthStore } from "../stores/authUser";
import { ROUTE_BORROWER } from "../constants/routes";

@inject("borrowersStore", "authStore", "currentUserStore")
@observer
export default class Customer extends Component {
  props: {
    borrowersStore: Borrowers,
    authStore: AuthStore,
    currentUserStore: CurrentUser,
    navigation: NavigationActions
  };
  ds: ListView.DataSource;
  constructor(props: any) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }
  componentDidMount() {
    const { authStore, currentUserStore } = this.props;
    this.props.borrowersStore.loadMore(
      { page: 1 },
      { jwt: authStore.jwt, org: currentUserStore.shopuser.shop.id }
    );
  }
  getBoorrowers() {
    this.ds.cloneWithRows(this.props.borrowersStore.results.slice());
  }
  componentWillReact() {
    showLong("数据", JSON.stringify(this.props.borrowersStore.results));
    console.log(
      "this.props.currentUserStore",
      this.props.currentUserStore.email,
      this.props.currentUserStore.id,
      this.props.currentUserStore.mobile
    );
  }
  showBorrowerDetail = (borrowerId: string) => {
    return () => {
      console.log(
        "this.props.navigation type is : ",
        typeof this.props.navigation
      );
      this.props.navigation.navigate(ROUTE_BORROWER, { borrowerId });
    };
  };
  renderRow(item: Borrower) {
    return (
      <TouchableWithoutFeedback onPress={this.showBorrowerDetail(item.id)}>
        <View style={styles.container}>
          <Text>
            {item.name}
          </Text>
          <Text>
            {item.id}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <ListView
          style={styles.list}
          dataSource={this.ds}
          renderRow={this.renderRow}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {}
});
