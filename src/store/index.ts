import type { TypedUseSelectorHook } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RootState {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rootReducer = (_state: RootState | undefined, action: any): RootState => {
  if (action.type === "logout/updateLogout") {
    return {};
  }

  return {};
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: true, // turn false in production
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
