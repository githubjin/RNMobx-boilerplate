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
  TouchableHighlight,
  Dimensions
} from "react-native";
import { observer, inject } from "mobx-react";

import Icon from "react-native-vector-icons/SimpleLineIcons";

import { CurrentUser as CurrentUserStore } from "../../stores/currentUser";
import type { MenuType } from "../../config/menus";

const width = Dimensions.get("window").width;

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
        {permissions.map((permission: MenuType, index: number) => {
          return (
            <MenuGridItem
              key={`${permission.route}_${index}`}
              {...permission}
              onPress={this.navigateSomeStack}
            />
          );
        })}
      </View>
    );
  };
}

// Grid Menu Item
function MenuGridItem({
  name,
  icon,
  endpoint,
  url,
  route,
  permission_code,
  onPress
}: {
  name: string,
  icon: string,
  endpoint: string,
  url: string,
  route: string,
  permission_code: string,
  onPress: (route: string) => () => void
}) {
  return (
    <TouchableOpacity onPress={onPress(route)}>
      <View style={styles.menuGridItem}>
        <Icon name={icon} size={18} style={styles.menuIcon} />
        <Text style={styles.menuLabel}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
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
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingRight: 8,
    paddingTop: 8,
    marginTop: 30
  },
  menuGridItem: {
    alignSelf: "stretch",
    marginLeft: 4,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#333333",
    alignItems: "center"
  },
  menuIcon: {
    marginBottom: 8
  },
  menuLabel: {
    fontSize: 16
  }
});
