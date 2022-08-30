import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";

const selectFilterCriteria = (state: RootState) => state.filterCriteria;

export const selectAgeRange = createSelector(
  [selectFilterCriteria],
  ({ age }) => age
);

export const selectYearsActiveRange = createSelector(
  [selectFilterCriteria],
  ({ yearsActive }) => yearsActive
);
