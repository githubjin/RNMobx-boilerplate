/**
 * @flow
 */
import authStore from "./authUser";
import captchaStore from "./captcha";
import borrowersStore from "./borrowers";
import currentUserStore from "./currentUser";
import vehicleStore from "./vehicles";

// console.log("authStore is : ", authStore);
// console.log("captchaStore is : ", captchaStore);

export {
  captchaStore,
  borrowersStore,
  currentUserStore,
  vehicleStore,
  authStore
};
