import { createAsyncThunk } from "@reduxjs/toolkit";
import GetAgeRange from "../../../database/queries/GetAgeRange.query";
import GetYearsActiveRange from "../../../database/queries/GetYearsActiveRange.query";
import { createError } from "../error/error.actions";
import { ActionTypes } from "./actions.types";

const GetAgeRangeProxy = (): Promise<{
  min: number;
  max: number;
}> => {
  const result = GetAgeRange();
  if (!result || !result.then) {
    return new Promise(() => {});
  }
  return result;
};

export const setAgeRange = createAsyncThunk(
  ActionTypes.SET_AGE_RANGE,
  async (_, { dispatch }) => {
    try {
      const result = await GetAgeRangeProxy();
      return result;
    } catch (error) {
      console.error(error);
      dispatch(createError());
    }
  }
);

const GetYearsActiveRangeProxy = (): Promise<{
  min: number;
  max: number;
}> => {
  const result = GetYearsActiveRange();
  if (!result || !result.then) {
    return new Promise(() => {});
  }
  return result;
};

export const setYearsActiveRange = createAsyncThunk(
  ActionTypes.SET_YEARS_ACTIVE_RANGE,
  async (_, { dispatch }) => {
    try {
      const result = await GetYearsActiveRangeProxy();
      return result;
    } catch (error) {
      console.error(error);
      dispatch(createError());
    }
  }
);
