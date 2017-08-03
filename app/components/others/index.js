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
  PixelRatio,
  TouchableHighlight
} from "react-native";
import { observer, inject } from "mobx-react";

import Icon from "react-native-vector-icons/SimpleLineIcons";

import { CurrentUser as CurrentUserStore } from "../../stores/currentUser";
import type { MenuType } from "../../config/menus";

@inject("currentUserStore")
@observer
export default class App extends Component {
  props: {
    currentUserStore: CurrentUserStore
  };
  navigateToAppointment = () => {
    this.props.navigation.navigate("Appointment");
  };
  navigateTpEmploy = () => {
    this.props.navigation.navigate("Users");
  };
  navigateToAccount = () => {
    this.props.navigation.navigate("Account");
  };
  render() {
    return (
      <View style={styles.container}>
        <MenuItem label="预约" onPress={this.navigateToAppointment} />
        <MenuItem label="员工" onPress={this.navigateTpEmploy} />
        <MenuItem label="帐号" onPress={this.navigateToAccount} />
        <MenuItem label="个人信息" onPress={this.navigateToAccount} icon="user" />
        <MenuItem label="修改密码" onPress={this.navigateToAccount} icon="wrench" />
        {this.renderMenuGrid()}
      </View>
    );
  }
  navigateSomeStack = (route: string) => {
    return () => {
      this.props.navigation.navigate(route);
    };
  };
  renderMenuGrid = () => {
    const permissions = this.props.currentUserStore.permissonRoles;
    return (
      <View style={styles.menuGrid}>
        {permissions.map((permission: MenuType) => {
          return (
            <MenuGridItem {...permission} onPress={this.navigateSomeStack} />
          );
        })}
      </View>
    );
  };
}

// Grid Menu Item
function MenuGridItem(
  {
    name,
    icon,
    endpoint,
    url,
    route,
    permission_code
  }: {
    name: string,
    icon: string,
    endpoint: string,
    url: string,
    route: string,
    permission_code: string
  },
  onPress: (route: string) => () => void
) {
  return (
    <TouchableHighlight onPress={onPress(route)}>
      <View style={styles.gridItem}>
        <Icon name={icon} style={styles.menuIcon} />
        <Text style={styles.menuLabel}>
          {name}
        </Text>
      </View>
    </TouchableHighlight>
  );
}

// List Menu Item
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
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  menuItem: {
    width: "30%",
    justifyContent: "center",
    alignItem: "center"
  },
  menuIcon: {
    width: 22,
    height: 22
  },
  menuLabel: {
    size: 16
  }
});
