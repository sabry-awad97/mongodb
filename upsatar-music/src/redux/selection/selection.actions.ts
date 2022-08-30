import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ActionTypes } from "./action.types";
import SetRetired from "../../../database/queries/SetRetired.query";
import SetNotRetired from "../../../database/queries/SetNotRetired.query";
import { refreshSearch } from "../artists/actions/refreshSearch.action";

export const resetSelection = createAction(ActionTypes.RESET_SELECTION);
export const selectArtist = createAction<string>(ActionTypes.SELECT_ARTIST);
export const deselectArtist = createAction<string>(ActionTypes.DESELECT_ARTIST);

const SetRetiredProxy = (ids: string[]) => {
  const result = SetRetired(ids);
  if (!result || !result.then) {
    return new Promise(() => {});
  }
  return result;
};

const SetNotRetiredProxy = (ids: string[]) => {
  const result = SetNotRetired(ids);
  if (!result || !result.then) {
    return new Promise(() => {});
  }
  return result;
};

export const setRetired = createAsyncThunk(
  ActionTypes.SET_RETIRED,
  async (ids: string[], { dispatch }) => {
    const _ids = ids.map((id) => id.toString());
    await SetRetiredProxy(_ids);
    dispatch(resetSelection());
    dispatch(refreshSearch());
  }
);

export const setNotRetired = createAsyncThunk(
  ActionTypes.SET_NOT_RETIRED,
  async (ids: string[], { dispatch }) => {
    const _ids = ids.map((id) => id.toString());
    await SetNotRetiredProxy(_ids);
    dispatch(resetSelection());
    dispatch(refreshSearch());
  }
);
