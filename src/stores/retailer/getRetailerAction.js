import { createAsyncThunk } from "@reduxjs/toolkit";
import { Retaileraxios } from "../../services/api/axios";

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

export const getRetailerAction = createAsyncThunk(
  "Bet/getRetailer",
  async (id) => {
    try {
      const response = await Retaileraxios.get("/" + id);
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
