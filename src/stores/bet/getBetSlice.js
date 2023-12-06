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
      const {
        data: { id },
      } = payload;
      state.betInfo = {
        id,
      };
    },
  },
});

export default getBetSlice.reducer;
