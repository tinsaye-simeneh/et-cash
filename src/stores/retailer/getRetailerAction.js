import { createAsyncThunk } from "@reduxjs/toolkit";
import { Retaileraxios } from "../../services/api/axios";

export const getRetailerAction = createAsyncThunk(
  "Bet/getRetailer",
  async (id) => {
    const response = await Retaileraxios.get("/" + id);
    return response.data;
  }
);
