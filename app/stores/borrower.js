/**
 * 借款人详细信息
 * @flow
 */
import { observable, action } from "mobx";
import { normalize } from "normalizr";

import { get, apiUrl } from "../services";
import { api_borrower_info, api_borrower_vehicles } from "../constants/api";
import type {
  ErrorMessage,
  Vehicles as VehiclesType,
  Vehicles
} from "../types";
import vehicleSchema from "./schemas/vehicle";

type BorrowerInfo = {
  mobile: string,
  name: string,
  avatar: string,
  id: string,
  created_at: string,
  id_no: string
};

class BorrowerStore {
  @observable mobile: string;
  @observable name: string;
  @observable avatar: string;
  @observable id: string;
  @observable created_at: string;
  @observable id_no: string;
  @observable vehicles: Vehicles;

  @action
  loadBorrower(borrowerId: string, jwt?: string, org?: string): Promise<any> {
    return get(
      apiUrl(api_borrower_info.replace(":id", borrowerId), false),
      {},
      jwt,
      org
    )
      .then((response: Response) => response.json())
      .then((data: BorrowerInfo) => {
        this.mobile = data.mobile;
        this.name = data.name;
        this.avatar = data.avatar;
        this.id = data.id;
        this.created_at = data.created_at;
        this.id_no = data.id_no;
      });
  }

  @action
  loadVehicles(borrowerId: string, jwt?: string, org?: string): Promise<any> {
    return get(
      apiUrl(api_borrower_vehicles.replace(":id", borrowerId), false),
      {},
      jwt,
      org
    )
      .then((response: Response) => response.json())
      .then((data: { results: VehiclesType[] }) => {
        console.log(`borrower ${borrowerId}'s vehicles are : `, data);
        this.vehicles = normalize(data.results, vehicleSchema);
      });
  }
}

const borrowerStore = new BorrowerStore();
export default borrowerStore;
export { BorrowerStore };
