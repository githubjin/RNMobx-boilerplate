/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  Image,
  Dimensions,
  Platform,
  ScrollView
} from "react-native";
import PropTypes from "prop-types";
import { ScreenUtil } from "../../utils";

import Icon from "react-native-vector-icons/SimpleLineIcons";

export default class WXDemo extends Component {
  render() {
    const { width, height } = Dimensions.get("window");
    return (
      <ScrollView style={styles.container}>
        <Icon name="user" />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </ScrollView>
    );
  }
}

type Props = {
  first?: boolean
};

const Item = ({ first = false }: Props) =>
  <View style={first ? [styles.item, styles.itemTop] : styles.item}>
    <View style={styles.row_title}>
      <Text style={styles.title}>订阅号</Text>
      <Text style={styles.meta}>12:15</Text>
    </View>
    <View style={styles.row_content}>
      <Text style={styles.content}>好好读书，才是我们读书将的最好宿命</Text>
    </View>
  </View>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#F5FCFF",
    ...Platform.select({
      ios: {
        marginTop: ScreenUtil.scaleSize(22)
      }
    })
  },
  welcome: {
    fontSize: ScreenUtil.setSpText(20),
    textAlign: "center",
    margin: ScreenUtil.scaleSize(10)
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: ScreenUtil.scaleSize(5)
  },
  image: {
    width: PixelRatio.getPixelSizeForLayoutSize(200),
    height: PixelRatio.getPixelSizeForLayoutSize(100)
  },
  px_image: {
    width: ScreenUtil.scaleSize(100),
    height: ScreenUtil.scaleSize(100)
  },
  itemTop: {
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: "#f2f2f0"
  },
  item: {
    padding: ScreenUtil.scaleSize(20),
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: "#f2f2f0"
  },
  row_title: {
    marginBottom: ScreenUtil.scaleSize(20),
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    fontSize: ScreenUtil.setSpText(32),
    fontWeight: "700",
    color: "#000000"
  },
  meta: {
    fontSize: ScreenUtil.setSpText(24),
    color: "#838383"
  },
  row_content: {},
  content: {
    fontSize: ScreenUtil.setSpText(28),
    color: "#999999"
  },
  bnt: {
    marginVertical: ScreenUtil.scaleSize(10)
  }
});
