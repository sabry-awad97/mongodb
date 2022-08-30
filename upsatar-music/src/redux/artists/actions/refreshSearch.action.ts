import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { ActionTypes } from "./actions.types";
import { searchArtists } from "./searchArtists.action";

export const refreshSearch = createAsyncThunk(
  ActionTypes.REFRESH_SEARCH,
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState;
    const criteria = state.form.filters.values;
    const { offset, limit } = state.artists;
    dispatch(
      searchArtists({
        name: "",
        sort: "",
        offset: offset,
        limit: limit,
        ...criteria,
      })
    );
    return;
  }
);
