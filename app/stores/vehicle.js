/**
 * 车辆信息
 * @flow
 */
import { observable, action } from "mobx";
import _ from "lodash/object";
import { api_vehicle } from "../constants/api";
import { get, apiUrl } from "../services";
import type { Vehicle as VehicleType, Borrower, GpsDevices } from "../types";

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
  @observable borrower: Borrower;
  @observable gps_devices: GpsDevices[];

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
        // console.log(data);
        this.model = data.model;
        this.production_day = data.production_day;
        this.color = data.color;
        this.id = data.id;
        this.type = data.type;
        this.driver_type = data.driver_type;
        this.plate_number = data.plate_number;
        this.displacement = data.displacement;
        this.engine_number = data.engine_number;
        this.vin = data.vin;
        this.shifting = data.shifting;
        this.created_at = data.created_at;
        this.series = data.series;
        this.brand = data.brand;
        this.borrower = data.borrower;
        this.gps_devices = data.gps_devices;
      });
  }
}

const vehicle = new Vehicle();
export default vehicle;
export { Vehicle };
