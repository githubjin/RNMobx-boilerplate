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
import { Button, Tag } from "antd-mobile";
import { AuthStore } from "../../stores/authUser";
import { Captcha } from "../../stores/captcha";
import { CurrentUser } from "../../stores/currentUser";
import { showShort } from "../../utils";
import { ERROR_TITLE } from "../../constants/messages";
import { saveJwt, navigationReset, setCurrentUser } from "../../services";
import UIButton from "../lib/Button";

@inject("captchaStore", "authStore", "currentUserStore")
@observer
export default class Login extends Component {
  props: {
    captchaStore: Captcha,
    authStore: AuthStore,
    currentUserStore: CurrentUser
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
    console.log("captcha is changed", this.props.captchaStore.img_url);
  }
  onError(...errors) {
    console.log("Login component integration Mobx error ", errors);
  }
  refreshCaptcha = () => {
    this.props.captchaStore.refresh().catch(error => {
      showShort(ERROR_TITLE, this.props.captchaStore.fetchError);
    });
  };
  login = () => {
    // navigationReset(this.props.navigation);
    // login request
    // console.log(this.props.authStore, this.props.captchaStore);
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
          this.dealWithJwt();
        } else {
          showShort(ERROR_TITLE, this.props.authStore.fetchError);
        }
      })
      .catch(error => {
        showShort(ERROR_TITLE, this.props.authStore.fetchError);
      });
  };
  // 1. save jwt to loccalstorage; 2. load currentUser infomation 3. navigate to home screen
  dealWithJwt = () => {
    // load currentUser base information
    this.props.authStore
      .getOrgBaceInfo(this.props.authStore.jwt)
      .then(() => {
        // load currentUser information
        console.log(
          "00000000000",
          this.props.authStore.jwt,
          this.props.authStore.orgBaseInfo.id
        );
        return this.props.currentUserStore.refresh(
          this.props.authStore.jwt,
          this.props.authStore.orgBaseInfo.id
        );
      })
      .then(() => {
        console.log("000000000001");
        return saveJwt(this.props.authStore.jwt);
      })
      .then(() => {
        console.log("000000000002");
        // save currentUser to localstorage
        console.log("this.props.currentUserStore", this.props.currentUserStore);
        return setCurrentUser(this.props.currentUserStore);
      })
      .then(() => {
        // navigate to home screen
        console.log("00000000003");
        navigationReset(this.props.navigation);
      })
      .catch(error => {
        showShort("提示", JSON.stringify(error));
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
        <View style={styles.wraper}>
          <View style={styles.header}>
            <Text style={styles.login}>登录</Text>
          </View>
          <View style={styles.item}>
            <TextInput
              returnKeyType="next"
              keyboardType="phone-pad"
              autoCapitalize="none"
              placeholder="手机号"
              autoFocus={false}
              autoCorrect={false}
              style={styles.input}
              value={this.state.username}
              onChangeText={this.changeText("username")}
              underlineColorAndroid="transparent"
              placeholderTextColor="#8290a4"
            />
          </View>
          <View style={styles.item}>
            <TextInput
              placeholder="密码"
              returnKeyType="next"
              autoCapitalize="none"
              autoFocus={false}
              autoCorrect={false}
              style={styles.input}
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={this.changeText("password")}
              underlineColorAndroid="transparent"
              placeholderTextColor="#8290a4"
            />
          </View>
          <View style={styles.item}>
            <View style={styles.captchaItem}>
              <TextInput
                placeholder="验证码"
                autoCapitalize="none"
                autoFocus={false}
                autoCorrect={false}
                returnKeyType="done"
                value={this.state.captcha}
                style={styles.captchaInput}
                onChangeText={this.changeText("captcha")}
                underlineColorAndroid="transparent"
                placeholderTextColor="#8290a4"
              />
              <TouchableOpacity onPress={this.refreshCaptcha}>
                {img_url &&
                  <Image source={{ uri: img_url }} style={styles.captcha} />}
                {!img_url &&
                  <View style={styles.refreshIcon}>
                    <Icon name="refresh" size={20} />
                  </View>}
              </TouchableOpacity>
            </View>
          </View>
          <UIButton
            text="登录"
            style={styles.loginBnt}
            onPress={this.login}
            fontStyle={styles.actionText}
          />
          <View style={styles.bottom}>
            <TouchableOpacity>
              <Text style={styles.forgot}>忘记密码？</Text>
            </TouchableOpacity>
          </View>
        </View>
        <UIButton
          style={styles.signup}
          text="创建账号"
          fontStyle={styles.actionText}
          onPress={this.login}
        />
        {/*<View style={{ marginTop: 20, justifyContent: "space-between" }}>
          <Tag>
            JWT :-:
            {this.props.authStore.jwt}
          </Tag>
          <Tag>
            fetch error :-:
            {this.props.authStore.fetchError}
          </Tag>
        </View>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#364150"
  },
  wraper: {
    backgroundColor: "#eceef1",
    marginHorizontal: 30,
    paddingHorizontal: 30,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 35
  },
  header: {
    marginTop: 20,
    marginBottom: 25
  },
  login: {
    fontSize: 22,
    color: "#32c5d2",
    textAlign: "center"
  },
  item: {
    width: "100%",
    marginBottom: 15,
    borderColor: "#dde3ec",
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: "#dde3ec"
  },
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
  refreshIcon: { width: 100, alignItems: "center", justifyContent: "center" },
  captchaItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  captchaInput: {
    height: 40,
    flex: 1
  },
  loginBnt: {
    marginTop: 20,
    backgroundColor: "#32c5d2",
    borderRadius: 0,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  actionText: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center"
  },
  bottom: {
    marginTop: 10,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row"
  },
  forgot: {
    color: "#337ab7",
    fontSize: 14
  },
  signup: {
    backgroundColor: "#6c7a8d",
    borderRadius: 0,
    paddingVertical: 17,
    marginHorizontal: 30,
    paddingHorizontal: 30
  }
});
