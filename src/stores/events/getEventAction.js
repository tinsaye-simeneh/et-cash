import { createAsyncThunk } from "@reduxjs/toolkit";
import { EventResultaxios } from "../../services/api/axios";

export const getEventAction = createAsyncThunk(
  "Bet/getEvent",
  async ({ body }) => {
    try {
      const response = await EventResultaxios.post("/eventresult", body);
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
