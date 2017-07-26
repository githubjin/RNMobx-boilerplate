/**
 * 资产 Schema
 * @flow
 */
import { schema, normalize } from "normalizr";
const user = new schema.Entity("borrower");
const gps = new schema.Entity("gps");

const vehicleSchema = new schema.Entity("vehicles", {
  borrower: user,
  gps_devices: [gps]
});

export default [vehicleSchema];
