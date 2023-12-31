import { createAsyncThunk } from "@reduxjs/toolkit";
import Authaxios from "../../services/api/axios";

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
        alert("Session Expired, Please login first");
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
