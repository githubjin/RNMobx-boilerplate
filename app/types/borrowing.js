/**
 * 
 * @flow
 */

import type { Vehicle } from "./vehicle";

/**
  * 资产
  */
export type Property = {
  monthlyPay: string,
  buyingDate: string,
  brand: string,
  amount: string,
  field: string,
  desc: string,
  address: string,
  area: string,
  status: string
};
/**
 * relationship
 */
export type RelationShip = {
  mobile: string,
  name: string,
  relation: string,
  company: string
};

/**
 * 借款人
 */
export type Borrower = {
  mobile: string,
  name: string,
  avatar: string,
  id: string,
  created_at: string,
  id_no: string
};

/**
 * 业务 主体 application
 */
export type BorrowingApplication = {
  vehicle: Vehicle,
  social_net: {
    [string]: RelationShip[]
  },
  property: {
    [string]: Property[]
  },
  borrower: Borrower,
  // fields
  term_unit: number,
  education: number,
  salary: number,
  amount: number,
  term: number,
  department: string,
  id: string,
  created_at: string,
  nation: string,
  is_native: boolean,
  marital_status: boolean,
  work_years: number,
  telephone: string,
  phone_review_status: number,
  salary_type: number,
  birthplace_city: string,
  auto_review_status: number,
  other_incoming: number,
  share: number,
  position: string,
  city: string,
  birthplace_address: string,
  company_name: string,
  company_phone: string,
  birthplace_province: string,
  address: string,
  company_type: number,
  is_mate_native: boolean,
  finance_phone: string,
  province: string,
  borrowing_type: number,
  purpose: number
};
