/**
 * 业务首页
 * @flow
 */
import React, { Component } from "react";
import { View, ListView, Text, StyleSheet, RefreshControl } from "react-native";
import { observer, inject } from "mobx-react";
import { Vehicles } from "../stores/vehicles";

@inject("vehicleStore")
@observer
export default class Vehicles extends Component {
  props: {
    vehicleStore: Vehicles
  };
  componentDidMount() {
    this.props.vehicleStore.loadmore();
  }
  getDatasource = () => {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    return ds.cloneWithRows(this.props.vehicleStore.results.result);
  };
  renderItem = (vehicleId: string) => {
    let entity = this.props.vehicleStore.results.entities[vehicleId];
    return (
      <View key={vehicleId}>
        <Text>
          {entity.brand}
        </Text>
      </View>
    );
  };
  loadMore = () => {
    this.props.vehicleStore.loadmore({
      page: this.props.vehicleStore.pagination.page + 1
    });
  };
  refresh = () => {
    this.props.vehicleStore.loadmore();
  };
  render() {
    const { vehicleStore } = this.props;
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.getDatasource()}
          renderRow={this.renderItem}
          refreshControl={
            <RefreshControl
              onRefresh={this.refresh}
              refreshing={this.props.vehicleStore.refreshing}
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
