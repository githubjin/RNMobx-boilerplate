/**
 * @flow
 * 简单封装AsyncLocalStorage
 */

import { AsyncStorage } from "react-native";

export function get(itemName: string): Promise<any> {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(itemName, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

export function set(itemName: string, data: any): Promise<any> {
  return new Promise((resolve, reject) => {
    AsyncStorage.setItem(itemName, JSON.stringify(data), error => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

/**
 * 清理某个字段信息
 * @param {string} itemName 
 */
export function removeItem(itemName: string): Promise<any> {
  return new Promise((resolve, reject) => {
    AsyncStorage.removeItem(itemName, error => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

export function clear(): Promise<any> {
  return new Promise((resolve, reject) => {
    AsyncStorage.clear(error => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
