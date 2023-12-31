import { createSlice } from "@reduxjs/toolkit";
import { redeemAction } from "./redeemAction";

const initialState = {
  redeemInfo: {
    id: "",
  },
};

const redeemSlice = createSlice({
  name: "redeem",
  initialState,
  reducers: {},
  extraReducers: {
    [redeemAction.fulfilled]: (state, { payload }) => {
      const id = payload?.data?.id;

      if (id) {
        state.redeemInfo = {
          id,
        };
      } else {
        state.redeemInfo = {
          id: "",
        };
      }
    },
  },
});

export default redeemSlice.reducer;
