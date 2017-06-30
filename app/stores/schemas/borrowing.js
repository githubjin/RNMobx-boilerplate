/**
 * 业务 schema
 * @flow
 */
import { normalize, schema } from "normalizr";

const borrowing: schema.Entity = new schema.Entity("borrowings", {
  application
});

const application: schema.Entity = new schema.Entity("application");

const vehicle: schema.Entity = new schema.Entity("vehicle");

const borrower: schema.Entity = new schema.Entity("borrower");
// 社会关系
const social_net_node: schema.Entity = new schema.Entity(
  "social_net__node",
  {},
  { idAttribute: "mobile" }
);
const social_net: schema.Entity = new schema.Entity("social_net", {
  colleagues: [social_net_node],
  friends: [social_net_node],
  emergencyContacts: [social_net_node],
  relatives: [social_net_node]
});
// 资产
const property = new schema.Entity("property");
const properties = new schema.Entity("properties", {
  houseProperties: [property],
  financialAssets: [property],
  cars: [property]
});
