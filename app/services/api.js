/**
 * @flow
 */

import { API_HEADER, API_URL_DEV, API_URL_PRO } from "../constants/config";

/**
 * 返回API root url
 */
function rootUrl() {
  return process.env.NODE_ENV === "development" ? API_URL_DEV : API_URL_PRO;
}

/**
 * 获取完整API url 
 * @param {*} url pathname
 */
export function apiUrl(url: string) {
  return `${rootUrl()}/${url}`;
}
