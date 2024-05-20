import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { InputState } from "src/app/components/core/models/input.state";

export const selectLabel = (state: AppState) => state.label;
export const selectInputValue = (state: AppState) => state.inputValue;
export const selectIsInputValid = (state: AppState) => state.isInputValid;


export const selectInputLabelSelector = createSelector(
  selectLabel,
  (state: InputState) => state.label,
)

export const selectInputValueSelector = createSelector(
  selectInputValue,
  (state: InputState) => state.inputValue,
)

export const selectIsInputValidSelector = createSelector(
  selectIsInputValid,
  (state: InputState) => state.isInputValid,
)

