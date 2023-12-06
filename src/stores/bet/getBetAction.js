import { createAsyncThunk } from "@reduxjs/toolkit";
import { Betaxios } from "../../services/api/axios";

export const getBetAction = createAsyncThunk("Bet/getBet", async (id) => {
  const response = await Betaxios.get("/" + id);
  return response.data;
});
