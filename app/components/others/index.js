/**
 * @flow
 */
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  PixelRatio
} from "react-native";

import Icon from "react-native-vector-icons/SimpleLineIcons";

export default class App extends Component {
  navigateToAppointment = () => {
    this.props.navigation.navigate("Appointment");
  };
  navigateTpEmploy = () => {
    this.props.navigation.navigate("Account");
  };
  navigateToAccount = () => {
    this.props.navigation.navigate("Users");
  };
  render() {
    return (
      <View style={styles.container}>
        <MenuItem label="预约" onPress={this.navigateToAppointment} />
        <MenuItem label="员工" onPress={this.navigateTpEmploy} />
        <MenuItem label="帐号" onPress={this.navigateToAccount} />
      </View>
    );
  }
}

function MenuItem({ label, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.menuItem}>
        <Text style={styles.label}>
          {label}
        </Text>
        <Icon name="arrow-right" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomColor: "#e3e3e3",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 10
  },
  label: {
    fontWeight: "700"
  }
});
