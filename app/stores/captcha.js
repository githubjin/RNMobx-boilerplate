/**
 * 验证码图片
 * {"img_url": "http://api.qgqg.me:8383/captcha/a9154dcee14a4d7abadbac4d631923cf/img", "key": "a9154dcee14a4d7abadbac4d631923cf"}
 * @flow
 */
import { observable, action } from "mobx";

import { apiUrl, _fetch, post } from "../services";
import { api_captcha } from "../constants/api";

type SaptchaSchema = {
  img_url: string,
  key: string
};

class Captcha {
  @observable img_url: ?string;
  @observable key: ?string;
  @observable captchaError: ?any;

  @action
  refresh() {
    // console.log(" ------------- login captcha refresh :  ------------- ");
    return post(apiUrl(api_captcha))
      .then((response: Response) => response.json())
      .then((data: SaptchaSchema) => {
        console.log("captcha back: ", data);
        this.img_url = data.img_url;
        this.key = data.key;
        this.captchaError = null;
      })
      .catch((error: any) => {
        this.captchaError = error;
        console.log("captcha load error", error);
      });
  }
}

const captcha = new Captcha();
// console.log("captcha is new now : ", captcha);
export default captcha;
export { Captcha };
