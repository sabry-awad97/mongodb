import { createReducer } from "@reduxjs/toolkit";
import { clearError, createError } from "./error.actions";

const INITIAL_STATE = "";

const reducer = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(
    createError,
    () => "There was an error inserting this record"
  );

  builder.addCase(clearError, () => "");
});

export default reducer;
