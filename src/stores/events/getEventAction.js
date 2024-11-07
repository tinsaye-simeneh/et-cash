import { createAsyncThunk } from "@reduxjs/toolkit";
import { EventResultaxios } from "../../services/api/axios";

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

export const getEventAction = createAsyncThunk(
  "Bet/getEvent",
  async ({ body }) => {
    try {
      const response = await EventResultaxios.post("/eventresult", body);
      return response.data;
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
  }
);
