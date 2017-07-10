/**
 * 存取 CurrentUser to localstorage
 * @flow
 */

import { AsyncStorage } from "react-native";
import { get, set } from "./storage";
import { CURRENT_USER_KEY } from "../constants/config";

/**
 * 获取当前用户
 */
export function getCurrentUser(): Promise<any> {
  return get(CURRENT_USER_KEY).then((content: string) => {
    if (content) {
      return JSON.parse(content);
    }
    return null;
  });
}

/**
 * 存储当前登录用户信息
 * @param {Object} user 
 */
export function setCurrentUser(user: Object): Promise<any> {
  return set(CURRENT_USER_KEY, JSON.stringify(user));
}
