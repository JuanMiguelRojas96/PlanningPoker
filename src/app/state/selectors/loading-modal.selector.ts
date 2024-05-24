import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LoadingModalState } from "src/app/components/core/models/loading-modal.state";


export const selectIsLoading = createFeatureSelector<LoadingModalState>('isLoading');


export const selectIsLoadingSelector = createSelector(
  selectIsLoading,
  (state: LoadingModalState) => state.isLoading,
)
