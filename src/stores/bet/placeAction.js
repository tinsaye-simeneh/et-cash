import { createAsyncThunk } from "@reduxjs/toolkit";
import { Betaxios } from "../../services/api/axios";

export const placeAction = createAsyncThunk(
  "Bet/PlaceBet",
  async ({ body }) => {
    console.log("test", body);
    const response = await Betaxios.post("place", body);
    return response.data;
  }
);
