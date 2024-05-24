import { ActionReducerMap } from "@ngrx/store";
import { InputState } from "../components/core/models/input.state";
import { inputReducer} from "./reducers/input.reducer";
import { ButtonState } from "../components/core/models/button.state";
import { buttonReducer } from "./reducers/button.reducer";
import { LoadingModalState } from "../components/core/models/loading-modal.state";
import { loadingModalReducer } from "./reducers/loading-modal.reducer";
import { DeckState } from "../components/core/models/deck.state";
import { deckReducer } from "./reducers/deck.reducer";
import { RoomState } from "../components/core/models/room.state";
import { roomReducer } from "./reducers/room.reducer";
import { BoardState } from "../components/core/models/board.state";
import { boardReducer } from "./reducers/board.reducer";


export interface AppState {

  isLoading: LoadingModalState;

  label: InputState;
  inputValue: InputState;
  isInputValid: InputState;

  buttonText: ButtonState;

  cardText: DeckState;
  deckTexts: DeckState;

  isCardsSelected: RoomState;
  textCardsSelected: RoomState;

  isCardsRevealed: BoardState;


}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {

  isLoading: loadingModalReducer,

  label: inputReducer,
  inputValue: inputReducer,
  isInputValid: inputReducer,

  buttonText: buttonReducer,

  cardText: deckReducer,
  deckTexts: deckReducer,

  isCardsSelected: roomReducer,
  textCardsSelected: roomReducer,

  isCardsRevealed: boardReducer,
}
