import { apiUrl } from "../api";
import { API_URL_DEV } from "../../constants/config";

test("get complete api url by pathname", () => {
  expect(apiUrl("test")).toBe(`${API_URL_DEV}/test`);
});
