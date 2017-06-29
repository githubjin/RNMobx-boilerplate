/**
 * 车辆信息
 * @flow
 */
import { observable, action } from "mobx";
import { api_vehicle } from "../constants/api";
import { get, apiUrl } from "../services";
import type { Vehicle as VehicleType } from "../types";

class Vehicle {
  @observable model: string;
  @observable production_day: string;
  @observable color: string;
  @observable id: string;
  @observable type: number;
  @observable driver_type: number;
  @observable plate_number: string;
  @observable displacement: string;
  @observable engine_number: string;
  @observable vin: string;
  @observable shifting: number;
  @observable created_at: string;
  @observable series: string;
  @observable brand: string;
  @observable borrower: Object;
  @observable gps_devices: Object[];

  @action
  load(vehicleId: string, jwt?: string, org?: string): Promise<any> {
    return get(
      apiUrl(api_vehicle.replace(":id", vehicleId), false),
      {},
      jwt,
      org
    )
      .then((response: Response) => response.json())
      .then((data: VehicleType) => {
        console.log(data);
      });
  }
}

const vehicle = new Vehicle();
export default vehicle;
export { Vehicle };
