import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";

export const selectArtists = createSelector(
  [(state: RootState) => state],
  ({ artists }) => artists
);

export const selectArtist = createSelector(
  [selectArtists],
  ({ artist }) => artist
);
