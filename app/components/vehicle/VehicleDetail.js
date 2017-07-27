/**
 * @flow
 */
import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { NavigationScreenProp } from "react-navigation";
// import type { Vehicle } from "../../types";
import {
  getCarTypeById,
  getShiftingTypeBy,
  getDriverTypeBy,
  getColorByColorId
} from "../../utils/carMetaDataUtil";
import { normalize } from "../../utils";
import {
  FONT_COCLOR_CONTENT,
  FONT_COLOR_LIST_ITEM_TITLE
} from "../../constants/colors";

export default class VehicleDetail extends Component {
  props: {
    navigation: NavigationScreenProp
  };
  static navigationOptions = ({ navigation }) => {
    const { state: { params: { vehicle } } } = navigation;
    console.log(
      `VehicleDetail  Navigation options method: ${JSON.stringify(navigation)}`
    );
    return {
      title: vehicle.model
    };
  };
  render() {
    const { navigation: { state: { params: { vehicle } } } } = this.props;
    const trueColor = getColorByColorId(vehicle.color).color;
    return (
      <View style={styles.container}>
        <DetailItem
          label="车辆类型"
          value={getCarTypeById(vehicle.type).name}
          color={trueColor}
        />
        <DetailItem label="品牌型号" value={vehicle.model} color={trueColor} />
        <DetailItem
          label="车牌号"
          value={vehicle.plate_number}
          color={trueColor}
        />
        <DetailItem label="车架号" value={vehicle.vin} color={trueColor} />
        <DetailItem
          label="发动机号"
          value={vehicle.engine_number}
          color={trueColor}
        />
        <DetailItem
          label="出厂日期"
          value={vehicle.production_day}
          color={trueColor}
        />
        <DetailItem label="排量" value={vehicle.displacement} color={trueColor} />
        <DetailItem
          label="变速"
          value={getShiftingTypeBy(vehicle.shifting).name}
          color={trueColor}
        />
        <DetailItem
          label="驱动类型"
          value={getDriverTypeBy(vehicle.driver_type).name}
          color={trueColor}
        />
      </View>
    );
  }
}

function DetailItem({
  label,
  value,
  color
}: {
  label: string,
  value: string,
  color: string
}) {
  return (
    <View style={[styles.itemContainer, { borderBottomColor: color }]}>
      <Text style={styles.itemLabel}>
        {label}：
        <Text style={styles.itemVelue}>{value}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: normalize(4)
  },
  itemContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 1
  },
  itemVelue: {
    fontSize: normalize(14),
    color: FONT_COCLOR_CONTENT
  },
  itemLabel: {
    fontSize: normalize(16),
    color: FONT_COLOR_LIST_ITEM_TITLE,
    fontWeight: "500"
  }
});
