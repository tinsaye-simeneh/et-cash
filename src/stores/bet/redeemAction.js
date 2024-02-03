import { createAsyncThunk } from "@reduxjs/toolkit";
import { Betaxios } from "../../services/api/axios";

export const redeemAction = createAsyncThunk("Bet/redeemBet", async (id) => {
  try {
    const response = await Betaxios.post("redeem/" + id);
    return response.data;
  } catch (error) {
    if (error.response.status === 402) {
      alert("Session Expired, Please login first");
      window.location.href = "/login";
    }
    throw error;
  }
});
