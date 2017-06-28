/**
 * 业务 schema
 * @flow
 */
import { normalize, schema } from "normalizr";

const borrowing: schema.Entity = new schema.Entity("borrowings");

const application: schema.Entity = new schema.Entity("application");

const vehicle: schema.Entity = new schema.Entity("vehicle");

const borrower: schema.Entity = new schema.Entity("borrower");

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

const property_item = new schema.Entity("property_item");
