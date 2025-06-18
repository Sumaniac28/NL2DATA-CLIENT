import type { TypedUseSelectorHook } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/reducers/auth.reducer";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RootState {
  authUser: ReturnType<typeof authReducer>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rootReducer = (_state: RootState | undefined, action: any): RootState => {
  if (action.type === "logout/updateLogout") {
    return {
      authUser: authReducer(undefined, action),
    };
  }

  return {
    authUser: authReducer(_state?.authUser, action),
  };
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: true, // turn false in production
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
