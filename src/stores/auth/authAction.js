import { createAsyncThunk } from "@reduxjs/toolkit";
import Authaxios from "../../services/api/axios";

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

export const LoginAction = createAsyncThunk(
  "User/Login",
  async ({ username, password }) => {
    try {
      const response = await Authaxios.post("login", {
        username,
        password,
      });

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

export const signUpAction = createAsyncThunk(
  "User/SignUp",
  async ({ username, password, firstname, lastname }) => {
    const response = await Authaxios.post("signup", {
      username,
      password,
      firstname,
      lastname,
    });
    return response.data;
  }
);
