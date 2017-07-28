/**
 * @flow
 */
import React, { Component } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  PixelRatio,
  StyleSheet,
  Platform,
  TouchableOpacity
} from "react-native";
import moment from "moment";
import _ from "lodash/lang";
import { NavigationScreenProp } from "react-navigation";

import type { NormalizeVehicles } from "../../types";
import { getColorByColorId } from "../../utils/carMetaDataUtil";
import {
  BORDER_PRIMARY_COLOR,
  BUTTON_PRIMARY_COLOR
} from "../../constants/colors";
import { normalize } from "../../utils";

export default class VehicleList extends Component {
  props: {
    data: NormalizeVehicles,
    showOperators?: boolean,
    navigateToVehicleDetail?: (vehicle: Object) => () => void
  };
  renderItem = ({ item }: { item: string }) => {
    if (_.isEmpty(item)) {
      return null;
    }
    const { showOperators = false } = this.props;
    const { entities: { borrower, vehicles } } = this.props.data;
    const vehicle = vehicles[item];
    const user = borrower[vehicle.borrower];
    return (
      <VehicleCard
        name={user.name}
        model={vehicle.model}
        vin={vehicle.vin}
        color={vehicle.color}
        created_at={vehicle.created_at}
        avatar={user.avatar}
        seeDetail={
          this.props.navigateToVehicleDetail &&
          this.props.navigateToVehicleDetail(vehicle)
        }
        seeConditionDetail={() => {}}
        seeViolations={() => {}}
        showOperators={showOperators}
      />
    );
  };
  keyExtractor = (item: string, index: number) => item;
  render() {
    const { data: { result = [] } } = this.props;
    return (
      <FlatList
        data={result.slice()}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        showsVerticalScrollIndicator={false}
      />
    );
  }
}

VehicleList.defaultProps = {
  data: {
    result: []
  },
  showOperators: false
};

function VehicleCard({
  name,
  model,
  vin,
  color,
  created_at,
  avatar,
  seeDetail,
  seeConditionDetail,
  seeViolations,
  showOperators
}: Object) {
  const trueColor = getColorByColorId(color).color || "transparent";
  return (
    <View style={[styles.container, { borderBottomColor: trueColor }]}>
      <View style={styles.cardHeader}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text style={styles.cardTitle}>
          {name}
        </Text>
        <Text style={styles.moment}>
          {moment(created_at).fromNow()}
        </Text>
      </View>
      <Text style={styles.cardContent}>
        {vin}
      </Text>
      <Text style={styles.cardContent}>
        {model}
      </Text>
      {showOperators &&
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: normalize(10)
          }}
        >
          <OperatorButton label="查看详情" onPress={seeDetail} />
          <OperatorButton label="车况信息" onPress={seeConditionDetail} />
          <OperatorButton label="车辆违章" onPress={seeViolations} />
        </View>}
    </View>
  );
}

function OperatorButton({ label, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.operatorBnt}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "#000000",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: normalize(10),
    paddingHorizontal: normalize(4) * PixelRatio.get(),
    marginVertical: 2,
    ...Platform.select({
      android: {
        elevation: 1
      },
      ios: {
        shadowOffset: {
          width: 1,
          height: 1
        },
        shadowOpacity: 0.5,
        shadowColor: "red",
        shadowRadius: 0.5
      }
    })
  },
  operatorBnt: {
    color: BUTTON_PRIMARY_COLOR,
    fontSize: normalize(14)
  },
  cardHeader: {
    flexDirection: "row",
    paddingVertical: normalize(3) * PixelRatio.get(),
    borderBottomColor: "#333333"
  },
  cardTitle: {
    fontSize: normalize(15),
    fontWeight: "700",
    lineHeight: 22
  },
  avatar: { width: 22, height: 22, marginRight: 6 },
  cardContent: {
    fontSize: normalize(15)
  },
  moment: {
    fontSize: normalize(13),
    flex: 1,
    textAlign: "right",
    lineHeight: 22
  },
  carColorBox: {
    width: 40,
    height: 20,
    opacity: 0.7
  }
});
