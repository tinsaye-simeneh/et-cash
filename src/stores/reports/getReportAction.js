import { createAsyncThunk } from "@reduxjs/toolkit";
import { Betaxios } from "../../services/api/axios";

export const getReportAction = createAsyncThunk(
  "Bet/getReport",
  async ({ body }) => {
    const response = await Betaxios.post("/get-report", body);
    return response.data;
  }
);
