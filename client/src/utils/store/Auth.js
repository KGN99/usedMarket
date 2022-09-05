import { createSlice } from "@reduxjs/toolkit";

// 토큰 유효시간

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    authenticated: false,
    accessToken: null,
    expireTime: null,
  },
  reducers: {
    SET_TOKEN: (state, action) => {
      state.authenticated = true;
      state.accessToken = action.payload;
      state.expireTime = new Date().getHours() + 1;
    },
    DELETE_TOKEN: (state) => {
      state.authenticated = false;
      state.accessToken = null;
      state.expireTime = null;
    },
  },
});

export const { SET_TOKEN, DELETE_TOKEN } = tokenSlice.actions;

export default tokenSlice.reducer;
