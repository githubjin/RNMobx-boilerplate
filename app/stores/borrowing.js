/**
 *  借款详情
 * @flow
 */

import React, { Component } from "react";
import { observable, action } from "mobx";

import type { Borrowing as BorrowingType } from "../types";
import { get, apiUrl } from "../services";
import { api_borrowing } from "../constants/api";

class BorrowingStore {
  @observable borrowing: BorrowingType = {};

  @action
  loadBy(id: string, jwt: string, org: string): Promise<any> {
    return get(apiUrl(api_borrowing, false), {}, jwt, org)
      .then(response => response.json())
      .then(data => {
        this.borrowing = data;
      });
  }
}

const borrowingStore = new BorrowingStore();
export default borrowingStore;
export { BorrowingStore };
