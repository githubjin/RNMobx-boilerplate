/**
 * @flow
 */
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

export function post(url: string, init?: RequestInit = {}): Promise<Response> {
  return _fetch(url, { ...init, method: "POST" });
}
