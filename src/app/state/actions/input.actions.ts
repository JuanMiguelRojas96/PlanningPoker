import { createAction, props } from '@ngrx/store';
import { InputModel, LabelModel} from 'src/app/components/core/models/input-model';


export const setInputValue = createAction(
  '[Input Component] Set Input Property Value',
   props<{newInput: InputModel}>(),
);

export const setLabelValue = createAction(
  '[Input Component] Set Input Label Value',
  props<{newLabel: LabelModel}>(),
);

