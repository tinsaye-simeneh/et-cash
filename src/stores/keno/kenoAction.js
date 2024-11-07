import { Kenoaxios } from "../../services/api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";

const Notification = ({ message, type }) => {
  if (type === "error") {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export const getKenoData = createAsyncThunk("keno/getall", async (time) => {
  try {
    const resp = await Kenoaxios.get("");
    const kenoData = resp.data.game.find((game) => game.type === "Keno");

    return kenoData;
  } catch (error) {
    if (error.response.status === 402) {
      Notification({
        message: "Session Expired, Please Login Again",
        type: "error",
      });
      window.location.href = "/login";
    }
    throw error;
  }
});
