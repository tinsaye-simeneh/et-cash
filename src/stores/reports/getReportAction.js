import { createAsyncThunk } from "@reduxjs/toolkit";
import { Reportaxios } from "../../services/api/axios";

export const getReportAction = createAsyncThunk(
  "Bet/getRetailer",
  async (id) => {
    const response = await Reportaxios.get();
    return response.data;
  }
);
