/**
 * @flow
 */
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  PixelRatio,
  TouchableOpacity
} from "react-native";

import { observer } from "mobx-react";
import type { Borrower } from "../../stores/borrowers";
import { ROUTE_BORROWER } from "../../constants/routes";

export default class CustomerItem extends Component {
  props: {
    item: Borrower,
    first: boolean,
    navigation: Object
  };
  componentDidMount() {
    // console.log("Customer Item is mounted", this.props.item);
  }
  showBorrowerDetail = (item: Borrower) => {
    this.props.navigation.navigate(ROUTE_BORROWER, { borrower: item });
  };
  render() {
    const { item, first } = this.props;
    return (
      <View style={first ? [styles.item, styles.itemTop] : styles.item}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={styles.contentWrapper}>
          <View style={styles.row_title}>
            <Text style={styles.title}>
              {item.name}
            </Text>
            <Text style={styles.meta}>
              {item.created_at}
            </Text>
          </View>
          <View style={styles.row_content}>
            <Text style={styles.content}>
              {item.mobile} - {item.created_at}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemTop: {
    borderTopWidth: 1,
    borderTopColor: "#f2f2f0"
  },
  avatar: {
    width: 39,
    height: 39,
    marginRight: 20 / PixelRatio.get()
  },
  item: {
    padding: 20 / PixelRatio.get(),
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f0",
    flexDirection: "row"
  },
  row_title: {
    marginBottom: 20 / PixelRatio.get(),
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 32 / PixelRatio.get(),
    fontWeight: "700",
    color: "#000000"
  },
  meta: {
    fontSize: 24 / PixelRatio.get(),
    color: "#838383"
  },
  row_content: {},
  content: {
    fontSize: 28 / PixelRatio.get(),
    color: "#999999"
  },
  contentWrapper: {
    width: "100%"
  },
  bnt: {
    marginVertical: 10 / PixelRatio.get()
  }
});
