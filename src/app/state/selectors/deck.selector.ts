import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { DeckState } from "src/app/components/core/models/deck.state";


export const selectCardText = (state: AppState) => state.cardText
export const selectDeckTexts = (state: AppState) => state.deckTexts

export const selectCardTextSelector = createSelector(
  selectCardText,
  (state: DeckState) => state.selectedCardText
)

export const selectDeckTextsSelector = createSelector(
  selectDeckTexts,
  (state: DeckState) => state.cardTexts
)
