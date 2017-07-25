/**
 * @flow
 */
import React, { Component } from "react";
import { FlatList, Text, View } from "react-native";

import type { VehicleCondition } from "../../types";

export default class VehicleList extends Component {
  props: { data: Object[] };
  renderItem = ({ item }: { item: VehicleCondition }) => {
    <View>
      <Text>
        {item.id}
      </Text>
    </View>;
  };
  keyExtractor = (item, index) => item.id;
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
