import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BoardState } from "src/app/components/core/models/board.state";



export const selectIsCardsRevealed = createFeatureSelector<BoardState>('isCardsRevealed');

export const selectIsCardsRevealedSelector = createSelector(
  selectIsCardsRevealed,
  (state: BoardState) => state.isCardsRevealed
)
