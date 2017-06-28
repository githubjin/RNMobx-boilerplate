/**
 * 资产 Schema
 * @flow
 */
import { schema, normalize } from "normalizr";
const borrower = new schema.Entity("borrowers");

const vehicleSchema = new schema.Entity("vehicles", {
  borrower
});

export default vehicleSchema;
