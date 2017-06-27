import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { observable } from "mobx";
import { observer, inject } from "mobx-react/native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { Button } from "antd-mobile";
import { AuthStore } from "../../stores/auth";
import { Captcha } from "../../stores/captcha";
import { showShort } from "../../utils";
import { ERROR_TITLE } from "../../constants/messages";
import { saveJwt, navigationReset } from "../../services";

@inject("captchaStore", "authStore")
@observer
export default class Login extends Component {
  props: {
    captchaStore: Captcha,
    authStore: AuthStore
  };
  state: {
    username: string,
    password: string,
    captcha: string
  };
  constructor(props) {
    super(props);
    this.state = {
      username: "15200000009",
      password: "123123123",
      captcha: ""
    };
  }
  componentDidMount() {
    this.props.captchaStore.refresh();
  }
  componentWillReact() {
    console.log("captcha is changed");
  }
  onError(...errors) {
    console.log("Login component integration Mobx error ", errors);
  }
  refreshCaptcha = () => {
    this.props.captchaStore.refresh();
  };
  login = () => {
    // login request
    this.props.authStore
      .login(
        this.state.username,
        this.state.password,
        this.props.captchaStore.key,
        this.state.captcha
      )
      .then(() => {
        // save jwt to storage
        // navigate to Main
        if (this.props.authStore.jwt) {
          this.saveJwtToStorageAndNavigateToHome();
        } else {
          showShort(ERROR_TITLE, this.props.authStore.fetchError);
        }
      });
  };
  saveJwtToStorageAndNavigateToHome = () => {
    saveJwt(this.props.authStore.jwt, (error: any) => {
      // console.log(this.props);
      navigationReset(this.props.navigation);
    });
  };
  changeText = (field: string): ((text: string) => void) => {
    return (text: string) => {
      let obj = {};
      obj[field] = text;
      this.setState(obj);
    };
  };
  render() {
    // console.log(JSON.stringify(this.props));
    const { captchaStore = {} } = this.props;
    const { img_url } = captchaStore;
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Text style={styles.label}>用户名</Text>
          <TextInput
            returnKeyType="next"
            keyboardType="phone-pad"
            autoCapitalize="none"
            autoFocus={false}
            autoCorrect={false}
            style={styles.input}
            value={this.state.username}
            onChangeText={this.changeText("username")}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>密码</Text>
          <TextInput
            returnKeyType="next"
            autoCapitalize="none"
            autoFocus={false}
            autoCorrect={false}
            style={styles.input}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={this.changeText("password")}
          />
        </View>
        <View style={[styles.item, styles.captchaItem]}>
          <Text style={styles.label}>验证码</Text>
          <TextInput
            autoCapitalize="none"
            autoFocus={false}
            autoCorrect={false}
            returnKeyType="done"
            value={this.state.captcha}
            style={styles.captchaInput}
            onChangeText={this.changeText("captcha")}
          />
          <TouchableOpacity onPress={this.refreshCaptcha}>
            {img_url &&
              <Image source={{ uri: img_url }} style={styles.captcha} />}
            {!img_url && <Icon name="refresh" size={20} />}
          </TouchableOpacity>
        </View>
        <Button size="large" onClick={this.login}>登录</Button>
        <Text>
          JWT :-:
          {this.props.authStore.jwt}
        </Text>
        <Text>
          fetch error :-:
          {this.props.authStore.fetchError}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20
  },
  item: { width: "100%" },
  input: {
    width: "100%",
    height: 40
  },
  label: {
    fontSize: 20
  },
  captcha: {
    width: 100,
    height: 40
  },
  captchaItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  captchaInput: {
    width: 200,
    height: 40
  }
});
