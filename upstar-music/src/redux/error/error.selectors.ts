import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";

const selectErrors = (state: RootState) => state.errors;

export const selectErrorMessage = createSelector(
  [selectErrors],
  (error) => error
);
