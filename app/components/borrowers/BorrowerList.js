/**
 * @flow
 */
import React, { Component } from "react";
import { ListView, Text, StyleSheet, FlatList } from "react-native";
import { observer } from "mobx-react";

import CustomerItem from "./BorrowerItem";
import type { Borrower } from "../../stores/borrowers";

export default class CustomerList extends Component {
  props: {
    rows: Object[],
    openDetail: (item: Object) => () => void
  };
  _renderRow = ({ item, index }) => {
    return (
      <CustomerItem
        item={item}
        first={index === 0}
        openDetail={this.props.openDetail}
      />
    );
  };
  renderSectionHeader = (sectionData: any, sectionID: any) => {
    return <Text>sectionID</Text>;
  };
  _keyExtractor = (item, index) => item.id;
  render() {
    return (
      <FlatList
        data={this.props.rows.slice()}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderRow}
      />
    );
  }
}

CustomerList.defaultPrpos = {
  rows: []
};

const styles = StyleSheet.create({
  list: {}
});
