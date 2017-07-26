/**
 * @flow
 */
import React, { Component } from "react";
import { View, Text, StyleSheet, Image, PixelRatio, Alert } from "react-native";
import { observer, inject } from "mobx-react";
import moment from "moment";
import ScrollableTabView from "react-native-scrollable-tab-view";

import { NavigationActions } from "react-navigation";
import { BorrowerStore } from "../../stores/borrower";
import { AuthStore } from "../../stores/authUser";
import { CurrentUser } from "../../stores/currentUser";
import { normalize } from "../../utils";
import * as colors from "../../constants/colors";
// import type { NormalizeVehicles } from "../../types";
import { VehicleList } from "../vehicle";

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
    // console.log(
    //   `this.props.navigation.state.params are : ${JSON.stringify(
    //     this.props.navigation.state.params.borrower
    //   )}`
    // );
    const {
      navigation: { state: { params: { borrower: { id } } } },
      authStore: { jwt, orgBaseInfo: { id: orgId } }
    } = this.props;
    this.props.borrowerStore
      .loadVehicles(id, jwt, orgId)
      .then(data => {
        console.log(
          `borrower detail vehicle are : ${JSON.stringify(
            this.props.borrowerStore.vehicles
          )}`
        );
      })
      .catch(reason => {
        Alert.alert("提示", "获取车辆信息失败！");
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
        <View style={[styles.header, styles.hp, styles.hbb]}>
          <Text style={styles.headetrTitle}>用户信息</Text>
          <Text style={styles.createdAt}>
            {moment(created_at).fromNow()}
          </Text>
        </View>
        <View style={[styles.content, styles.hp, styles.hbb]}>
          <Text style={styles.borrwerMeta}>
            省份证：{id_no}
          </Text>
          <Text style={styles.borrwerMeta}>
            手机号：{mobile}
          </Text>
        </View>
        <View style={styles.hbb}>
          <Text style={[styles.spiteHeader, styles.hp]}>车辆</Text>
        </View>
        <VehicleList
          data={this.props.borrowerStore.vehicles}
          showOperators={true}
          navigateToVehicleDetail={this.navigateToVehicleDetail}
        />
      </View>
    );
  }
  navigateToVehicleDetail = vehicle => {
    return () => {
      this.props.navigation.navigate("VehicleDetail", { vehicle });
    };
  };
}
// const

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  hp: {
    paddingHorizontal: normalize(4) * PixelRatio.get()
  },
  hbb: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e3e3e3"
  },
  header: {
    paddingVertical: normalize(16) / PixelRatio.get(),
    paddingHorizontal: normalize(16) / PixelRatio.get(),
    flexDirection: "row",
    justifyContent: "space-between"
  },
  headetrTitle: {
    fontSize: normalize(18)
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
  },
  createdAt: {
    fontSize: normalize(15)
  },
  spiteHeader: {
    paddingVertical: normalize(5) * PixelRatio.get(),
    fontSize: normalize(18)
  }
});
