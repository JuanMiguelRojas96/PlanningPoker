import { ActionReducerMap } from "@ngrx/store";
import { InputState } from "../components/core/models/input.state";
import { inputReducer} from "./reducers/input.reducer";
import { ButtonState } from "../components/core/models/button.state";
import { buttonReducer } from "./reducers/button.reducer";
import { LoadingModalState } from "../components/core/models/loading-modal.state";
import { loadingModalReducer } from "./reducers/loading-modal.reducer";


export interface AppState {

  isLoading: LoadingModalState;

  label: InputState;
  inputValue: InputState;
  isInputValid: InputState;

  buttonText: ButtonState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {

  isLoading: loadingModalReducer,

  label: inputReducer,
  inputValue: inputReducer,
  isInputValid: inputReducer,

  buttonText: buttonReducer,
}
