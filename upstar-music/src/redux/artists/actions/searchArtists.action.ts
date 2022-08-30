import { createAsyncThunk } from "@reduxjs/toolkit";
import _ from "lodash";
import SearchArtists from "../../../../database/queries/SearchArtists.query";
import { createError } from "../../error/error.actions";
import { ActionTypes } from "./actions.types";

interface IRange {
  min: number;
  max: number;
}

const SearchArtistsProxy = (
  criteria: {
    name: string;
    sort: string;
    age?: IRange;
    yearsActive?: IRange;
  },
  offset?: number,
  limit?: number
) => {
  const result = SearchArtists(
    _.omit(criteria, "sort"),
    criteria.sort,
    offset,
    limit
  );
  if (!result || !result.then) {
    return new Promise(() => {}) as typeof result;
  }
  return result;
};

export const searchArtists = createAsyncThunk(
  ActionTypes.SEARCH_ARTISTS,
  async (
    {
      offset,
      limit,
      ...criteria
    }: {
      name: string;
      sort: string;
      age?: IRange;
      yearsActive?: IRange;
      offset?: number;
      limit?: number;
    },
    { dispatch }
  ) => {
    try {
      const result = await SearchArtistsProxy(criteria, offset, limit);
      return result;
    } catch (error) {
      console.error(error);
      dispatch(createError());
    }
  }
);
