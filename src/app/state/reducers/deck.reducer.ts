import { DeckState } from "src/app/components/core/models/deck.state";
import { selectCard } from "../actions/deck.action";
import { createReducer, on } from "@ngrx/store";


export const initialState: DeckState = {
  selectedCardText: null
};

export const deckReducer = createReducer(
  initialState,
  on(selectCard, (state, {cardText}) => ({
    ...state,
     selectedCardText: cardText.selectedCardText,
  }))
);
