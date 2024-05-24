import { createAction, props } from "@ngrx/store";
import { DeckModel } from "src/app/components/core/models/deck-model";


export const selectCard = createAction(
  '[Deck Component] Select Card',
  props<{cardText: DeckModel}>(),
)

export const setDeckTexts = createAction(
  '[Deck Component] Set Deck Texts',
  props<{deckTexts: string[]}>(),
)
