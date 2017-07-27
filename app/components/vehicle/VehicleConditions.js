/**
 * @flow
 */
import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import { observer, inject } from "mobx-react";

import { Vehicle } from "../../stores/vehicle";
import { AuthStore } from "../../stores/authUser";

@inject("authStore", "vehicleStore")
@observer
export default class VehicleConditions extends Component {
  props: {
    vehicleStore: Vehicle,
    authStore: AuthStore
  };
  componentWillMount() {
    const { navigation: { state: { params: { vehicleId } } } } = this.props;
    this.props.vehicleStore
      .loadConditions(
        vehicleId,
        this.props.authStore.jwt,
        this.props.authStore.orgBaseInfo.id
      )
      .catch(error => {
        Alert.alert("提示", "车况信息查询失败！");
      });
  }
  render() {
    const { conditions } = this.props.vehicleStore;
    return (
      <View style={styles.container}>
        {conditions.map(condition =>
          <Text style={styles.row}>
            车况评估报告 (评估时间: ${condition.created_at} 评估人: ${condition.evaluator.name})
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    fontSize: 15,
    paddingHorizontal: 4,
    paddingVertical: 10
  }
});
