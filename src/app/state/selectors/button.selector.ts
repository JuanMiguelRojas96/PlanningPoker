import { createSelector } from "@ngrx/store";
import { ButtonState } from "src/app/components/core/models/button.state";
import { AppState } from "../app.state";


export const selectButtonText = (state: AppState) => state.buttonText;

export const selectButtonTextSelector = createSelector(
  selectButtonText,
  (state: ButtonState) => state.buttonText,
)
