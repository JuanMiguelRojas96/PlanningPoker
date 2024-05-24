import { ButtonState } from "src/app/components/core/models/button.state";
import { setButtonValue } from "../actions/button.action";
import { createReducer, on } from "@ngrx/store";


export const initialState: ButtonState = {
  buttonText: '',
};

export const buttonReducer = createReducer(
  initialState,
  on(setButtonValue, (state, {newButton}) => ({
    ...state,
     buttonText: newButton.buttonText,
  }))
);
