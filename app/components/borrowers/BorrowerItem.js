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
  TouchableOpacity,
  Alert
} from "react-native";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

import Icon from "react-native-vector-icons/SimpleLineIcons";

import { observer } from "mobx-react/native";
import type { Borrower } from "../../stores/borrowers";
import { ROUTE_BORROWER } from "../../constants/routes";
import { normalize } from "../../utils";

export default class CustomerItem extends Component {
  props: {
    item: Borrower,
    first: boolean,
    navigation: Object,
    openDetail: (item: Object) => void
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
      <TouchableOpacity onPress={this.props.openDetail(item)}>
        <View style={first ? [styles.item, styles.itemTop] : styles.item}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View style={styles.contentWrapper}>
            <View style={styles.row_title}>
              <Text style={styles.title}>
                {item.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignContent: "center"
                }}
              >
                <Text style={styles.mobile}>
                  {item.mobile}
                </Text>
                <TouchableOpacity>
                  <Icon
                    pointerEvents="auto"
                    name="phone"
                    style={styles.phoneIcon}
                    size={22}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.content} numberOfLines={2}>
              {item.id}
            </Text>
            <Text style={styles.meta}>
              {moment(item.created_at).fromNow()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  itemTop: {
    borderTopWidth: 1,
    borderTopColor: "#f2f2f0"
  },
  avatar: {
    width: normalize(39),
    height: normalize(39),
    marginRight: normalize(20) / PixelRatio.get()
  },
  item: {
    padding: normalize(20) / PixelRatio.get(),
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f0",
    flexDirection: "row",
    width: "100%"
  },
  row_title: {
    marginBottom: normalize(20) / PixelRatio.get(),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontSize: normalize(32) / PixelRatio.get(),
    fontWeight: "700",
    color: "#263238"
  },
  meta: {
    fontSize: normalize(24) / PixelRatio.get(),
    color: "#838383",
    // marginRight: normalize(50),
    lineHeight: 20,
    alignSelf: "flex-end",
    marginTop: normalize(20) / PixelRatio.get()
  },
  mobile: {
    color: "#838383",
    fontSize: normalize(24) / PixelRatio.get(),
    alignItems: "center",
    marginRight: normalize(7)
  },
  row_content: {},
  phoneIcon: {
    width: 44 / PixelRatio.get(),
    height: 44 / PixelRatio.get()
  },
  content: {
    fontSize: normalize(23) / PixelRatio.get(),
    color: "#333333"
  },
  contentWrapper: {
    // width: "100%"
    flex: 1
  },
  bnt: {
    marginVertical: normalize(10) / PixelRatio.get()
  },
  phoneWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end"
  },
  iconStyle: {
    marginLeft: 10,
    paddingLeft: 20
  }
});
