import _fetch from "../_fetch";

beforeEach(() => {
  const { Response, Request, Headers, fetch } = require("whatwg-fetch");
  global.Response = Response;
  global.Request = Request;
  global.Headers = Headers;
  global.fetch = fetch;
});

test("fetch wrapper test", () => {
  _fetch("repositories?since=0").then(response => {
    console.log(response, response.json());
    expect(response.ok).toBe(true);
  });
});
