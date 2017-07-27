/**
 * @flow
 */
import React, { Component } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import type { AppointmentType } from "../../types";

/**
 * 预约信息列表
 */
export default class AppointmentList extends Component {
  props: {
    data: Object[]
  };
  renderItem = ({ item }: { item: AppointmentType }) => {
    return (
      <View>
        <Text>
          {item.id}
        </Text>
      </View>
    );
  };
  keyExtractor = item => item.id;
  render() {
    return (
      <FlatList
        data={this.props.data}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}
AppointmentList.defaultProps = {
  data: []
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  }
});
