import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { observable } from "mobx";
import { observer, inject } from "mobx-react/native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { Button, Tag } from "antd-mobile";
import { AuthStore } from "../../stores/authUser";
import { Captcha } from "../../stores/captcha";
import { CurrentUser } from "../../stores/currentUser";
import { showShort, normalize } from "../../utils";
import { ERROR_TITLE } from "../../constants/messages";
import * as COLORS from "../../constants/colors";
import {
  saveJwt,
  navigationReset,
  setCurrentUser,
  clearStorage
} from "../../services";
import UIButton from "../lib/Button";

const InputItem = ({
  returnKeyType = "next",
  keyboardType = null,
  placeholder,
  style = styles.input,
  value,
  changeText,
  onFocusHandler,
  onBlurHandler,
  secureTextEntry = false
}) => {
  return (
    <View style={styles.item}>
      <TextInput
        returnKeyType={returnKeyType}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
        placeholder={placeholder}
        autoFocus={false}
        autoCorrect={false}
        style={style}
        value={value}
        onChangeText={changeText}
        underlineColorAndroid="transparent"
        placeholderTextColor="#8290a4"
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
      />
    </View>
  );
};

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
    captcha: string,
    fetching: boolean
  };
  constructor(props) {
    super(props);
    this.state = {
      username: "15200000009",
      password: "123123123",
      captcha: "",
      fetching: false,
      focuesInput: null
    };
    // clearStorage();
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
  toggleFetching = (b: boolean) => {
    this.setState({
      fetching: !this.state.fetching
    });
  };
  login = () => {
    this.toggleFetching();
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
          this.toggleFetching();
          showShort(ERROR_TITLE, this.props.authStore.fetchError);
        }
      })
      .catch(error => {
        this.toggleFetching();
        showShort(ERROR_TITLE, this.props.authStore.fetchError);
      });
  };
  // 1. save jwt to loccalstorage; 2. load currentUser infomation 3. navigate to home screen
  dealWithJwt = () => {
    // load currentUser base information
    this.props.authStore
      .getOrgBaceInfo(this.props.authStore.jwt)
      .catch(error => {
        console.log("get org base info error : ", error);
        this.toggleFetching();
        showErrorInfo(error);
      })
      .then(() => {
        // load currentUser information
        return this.props.currentUserStore.refresh(
          this.props.authStore.jwt,
          this.props.authStore.orgBaseInfo.id
        );
      })
      .catch(error => {
        console.log("get current user info error : ", error);
        this.toggleFetching();
        showErrorInfo(error);
      })
      .then(() => {
        // save currentUser to localstorage
        console.log(
          "this.props.currentUserStore",
          this.props.currentUserStore,
          this.props.currentUserStore.id,
          this.props.currentUserStore.mobile
        );
        return Promise.all([
          saveJwt(this.props.authStore.jwt),
          setCurrentUser(this.props.currentUserStore)
        ]);
      })
      .catch(error => {
        console.log("save jwt and currentUser error : ", error);
        this.toggleFetching();
        showErrorInfo(error);
      })
      .then(() => {
        // navigate to home screen
        this.toggleFetching();
        navigationReset(this.props.navigation);
      })
      .catch(error => {
        this.toggleFetching();
        showErrorInfo(error);
      });
  };
  showErrorInfo = (error: any): void => {
    showShort(ERROR_TITLE, JSON.stringify(error));
  };
  changeText = (field: string): ((text: string) => void) => {
    return (text: string) => {
      let obj = {};
      obj[field] = text;
      this.setState(obj);
    };
  };
  onFocusHandler = (key: string) => {
    return () => {
      this.setState({
        focuesInput: key
      });
    };
  };
  onBlurHandler = (key: string) => {
    return () => {
      if (key === this.state.focuesInput) {
        this.setState({ focuesInput: null });
      }
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
          <InputItem
            keyboardType="phone-pad"
            placeholder="手机号"
            value={this.state.username}
            changeText={this.changeText("username")}
            onFocusHandler={this.onFocusHandler("phone")}
            onBlurHandler={this.onBlurHandler("phone")}
          />
          <InputItem
            placeholder="密码"
            secureTextEntry={true}
            value={this.state.password}
            changeText={this.changeText("password")}
            onFocusHandler={this.onFocusHandler("password")}
            onBlurHandler={this.onBlurHandler("password")}
          />
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
                onFocus={this.onFocusHandler("captcha")}
                onBlur={this.onBlurHandler("captcha")}
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
            disabled={this.state.fetching}
            text="登录"
            leftIcon={
              this.state.fetching ? <ActivityIndicator size={20} /> : null
            }
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
    // backgroundColor: "#364150"
    backgroundColor: COLORS.LOGIN_BACKGROUND_COLOR
  },
  wraper: {
    // backgroundColor: "#eceef1",
    backgroundColor: COLORS.LOGIN_WINDOW_BACKGROUND,
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
    // color: "#32c5d2",
    color: COLORS.LOGIN_PRIMARY,
    textAlign: "center"
  },
  item: {
    width: "100%",
    marginBottom: 15,
    borderColor: "#dde3ec",
    // borderColor: COLORS.LOGIN_INPUT_ACTIVE_BORDER_COLOR,
    borderWidth: 1,
    borderStyle: "solid",
    // backgroundColor: "#dde3ec"
    backgroundColor: COLORS.LOGIN_INPUT_BACKGROUND
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
    height: 44
  },
  refreshIcon: { width: 100, alignItems: "center", justifyContent: "center" },
  captchaItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  captchaInput: {
    height: 42,
    flex: 1
  },
  loginBnt: {
    marginTop: 20,
    // backgroundColor: "#53cac3",
    backgroundColor: COLORS.LOGIN_PRIMARY,
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
    // color: "#337ab7",
    color: COLORS.LOGIN_FORGET,
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
