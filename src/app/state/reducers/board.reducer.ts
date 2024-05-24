import { createReducer, on } from "@ngrx/store";
import { BoardState } from "src/app/components/core/models/board.state";
import { startCardsRevealed} from "../actions/board.action";



export const initialState: BoardState = {
  isCardsRevealed: false,
};


export const boardReducer = createReducer(
  initialState,
  on(startCardsRevealed, (state) => ({
    ...state,
    isCardsRevealed: true,
  })),
);
