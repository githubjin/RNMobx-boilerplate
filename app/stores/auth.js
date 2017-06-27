/**
 *  登录-存储JWT
 * @flow
 */
import { observable, action } from "mobx";
import { postForm, apiUrl, clearStorage } from "../services";
import { api_login } from "../constants/api";
import SuperStore from "./SuperStore";

class AuthStore extends SuperStore {
  @observable jwt: string;

  @action
  refresh() {}

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
  logout(callback: () => {}): void {
    // clearn jwt from localstorage
    // navigate to login screen
    clearStorage((error: any) => {
      this.jwt = null;
      this.fetchError = null;
      callback();
    });
  }
}

const authStore = new AuthStore();
export default authStore;

export { AuthStore };
