import { get, set } from "../storage";

const KEY_TEST = "key_test";
const DATA_TEST = {
  name: "jeason",
  age: 20,
  id: 1
};

var jwtKey = "Authorization";
var jwtContent =
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjBhYWUwZGMyLWNmYzgtNDVlZC04YjVmLTAyYWQ2NjY5ZWQwZiIsIm5hbWUiOiJcdTkwZDFcdTRlMWFcdTUyYTEiLCJtb2JpbGUiOiIxMzc2MTUzNDAwMiJ9.t1_F6jxkd5XQ3V4FZrg0PPdhY-MdvKY5tMSnt9BKegE";

describe("test asyncstorage wrapper", () => {
  it("test set", () => {
    set(KEY_TEST, DATA_TEST).then(args => {
      expect(args).toBeNull();
    });
  });

  it("test get", () => {
    get(KEY_TEST).then(data => JSON.parse(data)).then(obj => {
      expect(obj).toEqual(DATA_TEST);
    });
  });

  it("set jwt to localstorage", () => {
    set(jwtKey, jwtContent).then(args => {
      expect(args).toBeNull();
    });
  });

  it("get jwt from localstorage", () => {
    get(jwtKey).then(token => {
      console.log("get jwt from storage is : ", token);
      expect(token).toEqual(jwtContent);
    });
  });
});
