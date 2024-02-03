import { createSlice } from "@reduxjs/toolkit";
import { getKenoData } from "./kenoAction";

const initialState = {
  value: [],
  kenoData: {},
};

export const kenoSlice = createSlice({
  name: "keno",
  initialState,
  reducers: {
    addNumber: (state, action) => {
      if (state.value.includes(action.payload)) {
        state.value = state.value.filter((element) => {
          return element !== action.payload;
        });
      } else {
        state.value.push(action.payload);
      }
    },
    quickPick: (state, action) => {
      state.value = action.payload;
    },
    removeNumber: (state) => {
      state.value = [];
    },
  },
  extraReducers: {
    [getKenoData.fulfilled]: (state, { payload }) => {
      state.kenoData = payload.kenoData;
    },
  },
});

export const kenoData = (state) => state.keno.kenoData;
export const { addNumber, removeNumber, quickPick } = kenoSlice.actions;
export default kenoSlice.reducer;
