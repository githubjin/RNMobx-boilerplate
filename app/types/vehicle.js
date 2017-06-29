/**
 * 资产 type define
 * @flow
 */
export type Borrower = {
  mobile: string,
  avatar: string,
  name: string,
  id: string,
  created_at: string,
  id_no: string
};

//  { "sim": "15000000000", "imei": "150000000001234" },
export type GpsDevices = {
  sim: string,
  imei: string
};

export type Vehicle = {
  model: string,
  production_day: string,
  color: string,
  id: string,
  borrowers: Borrower[],
  borrower: Borrower,
  type: number,
  driver_type: number,
  plate_number: string,
  displacement: string,
  engine_number: string,
  vin: string,
  shifting: number,
  created_at: string,
  series: string,
  gps_devices: GpsDevices[],
  brand: string
};

export type Vehicles = {
  result: { vehicles: string[] },
  entities: {
    vehicles: {
      [string]: Vehicle
    }
  }
};
