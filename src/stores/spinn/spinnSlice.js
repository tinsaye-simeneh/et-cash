import { createSlice } from "@reduxjs/toolkit";
import { getSpinnData } from "./spinnAction";

const initialState = {
  spinData: {},
};

const SpinnSlice = createSlice({
  name: "Spinn",
  initialState,
  reducers: {},
  extraReducers: {
    [getSpinnData.fulfilled]: (state, { payload }) => {
      state.spinData = payload.spinnData;
    },
  },
});

export const spinnData = (state) => state.Spinn.spinData;
export default SpinnSlice.reducer;
