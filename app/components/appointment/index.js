/**
 * @flow
 */
import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { observer, inject } from "mobx-react";

import { AuthStore } from "../../stores/authUser";
import { AppointmentStore } from "../../stores/appointment";
import AppointmentList from "./AppointmentList";
/**
 * 预约信息页面入口
 */
@inject("authStore", "appointmentStore")
@observer
export default class Appointment extends Component {
  static navigationOptions = {
    title: "预约"
  };
  props: {
    authStore: AuthStore,
    appointmentStore: AppointmentStore
  };
  componentDidMount() {
    this.props.appointmentStore
      .loadMore(
        { page: 1 },
        this.props.authStore.jwt,
        this.props.authStore.orgBaseInfo.id
      )
      .then(() => {})
      .catch(reason => {
        console.log("appointment list error", reason);
      });
  }
  render() {
    return <AppointmentList data={this.props.appointmentStore.appointments} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  }
});
