import { Kenoaxios } from "../../services/api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getKenoData = createAsyncThunk("keno/getall", async (time) => {
  try {
    const resp = await Kenoaxios.get("");
    const kenoData = resp.data.game.find((game) => game.type === "Keno");

    return kenoData;
  } catch (error) {
    if (error.response.status === 402) {
      alert("Session Expired, Please login first");
      window.location.href = "/login";
    }
    throw error;
  }
});
