/**
 * @flow
 */
import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  PixelRatio
} from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";

import { Button } from "../lib";
import { COLORS } from "../../constants/colors";
import _ from "lodash/lang";

type Props = {
  fieldName: string,
  onOk: (fieldNames: string[], values: string[]) => void,
  onCancel: () => void
};
export default class ConditionForm extends Component {
  props: Props;
  state: {
    mobile: string,
    name: string,
    from: string,
    to: string
  };
  constructor(props) {
    super(props);
    this.state = {
      currentField: "mobile",
      from: "2017-07-01",
      to: "2017-07-19"
    };
  }
  componenntWillReceiveProps(nextProps: Props) {
    if (this.props.fieldName !== nextProps.fieldName) {
      let obj = { currentField: nextProps.fieldName };
      this.setState(obj);
    }
  }
  doFilter = (force: boolean = false) => {
    return () => {
      console.log(
        "this.props, this.state, force",
        this.props,
        this.state,
        force
      );
      if (force) {
        this.props.onOk([], []);
        return;
      }
      let isDateFilter = this.props.fieldName === "date";
      // 非时间过滤
      if (!isDateFilter && _.isEmpty(this.state[this.props.fieldName])) {
        return;
      }
      // 时间过滤
      if (
        isDateFilter &&
        _.isEmpty(this.state.from) &&
        _.isEmpty(this.state.to)
      ) {
        return;
      }
      let fields = [];
      let values = [];
      if (this.props.fieldName === "date") {
        fields.push("from", "to");
        values.push(this.state.from, this.state.to);
      } else {
        fields.push(this.props.fieldName);
        values.push(this.state[this.props.fieldName]);
      }
      this.props.onOk(fields, values);
    };
  };
  onChangeText = (fieldName: string) => {
    return value => {
      let condition = {};
      condition[fieldName] = value;
      this.setState(condition);
    };
  };
  clearFieldInput = (fieldName: string) => {
    return () => {
      if (_.isEmpty(this.state[fieldName])) {
        return;
      }
      let obj = {};
      obj[fieldName] = "";
      this.setState(obj);
      this.doFilter(true)();
    };
  };
  render() {
    const { onCancel, onOk, fieldName } = this.props;
    const { mobile, name, from, to } = this.state;
    return (
      <View style={{ zIndex: 1000 }}>
        <FieldInput
          placeholder="手机号"
          clearFieldInput={this.clearFieldInput}
          onChangeText={this.onChangeText}
          fieldName="mobile"
          currentField={fieldName}
          value={mobile}
        />
        <FieldInput
          placeholder="姓名"
          clearFieldInput={this.clearFieldInput}
          onChangeText={this.onChangeText}
          fieldName="name"
          currentField={fieldName}
          value={name}
        />
        <FieldInput
          placeholder="注册起始时间"
          clearFieldInput={this.clearFieldInput}
          onChangeText={this.onChangeText}
          fieldName="from"
          currentField={fieldName === "date" && "from"}
          value={from}
        />
        <FieldInput
          placeholder="注册截至时间"
          clearFieldInput={this.clearFieldInput}
          onChangeText={this.onChangeText}
          fieldName="to"
          currentField={fieldName === "date" && "to"}
          value={to}
        />
        <View style={styles.buttonGroup}>
          <Button
            style={[styles.button, styles.cancel]}
            text="取消"
            onPress={onCancel}
          />
          <Button
            style={[styles.button, styles.ok]}
            text="确定"
            onPress={this.doFilter()}
          />
        </View>
      </View>
    );
  }
}

function FieldInput({
  fieldName,
  currentField,
  value,
  onChangeText,
  clearFieldInput,
  placeholder
}) {
  if (fieldName !== currentField) {
    return null;
  }
  return (
    <View style={styles.inputBox}>
      <TextInput
        placeholder={placeholder}
        value={value}
        style={styles.textInput}
        underlineColorAndroid="transparent"
        spellCheck={false}
        onChangeText={onChangeText(fieldName)}
        placeholderTextColor={COLORS.font.uploadLabel}
      />
      <Icon
        name="close"
        size={22}
        onPress={clearFieldInput(fieldName)}
        style={[styles.clearButton, { opacity: _.isEmpty(value) ? 0 : 1 }]}
      />
    </View>
  );
}

const styles = {
  textInput: {
    flex: 1,
    height: 44
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 8
  },
  button: {
    width: "100%",
    paddingVertical: 8
  },
  inputBox: {
    borderColor: COLORS.button.secondary,
    borderWidth: 1,
    paddingHorizontal: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  cancel: {
    backgroundColor: COLORS.button.cancel
  },
  ok: {
    backgroundColor: COLORS.button.primary
  },
  clearButton: {
    // width: 44 / PixelRatio.get(),
    // height: 44 / PixelRatio.get()
  }
};
