/**
 * 资产 domain store
 * @flow
 */

import { observable, action } from "mobx";
import { normalize } from "normalizr";

import vehicleSchema from "./schemas/vehicle";

import type { Pagination, Vehicles as VehiclesType } from "../types";
import { get, apiUrl } from "../services";
import { api_vehicles } from "../constants/api";
import { queryString } from "../utils";
import SuperStore from "./SuperStore";

type Conditions = {
  page: number,
  name?: string,
  from?: string,
  to?: string
};

class Vehicles extends SuperStore {
  @observable pagination: Pagination;
  @observable results: VehiclesType;

  // http://shop.qgqg.me/api/vehicles?page=1&name=VehiclesType&from=2017-05-30&to=2017-05-30
  @action
  loadmore(conditions: Conditions = { page: 1 }) {
    get(apiUrl(`${api_vehicles}?${queryString(conditions)}`))
      .then((response: Response) => response.json())
      .then((data: Object) => {
        this.pagination = {
          page: data.page,
          page_size: data.page_size,
          total_count: data.total_count,
          total_page: data.total_page
        };
        this.results = normalize(data.results, vehicleSchema);
      })
      .catch(error => {
        this.fetchError = error;
      });
  }
}
