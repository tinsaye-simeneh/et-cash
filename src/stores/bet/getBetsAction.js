import { createAsyncThunk } from "@reduxjs/toolkit";
import { Betaxios } from "../../services/api/axios";

export const getBetsAction = createAsyncThunk("Bet/getBets", async (id) => {
  const response = await Betaxios.get("/get-bets");
  return response.data;
});
