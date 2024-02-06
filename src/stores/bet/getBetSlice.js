import { createSlice } from "@reduxjs/toolkit";
import { getBetAction } from "./getBetAction";

const initialState = {
  betInfo: {
    id: "",
  },
};

const getBetSlice = createSlice({
  name: "getBet",
  initialState,
  reducers: {},
  extraReducers: {
    [getBetAction.fulfilled]: (state, { payload }) => {
      const id = payload?.data?.id;

      if (id) {
        state.betInfo = {
          id,
        };
      } else {
        state.betInfo = {
          id: "",
        };
      }
    },
  },
});

export default getBetSlice.reducer;
