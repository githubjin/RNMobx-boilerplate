/**
 * @flow
 */

import _ from "lodash";
import { API_HEADER } from "../constants/config";
import { getFromStorage } from "../services";
import { JWT_KEY } from "../constants/config";
/**
 * 添加基础 Reuest Headers
 * @param {string} url 
 * @param {RequestInit} init 
 */
export default function _fetch(
  url: string,
  init?: RequestInit = {},
  jwt: ?string = null,
  org: ?string = null
): Promise<Response> {
  // 由函数传入，从authStore中获取
  if (jwt) {
    let _headers = getHeaderSync(jwt, org);
    consoleLogFetch(url, _headers, jwt, org);
    return fetch(url, {
      ...init,
      headers: init.headers ? { ...init.headers, ..._headers } : _headers
    });
  }
  // 从localstorage中获取jwt
  return getHeader(org).then((_headers: Object) => {
    consoleLogFetch(url, _headers, jwt, org);
    return fetch(url, {
      ...init,
      headers: init.headers ? { ...init.headers, ..._headers } : _headers
    });
  });
}

function consoleLogFetch(url, _headers, jwt, org) {
  if (process.env.NODE_ENV === "development") {
    console.log(
      "console.log fetch params and headers : ",
      url,
      _headers,
      jwt,
      org
    );
  }
}

/**
 * fetch get 
 * @param {string} url 
 * @param {Object} init query init options 
 * @param {string} jwt  request header : Authorization: Bearer ${jwt}
 * @param {string} org  request header : X-Org: ${org}
 */
export function get(
  url: string,
  init?: RequestInit = {},
  jwt: ?string = null,
  org: ?string = null
): Promise<Response> {
  return _fetch(url, { ...init, method: "GET" }, jwt, org);
}

/**
 * 
 * @param {string} url 
 * @param {object} data 
 * @param {object} init 
 * @param {string} jwt 
 * @param {string} org 
 */
export function post(
  url: string,
  data: Object = {},
  init?: RequestInit = {},
  jwt: string,
  org: string
): Promise<Response> {
  return _fetch(
    url,
    { ...init, method: "POST", body: JSON.stringify(data) },
    jwt,
    org
  );
}

/**
 * fetch form post
 * @param {*} url 
 * @param {*} data 
 * @param {*} init 
 * @param {*} jwt 
 * @param {*} org 
 */
export function postForm(
  url: string,
  data: Object,
  init?: RequestInit,
  jwt: string,
  org: string
): Promise<Response> {
  var formData = new FormData();
  Object.keys(data).forEach((key, i) => {
    formData.append(key, data[key]);
  });
  return _fetch(
    url,
    {
      ...init,
      method: "POST",
      body: formData
    },
    jwt,
    org
  );
}

function getHeaderSync(jwt: ?string, org: ?string): Object {
  let init = {};
  if (org) {
    init["X-Org"] = org;
  }
  if (jwt) {
    init["Authorization"] = `Bearer ${jwt.indexOf('"') === 0
      ? jwt.substr(0, jwt.length - 1).substr(1)
      : jwt}`;
  }
  // console.log("jwt anf eaderh", jwt, init);
  return { ...API_HEADER, ...init };
}

/**
 * 从LocalStorage获取JWT
 */
function getHeader(org: ?string = null): Promise<any> {
  return getFromStorage(JWT_KEY).then((jwt: string) => {
    // console.log("get jwt from storage is :", jwt);
    return getHeaderSync(jwt, org);
  });
}
