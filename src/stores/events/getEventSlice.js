import { createSlice } from "@reduxjs/toolkit";
import { getEventAction } from "./getEventAction";

const initialState = {
  eventInfo: {
    body: {
      startTime: "",
      endTime: "",
      gameNumber: 0,
    },
  },
};

const getEvent = createSlice({
  name: "getEvent",
  initialState,
  reducers: {},
  extraReducers: {
    [getEventAction.fulfilled]: (state, { payload }) => {
      const { body: { startTime = "", endTime = "", gameNumber = 0 } = {} } =
        payload || {};

      state.reportInfo = {
        body: {
          startTime,
          endTime,
          gameNumber,
        },
      };
    },
  },
});

export default getEvent.reducer;
