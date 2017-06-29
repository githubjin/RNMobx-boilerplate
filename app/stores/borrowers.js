/**
 * 借款人列表信息
 * @flow
 */
import { observable, action, computed } from "mobx";
import { get, apiUrl } from "../services";
import { api_borrowers } from "../constants/api";

export type Borrower = {
  id: string,
  name: string,
  avatar: string,
  created_at: string,
  id_no: string,
  mobile: string
};

type QueryOptions = {
  // page=1&mobile=15778947894&name=%E6%81%92&from=2017-06-06&to=2017-06-06
  page: number,
  mobile?: string,
  name?: string,
  from?: string,
  to?: string
};

type AuthFields = {
  jwt: ?string,
  org: ?string
};
class Borrowers {
  @observable total_page: number;
  @observable page_size: number;
  @observable page: number;
  @observable results: Borrower[] = [];
  @observable total_count: number;

  @observable fetchError: any;

  @action
  loadMore(
    options: QueryOptions = { page: 1 },
    { jwt, org }: AuthFields
  ): Promise<any> {
    console.log("Customer loadMore is called, conditions are", options);
    return get(apiUrl(`${api_borrowers}?page=${options.page}`, false))
      .then((response: Response) => {
        return response.json();
      })
      .then((data: Object) => {
        console.log(data);
        this.total_page = data.total_page;
        this.page_size = data.page_size;
        this.page = data.page;
        this.results = data.results;
        this.total_count = data.total_count;
        // Borrower results 未处理
      })
      .catch(error => {
        this.fetchError = error;
      });
  }
}
const borrowers = new Borrowers();
export default borrowers;
export { Borrowers };
