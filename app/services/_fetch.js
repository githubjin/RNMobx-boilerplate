/**
 * @flow
 */ import _ from "lodash";
import { API_HEADER } from "../constants/config";
/**
 * 添加基础 Reuest Headers
 * @param {string} url 
 * @param {RequestInit} init 
 */
export default function _fetch(
  url: string,
  init?: RequestInit = {}
): Promise<Response> {
  return fetch(url, {
    ...init,
    headers: init.headers ? { ...init.headers, ...API_HEADER } : API_HEADER
  });
}

export function get(url: string, init?: RequestInit = {}): Promise<Response> {
  return _fetch(url, { ...init, method: "GET" });
}

export function post(
  url: string,
  data: Object = {},
  init?: RequestInit = {}
): Promise<Response> {
  if (process.env.NODE_ENV === "development") {
    console.log("post args are : ", url, data, init);
  }
  return _fetch(url, { ...init, method: "POST", body: JSON.stringify(data) });
}

export function postForm(
  url: string,
  data: Object,
  init?: RequestInit
): Promise<Response> {
  var formData = new FormData();
  Object.keys(data).forEach((key, i) => {
    formData.append(key, data[key]);
  });
  return _fetch(url, {
    ...init,
    method: "POST",
    body: formData
  });
}
