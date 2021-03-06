/**
 * 业务 demo store
 * @flow
 */
// http://shop.qgqg.me/api/borrowings?page=1&no=164628010&name=%E4%B9%8C%E6%81%92&type=0
// &amount=121313131&term=5&term_unit=1&from=2017-05-01&to=2017-05-31&status=1
import { observable, action } from "mobx";
import { get, apiUrl } from "../services";
import { queryString } from "../utils";
import SuperStore from "./SuperStore";
import { api_borrowings } from "../constants/api";

import type { Pagination, Borrowing } from "../types";

type Condition = {
  page: number,
  no?: number,
  name?: string,
  type?: number,
  amount?: number,
  term?: number,
  term_unit?: number,
  from?: string,
  to?: string,
  status?: number
};
// Warn : 业务数据schema 没有细化
class Borrowings extends SuperStore {
  @observable pagination: ?Pagination = {};
  @observable borrowings: Borrowing[] = [];

  @action
  loadMore(
    conditions: Condition = { page: 1 },
    jwt?: string,
    org?: string
  ): Promise<*> {
    return get(
      apiUrl(`${api_borrowings}?${queryString(conditions)}`, false),
      {},
      jwt,
      org
    )
      .then((response: Response) => response.json())
      .then(data => {
        this.pagination = {
          page: data.page,
          total_page: data.total_page,
          total_count: data.total_count,
          page_size: data.page_size
        };
        this.borrowings = data.results;
      });
  }

  /**
   * action for pre borrowing dec - 
   */
  @action
  loadBorrowingBy(id: string, jwt: string, org: string): Promise<any> {
    return get(apiUrl(`${api_borrowing}/${id}`, false), {}, jwt, org)
      .then(response => response.json())
      .then(data => {
        this.borrowing = data;
      });
  }
}

const borrowingsStore = new Borrowings();
export default borrowingsStore;
export { Borrowings };
