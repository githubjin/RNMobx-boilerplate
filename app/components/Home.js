/**
 * @flow
 */
import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import { Button } from "antd-mobile";
import { observer, inject } from "mobx-react/native";
import Icon from "react-native-vector-icons/FontAwesome";

// import * as actions from "../actions";
import { AuthStore } from "../stores/authUser";
import { navigationReset, clearJwt } from "../services";
import { ROUTE_LOGIN } from "../constants/routes";
import { showShort } from "../utils";

@inject("authStore")
@observer
export default class Home extends Component {
  props: {
    authStore: AuthStore,
    navigation: Object
  };
  componentDidMount() {
    // actions.repositories("0");
    clearJwt(() => {});
  }
  logout = () => {
    // console.log("why this.props.authStore is undefined ", authStore);
    this.props.authStore
      .logout()
      .then(() => {
        // navigate to login screen
        navigationReset(this.props.navigation, ROUTE_LOGIN);
      })
      .catch(error => {
        showShort("提示", error);
      });
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <Box icon="group" total="3" desc="用户总量" style={styles.one} />
        <Box
          icon="bar-chart-o"
          total="121637343.00"
          desc="总交易额"
          style={styles.two}
        />
        <Box icon="shopping-cart" total="4" desc="总业务量" style={styles.three} />
        <Box icon="car" total="7" desc="登记资产" style={styles.four} />
      </ScrollView>
    );
  }
}

const Box = ({ style, icon, total, desc }): React.ReactElement => {
  return (
    <View style={[styles.statistic, style]}>
      <Icon name={icon} style={styles.icon} />
      <View style={styles.box}>
        <Text style={styles.number}>
          {total}
        </Text>
        <Text style={styles.desc}>
          {desc}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  statistic_row: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  statistic: {
    height: 120,
    marginHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5
  },
  box: {
    paddingRight: 15
  },
  number: {
    marginTop: 25,
    color: "#ffffff",
    fontSize: 34,
    textAlign: "right"
  },
  desc: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "right"
  },
  one: {
    backgroundColor: "#3598dc"
  },
  two: {
    backgroundColor: "#e7505a"
  },
  three: {
    backgroundColor: "#32c5d2"
  },
  four: {
    backgroundColor: "#8E44AD"
  },
  icon: {
    color: "#ffffff",
    ...Platform.select({
      ios: {
        opacity: 0.3
      },
      android: {
        opacity: 0.1
      }
    }),
    ...Platform.select({
      android: {
        marginLeft: -25
      }
    }),
    marginTop: 35,
    fontSize: 110,
    lineHeight: 110
  }
});
