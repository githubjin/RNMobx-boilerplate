/**
 * @flow
 */
import _ from "lodash/object";
export default function queryString(conditions: Object = {}): string {
  return _.keys(conditions).reduce((params: string, nextParam: string) => {
    return `${params}${params ? "&" : ""}${nextParam}=${conditions[nextParam]}`;
  });
}
