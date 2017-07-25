/**
 * @flow
 */
import React, { Component } from "react";
import { View, Text, StyleSheet, Image, PixelRatio } from "react-native";
import { observer, inject } from "mobx-react";
import moment from "moment";

import { NavigationActions } from "react-navigation";
import { BorrowerStore } from "../../stores/borrower";
import { AuthStore } from "../../stores/authUser";
import { CurrentUser } from "../../stores/currentUser";
import { normalize } from "../../utils";
import * as colors from "../../constants/colors";

@inject("borrowerStore", "authStore", "currentUserStore")
@observer
export default class BorrowerDetail extends Component {
  props: {
    borrowerStore: BorrowerStore,
    authStore: AuthStore,
    navigation: NavigationActions,
    currentUserStore: CurrentUser
  };
  componentDidMount() {
    console.log(
      `this.props.navigation.state.params are : ${JSON.stringify(
        this.props.navigation.state.params.borrower
      )}`
    );
    this.props.borrowerStore
      .loadBorrower(
        this.props.navigation.state.params.borrowerId,
        this.props.authStore.jwt,
        this.props.authStore.orgBaseInfo.id
      )
      .then(() => {
        console.log("0-0-0-0-0-0-0-", this.props.borrowerStore);
      });
  }
  render() {
    const {
      navigation: {
        state: {
          params: { borrower: { created_at, id_no, avatar, mobile, id, name } }
        }
      }
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>借款人详细信息</Text>
          <Text>
            {moment(created_at).fromNow()}
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.borrwerMeta}>
            省份证：{id_no}
          </Text>
          <Text style={styles.borrwerMeta}>
            手机号：{mobile}
          </Text>
        </View>
      </View>
    );
  }
}
// const

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingVertical: normalize(16) / PixelRatio.get(),
    paddingHorizontal: normalize(16) / PixelRatio.get(),
    flexDirection: "row",
    justifyContent: "space-between"
  },
  avatar: {
    width: normalize(40),
    height: normalize(40)
  },
  borrwerMeta: {
    fontSize: normalize(15),
    lineHeight: normalize(20)
  },
  content: {
    paddingVertical: normalize(10) / PixelRatio.get(),
    paddingHorizontal: normalize(16) / PixelRatio.get()
  }
});
