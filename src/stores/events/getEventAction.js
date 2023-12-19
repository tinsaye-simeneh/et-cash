import { createAsyncThunk } from "@reduxjs/toolkit";
import { EventResultaxios } from "../../services/api/axios";

export const getEventAction = createAsyncThunk(
  "Bet/getEvent",
  async ({ body }) => {
    const response = await EventResultaxios.post("/eventresult", body);
    return response.data;
  }
);
