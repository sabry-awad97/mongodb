import {
  configureStore,
  combineReducers,
  $CombinedState,
} from "@reduxjs/toolkit";

import logger from "redux-logger";

import { reducer as formReducer } from "redux-form";
import artistsReducer from "../artists/artists.reducer";
import errorReducer from "../error/error.reducer";
import filterCriteriaReducer from "../filter-criteria/filter-criteria.reducer";
import selectionReducer from "../selection/selection.reducer";

const rootReducer = combineReducers({
  artists: artistsReducer,
  errors: errorReducer,
  form: formReducer,
  filterCriteria: filterCriteriaReducer,
  selection: selectionReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      serializableCheck: false,
    }).concat(),
});

export type RootState = ReturnType<typeof store.getState> & {
  readonly [$CombinedState]?: undefined;
};

export type AppDispatch = typeof store.dispatch;
