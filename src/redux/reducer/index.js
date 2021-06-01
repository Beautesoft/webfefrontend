import { combineReducers } from "redux";
import authStore from "./authStore";
import adminStore from "./adminStore";
import common from "./common";
import staff from "./staff";
import staffPlus from "./staffPlus";
import saloon from "./saloon";
import services from "./services";
import payment from "./payment";
import customer from "./customer";
import customerPlus from "./customerPlus";
import appointment from "./appointment";

export const reducers = combineReducers({
  authStore,
  adminStore,
  common,
  staff,
  staffPlus,
  saloon,
  services,
  payment,
  customer,
  customerPlus,
  appointment,
});
