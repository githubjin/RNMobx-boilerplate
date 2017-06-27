/**
 * Mobx Store 共有的一些字段， 用于继承
 * @flow
 */
import { observable } from "mobx";
export default class SuperStore {
  @observable fetchError: any;
}
