import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth/authSlice";
import kenoReducer from "./keno/kenoSlice";
import betslipSlice from "./betslip/betslipSlice";
import spinnReducer from "./spinn/spinnSlice";

export const store = configureStore({
  reducer: {
    User: userReducer,
    keno: kenoReducer,
    betslip: betslipSlice,
    Spinn: spinnReducer,
  },
});
