import { createReducer } from "@reduxjs/toolkit";
import { HydratedDocument } from "mongoose";
import { IArtist } from "../../../database/models/artist.model";
import { findArtist } from "./actions/findArtist.action";
import { resetArtist } from "./actions/resetArtist.action";
import { searchArtists } from "./actions/searchArtists.action";

const INITIAL_STATE: {
  artist: HydratedDocument<IArtist> | null;
  all: HydratedDocument<IArtist>[];
  offset: number;
  limit: number;
  count: number;
} = {
  artist: null,
  offset: 0,
  limit: 20,
  all: [],
  count: 0,
};

const reducer = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(searchArtists.fulfilled, (state, action) => {
    return { ...state, ...action.payload };
  });

  builder.addCase(findArtist.fulfilled, (state, action) => {
    return { ...state, artist: action.payload };
  });

  builder.addCase(resetArtist, (state) => {
    state.artist = null;
    return state;
  });
});

export default reducer;
