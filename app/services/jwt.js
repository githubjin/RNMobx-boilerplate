/**
 * 往 AsyncStorage 存取 JWT
 * @flow
 */
import { setToStorage, getFromStorage, removeItem } from "../services";
import { JWT_KEY } from "../constants/config";

export function getJwt(callback: (error: any, jwt?: string) => void): void {
  getFromStorage(JWT_KEY)
    .then((jwt: string) => {
      callback(null, jwt);
    })
    .catch(error => {
      callback(error);
    });
}

export function saveJwt(jwt: string): Promise<any> {
  return setToStorage(JWT_KEY, jwt);
}

export function clearJwt(callback: (error: any) => void): void {
  removeItem(JWT_KEY)
    .then(() => {
      callback(null);
    })
    .catch(error => {
      callback(error);
    });
}
