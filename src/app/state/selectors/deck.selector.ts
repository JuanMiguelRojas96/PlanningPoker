import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { DeckState } from "src/app/components/core/models/deck.state";


export const selectCardText = (state: AppState) => state.cardText

export const selectCardTextSelector = createSelector(
  selectCardText,
  (state: DeckState) => state.selectedCardText
)
