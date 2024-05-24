import { DeckState } from "src/app/components/core/models/deck.state";
import { selectCard, setDeckTexts } from "../actions/deck.action";
import { createReducer, on } from "@ngrx/store";


export const initialState: DeckState = {
  selectedCardText: null,
  cardTexts: [],
};

export const deckReducer = createReducer(
  initialState,
  on(selectCard, (state, {cardText}) => ({
    ...state,
     selectedCardText: cardText.selectedCardText,
  })),
  on(setDeckTexts, (state, {deckTexts}) => ({
    ...state,
    cardTexts: deckTexts
  }))
);
