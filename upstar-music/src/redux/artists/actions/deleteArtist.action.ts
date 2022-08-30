import { createAsyncThunk } from "@reduxjs/toolkit";
import DeleteArtist from "../../../../database/queries/DeleteArtist.query";
import { createError } from "../../error/error.actions";
import { ActionTypes } from "./actions.types";

const DeleteArtistProxy = (id: string) => {
  const result = DeleteArtist(id);
  if (!result || !result.then) {
    return new Promise(() => {});
  }
  return result;
};

export const deleteArtist = createAsyncThunk(
  ActionTypes.DELETE_ARTIST,
  async (id: string, { dispatch }) => {
    try {
      await DeleteArtistProxy(id);
    } catch (error) {
      console.error(error);
      dispatch(createError());
    }
  }
);
