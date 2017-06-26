import _fetch from "../_fetch";

test("fetch wrapper test", () => {
  expect.assertions(1);
  _fetch("repositories?since=0").then(response => {
    console.log(response, response.json());
    expect(response.ok).toBe(true);
  });
});
