/**
 * @flow
 */
import { Dimensions } from "react-native";
const window = Dimensions.get("window");

/**
 * Scale dimension to reference value by taking in consideration actual reference value.
 * For example, element should be 50px wide on screen wide 375px. If screen actual size is wider
 * then planned everything is going to be scaled up and vice versa.
 * @param dimension - wanted value for reference
 * @param originalRefVal - wanted value reference
 * @param actualRefVal - actual reference value
 * @returns {number}
 */
export default function getSizeRelativeToReference(
  dimension,
  originalRefVal,
  actualRefVal
) {
  return dimension / originalRefVal * actualRefVal;
}

/**
 * 
 * @param {number} dimension 组件长、宽
 * @param {number} actualRefVal 设备实际逻辑像素 宽度
 * originalRefVal： 默认 iphone 6 逻辑像素宽
 */
export function dimensionRelativeToIphone(
  dimension,
  actualRefVal = window.width
) {
  // 375 is iPhone width
  return getSizeRelativeToReference(dimension, 375, actualRefVal);
}
