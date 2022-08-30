import { createAsyncThunk } from "@reduxjs/toolkit";
import EditArtist from "../../../../database/queries/EditArtist.query";
import { createError } from "../../error/error.actions";
import { ActionTypes } from "./actions.types";

const EditArtistArtistProxy = (
  id: string,
  artistProps: {
    name: string;
    age: string;
    yearsActive: string;
    genre: string;
  }
) => {
  const result = EditArtist(id, artistProps);
  if (!result || !result.then) {
    return new Promise(() => {}) as typeof result;
  }
  return result;
};

export const editArtist = createAsyncThunk(
  ActionTypes.DELETE_ARTIST,
  async (
    {
      id,
      ...artistProps
    }: {
      id: string;
      name: string;
      age: string;
      yearsActive: string;
      genre: string;
    },
    { dispatch }
  ) => {
    try {
      await EditArtistArtistProxy(id, artistProps);
    } catch (error) {
      console.error(error);
      dispatch(createError());
    }
    return;
  }
);
