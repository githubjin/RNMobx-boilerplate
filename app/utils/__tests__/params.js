import queryString from "../params";

test("queryString: parse conditions object to query string", () => {
  it('queryString {a:2,b:"23"} to a=2&b=23', () => {
    expect(
      queryString({
        a: 2,
        b: "23"
      })
    ).toEqual("a=2&b=23");
  });

  it("empty condition parse to '' ", () => {
    expect(queryString({})).toEqual("");
  });
});
