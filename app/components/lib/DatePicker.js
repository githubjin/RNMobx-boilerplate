/**
 * @flow
 */
import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  DatePickerAndroid,
  DatePickerIOS,
  TextInput,
  Image,
  TouchableHighlight
} from "react-native";
import moment from "moment";
export default class DatePicker extends Component {
  props: {
    initValue: Date,
    imageSource: Object,
    icon: string
  };
  openDatePicker = () => {
    // modal 格式 ， DatePickerAndroid DatePickerIOS
    // 窗口地步弹出
    // vin 码 - RFID/NFC - 二维码
  };
  render() {
    const { initValue, imageSource, icon } = this.props;
    return (
      <View>
        <TextInput underlineColorAndroid="none" style={styles.dateInput} />
        {icon &&
          <Icon
            name={icon}
            style={styles.icon}
            onPress={this.openDatePicker}
          />}
        {imageSource &&
          <TouchableHighlight onPress={this.openDatePicker}>
            <Image source={imageSource} style={styles.image} />
          </TouchableHighlight>}
        <View>
          <Text>
            {this.props.initValue &&
              moment(this.props.initValue).format("YYYY-MM-DD hh:mm")}
          </Text>
        </View>
      </View>
    );
  }
}

DatePicker.defaultProps = {
  initValue: new Date()
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  dateInput: {
    height: 40,
    width: "100%"
  },
  icon: {
    width: 22,
    height: 22
  },
  image: {
    width: 22,
    height: 22
  }
});
