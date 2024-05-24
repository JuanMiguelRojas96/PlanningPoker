import { createReducer, on } from "@ngrx/store";
import { RoomState } from "src/app/components/core/models/room.state";
import { cardsSelected, textCardsSelected } from "../actions/room.action";


export const initialState: RoomState = {
  isCardsSelected: false,
  textCardsSelected: [],
};


export const roomReducer = createReducer(
  initialState,
  on(cardsSelected, (state, {isCardsSelected}) => ({
    ...state,
     isCardsSelected: isCardsSelected.isCardsSelected,
  })),
  on(textCardsSelected, (state, {textCardsSelected}) => ({
    ...state,
     textCardsSelected: textCardsSelected
  }))

);
