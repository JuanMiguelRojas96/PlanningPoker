import { createAction, props } from "@ngrx/store";
import { ButtonModel } from "src/app/components/core/models/button-model";


export const setButtonValue = createAction(
  '[Button Component] Set Button Text Value',
  props<{newButton: ButtonModel}>()
  );
