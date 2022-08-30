import { createAction } from "@reduxjs/toolkit";
import { ActionTypes } from "./actions.types";

export const createError = createAction(ActionTypes.CREATE_ERROR);
export const clearError = createAction(ActionTypes.CLEAR_ERROR);
