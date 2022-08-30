import { createReducer } from "@reduxjs/toolkit";
import _ from "lodash";
import {
  deselectArtist,
  resetSelection,
  selectArtist,
} from "./selection.actions";

const INITIAL_STATE: string[] = [];

const reducer = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(selectArtist, (state, action) => {
    state.push(action.payload);
    return state;
  });

  builder.addCase(deselectArtist, (state, action) => {
    state = _.without(state, action.payload);
    return state;
  });

  builder.addCase(resetSelection, () => []);
});

export default reducer;
