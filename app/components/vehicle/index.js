/**
 * 业务首页
 * @flow
 */
import React, { Component } from "react";
import {
  View,
  ListView,
  Text,
  StyleSheet,
  RefreshControl,
  Alert,
  PixelRatio
} from "react-native";
import { observer, inject } from "mobx-react/native";
import { VehiclesStore } from "../../stores/vehicles";
import { AuthStore } from "../../stores/authUser";
import VehicleList from "./VehicleList";
import * as colors from "../../constants/colors";
import { normalize } from "../../utils";
import VehicleDetail from "./VehicleDetail";
import VehicleConditions from "./VehicleConditions";

@inject("vehiclesStore", "authStore")
@observer
export default class Vehicles extends Component {
  props: {
    vehiclesStore: VehiclesStore,
    authStore: AuthStore
  };
  componentDidMount() {
    // Alert.alert("提示", "hello");
    this.props.vehiclesStore.loadmore(
      { page: 1 },
      this.props.authStore.jwt,
      this.props.authStore.orgBaseInfo.id
    );
    // .then(() => {
    //   console.log(
    //     "vehicles render method called :",
    //     this.props.vehiclesStore.results
    //   );
    // });
  }
  loadMore = () => {
    this.props.vehiclesStore.loadmore({
      page: this.props.vehiclesStore.pagination.page + 1
    });
  };
  refresh = () => {
    this.props.vehiclesStore.loadmore();
  };
  render() {
    const { vehiclesStore } = this.props;
    return (
      <View style={styles.container}>
        <VehicleList data={this.props.vehiclesStore.results} />
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

export { VehicleList, VehicleDetail, VehicleConditions };
