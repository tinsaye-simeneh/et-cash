import { createAsyncThunk } from "@reduxjs/toolkit";
import { Betaxios } from "../../services/api/axios";

export const redeemAction = createAsyncThunk("Bet/redeemBet", async (id) => {
  const response = await Betaxios.post("redeem/" + id);
  return response.data;
});
