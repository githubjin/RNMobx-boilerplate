/**
 * @flow
 */

import {
  API_HEADER,
  API_URL_DEV,
  API_URL_PRO,
  API_URL_DEV_SHOP,
  API_URL_PRO_SHOP
} from "../constants/config";

/**
 * 返回API root url
 * @param {boolean} userApi true: 使用 user api; false: 使用 shop api;
 */
function rootUrl(userApi: boolean) {
  if (userApi) {
    return process.env.NODE_ENV === "development" ? API_URL_DEV : API_URL_PRO;
  }
  return process.env.NODE_ENV === "development"
    ? API_URL_DEV_SHOP
    : API_URL_PRO_SHOP;
}

/**
 * 获取完整API url 
 * @param {string  } url api url pathname
 * @param {boolean } userApi  true: 使用 user api; false: 使用 shop api;
 */
export function apiUrl(url: string, userApi: boolean = true) {
  return `${rootUrl(userApi)}/${url}`;
}
