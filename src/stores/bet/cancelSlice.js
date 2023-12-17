import { createSlice } from "@reduxjs/toolkit";
import { cancelAction } from "./cancelAction";

const initialState = {
  cancelInfo: {
    id: "",
  },
};

const cancelSlice = createSlice({
  name: "cancel",
  initialState,
  reducers: {},
  extraReducers: {
    [cancelAction.fulfilled]: (state, { payload }) => {
      const id = payload?.data?.id;

      if (id) {
        state.cancelInfo = {
          id,
        };
      } else {
        state.cancelInfo = {
          id: "",
        };
      }
    },
  },
});

export default cancelSlice.reducer;
