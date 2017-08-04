/**
 * @flow
 */
import {} from "mobx";
import { post, apiUrl } from "../services";
import {
  api_user_bind_borrower,
  api_real_name,
  api_borrowers_binding
} from "../constants/api";

type Borrower = {
  name: string,
  mobile: string,
  email: string
};
// 新增借款人
export function addBorrower(
  borrower: Borrower,
  jwt: string,
  org: string
): Promise<*> {
  return post(apiUrl(api_user_bind_borrower, false), borrower, {}, jwt, org)
    .then(response => response.json())
    .then((data: UserBindBorrowerResponse) => {
      return data;
    });
}

/**
 * 实名认证
 * @param {*} realName 
 * @param {*} jwt 
 * @param {*} org 
 */
export function realName(
  realName: RealName,
  jwt: string,
  org: string
): Promise<*> {
  return post(apiUrl(api_real_name, false), realName, {}, jwt, org)
    .then(response => response.json())
    .then(data => {
      //
    });
}
/**
 * 借款人绑定
 * @param {*} id_no 
 * @param {*} jwt 
 * @param {*} org 
 */
export function borrowerBinding(
  id_no: string,
  jwt: string,
  org: string
): Promise<*> {
  return post(apiUrl(api_borrowers_binding, false), { id_no }, {}, jwt, org)
    .then(response => response.json())
    .then(data => {
      //
    });
}

type UserBindBorrowerResponse = {
  name: string,
  avatar: string,
  need_reset_password: boolean,
  created_at: string,
  id_no: string,
  mobile: string,
  email: string,
  id: string,
  is_active: boolean
};

type RealName = {
  name: string,
  mobile: string,
  id_no: string
};
