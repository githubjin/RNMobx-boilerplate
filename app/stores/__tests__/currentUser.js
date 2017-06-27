import { CurrentUser } from "../currentUser";

test("CurrentUser store test", () => {
  var store = new CurrentUser();
  store.refresh().then(() => {
    expect(store.avatar).not.toBeNull();
    expect(store.fetchError).toBeNull();
    expect(store.created_at).not.toBeNull();
  });
});
