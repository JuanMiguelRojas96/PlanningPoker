import { LoadingModalState } from "src/app/components/core/models/loading-modal.state";
import { startLoading, stopLoading } from "../actions/loading-modal.action";
import { createReducer, on } from "@ngrx/store";

export const initialState: LoadingModalState = {
  isLoading: false,
};

export const loadingModalReducer = createReducer(
  initialState,
  on(startLoading, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(stopLoading, (state) => ({
    ...state,
    isLoading: false,
  }))
);
