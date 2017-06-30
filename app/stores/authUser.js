/**
 *  登录-存储JWT
 * @flow
 */
import { observable, action } from "mobx";
import { postForm, apiUrl, clearStorage, get } from "../services";
import { api_login } from "../constants/api";
import SuperStore from "./SuperStore";

// class AuthStore extends SuperStore {
class AuthStore {
  constructor() {
    this.jwt = null;
    this.fetchError = null;
  }

  @observable jwt: ?string;
  @observable fetchError: ?any;
  @observable
  orgBaseInfo: {
    address: string,
    id: string,
    name: string,
    phone: string,
    short_name: string
  };

  // @action
  // refresh() {}

  @action
  setJwt(jwt: string): AuthStore {
    this.jwt = jwt;
    return this;
  }

  @action
  login(
    mobile: string,
    password: string,
    captcha_key: string,
    captcha_code: string
  ) {
    return postForm(apiUrl(api_login), {
      mobile,
      password,
      captcha_key,
      captcha_code
    })
      .then((response: Response) => response.json())
      .then(data => {
        this.jwt = data.jwt;
        this.fetchError = null;
        // console.log("login success : ", data);
      })
      .catch(({ error: { message } } = { error: { message: "" } }) => {
        this.fetchError = message;
        this.jwt = null;
        // console.log("login error : ", error);
      });
  }

  @action
  getOrgBaceInfo(jwt: string): Promise<any> {
    return get(apiUrl("auth/jwt", false), {}, jwt)
      .then(response => response.json())
      .then(data => {
        this.orgBaseInfo = data.results[0];
        console.log("get org base information : ", data);
      });
  }

  @action
  logout(): Promise<any> {
    // clearn jwt from localstorage
    // navigate to login screen
    return clearStorage()
      .then(() => {
        this.jwt = null;
        this.fetchError = null;
      })
      .catch(error => {
        this.jwt = null;
        this.fetchError = error;
      });
  }

  static store: AuthStore;
  static getInstance(): AuthStore {
    if (!AuthStore.store) {
      AuthStore.store = new AuthStore();
      return AuthStore.store;
    }
    return AuthStore.store;
  }
}

const _authStore = new AuthStore();
// const _authStore = AuthStore.getInstance();
// console.log("_authStore is  now : ", _authStore);
export { AuthStore };
export default _authStore;
