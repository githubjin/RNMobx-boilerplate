import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
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
    // const imgUrl = this.props.captchaStore
    const { captchaStore = {} } = this.props;
    let { img_url } = captchaStore;
    img_url = img_url
      ? img_url
      : "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1800947853,3461028799&fm=117&gp=0.jpg";
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
          <TouchableOpacity onPress={captchaStore.refresh()}>
            <Image source={{ uri: img_url }} style={styles.captcha} />
          </TouchableOpacity>
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
