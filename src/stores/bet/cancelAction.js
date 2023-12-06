import { createAsyncThunk } from "@reduxjs/toolkit";
import { Betaxios } from "../../services/api/axios";

export const cancelAction = createAsyncThunk("Bet/PlaceBet", async (id) => {
  const response = await Betaxios.post("cancel/" + id);
  return response.data;
});
