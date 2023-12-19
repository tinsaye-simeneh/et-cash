import { createSlice } from "@reduxjs/toolkit";
import { getRetailerAction } from "./getRetailerAction";

const initialState = {
  retailerInfo: {
    id: "",
  },
};

const getRetailer = createSlice({
  name: "getRetailer",
  initialState,
  reducers: {},
  extraReducers: {
    [getRetailerAction.fulfilled]: (state, { payload }) => {
      const id = payload?.data?.id;

      if (id) {
        state.retailerInfo = {
          id,
        };
      } else {
        state.retailerInfo = {
          id: "",
        };
      }
    },
  },
});

export default getRetailer.reducer;
