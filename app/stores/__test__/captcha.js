import captchaStore from "../captcha";

describe("test captcha refresh", () => {
  it("refresh", () => {
    expect.assertions(1);
    captchaStore.refresh().then(() => {
      expect(captchaStore.key).not.toBeNull;
    });
  });
});
