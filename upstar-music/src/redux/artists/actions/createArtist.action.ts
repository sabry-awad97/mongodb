import { createAsyncThunk } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import CreateArtist from "../../../../database/queries/CreateArtist.query";
import { createError } from "../../error/error.actions";
import { ActionTypes } from "./actions.types";

type IArtistProps = Record<"name" | "age" | "yearsActive" | "genre", string>;

const CreateArtistProxy = (artist: Partial<IArtistProps>) => {
  const result = CreateArtist(artist);
  if (!result || !result.then) {
    return new Promise(() => {}) as typeof result;
  }
  return result;
};

export const createArtist = createAsyncThunk(
  ActionTypes.CREATE_ARTIST,
  async (
    {
      navigate,
      ...artistProps
    }: {
      navigate?: NavigateFunction;
    } & Partial<IArtistProps>,
    { dispatch }
  ) => {
    try {
      const artist = await CreateArtistProxy(artistProps);
      navigate?.(`/artists/${artist._id}`);
      return artist;
    } catch (error) {
      console.error(error);
      dispatch(createError());
    }
  }
);
