import { createSlice } from "@reduxjs/toolkit";
import { getReportAction } from "./getReportAction";

const initialState = {
  reportInfo: [],
};

const getReport = createSlice({
  name: "getReport",
  initialState,
  reducers: {},
  extraReducers: {
    [getReportAction.fulfilled]: (state, { payload }) => {
      state.reportInfo = payload;
    },
  },
});

export default getReport.reducer;
