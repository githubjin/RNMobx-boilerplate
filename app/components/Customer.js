/**
 * 客户列表
 * @flow
 */
import React, { Component } from "react";
import { ScrollView, Text, ListView, StyleSheet } from "react-native";
import { ActionSheet } from "antd-mobile";
import { observer, inject } from "mobx-react/native";

import { borrowersStore } from "../stores";
import { Borrowers } from "../stores/borrowers";
import type { Borrower } from "../stores/borrowers";
import { showLong } from "../utils";
import { CurrentUser } from "../stores/currentUser";
import { AuthStore } from "../stores/authUser";

@inject("borrowersStore", "authStore", "currentUserStore")
@observer
export default class Customer extends Component {
  props: {
    borrowersStore: Borrowers,
    authStore: AuthStore,
    currentUserStore: CurrentUser
  };
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }
  componentDidMount() {
    this.props.borrowersStore.loadMore();
  }
  getBoorrowers() {
    ds.cloneWithRows(this.props.borrowersStore.results);
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
  renderRow(item: Borrower) {
    return (
      <View style={styles.container}>
        <Text>
          {item.name}
        </Text>
        <Text>
          {item.id}
        </Text>
      </View>
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
