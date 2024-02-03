import { createSlice } from "@reduxjs/toolkit";
import { getReportAction } from "./getReportAction";

const initialState = {
  reportInfo: {
    body: {
      startTime: "",
      endTime: "",
    },
  },
};

const getReport = createSlice({
  name: "getReport",
  initialState,
  reducers: {},
  extraReducers: {
    [getReportAction.fulfilled]: (state, { payload }) => {
      const { body: { startTime = "", endTime = "" } = {} } = payload || {};

      state.reportInfo = {
        body: {
          startTime,
          endTime,
        },
      };
    },
  },
});

export default getReport.reducer;
