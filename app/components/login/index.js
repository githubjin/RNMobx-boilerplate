import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import { observer, inject } from "mobx-react/native";

@inject(["captchaStore"])
@observer
export default class Login extends Component {
  componentDidMount() {
    this.props.captchaStore.refresh();
  }
  // componentWillReact() {
  //   console.log("componentWillReact is runing ");
  // }
  render() {
    console.log(JSON.stringify(this.props));
    return (
      <View>
        <View>
          <Text>用户名</Text><TextInput />
        </View>
        <View>
          <Text>密码</Text><TextInput />
        </View>
        <View>
          <Text>验证码</Text><TextInput />
          {/*<Image
            source={{ uri: this.props.captchaStore.img_url }}
            style={styles.captcha}
          />*/}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: "60%"
  },
  label: {
    fontSize: 20
  },
  captcha: {
    width: 100,
    height: 40
  }
});
