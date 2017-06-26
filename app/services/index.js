/**
 * @flow
 */

import _fetch, { get, post } from "./_fetch";
import { apiUrl } from "./api";
import { get as getFromStorage, set as setToStorage } from "./storage";

export { _fetch, get, post, apiUrl, getFromStorage, setToStorage };
