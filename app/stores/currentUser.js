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

class CurrentUser extends SuperStore {
  @observable email: string;
  @observable avatar: string;
  @observable created_at: string;
  @observable mobile: string;
  @observable is_admin: boolean;
  @observable id: string;
  @observable status: number;
  @observable roles: Role[];

  @action
  refresh(jwt: string) {
    return get(apiUrl(api_current_user, false), {}, jwt)
      .then((response: Response) => response.json())
      .then(data => {
        this.email = data.email;
        this.avatar = data.avatar;
        this.created_at = data.created_at;
        this.mobile = data.mobile;
        this.is_admin = data.is_admin;
        this.id = data.id;
        this.status = data.status;
        this.roles = data.roles;
      })
      .catch(error => {
        this.fetchError = error;
      });
  }
}
const currentUser = new CurrentUser();
export default currentUser;
export { CurrentUser };
