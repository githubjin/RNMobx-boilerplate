import renderer from "react-test-renderer";

import borrowerStore, { Borrowers } from "../borrowers";

describe("borrowers store test", () => {
  it("loadmore test", () => {
    var store = new Borrowers();
    store.loadMore({}, { jwt: null, org: null }).then(() => {
      // console.log("borrowers test running", store);
      expect(store.page).toEqual(1);
      expect(store.total_count).not.toBeNaN();
      expect(store.fetchError).toBeNull();
    });
  });
});
