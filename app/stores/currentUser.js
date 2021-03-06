/**
 * 登录的当前用户
 * @flow
 */

import { observable, action } from "mobx";
import _ from "lodash";
import { apiUrl, _fetch, get, getCurrentUser } from "../services";
import { api_current_user } from "../constants/api";
import SuperStore from "./SuperStore";
import {
  menus,
  checkValidMenu,
  findMenuBy,
  ROLE_SUPER_ADMIN,
  ROLE_LOGINED
} from "../config/menus";
import type { MenuType } from "../config/menus";

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

  @observable permissonRoles: MenuType[] = [];

  /**
   * 获取当前用户信息
   * @param {string} jwt 
   * @param {string} org 
   */
  @action
  refresh(jwt: string, org: string): Promise<any> {
    return get(apiUrl(api_current_user, false), {}, jwt, org)
      .then((response: Response) => response.json())
      .then(data => {
        // console.log("current user and shop information : ", data);
        if (data) {
          this.copyFields(data);
        }
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
    this.pickPermissions(_data);
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

  // 获取权限列表
  pickPermissions(data: Object): MenuType[] {
    let roles: Object[] = _.result(data, "shopuser.roles");
    let permissonRoles = [];
    permissonRoles.push(findMenuBy(ROLE_LOGINED));
    if (data.is_admin) {
      permissonRoles.push(findMenuBy(ROLE_SUPER_ADMIN));
    }
    _(roles).forEach(role => {
      _(role.permissions).forEach(permission => {
        let menu: MenuType[] = findMenuBy(permission.code);
        if (menu) {
          permissonRoles.push(menu);
        }
      });
    });
    this.permissonRoles = _.uniqWith(permissonRoles, _.isEqual);
  }
}

const currentUser = new CurrentUser();
export default currentUser;
export { CurrentUser };
