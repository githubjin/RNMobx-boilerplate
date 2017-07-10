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
  InteractionManager,
  Image,
  FlatList,
  Alert
} from "react-native";
import { ActionSheet } from "antd-mobile";
import { observer, inject } from "mobx-react/native";
import { NavigationActions } from "react-navigation";

// import { borrowersStore } from "../../stores";
import { Borrowers } from "../../stores/borrowers";
import type { Borrower } from "../../stores/borrowers";
import { showLong } from "../../utils";
import { CurrentUser } from "../../stores/currentUser";
import { AuthStore } from "../../stores/authUser";
import { ROUTE_BORROWER } from "../../constants/routes";
import CustomerItem from "./BorrowerItem";
import CustomerList from "./BorrowerList";

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
  // customers: Borrower[];
  constructor(props: any) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  }
  componentDidMount() {
    const { authStore, currentUserStore } = this.props;
    // console.log("1292191022190", authStore, currentUserStore);
    // Alert.alert("Alert", JSON.stringify(currentUserStore));
    this.props.borrowersStore.loadMore(
      { page: 1 },
      { jwt: authStore.jwt, org: currentUserStore.shopuser.shop.id }
    );
  }
  componentWillReact() {
    console.log("数据", JSON.stringify(this.props.borrowersStore.results));
    // this.customers = this.customers.concat(this.props.borrowersStore.results);
    // console.log(
    //   "this.props.currentUserStore",
    //   this.props.currentUserStore.email,
    //   this.props.currentUserStore.id,
    //   this.props.currentUserStore.mobile
    // );
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
  renderRow = (item: Borrower, index: number) => {
    // console.log("renderRow with data : ", item);
    return <CustomerItem key={item.id_no} item={item} first={index === 0} />;
  };
  keyExtractor = (item: Borrower, index: number): string => {
    return item.id;
  };
  render() {
    // console.log(
    //   "this.props.borrowersStore.results",
    //   this.props.borrowersStore.results
    // );
    return (
      <ScrollView style={styles.container}>
        <CustomerList dataSource={this.props.borrowersStore.dataSource} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    padding: 5
  }
});
