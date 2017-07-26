/**
 * @flow
 */
import {
  carColor,
  carType,
  shiftingType,
  driverType
} from "../constants/metaData";
import type { CarColorType, CarType } from "../constants/metaData";
import _ from "lodash";

/**
 * 根据颜色编码 确认颜色名称
 * @param {number} id 
 */
export function getColorByColorId(id: number): CarColorType {
  let findedColor = _.find(carColor, color => {
    return color.value == id;
  });
  // console.log(` get color by id ${id} - ${JSON.stringify(findedColor)}`);
  return findedColor;
}

/**
 * 根据车子类型编码，查找对应车类信息
 * @param {number} typeId 
 */

export function getCarTypeById(typeId: number): CarType {
  let findedCarType = _.find(carType, type => {
    return type.value == typeId;
  });
  return findedCarType;
}

//
// 驾驶方式
export function getShiftingTypeBy(id: number): CarType {
  return _.find(shiftingType, shifting => {
    return shifting.value == id;
  });
}
// 汽车驱动类型:四驱
export function getDriverTypeBy(id: number): CarType {
  return _.find(driverType, driver => {
    return driver.value == id;
  });
}
