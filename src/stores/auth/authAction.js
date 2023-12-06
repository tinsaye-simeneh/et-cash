import { createAsyncThunk } from "@reduxjs/toolkit";
import Authaxios from "../../services/api/axios";

export const LoginAction = createAsyncThunk(
  "User/Login",
  async ({ username, password }) => {
    const response = await Authaxios.post("login", {
      username,
      password,
    });
    return response.data;
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
