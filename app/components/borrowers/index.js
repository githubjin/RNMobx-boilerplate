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
  Alert,
  Button
} from "react-native";
import { ActionSheet } from "antd-mobile";
import { observer, inject } from "mobx-react/native";
import { NavigationActions } from "react-navigation";
import _ from "lodash/lang";

// import { borrowersStore } from "../../stores";
import { Borrowers } from "../../stores/borrowers";
import type { Borrower } from "../../stores/borrowers";
import { showLong } from "../../utils";
import { CurrentUser } from "../../stores/currentUser";
import { AuthStore } from "../../stores/authUser";
import { ROUTE_BORROWER } from "../../constants/routes";
import CustomerItem from "./BorrowerItem";
import CustomerList from "./BorrowerList";
import Conditions from "./Conditions";
import ConditionForm from "./ConditionForm";
import { Masker } from "../lib";

@inject("borrowersStore", "authStore", "currentUserStore")
@observer
export default class Customer extends Component {
  props: {
    borrowersStore: Borrowers,
    authStore: AuthStore,
    currentUserStore: CurrentUser,
    navigation: NavigationActions
  };
  state: {
    maskerShow: boolean,
    currentField: string
  };
  ds: ListView.DataSource;
  // customers: Borrower[];
  constructor(props: any) {
    super(props);
    this.state = {
      maskerShow: false,
      currentField: "mobile"
    };
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
    this.props.navigation.setParams({
      rightIconOnPress: this.onRightIconPress
    });
  }
  onRightIconPress = () => {
    //
  };
  componentWillReact() {
    // console.log("数据", JSON.stringify(this.props.borrowersStore.results));
    // this.customers = this.customers.concat(this.props.borrowersStore.results);
    // console.log(
    //   "this.props.currentUserStore",
    //   this.props.currentUserStore.email,
    //   this.props.currentUserStore.id,
    //   this.props.currentUserStore.mobile
    // );
  }
  showBorrowerDetail = (item: Object) => {
    return () => {
      // console.log("this.props.navigation type is : ", this.props.navigation);
      this.props.navigation.navigate(ROUTE_BORROWER, { borrower: item });
    };
  };
  renderRow = (item: Borrower, index: number) => {
    return <CustomerItem key={item.id_no} item={item} first={index === 0} />;
  };
  keyExtractor = (item: Borrower, index: number): string => {
    return item.id;
  };
  hiddenMasker = () => {
    this.setState({ maskerShow: false });
  };
  toggleMasker = (fieldName: string) => {
    return () => {
      let obj = {};
      if (this.state.currentField == fieldName) {
        obj["maskerShow"] = !this.state.maskerShow;
      } else {
        obj["currentField"] = fieldName;
        if (!this.state.maskerShow) {
          obj["maskerShow"] = !this.state.maskerShow;
        }
      }
      if (_.isEmpty(obj)) {
        return;
      }
      this.setState(obj);
    };
  };
  doFilter = (fieldNames: string[] = [], values: string[] = []) => {
    // Alert.alert("Alert", `${fieldNames.length}`);
    let conditions = { page: 1 };
    fieldNames.forEach((field, index) => {
      conditions[field] = values[index];
    });
    const { authStore, currentUserStore } = this.props;
    this.props.borrowersStore.loadMore(conditions, {
      jwt: authStore.jwt,
      org: currentUserStore.shopuser.shop.id
    });
    this.hiddenMasker();
  };

  render() {
    const { maskerShow, currentField } = this.state;
    return (
      <View style={styles.container}>
        <Conditions onPress={this.toggleMasker} />
        <Masker
          maskerShow={this.state.maskerShow}
          toggleMasker={this.hiddenMasker}
        >
          <ConditionForm
            onOk={this.doFilter}
            onCancel={this.hiddenMasker}
            fieldName={currentField}
          />
        </Masker>
        <CustomerList
          rows={this.props.borrowersStore.results}
          openDetail={this.showBorrowerDetail}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  list: {
    padding: 5
  }
});
