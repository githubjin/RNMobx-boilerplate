/**
 * @flow
 */
import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, TextInput } from "react-native";

import { Button } from "../lib";

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
      currentField: "mobile"
    };
  }
  componenntWillReceiveProps(nextProps: Props) {
    if (this.props.fieldName !== nextProps.fieldName) {
      let obj = { currentField: nextProps.fieldName };
      this.setState(obj);
    }
  }
  doFilter = () => {
    // 实践未处理
    // ...
    let fields = [this.props.fieldName];
    let values = [this.state[this.props.fieldName]];
    this.props.onOk(fields, values);
  };
  render() {
    const { onCancel, onOk, fieldName } = this.props;
    const { mobile, name, from, to } = this.state;
    return (
      <View>
        <FieldInput
          fieldName="mobile"
          currentField={fieldName}
          value={mobile}
        />
        <FieldInput fieldName="name" currentField={fieldName} value={name} />
        <FieldInput
          fieldName="from"
          currentField={fieldName === "date" && "from"}
          value={from}
        />
        <FieldInput
          fieldName="to"
          currentField={fieldName === "date" && "to"}
          value={to}
        />
        <View style={styles.buttonGroup}>
          <Button style={styles.button} text="取消" onPress={onCancel} />
          <Button style={styles.button} text="确定" onPress={this.doFilter} />
        </View>
      </View>
    );
  }
}

function FieldInput({ fieldName, currentField, value }) {
  if (fieldName !== currentField) {
    return null;
  }
  return (
    <TextInput
      pointerEvents="auto"
      value={value}
      style={styles.textInput}
      underlineColorAndroid="none"
    />
  );
}

const styles = {
  textInput: {
    width: "100%",
    height: 44
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 8
  },
  button: {
    width: "50%"
  }
};
