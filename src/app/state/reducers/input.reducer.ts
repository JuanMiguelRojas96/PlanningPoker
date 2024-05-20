import { createReducer, on } from "@ngrx/store";
import { setInputValue, setLabelValue} from "../actions/input.actions";
import { InputState } from "src/app/components/core/models/input.state";

export const initialState: InputState = {
  label: '',
  inputValue: '',
  isInputValid: false,
};

export const inputReducer = createReducer(
  initialState,
  on(setInputValue, (state, {newInput}) => ({
    ...state,
     inputValue: newInput.inputValue,
     isInputValid: isValidInput(newInput.inputValue),
    })),

  on(setLabelValue, (state, {newLabel}) => ({
    ...state,
     label: newLabel.label,
    }))

);


function isValidInput(value: string): boolean {

  const specialCharacters = /[_.*#/-]/;
  const containsSpecialCharacters = specialCharacters.test(value);
  const containsOnlyNumbers = /^\d+$/.test(value);
  const containsNumbers = (value.match(/\d/g) || []).length <= 3;
  const containsLetters = /[a-zA-Z]/.test(value);

  return (
    !containsSpecialCharacters &&
    !containsOnlyNumbers &&
    containsNumbers &&
    containsLetters &&
    value.length >= 5 &&
    value.length <= 20
  );
};
