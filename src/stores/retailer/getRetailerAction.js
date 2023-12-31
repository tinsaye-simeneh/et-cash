import { createAsyncThunk } from "@reduxjs/toolkit";
import { Retaileraxios } from "../../services/api/axios";

export const getRetailerAction = createAsyncThunk(
  "Bet/getRetailer",
  async (id) => {
    try {
      const response = await Retaileraxios.get("/" + id);
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
