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
    // "created_at":"2017-07-06 11:40:15","id_no":"360735198710076859",
    // "avatar":"https://imgthisisdashcdn-83chedai-com.alikunlun.com/identicons/400.png",
    // "mobile":"13699998888","id":"54dd5974-254b-4a27-81c3-3532c4297476","name":"方新童"
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
