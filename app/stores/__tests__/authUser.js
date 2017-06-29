import { AuthStore } from "../authUser";

test("AuthStore work well", () => {
  it("AuthStore", () => {
    var store = new AuthStore();
    expect(store.jwt).toBeNull;
  });
});
