/**
 * 业务首页
 * @flow
 */
import React, { Component } from "react";
import { View, ListView, Text, StyleSheet, RefreshControl } from "react-native";
import { observer, inject } from "mobx-react/native";
import { VehiclesStore } from "../../stores/vehicles";

@inject("vehiclesStore")
@observer
export default class Vehicles extends Component {
  props: {
    vehiclesStore: VehiclesStore
  };
  componentDidMount() {
    this.props.vehiclesStore.loadmore();
  }
  getDatasource = () => {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    // console.log("this.props.vehiclesStore", this.props.vehiclesStore);
    if (this.props.vehiclesStore.results) {
      return ds.cloneWithRows(this.props.vehiclesStore.results.result || []);
    }
    return ds.cloneWithRows([]);
  };
  renderItem = (vehicleId: string) => {
    let entity = this.props.vehiclesStore.results.entities[vehicleId];
    return (
      <View key={vehicleId}>
        <Text>
          {entity.brand}
        </Text>
      </View>
    );
  };
  loadMore = () => {
    this.props.vehiclesStore.loadmore({
      page: this.props.vehiclesStore.pagination.page + 1
    });
  };
  refresh = () => {
    this.props.vehiclesStore.loadmore();
  };
  render() {
    const { vehiclesStore } = this.props;
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.getDatasource()}
          renderRow={this.renderItem}
          enableEmptySections={true}
          refreshControl={
            <RefreshControl
              onRefresh={this.refresh}
              refreshing={this.props.vehiclesStore.refreshing}
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
