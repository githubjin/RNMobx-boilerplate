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
  jwt: string = null
): Promise<Response> {
  // 由函数传入，从authStore中获取
  if (jwt) {
    let _headers = getHeaderSync(jwt);
    consoleLogFetch(url, _headers, jwt);
    return fetch(url, {
      ...init,
      headers: init.headers ? { ...init.headers, ..._headers } : _headers
    });
  }
  // 从localstorage中获取jwt
  return getHeader().then((_headers: Object) => {
    consoleLogFetch(url, _headers, jwt);
    return fetch(url, {
      ...init,
      headers: init.headers ? { ...init.headers, ..._headers } : _headers
    });
  });
}

function consoleLogFetch(url, _headers, jwt) {
  if (process.env.NODE_ENV === "development") {
    console.log(
      "jwt get from localstorage _fetch args are : ",
      url,
      _headers,
      jwt
    );
  }
}

export function get(
  url: string,
  init?: RequestInit = {},
  jwt: string = null
): Promise<Response> {
  return _fetch(url, { ...init, method: "GET" }, jwt);
}

export function post(
  url: string,
  data: Object = {},
  init?: RequestInit = {},
  jwt: string
): Promise<Response> {
  return _fetch(
    url,
    { ...init, method: "POST", body: JSON.stringify(data) },
    jwt
  );
}

export function postForm(
  url: string,
  data: Object,
  init?: RequestInit,
  jwt: string
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
    jwt
  );
}

function getHeaderSync(jwt: string): Object {
  if (jwt) {
    // let _jwt = jwt;
    // if (_.startsWith('"', _jwt)) {
    //   _jwt = _jwt.substr(1);
    // }
    // if (_.endsWith('"', _jwt)) {
    //   _jwt = _jwt.substr(0, _jwt.length - 1);
    // }
    // console.log("----------------_jwt--------------", _jwt, jwt);
    return {
      ...API_HEADER,
      Authorization:
        jwt.indexOf('"') === 0 ? jwt.substr(0, jwt.length - 1).substr(1) : jwt
    };
  } else {
    return API_HEADER;
  }
}

/**
 * 从LocalStorage获取JWT
 */
function getHeader(): Promise<any> {
  return getFromStorage(JWT_KEY).then((jwt: string) => {
    // console.log("get jwt from storage is :", jwt);
    return getHeaderSync(jwt);
  });
}
