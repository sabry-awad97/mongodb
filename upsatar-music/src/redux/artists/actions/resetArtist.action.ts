import { createAction } from "@reduxjs/toolkit";
import { ActionTypes } from "./actions.types";

export const resetArtist = createAction(ActionTypes.RESET_ARTIST);
