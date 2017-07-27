/**
 * @flow
 */
import React, { Component } from "react";
import { FlatList, View, Text, StyleSheet, Platform } from "react-native";
import { observer, inject } from "mobx-react";

import type { Boorrowing } from "../../types";
import {
  autoReviewStatusDict,
  phoneReviewStatusDict,
  borrowingStatusDict,
  termUnit,
  borrowingTypeDict
} from "../../constants/metaData";

export default class BorrowingList extends Component {
  props: {
    data: Boorrowing[]
  };
  renderItem = ({ item }: { item: Borrowing }) => {
    return (
      <BorrowingItem
        no={item.no}
        name={item.application.borrower.name}
        type={item.type}
        amount={item.amount}
        term={item.term}
        term_unit={item.term_unit}
        created_at={item.created_at}
        status={item.status}
        auto_review_status={item.application.auto_review_status}
        phone_review_status={item.application.phone_review_status}
        id={item.id}
      />
    );
  };
  keyExtractor = item => item.no;
  render() {
    const { data } = this.props;
    return (
      <FlatList
        data={data}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

BorrowingList.defaultProps = {
  data: []
};

/**
 * 列表行元素组件
 * @param {Object} param0 
 */
function BorrowingItem({
  no,
  name,
  type,
  created_at,
  amount,
  term,
  term_unit,
  status,
  auto_review_status,
  phone_review_status,
  id
}) {
  return (
    <View style={styles.itemContainer}>
      <View style={[styles.itemMarginBottom, styles.itemHeader]}>
        <Text>
          {no}-{name}
        </Text>
        <Text>
          {borrowingTypeDict[type]}
        </Text>
      </View>
      <Text style={[styles.itemMarginBottom]}>
        {created_at}
      </Text>
      <View style={[styles.itemMarginBottom]}>
        <Text>
          {amount}
        </Text>
        <Text>
          {term} /
          <Text>{termUnit[term_unit]}</Text>
        </Text>
      </View>
      <View style={[styles.status]}>
        <Text
          style={[
            styles.statusText,
            styles.statusTextMarginRight,
            { backgroundColor: borrowingStatusDict[status].color }
          ]}
        >
          {borrowingStatusDict[status].title}
        </Text>
        <Text
          style={[
            styles.statusText,
            styles.statusTextMarginRight,
            {
              backgroundColor: autoReviewStatusDict[auto_review_status].color
            }
          ]}
        >
          {autoReviewStatusDict[auto_review_status].title}
        </Text>
        <Text
          style={[
            styles.statusText,
            {
              backgroundColor: phoneReviewStatusDict[phone_review_status].color
            }
          ]}
        >
          {phoneReviewStatusDict[phone_review_status].title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 3,
    ...Platform.select({
      android: {
        elevation: 1
      },
      ios: {
        shadowRadius: 1,
        shadowOffset: {
          width: 1,
          height: 1
        },
        shadowOpacity: 0.5,
        shadowColor: "#f5f5dc"
      }
    }),
    borderBottomColor: "#f5f5dc",
    borderBottomWidth: 1
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  status: { flexDirection: "row" },
  statusText: {
    fontSize: 14,
    color: "#ffffff"
  },
  statusTextMarginRight: {
    marginRight: 10
  },
  itemMarginBottom: {
    marginBottom: 10
  }
});
