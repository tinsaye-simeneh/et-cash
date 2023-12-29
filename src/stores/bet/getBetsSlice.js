import { createSlice } from "@reduxjs/toolkit";
import { getBetsAction } from "./getBetsAction";

const initialState = {
  betInfo: {
    data: [],
  },
};

const getBetSlice = createSlice({
  name: "getBet",
  initialState,
  reducers: {},
  extraReducers: {
    [getBetsAction.fulfilled]: (state, { payload }) => {
      const data = payload?.data;

      if (data) {
        state.betInfo = {
          data,
        };
      } else {
        state.betInfo = {
          data: [],
        };
      }
    },
  },
});

export default getBetSlice.reducer;
