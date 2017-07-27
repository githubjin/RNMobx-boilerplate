/**
 * @flow
 */
import { observable, action } from "mobx";

import type { AccountType } from "../types";
import { get, apiUrl } from "../services";
import { api_account } from "../constants/api";

/**
 * 用户帐号信息 Store
 */
class AccountStore {
  @observable account: AccountType = {};
  @observable refreshing: boolean = false;

  @action
  getAccountInfo(org: string, jwt?: string): Promise<*> {
    this.refreshing = true;
    return get(apiUrl(api_account.replace(":id", org), false))
      .then(response => response.json())
      .then(data => {
        this.account = data;
        this.refreshing = false;
      });
  }
}

export { AccountStore };
const accountStore = new AccountStore();
export default accountStore;
