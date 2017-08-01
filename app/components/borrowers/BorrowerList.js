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
    dataSource: ListView.DataSource,
    rows: Object[],
    openDetail: (item: Object) => void
  };
  consoleDataSource = () => {
    console.log(this.props.dataSource, this.props.dataSource.getRowCount());
  };
  renderRow = (item: Borrower) => {
    console.log("CustomerList renderRow", item);
    return <CustomerItem item={item} />;
  };
  _renderRow = ({ item }) => {
    return <CustomerItem item={item} openDetail={this.props.openDetail} />;
  };
  renderSectionHeader = (sectionData: any, sectionID: any) => {
    return <Text>sectionID</Text>;
  };
  _render() {
    return (
      <ListView
        dataSource={this.props.dataSource}
        renderRow={this.renderRow}
        style={styles.list}
        enableEmptySections={true}
      />
    );
  }
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
