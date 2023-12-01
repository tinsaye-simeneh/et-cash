import { Kenoaxios } from "../../services/api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getKenoData = createAsyncThunk("keno/getall", async (time) => {
  try {
    const resp = await Kenoaxios.get("");
    const kenoData = resp.data.game.find((game) => game.type === "Keno");

    return kenoData;
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.log(error.response.data.message, { appearance: "error" });
    } else {
      console.log(error.message, { appearance: "error" });
    }
  }
});
