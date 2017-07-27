/**
 * 
 * @flow
 */

import type { Vehicle } from ./vehicle;

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

export type Picture = {
  source_link: string,
  filename: string,
  rotate: number,
  key: string,
  size: number
};

export type Fee = {
  violation_deposit_fee: { value: string },
  gps_deposit_fee: { value: string },
  parking_fee: { value: string },
  evaluation_fee: { value: string },
  risk_deposit_fee: { value: string },
  other_fee: { value: string, name: string },
  agency_fee: { value: string },
  gps_fee: { value: string }
};

export type Borrowing = {
  renew_chain: string,
  title: string,
  contract_pics: Picture[],
  prev_billing_date: string,
  salesman_id: string,
  term: number,
  term_unit: number,
  amount: string,
  cover_pic: Picture[],
  no: number,
  application:  BorrowingApplication,
  supporting_pics: Picture[],
  last_billing_date: string,
  violation_records: Picture[],
  apply_pics: Picture[],
  loan_id: string,
  repay_type: number,
  fees: Fee,
  call_records: Picture[],
  next_billing_date: string,
  created_at: string,
  interest_rate: string,
  status: number,
  id: string,
  repay_schema: Array<*>,
  type: number,
  start_billing_date: string
};