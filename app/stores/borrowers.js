/**
 * 借款人列表信息
 * @flow
 */
import { observable, action, computed } from "mobx";
import { get, apiUrl } from "../services";
import { api_borrowers } from "../constants/api";

type Borrower = {
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
  mobile: string,
  name: string,
  form: string,
  to: string
};

class Borrowers {
  @observable total_page: number;
  @observable page_size: number;
  @observable page: number;
  @observable results: Borrower[] = [];
  @observable total_count: number;

  @observable fetchError: any;

  @action
  loadMore(options: QueryOptions = { page: 1 }, page: number = 1): void {
    return get(apiUrl(`api_borrowers?page=${page}`))
      .then((response: Response) => {
        return response.json();
      })
      .then(data => {
        // console.log(data);
        this.total_page = data.total_page;
        this.page_size = data.page_size;
        this.page = data.page;
        this.results = data.results;
        this.total_count = data.total_count;
      })
      .catch(error => {
        this.fetchError = error;
      });
  }
}
const borrowers = new Borrowers();
export default borrowers;
export { Borrowers };
