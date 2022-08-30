import { createAsyncThunk } from "@reduxjs/toolkit";
import FindArtist from "../../../../database/queries/FindArtist.query";
import { ActionTypes } from "./actions.types";

const FindArtistProxy = (id: string) => {
  const result = FindArtist(id);
  if (!result || !result.then) {
    return new Promise(() => {}) as unknown as typeof result;
  }
  return result;
};

export const findArtist = createAsyncThunk(
  ActionTypes.FIND_ARTIST,
  async (id: string) => {
    const artist = await FindArtistProxy(id);
    return artist;
  }
);
