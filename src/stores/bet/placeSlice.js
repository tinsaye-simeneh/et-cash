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
        body: { games = [], bets = [] } = {}, // Add default empty object to handle potential undefined
      } = payload || {};

      state.placeInfo = {
        body: {
          games,
          bets,
        },
      };
    },
  },
});

export const currentPlace = (state) => state.Place;
export default PlaceSlice.reducer;
