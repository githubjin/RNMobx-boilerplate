/**
 * @flow
 */
import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { observer, inject } from "mobx-react";

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
      <View>
        <View style={styles.header}>
          <Text>借款人详细信息</Text>
        </View>
        <View style={styles.content}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.borrwerMeta}>
              {created_at}
            </Text>
            <Text style={styles.borrwerMeta}>
              {name}
            </Text>
          </View>
          <Text style={styles.borrwerMeta}>
            {id_no}
          </Text>
          <Text style={styles.borrwerMeta}>
            {mobile}
          </Text>
        </View>
      </View>
    );
  }
}
const 

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingVertical: 20
  },
  avatar: {
    width: normalize(40),
    height: normalize(40)
  },
  borrwerMeta: {
    fontSize: normalize(15)
  },
  content: {
    justifyContent: "center",
    alignItems: "center"
  }
});
