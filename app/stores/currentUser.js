/**
 * 登录的当前用户
 * @flow
 */

import { observable, action } from "mobx";
import { apiUrl, _fetch, get, getCurrentUser } from "../services";
import { api_current_user } from "../constants/api";
import SuperStore from "./SuperStore";

type Permission = {
  name: string,
  code: string,
  id: number
};
type Role = {
  id: number,
  name: string,
  permissions: Permission[]
};

type ShopUser = {
  shop: {
    address: string,
    short_name: string,
    id: string, // X-ORG
    phone: string,
    name: string
  },
  roles: Role[],
  status: number
};

class CurrentUser extends SuperStore {
  @observable email: string;
  @observable avatar: string;
  @observable created_at: string;
  @observable mobile: string;
  @observable is_admin: boolean;
  @observable id: string;
  @observable status: number;
  // @observable roles: Role[];
  @observable shopuser: ShopUser = {};

  @action
  refresh(jwt: string, org: string): Promise<any> {
    return get(apiUrl(api_current_user, false), {}, jwt, org)
      .then((response: Response) => response.json())
      .then(data => {
        // console.log("current user and shop information : ", data);
        this.copyFields(data);
      });
  }

  @action
  loadFromLocalstorage(): Promise<any> {
    return getCurrentUser().then((user: Object) => {
      // console.log("------loadFromLocalstorage--", user);
      if (user) {
        this.copyFields(user);
      }
    });
  }

  copyFields(data: Object | string) {
    let _data;
    if (typeof data === "string") {
      _data = JSON.parse(data);
    } else {
      _data = data;
    }
    this.email = _data.email;
    this.avatar = _data.avatar;
    this.created_at = _data.created_at;
    this.mobile = _data.mobile;
    this.is_admin = _data.is_admin;
    this.id = _data.id;
    this.status = _data.status;
    // this.roles = _data.roles;
    this.shopuser = _data.shopuser;
    // console.log("------loadFromLocalstorage.usershop--", this.shopuser);
  }
}

const currentUser = new CurrentUser();
export default currentUser;
export { CurrentUser };
