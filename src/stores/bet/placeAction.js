import { createAsyncThunk } from "@reduxjs/toolkit";
import { Betaxios } from "../../services/api/axios";

export const placeAction = createAsyncThunk(
  "Bet/PlaceBet",
  async ({ body }) => {
    try {
      const response = await Betaxios.post("place", body);
      return response.data;
    } catch (error) {
      if (error.response.status === 402) {
        alert("Session Expired, Please login first");
        window.location.href = "/login";
      }
      throw error;
    }
  }
);
