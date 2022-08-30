import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";

const selectForm = (state: RootState) => state.form;

export const selectFilters = createSelector(
  [selectForm],
  (form) => form.filters?.values
);
