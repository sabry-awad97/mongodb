import { createReducer } from "@reduxjs/toolkit";
import { setAgeRange, setYearsActiveRange } from "./filter-criteria.actions";

const INITIAL_STATE = {
  age: { min: 0, max: 100 },
  yearsActive: { min: 0, max: 100 },
};

const reducer = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(setAgeRange.fulfilled, (state, action) => {
    state.age = action.payload;
  });

  builder.addCase(setYearsActiveRange.fulfilled, (state, action) => {
    state.yearsActive = action.payload;
  });
});

export default reducer;
