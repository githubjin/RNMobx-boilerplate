/**
 * App config
 * 1. server api url(dev, prop)
 */
// 开发、产品环境API URI
export const API_URL_DEV = "http://user.qgqg.me/api";
export const API_URL_PRO = "http://user.qgqg.me/api";

export const API_URL_DEV_SHOP = "http://shop.qgqg.me/api";
export const API_URL_PRO_SHOP = "http://shop.qgqg.me/api";

export const API_URL =
  process.env.NODE_ENV === "development" ? API_URL_DEV : API_URL_DEV;
// API base headers
export const API_HEADER = {
  // Accept: "application/vnd.github.v3+json"
};
// JWT key
export const JWT_KEY = "jwt_83chedai";
// CurrentUser key
export const CURRENT_USER_KEY = "current_user_u3chedai";
