import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth/authSlice";
import kenoReducer from "./keno/kenoSlice";
import betslipSlice from "./betslip/betslipSlice";
import spinnReducer from "./spinn/spinnSlice";
import PlaceSlice from "./bet/placeSlice";
import cancelSlice from "./bet/cancelSlice";
import getBetSlice from "./bet/getBetSlice";
import getRetailerSlice from "./retailer/getRetailerSlice";
import getBetsSlice from "./bet/getBetsSlice";
import getReportSlice from "./reports/getReportSlice";
import redeemSlice from "./bet/redeemSlice";
import getEventSlice from "./events/getEventSlice";

export const store = configureStore({
  reducer: {
    User: userReducer,
    keno: kenoReducer,
    betslip: betslipSlice,
    Spinn: spinnReducer,
    Place: PlaceSlice,
    cancel: cancelSlice,
    getBet: getBetSlice,
    getRetailer: getRetailerSlice,
    getBets: getBetsSlice,
    getReport: getReportSlice,
    redeem: redeemSlice,
    getEvent: getEventSlice,
  },
});
