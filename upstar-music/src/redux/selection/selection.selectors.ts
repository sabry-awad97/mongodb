import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";

export const selectSelection = createSelector(
  [(state: RootState) => state.selection],
  (selection) => selection
);
