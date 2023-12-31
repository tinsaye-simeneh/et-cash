import { Spinnaxios } from "../../services/api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSpinnData = createAsyncThunk("Spinn/getall", async (time) => {
  try {
    const resp = await Spinnaxios.get("");
    const spinnData = resp.data.game.find((game) => game.type === "SpinAndWin");

    return spinnData;
  } catch (error) {
    if (error.response.status === 402) {
      alert("Session Expired, Please login first");
      window.location.href = "/login";
    }
    throw error;
  }
});
