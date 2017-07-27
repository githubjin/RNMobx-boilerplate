/**
 * @flow
 */
export type AppointmentType = {
  "name": string,
  "mobile": string,
  "remark": string,
  "amount": number,
  "term": number,
  "term_unit": number,
  "status": number,
  "shop": {
    "id": string,
    "name": string
  },
  "id": string,
  "history": Object[]
};
