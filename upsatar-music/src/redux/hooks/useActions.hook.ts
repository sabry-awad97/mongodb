import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import * as artistsActions from "../artists/actions/artists.actions";
import * as errorActions from "../error/error.actions";
import * as filterCriteriaActions from "../filter-criteria/filter-criteria.actions";
import * as selectionActions from "../selection/selection.actions";
import { useAppDispatch } from "./useAppDispatch.hook";

const actions = {
  ...artistsActions,
  ...errorActions,
  ...filterCriteriaActions,
  ...selectionActions,
};

export const useActions = () => {
  const dispatch = useAppDispatch();
  return useMemo(() => bindActionCreators(actions, dispatch), [dispatch]);
};
