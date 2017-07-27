/**
 * @flow
 */
import { observable, action } from "mobx";
import { get, apiUrl } from "../services";
import { api_users } from "../constants/api";
import type { UserType, Pagination } from "../types";
import { queryString } from "../utils";

type Conditions = {
  page: number
};

/**
 * 员工 用户 信息 Store
 */
class UserStore {
  @observable users: UserType[] = [];
  @observable pagination: Pagination = {};

  @action
  loadMore(
    conditions: Conditions = { page: 1 },
    jwt: ?string,
    org: ?string
  ): Promise<*> {
    return get(
      apiUrl(`${api_users}?${queryString(conditions)}`, false),
      {},
      jwt,
      org
    )
      .then(response => response.json())
      .then(data => {
        this.users = data.results;
        this.pagination = {
          page_size: data.page_size,
          page: data.page,
          total_page: data.total_page,
          total_count: data.total_count
        };
      });
  }
}

const userStore = new UserStore();
export default userStore;
export { UserStore };
