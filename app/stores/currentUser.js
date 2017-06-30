/**
 * 登录的当前用户
 * @flow
 */

import { observable, action } from "mobx";
import { apiUrl, _fetch, get } from "../services";
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
        console.log("current user and shop information : ", data);
        this.email = data.email;
        this.avatar = data.avatar;
        this.created_at = data.created_at;
        this.mobile = data.mobile;
        this.is_admin = data.is_admin;
        this.id = data.id;
        this.status = data.status;
        // this.roles = data.roles;
        this.shopuser = data.shopuser;
      });
  }
}
const currentUser = new CurrentUser();
export default currentUser;
export { CurrentUser };
