/**
 * @flow
 */
import React, { Component } from "react";
import { ListView, Text, StyleSheet } from "react-native";
import { observer } from "mobx-react";

import CustomerItem from "./BorrowerItem";
import type { Borrower } from "../../stores/borrowers";

export default class CustomerList extends Component {
  props: {
    dataSource: ListView.DataSource
  };
  consoleDataSource = () => {
    console.log(this.props.dataSource, this.props.dataSource.getRowCount());
  };
  renderRow = (item: Borrower) => {
    console.log("CustomerList renderRow", item);
    return <CustomerItem item={item} />;
  };
  renderSectionHeader = (sectionData: any, sectionID: any) => {
    console.log(sectionData, sectionID);
    return <Text>sectionID</Text>;
  };
  componentDidMount() {
    console.log("CustomerList is mounted", this.props.dataSource);
  }
  render() {
    this.consoleDataSource();
    return (
      <ListView
        dataSource={this.props.dataSource}
        renderRow={this.renderRow}
        style={styles.list}
        enableEmptySections={true}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {}
});
