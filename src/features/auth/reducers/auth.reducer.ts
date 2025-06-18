/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import type { Slice } from "@reduxjs/toolkit";
import type { IReduxAuthPayload } from "../interfaces/auth.interface";

const initialValue: any = {};

const authSlice: Slice = createSlice({
  name: "auth",
  initialState: initialValue,
  reducers: {
    addAuthUser: (state: any, action: IReduxAuthPayload): any => {
      const { authInfo } = action.payload;
      return {
        ...state,
        ...authInfo,
      };
    },
    clearAuthUser: (): any => {
      return initialValue;
    },
  },
});

export const { addAuthUser, clearAuthUser } = authSlice.actions;
export default authSlice.reducer;
