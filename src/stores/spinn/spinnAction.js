import { Spinnaxios } from "../../services/api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSpinnData = createAsyncThunk("Spinn/getall", async (time) => {
  try {
    const resp = await Spinnaxios.get("");
    const spinnData = resp.data.game.find((game) => game.type === "SpinAndWin");

    return spinnData;
  } catch (error) {
    if (error.response && error.response.data.message) {
      console.log(error.response.data.message, { appearance: "error" });
    } else {
      console.log(error.message, { appearance: "error" });
    }
  }
});
