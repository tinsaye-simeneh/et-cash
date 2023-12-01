import { createSlice } from "@reduxjs/toolkit";
import { placeAction } from "./placeAction";

const initialState = {
  placeInfo: {
    body: {
      games: [],
      bets: [],
    },
  },
};

const PlaceSlice = createSlice({
  name: "Place",
  initialState,
  reducers: {},
  extraReducers: {
    [placeAction.fulfilled]: (state, { payload }) => {
      const {
        body: {
          games: [],
          bets: [],
        },
      } = payload;
      state.placeInfo = {
        body: {
          games: [],
          bets: [],
        },
      };
    },
  },
});

export const currentPlace = (state) => state.Place;
export default PlaceSlice.reducer;
