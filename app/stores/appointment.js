/**
 * @flow
 */

import { observable, action } from "mobx";

import type { AppointmentType, Pagination } from "../types";
import { get, apiUrl } from "../services";
import { api_appointments } from "../constants/api";
import { queryString } from "../utils";

type Conditioins = {
  page: number
};

/**
 * 预约信息 Store
 */
class AppointmentStore {
  @observable appointments: AppointmentType[] = [];
  @observable pagination: Pagination = {};

  @action
  loadMore(
    conditions: Conditioins = { page: 1 },
    jwt: ?string,
    org: ?string
  ): Promise<*> {
    return get(
      apiUrl(`${api_appointments}?${queryString(conditions)}`, false),
      {},
      jwt,
      org
    )
      .then(response => response.json())
      .then(data => {
        this.appointments = data.result;
        this.pagination = {
          page_size: data.page_size,
          page: data.page,
          total_page: data.total_page,
          total_count: data.total_count
        };
      });
  }
}

const appointmentStore = new AppointmentStore();
export default appointmentStore;
export { AppointmentStore };
