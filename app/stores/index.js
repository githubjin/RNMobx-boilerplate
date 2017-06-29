/**
 * @flow
 */
import authStore from "./authUser";
import captchaStore from "./captcha";
import borrowersStore from "./borrowers";
import currentUserStore from "./currentUser";
import vehiclesStore from "./vehicles";
import vehicleStore from "./vehicle";
import borrowerStore from "./borrower";
import borrowingsStore from "./borrowings";

// console.log("authStore is : ", authStore);
// console.log("captchaStore is : ", captchaStore);

export {
  borrowerStore,
  captchaStore,
  borrowersStore,
  currentUserStore,
  vehiclesStore,
  authStore,
  vehicleStore,
  borrowingsStore
};
