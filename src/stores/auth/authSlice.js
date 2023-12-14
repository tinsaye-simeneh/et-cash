import { createSlice } from "@reduxjs/toolkit";
import { LoginAction, signUpAction } from "./authAction";

const initialState = {
  loginInfo: {
    username: "",
    password: "",
  },
  signupInfo: {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  },
  userToken: "",
  userRole: "",
};

const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {},
  extraReducers: {
    [LoginAction.fulfilled]: (state, { payload }) => {
      const { username, password } = payload;
      state.loginInfo = {
        username,
        password,
      };
    },
    [signUpAction.fulfilled]: (state, { payload }) => {
      const { username, password, firstname, lastname } = payload;
      state.signupInfo = {
        username,
        password,
        firstname,
        lastname,
      };
    },
  },
});

export const currentUsers = (state) => state.User;
export default UserSlice.reducer;
