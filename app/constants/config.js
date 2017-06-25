/**
 * App config
 * 1. server api url(dev, prop)
 */
// 开发、产品环境API URI
export const API_URL_DEV = "https://api.github.com";
export const API_URL_PRO = "https://api.github.com";
// API base headers
export const API_HEADER = new Headers({
  Accept: "application/vnd.github.v3+json"
});
